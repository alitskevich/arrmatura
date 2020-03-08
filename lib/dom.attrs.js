const camelize = (key, sep = '_', jn = ' ') => ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn)

// DOM
const ATTR_SETTERS = {
  '#text': (e, v) => (e.textContent = v == null ? '' : v),
  disabled: (e, v) => (e.disabled = v ? true : null),
  class: (e, v) => {
    e.className = v
  },
  selected: (e, v) => (e.selected = v ? true : null),
  value: (e, v) => (e.value = v == null ? '' : v),
  checked: (e, v) => (e.checked = !!v),
  init: function (e, v) {
    this.init = () => v(e, this)
  },
  data: function (e, v) {
    if (v && e.$dataset) {
      Object.keys(e.$dataset).forEach(k => { if (v[k] == null) { e.dataset[camelize(k, '-', '')] = null } })
      e.$dataset = { ...e.$dataset, ...v }
    } else {
      e.$dataset = v ? { ...v } : (e.$dataset || {})
    }
    if (v) {
      Object.keys(v).forEach(k => { e.dataset[camelize(k, '-', '')] = v[k] })
    }
  },
  click: function (e, v) {
    setAttribute.call(this, 'click:click', !v ? null : (ev) => {
      this.$attributes.click({ ...e.$dataset }, ev)
      return false
    })
  },
  'bubble-click': function (e, v) {
    setAttribute.call(this, 'bubbled-click:click', !v ? null : (ev) => {
      this.$attributes['bubble-click']({ ...e.$dataset }, ev)
      return true
    })
  },
  blur: function (e, v) {
    setAttribute.call(this, 'blur:blur', !v ? null : (ev) => {
      this.$attributes.blur({ ...e.$dataset }, ev)
      return false
    })
  },
  dblclick: function (e, v) {
    setAttribute.call(this, 'dblclick:dblclick', !v ? null : (ev) => {
      this.$attributes.dblclick({ ...e.$dataset }, ev)
      return false
    })
  },
  scroll: function (e, v) {
    setAttribute.call(this, 'scroll:scroll', !v ? null : (ev) => {
      this.$attributes.scroll({ ...e.$dataset }, ev)
      return false
    })
  },
  touchstart: function (e, v) {
    const h = !v ? null : (ev) => {
      this.$attributes.touchstart({
        ...e.$dataset,
        x: ev.pageX || ev.changedTouches[0].screenX,
        y: ev.pageY || ev.changedTouches[0].screenY
      }, ev)
      return false
    }
    setAttribute.call(this, 'touchstart:touchstart', h)
    setAttribute.call(this, 'touchstart:mousedown', h)
  },
  touch: function (e, v) {
    const data = { ...e.$dataset }
    const hs = !v ? null : (ev) => {
      data.active = true
      data.x = ev.pageX || ev.changedTouches[0].screenX
      data.y = ev.pageY || ev.changedTouches[0].screenY
      return false
    }
    setAttribute.call(this, 'touch:touchstart', hs)
    setAttribute.call(this, 'touch:mousedown', hs)
    const h = !v ? () => null : stop => (ev) => {
      if (data.active) {
        data.active = !stop

        data.xx = ev.pageX || ev.changedTouches[0].screenX
        data.yy = ev.pageY || ev.changedTouches[0].screenY
        data.dx = data.xx - data.x
        data.dy = data.yy - data.y
        this.$attributes.touch(data, ev)
      }

      return false
    }
    setAttribute.call(this, 'touch:touchcancel', h(true))
    setAttribute.call(this, 'touch:touchend', h(true))
    setAttribute.call(this, 'touch:mouseup', h(true))
    setAttribute.call(this, 'touch:touchmove', h(false))
    setAttribute.call(this, 'touch:mousemove', h(false))
  },
  error: function (e, v) {
    setAttribute.call(this, 'error:error', !v ? null : (ev) => {
      const fn = this.getAttribute('error')
      fn && fn({ ...e.$dataset }, ev)
      return false
    })
  },
  keypress: function (e, v) {
    setAttribute.call(this, 'keypress:keyup', !v ? null : (ev) => {
      if (ev.keyCode !== 13 && ev.keyCode !== 27) {
        const fn = this.$attributes.keypress
        fn && fn({ value: e.value, ...e.$dataset }, ev)
        setTimeout(() => e.focus(), 0)
      }
      return false
    })
  },
  enter: function (e, v) {
    setAttribute.call(this, 'enter:keyup', !v ? null : (ev) => {
      if (ev.keyCode === 13) {
        this.$attributes.enter({ value: e.value, ...e.$dataset }, ev)
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur()
      }
      return false
    })
  },
  change: function (e, v) {
    setAttribute.call(this, 'change:change', !v ? null : (ev) => {
      this.$attributes.change({ value: e.value, ...e.$dataset }, ev)
      return false
    })
  },
  toggle: function (e, v) {
    setAttribute.call(this, 'toggle:change', !v ? null : (ev) => {
      this.$attributes.toggle({ value: e.checked, ...e.$dataset }, ev)
      return false
    })
  }
}

export function applyAttributes (changes, attrs = this.$attributes || (this.$attributes = {})) {
  const e = this.elt
  changes.forEach(([value, key]) => {
    if (value !== attrs[key]) {
      const setter = ATTR_SETTERS[key]
      if (setter) {
        setter.call(this, e, value)
      } else {
        setAttribute.call(this, key, value)
      }
    }
    attrs[key] = value
  })
}

export function cleanupAttributes () {
  this.$attributes = null
}

function setAttribute (key, value) {
  if (value != null) {
    if (typeof value === 'function') {
      const fnValue = (...args) => { if (!this.isDone) { value(...args) } }
      if (!this.listeners) {
        this.listeners = new Map()
      }
      if (!this.listeners.has(key)) {
        const [akey, ekey = akey] = key.split(':')
        this.elt.addEventListener(ekey, fnValue, false)
        this.listeners.set(key, fnValue)
      }
    } else {
      this.elt.setAttribute(key, value)
    }
  } else {
    if (this.listeners && this.listeners.has(key)) {
      const [akey, ekey = akey] = key.split(':')
      this.elt.removeEventListener(ekey, this.listeners.get(key))
      this.listeners.delete(key)
    } else {
      this.elt.removeAttribute(key)
    }
  }
}
