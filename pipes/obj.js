Object.EMPTY = Object.freeze({})
export default {
/**
 * Checks if argument is empty .
 */
  isEmpty  (x) {
    if (!x) {
      return true
    }
    if (x instanceof Object) {
    // (zero-length array)
      if (Array.isArray(x)) {
        return x.length === 0
      }
      // (zero-size map)
      if (x instanceof Map) {
        return x.size === 0
      }
      // (has no props)
      return Object.keys(x).length === 0
    }
    return false
  },

  decode  (val) {
    const value = decodeURIComponent(val)
    if ('{['.indexOf(value[0]) > -1) {
      return JSON.parse(value)
    }
    return Object.decodePrimitive(val)
  },

  decodePrimitive: (map => value => {
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
  }),

  encode (value) {
    return encodeURIComponent((typeof value === 'object') ? JSON.stringify(value) : `${value}`)
  }
}
