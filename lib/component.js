/* eslint-disable no-console */
import { render } from './render.js';
import { resolveTemplate } from './resolve.js';

let COUNTER = 1;

const nextId = (p = '') => p + (COUNTER++);

export const methodName = (x, pre = '') => {
  if (!x) { return pre; }
  const s = `${x}`;
  return pre + s[0].toUpperCase() + s.slice(1);
};

export class Component {

  constructor(Ctor, options) {
    Object.assign(this, options);
    const { ref, parent, props } = this
    if (parent) {
      this.app = parent.app;
      this.ctx = this.elt = parent.elt;
      this.impl = new Ctor(props, this);
      this.impl.$ = this;
      this.impl.app = this.app;
      if (ref) {
        const hidden = this.app[ref];
        this.app[ref] = this.impl;
        this.defer(() => { this.app[ref] = hidden })
      }
    } else {
      this.app = this.impl = new Ctor(props, this);
      this.impl.$ = this;
    }
  }

  /**
   * Rendering.
   */
  resolveFragmentTemplate() {
    const acc = new Map();

    if (this.$for) { // ui:for
      const $for = this.$for;
      const { $data: data } = this.impl;
      const { itemId, itemNode, emptyNode, loadingNode } = $for;
      const { tag, updates, initials = {}, nodes, uid } = itemNode;
      if (data && data.length) {
        if (!data.forEach) {
          throw new Error('wrong ui:for data', data)
        }
        data.forEach((d, index) => {
          const id = `${uid}-$${d.id || index}`;
          const $ownerImpl = Object.assign(Object.create(this.owner.impl), { [itemId]: d, [itemId + 'Index']: index })
          const up = Δ => this.owner.up(Δ)
          const $owner = Object.assign(Object.create(this.owner), { impl: $ownerImpl, $propFnMap: {}, up })
          resolveTemplate($owner, { tag, initials, updates, nodes, uid: id }, acc);
        });
      } else if (!data) {
        if (loadingNode) { resolveTemplate(this.owner, loadingNode, acc); }
      } else if (!data.length) {
        if (emptyNode) { resolveTemplate(this.owner, emptyNode, acc); }
      }

    } else if (this.$if) { // ui:if
      const $if = this.$if;
      const { $data } = this.impl;
      const node = $data ? $if.then : $if.else;
      resolveTemplate(this, node, acc);

    } else if (this.$tag) { // ui:tag
      const tag = this.impl.$data;
      if (tag) {
        resolveTemplate(this, { ...this.$tag, tag, uid: tag + ':' + this.uid }, acc);
      }

    } else if (this.content) { // content
      this.content.forEach((v, k) => acc.set(k, v));
    }
    return acc;
  }

  render() {
    this.ctx.cursor = this.prevElt;
    if (this.impl.render) {
      this.impl.render(this, render);
    } else {
      render(this);
    }
  }

  resolveTemplate() {
    return (this.tag === 'ui:fragment')
      ? this.resolveFragmentTemplate()
      : resolveTemplate(this, this.impl.constructor.$TEMPLATE())
  }

  /**
   * Life-cycle hooks.
   */
  init() {
    if (this.isDone || this.isInited) { return; }
    this.isInited = true;
    // console.log('init', this.tag, this.uid)
    if (this.inits) {
      this.inits.forEach(f => this.defer(f(this)));
      delete this.inits;
    }
    if (this.impl.init) {
      const d = this.impl.init(this)
      if (d) { this.up(d); }
    }
  }

  done() {
    if (this.isDone) { return; }
    this.isDone = true;
    if (this.impl.done) {
      this.impl.done(this);
    }
    // console.log('done', this.tag, this.uid)
    this.eachChild(c => { c.parent = null; c.done(); });
    if (this.parent) {
      this.parent.children.delete(this.uid);
    }
    if (this.prevElt) {
      this.prevElt.nextElt = this.nextElt;
    }
    if (this.defered) {
      this.defered.forEach(f => f(this));
      delete this.defered;
    }
    ['parent', 'children', 'owner', 'impl', 'app', 'ctx'].forEach(k => { delete this[k]; });
  }

  /**
   * State.
   */
  up(Δ) {
    if (this.isDone) { return; }
    let changed = this.set(Δ);
    this.render();
    if (this.ref && changed) { this.notify(); }
  }

  upAsync(promise, key) {
    const $ = this;
    const racer = $.raceCondition('set:' + (key || 'up'));
    const up = r => racer(() => $.up(r))
    if (key && key !== '...') {
      const akey = key.replace('Promise', '')
      promise.then(val => up({ [akey + 'Error']: null, [akey]: val }), error => up({ [akey + 'Error']: error }));
    } else {
      promise.then(up, error => up({ error }));
    }
    return promise;
  }

