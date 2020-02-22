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
  autofocus: (e, v) => {
    e.autoFocus = v==='true';
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
  enter: function (e, fn) {
    e['onKeyUp'] = !fn ? null : (f => ev => {
      if (ev.keyCode === 13) {
        f({ value: e.value, ...e.$dataset }, ev);
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
       ev.target.blur();
      }
      return false;
    })(wrapHook(this, fn));
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

const wrapHook = ($, fn) => (...args) => { if (!$.isDone) { fn.apply($,args) } }

export const applyDomAttrs = (origin, a) => {
  const r = {};
  if (a) {
    for (let key in a) {
      const value = a[key];
      const setter = DOM_SETTERS[key];
      if (setter) {
        setter.call(origin, r, value);
      } else {
        r[key] = value;
      }
    }
  }
  return r;
}