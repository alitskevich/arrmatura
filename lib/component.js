/* eslint-disable no-console */
import { render } from './render.js';
import { resolveTemplate } from './resolve.js';

let COUNTER = 1;
const fnId = e => e
const nextId = (p = '') => p + (COUNTER++);
const applyValue = (value, fn = fnId) => value && value.then ? value.then(fn) : fn(value);

const methodName = (x, pre = '') => {
  if (!x) { return pre; }
  const s = `${x}`;
  return pre + s[0].toUpperCase() + s.slice(1);
};
 
const upAsync = ($, promise, key) => {
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
const propGetter = ($, key) => {
  const map = $.$propFnMap || ($.$propFnMap = {});
  let fn = map[key];
  if (fn) { return fn; }

  const impl = $.impl
  const instant = impl[key];
  if (instant && (typeof instant === 'function')){
     const bound = instant.bind(impl);
     fn = () => bound;
  } else {
    const [pk, ...path] = key.split('.')
    const gettr = impl[methodName(pk, 'get')];
  
    const fn0 = gettr
      ? () => gettr.call(impl)
      : () => impl[pk];
  
    fn = !path.length
      ? fn0
      : () => path.reduce((r, p) => (r && (p in r) ? r[p] : void 0), fn0())
  }

  map[key] = fn;

  return fn;
}

export class Component {

  constructor(Ctor, options) {
    Object.assign(this, options);
    const { ref, parent, props } = this;
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

  render() {
    if (this.isDone) { return; }

    this.ctx.cursor = this.prevElt;
    this.impl.render ? this.impl.render(this, render) : render(this);
  }

  resolveTemplate() {
    return this.impl.resolveTemplate
      ? this.impl.resolveTemplate(this)
      : resolveTemplate(this, this.impl.constructor.$TEMPLATE())
  }

  /**
   * Life-cycle hooks.
   */
  init() {
    if (this.isDone || this.isInited) { return; }
    this.isInited = true;
    if (this.inits) {
      const initials = this.impl.init && this.impl.init(this) || {}
      const all = []
      this.inits.map(f => f(this)).forEach(r => {
        if (!r) return;
        const { hotValue, cancel } = r
        this.defer(cancel);
        if (hotValue && hotValue.then) {
          all.push(hotValue)
        } else {
          Object.assign(initials, hotValue)
        }
      });
      delete this.inits;
      this.up(initials);
      if (all.length) {
        Promise.all(all).then((args) => this.up(args.reduce(Object.assign, {})));
      }
    } else {
      if (this.impl.init) {
        const d = this.impl.init(this)
        if (d) { this.up(d); }
      }
    }
  }

  done() {
    if (this.isDone) { return; }
    this.isDone = true;
    if (this.impl.done) {
      this.impl.done(this);
    }
    if (this.children) {
      this.children.forEach(c => { c.parent = null; c.done(); })
    }
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

  set(Δ) {
    const $ = this;
    const impl = $.impl;
    let changed = false;

    if (impl.set) {
      changed = impl.set(Δ);
    } else if (Δ) {
      if (Δ.then) {
        upAsync($, Δ);
      } else {
        Object.entries(Δ).forEach(([k, their]) => {
          if (their && their.then) {
            upAsync($, their, k);
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
    const value = propGetter(this, propId)();
    return value;
  }

  /**
   *  Left Arrow.
   */
  notify() {
    if (this.listeners && !this.notifying) {
      this.notifying = true
      this.listeners.forEach(e => e())
      this.notifying = false
    }
  }

  subscribe(target, fn) {
    const uuid = nextId();
    const listeners = (this.listeners || (this.listeners = new Map()))
    listeners.set(uuid, () => {
      try {
        target.up(fn(this))
      } catch (ex) {
        console.error(this.tag + this.uid + ' notify ', ex)
      }
    });
    return { hotValue: fn(this), cancel: () => listeners.delete(uuid) };
  }

  connect(key, applicator) {
    const [refId, propId] = key.split('.');
    const ref = refId === 'this' ? this.impl : this.app[refId];
    if (!ref) { return console.error('connect: No such ref ' + refId, key) }
    return ref.$.subscribe(this, ($) => applyValue($.prop(propId), applicator));
  }

  /**
   *  Right Arrow.
   */
  emit(key, data) {
    const $ = this;

    if (!key || !key.includes('.')) {
      return $.up(key ? { [key]: data } : data)
    }

    const [type, target] = key.split('.');
    const event = { data, ...data };

    const ref = type === 'this' ? $.impl : $.app[type];
    if (!ref) {
      console.warn('emit: No such ref ' + type);
      return;
    }

    try {

      const method = ref[methodName(target, 'on')];
      if (!method) { throw new ReferenceError('emit ' + type + ': No such method ' + methodName(target, 'on')) }

      const result = method.call(ref, event, ref, ref.$);
      this.log(type + ':' + methodName(target, 'on'), result, data, ref)
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
    let counter = 1 + (COUNTERS.get(key) || 0);
    COUNTERS.set(key, counter)
    return (fn) => {
      if (counter === COUNTERS.get(key)) {
        counter = 0;
        fn()
      }
    }
  }

  defer(fn) { if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn); } }

  log(...args) {
    console.log(this.tag + this.uid, ...args)
  }

  res(key) {
    const [id, ...deep] = key.split('.');
    const target = id === 'app' ? this.app : this.app.resources[id];
    if (!target || deep.length === 0) {
      return target;
    }
    if (deep.length === 1) {
      return target[deep[0]];
    }
    return deep.reduce((r, k) => r ? r[k] : null, target)
  }
}
