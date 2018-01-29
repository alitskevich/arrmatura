import { registerType } from './templating.js'
import { assert } from './utils.js'
import { createDOMElement, appendDOMElement, applyDOMAttributes, removeDOMElement } from './utils.dom.js'
/**
 * Bootstraps framework with following params:
 * @param Root - root component
 * @param element - dom element container
 */
export function bootstrap (...types) {
  assert(types.length, 'Root class required')
  types.forEach(registerType)
  return (doc) => {
    const boot = new BootstrapComponent(types[0], doc || window.document)
    boot.render()
  }
}

class BootstrapComponent {
  constructor (ctor, doc) {
    this.$elt = doc.getElementById('app') || doc.body
    this.meta = new Map()
    this.meta.set(0, { ctor, props: {}, subs: [] })
    this.$top = this
  }
  render () {
    renderSubs.call(this, this.meta)
  }
}
// component proxy handler
const methods = {
  update (delta) {
    const $ = this
    if (!delta) {
      return
    }
    // prevent recursive invalidations
    $.$updateDepth = ($.$updateDepth || 0) + 1
    Object.keys(delta).forEach(k => {
      const their = delta[ k ]
      const mine = $[k]
      if (their !== undefined && their !== mine && k[0] !== '$') {
        const setter = this['set' + k[0].toUpperCase() + k.slice(1)]
        if (setter) {
          setter.call($, their)
        } else {
          $[k] = their
        }
      }
    })
    // invalidate
    if (!--$.$updateDepth) {
      renderSubs.call($, $.$TEMPLATE($))
    }
  },
  log (m, ...args) {
    console[('' + m).slice(0, 3) === 'ERR' ? 'error' : 'log'](m, ...args)
  }
}

// component proxy handler
const handler = {
  getPrototypeOf (target) {
    return target
  },
  setPrototypeOf () {},
  isExtensible () {},
  preventExtensions () {},
  getOwnPropertyDescriptor () {},
  defineProperty () {},
  has () {},
  get ($, k, receiver) {
    return methods[k] || $[k]
  },
  set ($, k, v) {
    $[k] = v
    return true
  },
  deleteProperty () {},
  ownKeys () {},
  apply () {},
  construct () {}
}

// done
function done (c) {
  if (c.$isDone) {
    return
  }
  c.$isDone = true
  c.$element = null
  if (c.$defered) {
    c.$defered(c)
    c.$defered = null
  }
  if (c.done) {
    c.done()
  }
  eachChild(c, done)
  c.$children = null
  if (c.$parent) {
    c.$parent.children.delete(c.$key)
    c.$parent = null
  }
}

// children
function addChild ($, uid, c) {
  c.$id = uid
  c.$parent = $
  c.$top = $.top
  if (!$.$children) {
    $.$children = new Map()
  }
  $.$children.set(uid, c)
}
function child ($, k) {
  return $.$children ? $.$children.get(k) : null
}
function eachChild (c, fn) {
  if (c.$children) {
    c.$children.forEach(fn)
  }
}

// dom
class XComponent {
  constructor (tag) {
    this.$tag = tag
  }
  update (delta) {
    this.$props = delta
    this.render()
  }
  render () {
    if (!this.$elt) {
      const parentElt = this.$parent.$elt
      this.$elt = createDOMElement(this.$tag, parentElt._namespaceURI)
      appendDOMElement(this.$elt, parentElt)
    }
    applyDOMAttributes(this.$elt, this.$props)
    renderSubs.call(this, this.$transclude)
  }
  done () {
    removeDOMElement(this.$elt)
    this.$elt = null
  }
}

function renderSubs (subs) {
  if (this.$isDone) {
    return
  }
  // done
  eachChild(this, c => { if (!subs.has(c.uid)) { done(c) } })
  // create
  subs.forEach((m, uid) => {
    if (!child(this, uid)) {
      const Ctor = m.ctor
      const c = Ctor ? new Proxy(Object.assign(new Ctor(), { $elt: this.$elt }), handler) : new XComponent(m.tag)
      addChild(this, uid, c)
    }
  })
  // update
  subs.forEach(({props, subs}, uid) => {
    let c = child(this, uid)
    c.$transclude = subs
    c.update(props)
  })
  // init
  eachChild(this, c => {
    if (!c.$isInited) {
      if (c.init) {
        c.$defered = c.init()
      }
      c.$isInited = true
    }
  })
}
