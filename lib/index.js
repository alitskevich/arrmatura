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

// super implementation for component inners
function superAssign (delta) {
  const c = this.$
  if (!delta || !c) {
    return
  }
  // prevent recursive invalidations
  c.$assignDepth = (c.$assignDepth || 0) + 1
  if (delta._) {
    delta = {...delta._, ...delta, _: undefined}
  }
  // iterate payload
  for (let k of Object.keys(delta)) {
    const their = delta[k]
    if (k[0] === '$') {
      their.call(c)
      continue
    }
    const mine = this[k]
    if (their !== undefined && (their !== mine || (typeof their === 'object' && their !== null))) {
      const setter = this['set' + k[0].toUpperCase() + k.slice(1)]
      if (setter) {
        setter.call(this, their)
      } else {
        this[k] = their
      }
    }
  }
  // prevent recursive invalidations
  --c.$assignDepth
  if (c.$assignDepth === 0) {
    c.parentElt.cursor = c.prevElt
    render(c, resolve(new Map(), c, this.constructor.COMPILER()), c.parentElt)
  }
}

const register = ctor => {
  // narrow non-function ctor
  ctor = typeof ctor === 'function' ? ctor : Object.assign(function () {}, ctor)
  const proto = ctor.prototype
  // narrow name
  const name = ctor.NAME = ctor.NAME ||
    ctor.name ||
    (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || ('$C' + COUNTER++)
  // narrow template
  const text = ctor.TEMPLATE ||
    (ctor.prototype.TEMPLATE && proto.TEMPLATE()) ||
    (doc.getElementById(name) || {innerText: `<noop name="${name}"/>`}).innerText
  // lazy template compilation
  const compiled = {}
  ctor.COMPILER = () => compiled.template || (compiled.template = compile(parseXML(text, name)))
  // patch with framework facilities:
  Object.defineProperties(proto, proto.assign
    ? { 'super_assign': { value: superAssign, writable: false, enumerable: false } }
    : { 'assign': { value: superAssign, writable: false, enumerable: false } }
  )
  // register
  REGISTRY.set(name, ctor)
}

// ==========
// Bootstrap
// ----------

// bootstap a components tree and render immediately on <body/>
export function launch (...types) {
  bootstrap(...types).render()
}
// bootstap a components tree
export function bootstrap (...types) {
  if (types.length === 0) {
    types = [ Component ]
  }
  types.forEach(register)
  // register transparent container: <ui:fragment>
  register({NAME: 'fragment', TEMPLATE: '<ui:transclude/>'})
  // make reference to render()
  Elmnt.render = render
  Component.Element = Elmnt
  // collect and register `bare-template` definitions
  const staticTypes = ([]).concat([...doc.getElementsByTagName('script')])
    .filter(e => e.id && !REGISTRY.has(e.id) && e.type === 'text/x-template')
  staticTypes.map(e => ({ NAME: e.id, TEMPLATE: e.innerText }))
    .forEach(register)
  // use `<body>` as mount element by default
  return new Bootstrap(types[0])
}

class Bootstrap {
  constructor (ctor) {
    this.meta = new Map()
    this.meta.set(0, { tag: ctor.NAME, props: {}, subs: [] })
  }
  render (elt) {
    window.requestAnimationFrame(() => render(this, this.meta, elt || doc.body))
  }
}

// ==========
// Rendering. MetaTree -> ViewTree(Components,Elements)
// ----------
function render ($, meta, parentElt) {
  if ($.isDone) {
    return
  }
  if ($.rendering) {
    return
  }
  $.rendering = true
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
        const c = componentCtor ? new Component(componentCtor) : new Component.Element(m.tag)
        c.uid = uid
        c.owner = m.owner
        c.parentElt = parentElt
        c.parent = $
        c.app = $.app || ensureApi(c.$)
        ch.set(uid, c)
        if (m.ref) {
          $.ref = m.ref
          c.owner.$[m.ref] = c.$
        }
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
  $.rendering = false
}
// done
function done (c) {
  if (c.isDone) {
    return
  }
  c.isDone = true
  if (c.owner) {
    if (c.ref) {
      c.owner.$[c.ref] = null
    }
    c.owner = null
  }
  if (c.children) {
    for (let cc of c.children.values()) {
      done(cc)
    }
    c.children = null
  }
  c.done()
  if (c.parent) {
    c.parent.children.delete(c.uid)
    c.parent = null
  }
  if (c.app) {
    c.app = null
  }
  if (c.parentElt) {
    c.parentElt = null
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
  const { type, props, subs, uid, iff, each, key, ref } = meta

  if (each) {
    const data = each.dataGetter(c)
    return !data || !data.length ? map : (data.reduce ? data : ('' + data).split(',')).reduce((m, d, index) => {
      c.$[each.itemId] = d
      c.$[each.itemId + 'Index'] = index
      const id = `${uid}-$${d.id || index}`
      return resolve(m, c, { type, props, subs, uid: id, iff })
    }, map)
  }
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else)
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
    ref,
    subs: subs.length ? subs.reduce((m, s) => resolve(m, c, s), new Map()) : null
  }
  for (let p of props) {
    p(c, r.props)
  }
  return map.set(tag + uid, r)
}
