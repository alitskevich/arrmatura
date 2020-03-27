const camelize = (key, sep = '-', jn = '') => ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn)

// DOM
const ATTR_SETTERS = {
  '#text': (e, v) => (e.children = v == null ? '' : v),
  disabled: (e, v) => (e.disabled = v ? true : null),
  $: () => {
  },
  textContent: () => {
  },
  class: (state, v) => {
    // state.className = v
  },
  style: (state, v) => {
    state.style = v.split ? v.split(';')
      .map(ss => ss.split(':'))
      .filter(e => e[0])
      .reduce((r, [k, v = '']) => { r[camelize(k.trim())] = Object.parseValue(v.trim()); return r }, {}) : v
  },
  for: (state, v) => {
    state.htmlFor = v
  },
  autofocus: (state, v) => {
    state.autoFocus = v === 'true'
  },
  tabindex: (state, v) => {
    state.tabIndex = v
  },
  selected: (e, v) => (e.selected = v ? true : null),
  value: (e, v) => (e.value = v == null ? '' : v),
  checked: (e, v) => (e.checked = !!v),
  init: function (e, v) {
    this.init = () => v(e, this)
  },
  data: function (state, v) {
    if (v && state.dataset) {
      // Object.keys(e.dataset).forEach(k => { if (v[k] == null) { e.dataset[camelize(k, '-', '')] = null } })
      state.dataset = { ...state.dataset, ...v }
    } else {
      state.dataset = v ? { ...v } : (state.dataset || {})
    }
    if (v) {
      // Object.keys(v).forEach(k => { e.dataset[camelize(k, '-', '')] = v[k] })
    }
  },
  click: function (state, v) {
    setAttribute.call(this, 'click:onPress', !v ? null : (ev) => {
      v({ ...state.dataset }, ev)
      return false
    })
  },
  'bubble-click': function (state, v) {
    setAttribute.call(this, 'bubbled-click:click', !v ? null : (ev) => {
      this.state['bubble-click']({ ...state.dataset }, ev)
      return true
    })
  },
  blur: function (state, v) {
    setAttribute.call(this, 'blur:onBlur', !v ? null : (ev) => {
      v({ ...state.dataset }, ev)
      return false
    })
  },
  dblclick: function (state, v) {
    setAttribute.call(this, 'dblclick:onDoubleClick', !v ? null : (ev) => {
      v({ ...state.dataset }, ev)
      return false
    })
  },
  scroll: function (state, v) {
    setAttribute.call(this, 'scroll:scroll', !v ? null : (ev) => {
      v({ ...state.dataset }, ev)
      return false
    })
  },
  touchstart: function (_e, v) {
    const h = !v ? null : (ev) => {
      const e = ev.target
      v({
        ...e.dataset,
        x: ev.pageX || ev.changedTouches[0].screenX,
        y: ev.pageY || ev.changedTouches[0].screenY
      }, ev)
      return false
    }
    setAttribute.call(this, 'touchstart:touchstart', h)
    setAttribute.call(this, 'touchstart:mousedown', h)
  },
  touch: function (e, v) {
    const data = { ...e.dataset }
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
        this.state.touch(data, ev)
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
      const e = ev.target
      v({ ...e.dataset }, ev)
      return false
    })
  },
  keypress: function (state, v) {
    setAttribute.call(this, 'keypress:onKeyPress', !v ? null : (ev) => {
      const e = ev.target
      if (ev.keyCode !== 13 && ev.keyCode !== 27) {
        v({ value: e.value, ...state.dataset }, ev)
        setTimeout(() => e.focus(), 0)
      }
      return false
    })
  },
  enter: function (state, v) {
    setAttribute.call(this, 'enter:onKeyPress', !v ? null : (ev) => {
      const e = ev.target
      if (ev.key === 'Enter') {
        v({ value: e.value, ...state.dataset }, ev)
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur()
      }
      return false
    })
  },
  change: function (state, v) {
    setAttribute.call(this, 'change:onChange', !v ? null : (ev) => {
      const e = ev.target
      v({ value: e.value, ...state.dataset }, ev)
      return false
    })
  },
  toggle: function (state, v) {
    setAttribute.call(this, 'toggle:onChange', !v ? null : (ev) => {
      const e = ev.target
      v({ value: e.checked, ...state.dataset }, ev)
      return false
    })
  }
}

function setAttribute (key, value) {
  if (value != null) {
    if (typeof value === 'function') {
      const fnValue = (...args) => { if (!this.isDone) { value(...args) } }
      const listeners = this.listeners || (this.listeners = {})
      const [akey, ekey = akey] = key.split(':')
      if (!listeners[akey]) {
        this.listeners[akey] = fnValue
        this.impl[ekey] = fnValue
      }
    } else {
      this.impl[key] = value
    }
  } else {
    const [akey, ekey = akey] = key.split(':')
    if (this.listeners && this.listeners[akey]) {
      delete this.listeners[akey]
      delete this.impl[ekey]
    } else {
      delete this.impl[key]
    }
  }
}

export function adaptAttributes (changes, state = this.impl || (this.impl = {})) {
  Object.entries(changes).forEach(([key, value]) => {
    if (value !== state[key]) {
      const setter = ATTR_SETTERS[key]
      if (setter) {
        setter.call(this, state, value)
      } else {
        setAttribute.call(this, key, value)
      }
    }
  })

  return this.impl
}
export function normalizeProps (props, state) {
  Object.entries(props).forEach(([key, value]) => {
    const setter = ATTR_SETTERS[key]
    if (setter) {
      setter.call(this, state, value)
    } else {
      setAttribute.call(this, key, value)
    }
  })

  return this.impl
}