  set(Δ) {
    const $ = this;
    const impl = $.impl;
    let changed = false;
    if (impl.set) {
      changed = impl.set(Δ);
    } else if (Δ) {
      if (Δ.then) {
        $.upAsync(Δ);
      } else {
        Object.entries(Δ).forEach(([k, their]) => {
          if (their && their.then) {
            $.upAsync(their, k);
          } else if (k && typeof their !== 'undefined' && their !== impl[k]) {
            const setter = impl['set' + k[0].toUpperCase() + k.slice(1)];
            if (setter) { setter.call(impl, their); } else { impl[k] = their; }
            changed = true;
          }
        });
      }
    }
    return changed;
  }

  prop(propId) {
    const value = this.propGetter(propId)();
    return (typeof value === 'function') ? this.bindFn(value) : value;
  }

  propGetter(key) {

    const $ = this;
    const map = $.$propFnMap || ($.$propFnMap = {});
    let fn = map[key];
    if (fn) { return fn; }

    const impl = $.impl
    const [pk, ...path] = key.split('.')
    const gettr = impl[methodName(pk, 'get')];

    const extractor1 = gettr
      ? () => gettr.call(impl)
      : ($$ = impl.get ? impl.get(impl) : impl) =>
        ((pk in $$) ? $$[pk] : $.owner && $.owner.prop && $.tag === 'ui:fragment' ? $.owner.prop(pk) : undefined);

    fn = !path.length
      ? extractor1
      : () => path.reduce((r, p) => (r ? r[p] : r), extractor1())

    return map[key] = fn;
  }

  /**
   *  Arrows.
   */
  notify() {
    if (this.listeners && !this.notifying) {
      this.notifying = true
      this.listeners.forEach(e => e(this.impl))
      this.notifying = false
    }
  }

  subscribe(fn) {
    const uuid = nextId();
    const listeners = (this.listeners || (this.listeners = new Map()))
    fn(this.impl);
    listeners.set(uuid, fn);
    return () => listeners.delete(uuid);
  }

  connect(key, applicator) {
    const [type = this.ref, target] = key.split('.');
    const ref = type === 'this' ? this.impl : this.app[type];
    if (!ref) { console.error('connect: No such ref ' + type, key) }
    return ref && ref.$.subscribe(() => {
      try {
        const value = ref.$.prop(target);
        this.up(applicator ? (value && value.then ? value.then(applicator) : applicator(value)) : value)
      } catch (ex) {
        console.error('connect ' + type + ':' + target, ex)
      }
    });
  }

  emit(key, data) {
    if (!key || !key.includes('.')) { return this.actualOwner.up(key ? { [key]: data } : data) }

    const [type, target] = key.split('.');
    const event = {
      data,
      ...data,
    };

    const ref = type === 'this' ? this.impl : this.app[type];
    if (!ref) { 
      console.warn('emit: No such ref ' + type);
      return;
    }
    try {

      const method = ref[methodName(target, 'on')];
      if (!method) { throw new ReferenceError('emit ' + type + ': No such method ' + methodName(target, 'on')) }

      const result = method.call(ref, event, ref, ref.$);
      this.log(type + ':' + methodName(target, 'on'), result, event, ref)
      if (result) { ref.$.up(result) }

    } catch (ex) {
      console.error('emit ' + key + ':', ex)
    }
  }

  /**
   * Routines.
   */

  raceCondition(key) {
    const COUNTERS = this.$weak || (this.$weak = new Map())
    const counter = 1 + (COUNTERS.get(key) || 0);
    COUNTERS.set(key, counter)
    return (fn) => {
      if (counter === COUNTERS.get(key)) { this.app.run(fn) }
    }
  }

  defer(fn) { if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn); } }

  eachChild(fn, ch = this.children) { if (ch) { ch.forEach(fn); } }

  get actualOwner() {
    let $ = this
    // eslint-disable-next-line no-empty
    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) { }
    return $
  }



  error(...args) {
    console.error(this.tag + this.uid, ...args)
  }

  log(...args) {
    console.log(this.tag + this.uid, ...args)
  }

  bindFn(f) {
    const $ = this;
    const map = $.$boundFnMap || ($.$boundFnMap = new Map());
    let fn = map.get(f);
    if (!fn) {
      const bound = f.bind($.impl);
      fn = (...args) => {
        const r = bound(...args);
        if (r) {
          $.up(r)
        }
      }
      map.set(f, fn);
    }
    return fn;
  }
}
