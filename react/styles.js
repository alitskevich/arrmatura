import { StyleSheet } from 'react-native'

const cache = new Map()
const styleCache = new Map()

const compile = Object.memoize(obj => StyleSheet.create({ obj }).obj, obj => JSON.stringify(obj))

const camelize = (key, sep = '-', jn = '') => ('' + key).split(sep).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join(jn)

export const parseStyle = s => {
  if (!s) return null
  if (typeof s !== 'string') return s
  if (styleCache.has(s)) return styleCache.get(s)

  const result = s
    .split(';')
    .map(ss => ss.split(':'))
    .filter(e => e[0])
    .reduce((r, [k, v = '']) => { r[camelize(k.trim())] = Object.parseValue(v.trim()); return r }, {})

  styleCache.set(s, result)
  return result
}

export const createClassResolver = input => {
  const all = {}

  const load = (node, key) => {
    const bundle = {}
    Object.entries(node).forEach(([k, v]) => {
      if (k[0] !== '$' && typeof v === 'object') {
        load(v, key + '-' + k)
      } else {
        bundle[k] = v
      }
    })
    all[key] = bundle
  }

  Object.entries(input).forEach(([k, v]) => load(v, k))

  return (classes, inlineStyle = {}) => {
    const key = classes + JSON.stringify(inlineStyle)
    if (cache.has(key)) return cache.get(key)

    const bundle = classes.split(' ').reduce((r, s) => Object.assign(r, all[s]), parseStyle(inlineStyle))
    const result = { props: {}, rawStyle: {} }
    Object.entries(bundle).forEach(([k, v]) => {
      if (k[0] === '$') {
        result.props[k.slice(1)] = v
      } else if (k === 'tag') {
        result.tag = v
      } else {
        result.rawStyle[k] = v
      }
    })
    result.style = compile(result.rawStyle)

    cache.set(key, result)
    return result
  }
}
