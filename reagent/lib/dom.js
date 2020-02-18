import { render } from './render.js';

const camelize = (key, sep = '_', jn = ' ') => ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn);

// DOM
const DOM_SETTERS = {
  '#text': (e, v) => (e.textContent = v == null ? '' : v),
  disabled: (e, v) => (e.disabled = v ? true : null),
  $owner: (e, v) => {
  },
  class: (e, v) => {
    e.className = v;
  },
  style: (e, v) => {
    e.style = v.split(';').reduce((r, e) => { const [key, val] = e.split(':'); r[camelize(key, '-', '')] = val; return r; }, {});
  },
  selected: (e, v) => (e.selected = v ? true : null),
  value: (e, v) => (e.value = v == null ? '' : v),
  checked: (e, v) => (e.checked = !!v),
  init: function (e, v) {
    this.init = () => v(e, this)
  },
  data: function (e, v) {
    if (v && e.$dataset) {
      Object.keys(e.$dataset).forEach(k => { if (!v[k]) { e.dataset[camelize(k, '-', '')] = null } });
    }
    e.$dataset = { ...v };
    if (v) {
      Object.keys(v).forEach(k => { e.dataset[camelize(k, '-', '')] = v[k]; });
    }
  },
  click: function (e, v) {
    this.setAttribute('click:click', !v ? null : (ev) => {
      this.$attributes.click({ ...e.$dataset }, ev);
      return false;
    });
  },
  'bubble-click': function (e, v) {
    this.setAttribute('bubbled-click:click', !v ? null : (ev) => {
      this.$attributes['bubble-click']({ ...e.$dataset }, ev);
      return true;
    });
  },
  blur: function (e, v) {
    this.setAttribute('blur:blur', !v ? null : (ev) => {
      this.$attributes.blur({ ...e.$dataset }, ev);
      return false;
    });
  },
  dblclick: function (e, v) {
    this.setAttribute('dblclick:dblclick', !v ? null : (ev) => {
      this.$attributes.dblclick({ ...e.$dataset }, ev);
      return false;
    });
  },
  scroll: function (e, v) {
    this.setAttribute('scroll:scroll', !v ? null : (ev) => {
      this.$attributes.scroll({ ...e.$dataset }, ev);
      return false;
    });
  },
  touchstart: function (e, v) {
    const h = !v ? null : (ev) => {
      this.$attributes.touchstart({
        ...e.$dataset,
        x: ev.pageX || ev.changedTouches[0].screenX,
        y: ev.pageY || ev.changedTouches[0].screenY
      }, ev);
      return false;
    }
    this.setAttribute('touchstart:touchstart', h);
    this.setAttribute('touchstart:mousedown', h);
  },
  touch: function (e, v) {
    const data = { ...e.$dataset }
    const hs = !v ? null : (ev) => {
      data.active = true;
      data.x = ev.pageX || ev.changedTouches[0].screenX;
      data.y = ev.pageY || ev.changedTouches[0].screenY;
      return false;
    }
    this.setAttribute('touch:touchstart', hs);
    this.setAttribute('touch:mousedown', hs);
    const h = !v ? () => null : stop => (ev) => {
      if (data.active) {
        data.active = !stop

        data.xx = ev.pageX || ev.changedTouches[0].screenX;
        data.yy = ev.pageY || ev.changedTouches[0].screenY;
        data.dx = data.xx - data.x;
        data.dy = data.yy - data.y;
        this.$attributes.touch(data, ev);
      }

      return false;
    }
    this.setAttribute('touch:touchcancel', h(true));
    this.setAttribute('touch:touchend', h(true));
    this.setAttribute('touch:mouseup', h(true));
    this.setAttribute('touch:touchmove', h(false));
    this.setAttribute('touch:mousemove', h(false));
  },
  error: function (e, v) {
    this.setAttribute('error:error', !v ? null : (ev) => {
      const fn = this.getAttribute('error');
      fn && fn({ ...e.$dataset }, ev);
      return false;
    });
  },
  keypress: function (e, v) {
    this.setAttribute('keypress:keyup', !v ? null : (ev) => {
      if (ev.keyCode !== 13 && ev.keyCode !== 27) {
        const fn = this.$attributes.keypress;
        fn && fn({ value: e.value, ...e.$dataset }, ev);
        setTimeout(() => e.focus(), 0)
      }
      return false;
    });
  },
  enter: function (e, v) {
    this.setAttribute('enter:keyup', !v ? null : (ev) => {
      if (ev.keyCode === 13) {
        this.$attributes.enter({ value: e.value, ...e.$dataset }, ev);
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }
      return false;
    });
  },
  change: function (e, v) {
    this.setAttribute('change:change', !v ? null : (ev) => {
      this.$attributes.change({ value: e.value, ...e.$dataset }, ev);
      return false;
    });
  },
  toggle: function (e, v) {
    this.setAttribute('toggle:change', !v ? null : (ev) => {
      this.$attributes.toggle({ value: e.checked, ...e.$dataset }, ev);
      return false;
    });
  }
};

