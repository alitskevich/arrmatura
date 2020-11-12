
function capitalize (x) {
  if (!x) {
    return x
  }
  const s = `${x}`

  return s[0].toUpperCase() + s.slice(1)
}
function camelize (s, sep = '_') {
  return ((s && s.length && s.split(sep).map((t, i) => (i ? capitalize(t) : t)).join('')) || '')
}

/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */
export default {
  format: (template, params) => {
    return `${template || ''}`.replace(/\{([\S]+)\}/i, (_, key) => ((params && params[key]) != null) ? params[key] : '')
  },
  wrap: (x, template) => {
    return !x ? '' : `${template || '*'}`.replace('*', x)
  },

  tail: (x, sep = '.') => {
    if (!x) {
      return ''
    }
    const pos = x.lastIndexOf(sep)

    return pos === -1 ? x : x.slice(pos + sep.length)
  },

  lastTail: (key, sep = '.') => ('' + key).split(sep).slice(-1)[0],

  head: (x, sep = '.') => {
    if (!x) {
      return ''
    }
    const pos = x.indexOf(sep)

    return pos === -1 ? x : x.slice(0, pos)
  },

  pad: (x, size = 2, fill = '0') => {
    let s = String(x)
    while (s.length < (size)) { s = `${fill}${s}` }
    return s
  },
  capitalize: capitalize,
  camelize: camelize,
  mirror: (x) => (x || '').split('').reduce((r, c) => (c + r), ''),
  snakeCase: (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2'),
  proper: (s) => capitalize(camelize(s)),
  upper: s => ('' + s).toUpperCase()
}
