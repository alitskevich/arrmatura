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

  const impl = $.impl
  const instant = impl[key]
  if (instant && (typeof instant === 'function')) {
    const bound = instant.bind(impl)
    fn = () => bound
  } else {
    const [pk, ...path] = key.split('.')
    const gettr = impl[methodName(pk, 'get')]

    const fn0 = gettr
      ? () => gettr.call(impl)
      : () => impl[pk]

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
