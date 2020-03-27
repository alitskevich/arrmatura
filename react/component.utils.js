let COUNTER = 1
const fnId = e => e
export const nextId = (p = '') => p + (COUNTER++)
export const applyValue = (value, fn = fnId) => value && value.then ? value.then(fn) : fn(value)

export const methodName = (x, pre = '') => {
  if (!x) { return pre }
  const s = `${x}`
  return pre + s[0].toUpperCase() + s.slice(1)
}

export const upAsync = ($, promise, key) => {
  const racer = $.raceCondition('set:' + (key || 'up'))
  const up = r => racer(() => $.up(r))
  if (key && key !== '...') {
    const akey = key.replace('Promise', '')
    promise.then(val => up({ [akey + 'Error']: null, [akey]: val }), error => up({ [akey + 'Error']: error }))
  } else {
    promise.then(up, error => up({ error }))
  }
  return promise
}

export const propGetter = ($, key) => {
  const map = $.$propFnMap || ($.$propFnMap = {})
  let fn = map[key]
  if (fn) { return fn }

  const instant = $.impl.constructor.prototype[key]
  if (instant && (typeof instant === 'function')) {
    fn = (...args) => instant.apply($.impl, args)
  } else {
    const [pk, ...path] = key.split('.')
    const gettr = $.impl[methodName(pk, 'get')]

    const fn0 = gettr
      ? () => gettr.call($.impl)
      : () => $.impl[pk]

    fn = !path.length
      ? fn0
      : () => path.reduce((r, p) => (r && (p in r) ? r[p] : undefined), fn0())
  }

  map[key] = fn

  return fn
}

export const res = (app, key) => {
  const [id, ...deep] = key.split('.')
  const target = id === 'app' ? app : app.resources[id]
  if (!target || deep.length === 0) {
    return target
  }
  if (deep.length === 1) {
    return target[deep[0]]
  }
  return deep.reduce((r, k) => r ? r[k] : null, target)
}

export const pipes = (app, key) => {
  const [id, ...deep] = key.split('.')
  const target = app.pipes && app.pipes[id]
  if (!target || deep.length === 0) {
    return target
  }
  if (deep.length === 1) {
    return target[deep[0]]
  }
  return deep.reduce((r, k) => r ? r[k] : null, target)
}

const stringifyAttrs = (attrs) => {
  if (!attrs) {
    return ''
  }
  const r = []
  Object.entries(attrs).forEach(([k, v]) => {
    if (v && k !== '#text') {
      r.push(' ' + k + '="' + (v) + '"')
    }
  })
  return r.join('')
}

export function stringifyComponent ({ uid, tag, state, container, children = new Map() }, tab = '') {
  const sattrs = stringifyAttrs(state)
  const ssubs = [...children.values()].map(c => stringifyComponent(c, `  ${tab}`)).join('\n')
  const text = state && state['#text']
  const stext = text ? `  ${tab}${text}` : ''
  if (tag === '#text') {
    return stext.trim()
  }
  return `${tab}<${tag}#${uid} ${container ? container.uid : '-'}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}#${uid}>`)
}