const DOM_VALUE_COMPARATORS = {
  value: (e, their) => (e.value === their),
  _: (_, their, mine) => their === mine
};

class Element {
  constructor(attrs, $) {
    this.elt = $.elt = $.tag === '#text' ? document.createTextNode('') : document.createElement($.tag);
    this.applyAttributes(attrs);
  }
  done() {
    const e = this.elt;
    // const lstnrs = this.listeners;
    // if (lstnrs) {
    //   Object.keys(lstnrs).forEach((fn, key) => {
    //     const [akey, ekey = akey] = key.split(':');
    //     e.removeEventListener(ekey, fn);
    //   });
    //   this.listeners = null;
    // }
        if (this.prevElt) {
      this.prevElt.nextElt = this.nextElt;
    }
    const p = e.parentElement;
    if (p) {
      p.removeChild(e);
    }
    this.elt = this.$attributes = null;
  }
  set(delta) {
    this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }
  render($) {
    const e = this.elt;
    const p = $.ctx;
    if ($.content) {
      e.cursor = null;
      render($, $.content);
      e.cursor = null;
    }
    if (this.delta) {
      this.applyAttributes(this.delta);
      this.delta = null;
    }
    const before = p.cursor ? p.cursor.nextSibling : p.firstChild;
    if (!before) {
      if (p !== e.parentElement) {
        p.appendChild(e);
      }
    } else if (e !== before) {
      p.insertBefore(e, before);
    }
    p.cursor = e;
  }
  applyAttributes(theirs = {}, mines = this.$attributes || {}) {
    const e = this.elt;
    for (let key in theirs) {
      if (Object.prototype.hasOwnProperty.call(theirs, key) && !(DOM_VALUE_COMPARATORS[key] || DOM_VALUE_COMPARATORS._)(e, theirs[key], mines[key])) {
        const value = theirs[key];
        const setter = DOM_SETTERS[key];
        if (setter) {
          setter.call(this, e, value);
        } else {
          this.setAttribute(key, value);
        }
      }
    }
    this.$attributes = theirs;
  }
  getAttribute(key, def) {
    return (this.$attributes && this.$attributes[key]) || def
  }
  setAttribute(key, value) {
    if (value != null) {
      if (typeof value === 'function') {
        const fnValue = (...args) => { if (!this.isDone) { value(...args) } }
        if (!this.listeners) {
          this.listeners = new Map();
        }
        if (!this.listeners.has(key)) {
          const [akey, ekey = akey] = key.split(':')
          this.elt.addEventListener(ekey, fnValue, false);
          this.listeners.set(key, fnValue);
        }
      } else {
        this.elt.setAttribute(key, value);
      }
    } else {
      if (this.listeners && this.listeners.has(key)) {
        const [akey, ekey = akey] = key.split(':')
        this.elt.removeEventListener(ekey, this.listeners.get(key));
        this.listeners.delete(key);
      } else {
        this.elt.removeAttribute(key);
      }
    }
  }
}
export const applyDomAttrs = (a) => {
  const r = {};
  if (a) {
    for (let key in a) {
      const value = a[key];
      const setter = DOM_SETTERS[key];
      if (setter) {
        setter.call(r, r, value);
      } else {
        r[key] = value;
      }
    }
  }
  return r;
}