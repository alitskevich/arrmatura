import {parseXML} from './xml.js'
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
    // emit event:
    emit (key, payload) {
      console.error('app.emit() is not defined.')
    },
    // fetch
    fetchInto (key, target, propName) {
      target.assign({error: new Error('app.fetch() is not defined.')})
    },
    // pipes
    pipes: {},
    // resources
    resource (key) {
      return key
    }
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
  if (fn) {
    (this.$.defered || (this.$.defered = [])).push(fn)
  }
}

function __assign__ (d) {
  this.$.assign(d)
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
  const tag = type(c)
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else)
  }

  if (tag === 'transclude') {
    const partial = props.reduce((a, f) => f(c, a), {}).key
    c.transclude.forEach((v, k) => {
      if (partial ? v.key === partial : !v.key) {
        map.set(k, v)
      }
    })
    return map
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

function prop (c, k) {
  let $ = c.$
  if ($.get) {
    return $.get(k)
  }
  let posE = k.indexOf('.')
  if (posE === -1) {
    const getter = $['get' + k[0].toUpperCase() + k.slice(1)]
    const v = getter ? getter.call($, k) : $[k]
    return v
  }
  let posB = 0
  // dig
  while (posE !== -1) {
    $ = $[k.slice(posB, posE)]
    if (!$) {
      return
    }
    posB = posE + 1
    posE = k.indexOf('.', posB)
  }
  return $[k.slice(posB)]
}
// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

function compileType (tag) {
  const dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null
  return dtype ? (dtype === 'fragment' || dtype === 'transclude' ? c => dtype : c => prop(c, dtype)) : c => tag
}

function compile ({ tag, attrs, uid, subs }) {
  const r = { uid, type: compileType(tag), props: compileAttrs(attrs), key: attrs.get('ui:key') }

  const aIf = attrs.get('ui:if')
  if (aIf) {
    const neg = aIf[0] === '!' ? aIf.slice(1) : null
    r.iff = neg ? c => !prop(c, neg) : c => !!prop(c, aIf)
    if (subs.length) {
      const ifElse = subs.find(e => e.tag === 'ui:else')
      const ifThen = subs.find(e => e.tag === 'ui:then')
      if (ifElse) {
        r.iff.else = compile(ifElse).subs
        subs = ifThen ? ifThen.subs : subs.filter(e => e !== ifElse)
      } else if (ifThen) {
        subs = ifThen.subs
      }
    }
  }

  const aEach = attrs.get('ui:each')
  if (aEach) {
    const [ itemId, , dataId ] = aEach.split(' ')
    const dataGetter = dataId[0] === ':' ? c => c.app.resource(dataId.slice(1)) : (c) => prop(c, dataId)
    r.each = { itemId, dataGetter }
  }

  r.subs = subs.map(compile)
  return r
}

const RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/
const RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g
function compileAttrs (attrs) {
  const r = []
  let aProps = null
  attrs.forEach((v, k) => {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v
      }
      return
    }
    // localize by key
    if (v[0] === ':') {
      const key = v.slice(1)
      return r.push((c, p) => { p[k] = c.app.resource(key); return p })
    }
    if (v[0] === '<' && v[1] === '-') {
      const fctr = compileAttrValue(k, v.slice(2).trim())
      return r.push((c, p) => {
        p['$' + k] = function () {
          const url = fctr(c, {})[k]
          const old = (this.$.fetchUrls || (this.$.fetchUrls = {}))[k]
          if (url !== old) {
            this.$.fetchUrls[k] = url
            setTimeout(() => this.app && this.app.fetchInto(url, this.$, k), 10)
          }
        }
        return p
      })
    }
    if (v[0] === '-' && v[1] === '>') {
      const fctr = compileAttrValue(k, v.slice(2).trim())
      return r.push((c, p) => {
        p[k] = (data) => c.app.emit(fctr(c, {})[k], data)
        return p
      })
    }

    r.push(compileAttrValue(k, v))
  })
  if (aProps) {
    const fn = compileAttrs((new Map()).set('_', aProps))[0]
    r.push((c, p) => {
      fn(c, p)
      return p
    })
  }
  return r
}

function compilePlaceholder (k, v) {
  const keys = v.split('|')
  const key = keys[0]
  if (keys.length === 1) {
    return (c, p) => { p[k] = prop(c, key); return p }
  } else {
    const fnx = keys.slice(1).map(k => k.trim())
    return (c, p) => { p[k] = fnx.reduce((r, k) => c.app.pipes[k] ? c.app.pipes[k](r, c) : r, prop(c, key)); return p }
  }
}

function compileAttrValue (k, v) {
  if (!v.includes('{{')) {
    const r = v === 'true' ? true : v === 'false' ? false : v
    return (c, p) => { p[k] = r; return p }
  }
  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return compilePlaceholder(k, v.slice(2, -2))
  }
  const fnx = []
  v.replace(RE_PLACEHOLDER, (s, key) => fnx.push(compilePlaceholder('p' + fnx.length, key)))
  return (c, p) => {
    let idx = 0
    const pp = {}
    p[k] = v.replace(RE_PLACEHOLDER, (s, key) => {
      const r = fnx[idx](c, pp)['p' + idx]
      idx++
      return r == null ? '' : r
    })
    return p
  }
}
