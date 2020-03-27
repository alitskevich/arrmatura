Array.EMPTY = []
Object.assign(Function, {
  ID: x => x,
  next: (COUNTER => (p = '') => p + (COUNTER++))(1),
  // system
  throw: (error, ErrorType = Error) => { throw typeof error === 'string' ? new ErrorType(error) : error }
})

Object.dig = (o, steps) => (steps.reduce ? steps : steps.split('.')).reduce((r, e) => r ? r[e] : undefined, o)

Object.parseValue = (map => value => {
  if (value && '1234567890+-'.includes(value[0]) && value.length <= 17) {
    const num = +value
    return isNaN(num) ? value : num
  }
  return value in map ? map[value] : value
})({
  true: true,
  false: false,
  null: null,
  undefined
})

Object.memoize = (factory, keyer = e => e) => {
  const memo = new Map()
  return (x) => {
    const key = keyer(x)
    if (memo.has(key)) return memo.get(key)
    const y = factory(x)
    memo.set(key, y)
    return y
  }
}

export const REGISTRY = new Map()

export const hasSlot = (c, id) => {
  let r = false
  const { tag, content } = c.container
  if (!content) return r
  if (id && id !== 'default') {
    content.forEach((e) => { r = r || (e.tag === tag + ':' + id) })
  } else {
    content.forEach((e) => { r = r || (e.tag.slice(0, tag.length + 1) !== tag + ':') })
  }
  return r
}

export const setKeyVal = (acc, k, val) => {
  if (k.slice(0, 5) === 'data-') {
    acc.data = acc.data ? { ...acc.data, [k.slice(5)]: val } : { [k.slice(5)]: val }
  } else {
    acc[k] = val
  }
}
