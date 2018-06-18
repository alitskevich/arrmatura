import {parseXML} from './xml.js'
import {compile} from './compile.js'
import {Elmnt} from './dom.js'
import {Component} from './component.js'
export {Component} from './component.js'

let COUNTER = 1
const doc = window.document

// ==========
// ensure app API
// ----------
const ensureApi = (app) => {
  const objectApiStubs = {
    emit: (url, payload) => console.error('app.emit() is not defined.'),
    fetch: (url, cb) => cb(new Error('app.fetch() is not defined.')),
    pipes: {},
    resource: key => key
  }
  Object.keys(objectApiStubs).forEach(k => {
    if (!app[k]) {
      app[k] = objectApiStubs[k]
    }
  })
  return app
}

// ==========
// Type registry
// ----------
const REGISTRY = new Map()

function defer (fn) {
  this.$.defer(fn)
}

function __assign__ (d) {
  this.$.assign(d)
}

function getAssign (d) {
  return this._this_assign || (this._this_assign = (d)=>this.assign(d))
}

const register = ctor => {
  // narrow non-function ctor
  ctor = typeof ctor === 'function' ? ctor : Object.assign(function () {}, ctor)
  // narrow name
  const name = ctor.NAME = ctor.NAME ||
    ctor.name ||
    (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || ('$C' + COUNTER++)
  // narrow template
  const text = ctor.TEMPLATE ||
    (ctor.prototype.TEMPLATE && ctor.prototype.TEMPLATE()) ||
    (doc.getElementById(name) || {innerText: `<noop name="${name}"/>`}).innerText
  // compile
  const compiledTemplate = compile(parseXML(text, name))
  function __render__ () {
    render(this.$, resolve(new Map(), this.$, compiledTemplate), this.$.parentElt)
  }
  // patch with framework facilities:
  Object.assign(ctor.prototype, {
    __assign__,
    __render__,
    getAssign,
    assign: ctor.prototype.assign || __assign__,
    render: ctor.prototype.render || __render__,
    defer
  })
  // register
  REGISTRY.set(name, ctor)
}

// ==========
// Bootstrap
// ----------

// bootstap a components tree and render immediately on <body/>
export function launch (...types) {
  bootstrap(null, ...types).render()
}
// bootstap a components tree
export function bootstrap (elt, ...types) {
  if (types.length === 0) {
    types = [ Component ]
  }
  types.forEach(register)
  // register transparent container: <ui:fragment>
  register({NAME: 'fragment', TEMPLATE: '<ui:transclude/>'})
  // make reference to render()
  Elmnt.prototype.renderInnerContent = function () { render(this, this.transclude, this.$) }
  Component.Element = Elmnt
  // collect and register `bare-template` definitions
  const staticTypes = ([]).concat([...doc.getElementsByTagName('script')])
    .filter(e => e.id && !REGISTRY.has(e.id) && e.type === 'text/x-template')
  staticTypes.map(e => ({ NAME: e.id, TEMPLATE: e.innerText }))
    .forEach(register)
  // use `<body>` as mount element by default
  return new Bootstrap(elt || doc.body, types[0])
}

class Bootstrap {
  constructor (elt, ctor) {
    this.$elt = elt
    this.meta = new Map()
    this.meta.set(0, { tag: ctor.NAME, props: {}, subs: [] })
  }
  render () {
    window.requestAnimationFrame(() => render(this, this.meta, this.$elt))
  }
}

// ==========
// Rendering. MetaTree -> ViewTree(Components,Elements)
// ----------
function render ($, meta, parentElt) {
  if ($.isDone) {
    return
  }
  // done
  if ($.children) {
    for (let c of $.children.values()) {
      if (!meta.has(c.uid)) {
        done(c)
      }
    }
  }
  if (meta.size) {
    const ch = $.children || ($.children = new Map())
    // create
    for (let [uid, m] of meta.entries()) {
      if (!ch.has(uid)) {
        const componentCtor = REGISTRY.get(m.tag)
        const c = componentCtor ? new Component(m, componentCtor) : new Component.Element(m)
        c.uid = uid
        c.parentElt = parentElt
        c.parent = $
        c.app = $.app || ensureApi(c.$)
        ch.set(uid, c)
      }
    }
    // assign
    for (let [uid, m] of meta.entries()) {
      const c = ch.get(uid)
      c.transclude = m.subs
      c.prevElt = parentElt.cursor
      c.assign(m.props)
    }
    // init
    for (let c of ch.values()) {
      if (!c.isInited) {
        c.isInited = true
        c.init()
      }
    }
  }
}
// done
function done (c) {
  if (c.isDone) {
    return
  }
  c.isDone = true
  c.done()
  if (c.children) {
    for (let cc of c.children.values()) {
      done(cc)
    }
    c.children = null
  }
  if (c.parent) {
    c.parent.children.delete(c.uid)
    c.parent = null
  }
  if (c.app) {
    c.app = null
  }
}

// ==========
// Template Resolution. GeneratorTree + Data -> MetaTree
// ----------

function resolve (map, c, meta) {
  if (!meta) {
    return map
  }
  if (Array.isArray(meta)) {
    return meta.reduce((m, e) => resolve(m, c, e), map)
  }
  const { type, props, subs, uid, iff, each, key } = meta
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else)
  }
  if (each) {
    const data = each.dataGetter(c)
    return !data || !data.length ? map : (data.reduce ? data : ('' + data).split(',')).reduce((m, d, index) => {
      c.$[each.itemId] = d
      c.$[each.itemId + 'Index'] = index
      const id = `${uid}-$${d.id || index}`
      return resolve(m, c, { type, props, subs, uid: id })
    }, map)
  }
  const tag = type(c)
  if (tag === 'transclude') {
    const partial = props.reduce((a, f) => f(c, a), {}).key
    c.transclude.forEach((v, k) => {
      if (partial ? v.key === partial : !v.key) {
        map.set(k, v)
      }
    })
    return map
  }

  const r = {
    owner: c,
    tag,
    props: {},
    key,
    subs: subs.length ? subs.reduce((m, s) => resolve(m, c, s), new Map()) : null
  }
  for (let p of props) {
    p(c, r.props)
  }
  return map.set(tag + uid, r)
}
