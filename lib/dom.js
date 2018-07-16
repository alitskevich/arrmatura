// ==========
// Virtual DOM Element
// ----------
const values = {
  'true': true,
  'false': false,
  'null': null
}
const doc = window.document

const setters = {
  '#text': (e, k, v) => (e.textContent = v == null ? '' : v),
  disabled: (e, k, v) => (e[k] = v ? true : null),
  class: (e, k, v) => {
    v = ('' + v).replace(/([a-z0-9]+):([a-z0-9.]*)(==([a-z0-9.]*))?\b/g, (_, cl, fl, hasEq, eq) => {
      const disabled = hasEq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1
      return disabled ? '' : cl
    })
    e.setAttribute(k, v)
  },
  selected: (e, k, v) => (e[k] = v ? true : null),
  value: (e, k, v) => (e[k] = v == null ? '' : v),
  checked: (e, k, v) => (e[k] = !!v),
  data: (e, k, v) => { e.$dataset = Object.assign({}, v) },
  'data*': (e, k, v) => { (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in values ? values[v] : v },
  'enter': function (e, key, v) {
    this.setListener('keyup', !v ? null : (ev) => {
      if (ev.keyCode === 13) {
        this.$attributes[key]({ value: e.value, ...e.$dataset }, ev)
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur()
      }
      return false
    })
  },
  'toggle': function (e, key, v) {
    this.setListener('change', !v ? null : (ev) => {
      this.$attributes[key]({ value: e.checked, ...e.$dataset }, ev)
      return false
    })
  }
}
const comparators = {
  value: (e, their, _) => (e.value === their),
  data: (e, their, _) => (e.$dataset === their),
  _: (_, their, mine) => their === mine
}
export class Elmnt {
  constructor (tag) {
    this.$ = tag === '#text' ? doc.createTextNode('') : doc.createElement(tag)
    this.$attributes = {}
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
    this.$ = this.$attributes = null
  }
  assign (delta) {
    if (this.isDone) {
      return
    }
    const e = this.$
    const p = this.parentElt
    if (this.transclude) {
      e.cursor = null
      Elmnt.render(this, this.transclude, this.$)
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
      if (theirs.hasOwnProperty(key) && !(comparators[key] || comparators._)(e, theirs[key], mines[key])) {
        const value = theirs[key]
        const prefixP = key.indexOf('-')
        const setter = setters[prefixP === -1 ? key : key.slice(0, prefixP) + '*']
        if (setter) {
          setter.call(this, e, key, value)
        } else {
          if (typeof value === 'function' || (this.listeners && this.listeners.has(key))) {
            const T = this
            this.setListener(key, !value ? null : (ev) => {
              T.$attributes[key]({value: e.value, ...e.$dataset}, ev)
              return false
            })
          } else {
            this.setAttribute(key, value)
          }
        }
      }
    }
    if (e.$dataset) {
      Object.keys(e.$dataset).forEach(k => { e.dataset[k] = e.$dataset[k] })
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
