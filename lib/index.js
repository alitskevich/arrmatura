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
    fetch (key, target, cb) {
      cb(new Error('app.fetch() is not defined.'))
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
  const compiled = compile(parseXML(text, name))
  ctor.$TEMPLATE = $ => resolve(new Map(), $, compiled)
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
// Virtual DOM Element
// ----------
const values = {
  'true': true,
  'false': false,
  'null': null
}

const setters = {
  '#text': (e, k, v) => (e.textContent = v == null ? '' : v),
  disabled: (e, k, v) => (e[k] = v ? true : null),
  class: (e, k, v) => {
    v = ('' + v).replace(/([a-z0-9]+):([a-z0-9.]*)(=([a-z0-9.]*))?\b/g, (_, cl, fl, hasEq, eq) => {
      const disabled = hasEq ? fl !== eq : ['', '0', 'false', 'off'].indexOf(fl) > -1
      return disabled ? '' : cl
    })
    e.setAttribute(k, v)
  },
  selected: (e, k, v) => (e[k] = v ? true : null),
  value: (e, k, v) => (e[k] = v),
  checked: (e, k, v) => (e[k] = !!v),
  data: (e, k, v) => { e.$dataset = Object.assign({}, v) },
  'data*': (e, k, v) => { (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in values ? values[v] : v },
  'enter': function (e, key, v) {
    this.setListener('keyup', !v ? null : (ev) => {
      if (ev.keyCode === 13) {
        this.$attributes[key].call(this.$owner.$, { value: e.value, ...e.$dataset }, ev)
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur()
      }
      return false
    })
  },
  'toggle': function (e, key, v) {
    this.setListener('change', !v ? null : (ev) => {
      this.$attributes[key].call(this.$owner.$, { value: e.checked, ...e.$dataset }, ev)
      return false
    })
  }
}

class Elmnt {
  constructor (m, parentElt) {
    this.$ = m.tag === '#text' ? doc.createTextNode('') : doc.createElement(m.tag)
    this.$attributes = {}
    this.$owner = m.owner
  }
  init () {
  }
  done () {
    const e = this.$
    const lstnrs = this.$listeners
    if (lstnrs) {
      Object.keys(lstnrs).forEach(k => e.removeEventListener(k, lstnrs[k]))
      this.$listeners = null
    }
    const p = e.parentElement
    if (p) {
      p.removeChild(e)
    }
    this.$elt = this.$attributes = this.$owner = this.parentElt = null
  }
  assign (delta) {
    if (this.isDone) {
      return
    }
    const e = this.$
    const p = this.parentElt
    if (this.transclude) {
      e.cursor = null
      render(this, this.transclude, e)
      e.cursor = null
    }
    this.applyAttributes(delta)
    const before = p.cursor ? p.cursor.nextSibling : p.firstChild
    if (!before) {
      p.appendChild(e)
    } else if (e !== before) {
      p.insertBefore(e, before)
    }
    p.cursor = e
  }
  applyAttributes (theirs) {
    const e = this.$
    const mines = this.$attributes
    for (let key in mines) {
      if (mines.hasOwnProperty(key) && theirs[key] === undefined) {
        theirs[key] = null
      }
    }
    for (let key in theirs) {
      if (theirs.hasOwnProperty(key) && theirs[key] !== mines[key]) {
        const value = theirs[key]
        const prefixP = key.indexOf('-')
        const setter = setters[prefixP === -1 ? key : key.slice(0, prefixP) + '*']
        if (setter) {
          setter.call(this, e, key, value)
        } else {
          if (typeof value === 'function' || (this.listeners && this.listeners.has(key))) {
            const T = this
            this.setListener(key, !value ? null : (ev) => {
              T.$attributes[key].call(T.$owner.$, {value: e.value, ...e.$dataset}, ev)
              return false
            })
          } else {
            this.setAttribute(key, value)
          }
        }
      }
    }
    this.$attributes = theirs
  }
  setAttribute (key, value) {
    if (value != null) {
      this.$.setAttribute(key, value)
    } else {
      this.$.removeAttribute(key)
    }
  }
  setListener (key, fn) {
    if (fn) {
      if (!this.listeners) {
        this.listeners = new Map()
      }
      if (!this.listeners.has(key)) {
        this.$.addEventListener(key, fn, false)
        this.listeners.set(key, fn)
      }
    } else {
      if (this.listeners && this.listeners.has(key)) {
        this.$.removeEventListener(key, this.listeners.get(key))
        this.listeners.delete(key)
      }
    }
  }
}

// ==========
// Component
// ----------
class Component {
  constructor (m, Ctor) {
    this.$ = new Ctor()
    this.$.assign = (d) => this.assign(d)
    this.$.defer = (fn) => {
      if (fn) {
        (this.defered || (this.defered = [])).push(fn)
      }
    }
  }
  init () {
    if (this.$.init) {
      this.$.init(this)
    }
  }
  done () {
    if (this.defered) {
      this.defered.forEach(f => f.call(this, this))
      delete this.defered
    }
  }
  assign (delta) {
    if (!delta || this.isDone) {
      return
    }
    // prevent recursive invalidations
    this.$assignDepth = (this.$assignDepth || 0) + 1
    if (delta._) {
      delta = {...delta._, ...delta, _: undefined}
    }
    // iterate payload
    for (let k of Object.keys(delta)) {
      const their = delta[k]
      const mine = this.$[k]
      if (k[0] === '$') {
        their.call(this)
        continue
      }
      if (their !== undefined && (their !== mine || (typeof their === 'object' && their !== null))) {
        const setter = this.$['set' + k[0].toUpperCase() + k.slice(1)]
        if (setter) {
          setter.call(this.$, their)
        } else {
          this.$[k] = their
        }
      }
    }
    // prevent recursive invalidations
    --this.$assignDepth
    if (this.$assignDepth === 0) {
      this.parentElt.cursor = this.prevElt
      render(this, this.$.constructor.$TEMPLATE(this), this.parentElt)
    }
  }
  get (k) {
    let $ = this.$
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
        const c = componentCtor ? new Component(m, componentCtor) : new Elmnt(m)
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

// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

function compileType (tag) {
  const dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null
  return dtype ? (dtype === 'fragment' || dtype === 'transclude' ? c => dtype : c => c.get(dtype)) : c => tag
}

function compile ({ tag, attrs, uid, subs }) {
  const r = { uid, type: compileType(tag), props: compileAttrs(attrs), key: attrs.get('ui:key') }

  const aIf = attrs.get('ui:if')
  if (aIf) {
    const neg = aIf[0] === '!' ? aIf.slice(1) : null
    r.iff = neg ? c => !c.get(neg) : c => !!c.get(aIf)
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
    const dataGetter = dataId[0] === ':' ? c => c.app.resource(dataId.slice(1)) : (c) => c.get(dataId)
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
      const ref = k + '_url'
      const fctr = compileAttrValue(ref, v.slice(2).trim())
      return r.push((c, p) => {
        // custom assign
        p['$' + k] = function () {
          const old = this.$[ref]
          const url = fctr(c, {})[ref]
          if (url !== old) {
            const ckey = k + '_counter'
            const cbusy = k + '_busy'
            const cerror = k + '_error'
            const counter = (this.$[ckey] || 0) + 1
            const cb = (error, data) => {
              if (counter === this.$[ckey]) {
                this.assign({[k]: data, [ref]: url, [cbusy]: false, [cerror]: error})
              }
            }
            this.assign({[ref]: url, [cbusy]: true, [ckey]: counter, [cerror]: null})
            setTimeout(() => this.app.fetch(url, this.$, cb), 10)
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
    r.push((c, p) => { fn(c, p); return p })
  }
  return r
}

function compilePlaceholder (k, v) {
  const keys = v.split('|')
  const key = keys[0]
  if (keys.length === 1) {
    return (c, p) => { p[k] = c.get(key); return p }
  } else {
    const fnx = keys.slice(1).map(k => k.trim())
    return (c, p) => { p[k] = fnx.reduce((r, k) => c.app.pipes[k] ? c.app.pipes[k](r) : r, c.get(key)); return p }
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

// ==========
// XML Parse for templates. XML -> NodeTree
// ----------

export const parseXML = (function () {
  const RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g
  const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g
  const RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)="([^"]*)"/g
  const RE_ESCAPE_XML_ENTITY = /["'&<>]/g
  const RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+="[^"]*")*)\s*(\/?)>/g

  const SUBST_XML_ENTITY = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: `"`,
    nbsp: ' '
  }
  const ESCAPE_XML_ENTITY = {
    34: '&quot;',
    38: '&amp;',
    39: '&#39;',
    60: '&lt;',
    62: '&gt;'
  }
  const FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)]
  const FN_XML_ENTITY = function (_) {
    const s = _.substring(1, _.length - 1)
    return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : (SUBST_XML_ENTITY[s] || ' ')
  }
  const decodeXmlEntities = (s = '') => s.replace(RE_XML_ENTITY, FN_XML_ENTITY)
  const escapeXml = (s) => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY)

  let UID = 1

  const parseAttrs = (s) => {
    const r = new Map()
    if (!s) {
      return r
    }
    while (1) {
      let e = RE_ATTRS.exec(s)
      if (!e) {
        return r
      }
      r.set(e[1], decodeXmlEntities(e[2]))
    }
  }
  const stringifyAttrs = (attrs) => {
    if (!attrs || !attrs.size) {
      return ''
    }
    const r = []
    attrs.forEach((v, k) => {
      if (v && k !== '#text') {
        r.push(' ' + k + '="' + escapeXml(v) + '"')
      }
    })
    return r.join('')
  }

  class Node {
    constructor (tag, attrs) {
      this.uid = UID++
      this.tag = tag || ''
      this.attrs = attrs || new Map()
      this.subs = []
    }
    getChild (index) {
      return this.subs[index]
    }
    setText (text) {
      this.attrs.set('#text', text)
    }
    addChild (tag, attrs) {
      const e = new Node(tag, attrs)
      this.subs.push(e)
      return e
    }
    toString () {
      return stringify(this, '')
    }
  }

  function stringify ({ tag, attrs, subs }, tab) {
    const sattrs = stringifyAttrs(attrs)
    const ssubs = subs.map(c => stringify(c, `  ${tab}`)).join('\n')
    const text = attrs.get('#text')
    const stext = text ? `  ${tab}${escapeXml(text)}` : ''
    return `${tab}<${tag}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}>`)
  }

  return (_s, key) => {
    const s = ('' + _s).trim().replace(RE_XML_COMMENT, '')
    const ctx = [new Node()]
    let lastIndex = 0
    // head text omitted
    while (1) {
      let e = RE_XML_TAG.exec(s)
      if (!e) {
        break
      }
      // preceding text
      const text = e.index && s.slice(lastIndex, e.index)
      if (text && text.trim()) {
        ctx[0].addChild('#text').setText(text)
      }
      // closing tag
      if (e[2]) {
        if (ctx[0].tag !== e[3]) {
          throw new Error(
            (key || '') + ' XML Parse closing tag does not match at: ' + e.index +
            ' near ' + e.input.slice(Math.max(e.index - 15, 0), Math.min(e.index + 15, e.input.length)))
        }
        ctx.shift()
      } else {
        const elt = ctx[0].addChild(e[3], parseAttrs(e[4]))
        // not single tag
        if (!e[5]) {
          ctx.unshift(elt)
          if (ctx.length === 1) {
            throw new Error('Parse error at: ' + e[0])
          }
        }
      }
      // up past index
      lastIndex = RE_XML_TAG.lastIndex
    }
    // tail text omitted
    return ctx[0].getChild(0)
  }
})()
