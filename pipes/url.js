import Obj from './obj.js'

export default {

  /**
 * Parses string into URL object like `{type, target, path, params, data }`.
 *
 * @param {string} s string in format: `type:target/path?params#data`
 * @param {object} r optional target object
 * @returns URL object
 */
  parse (s, r = {}) {
    if (!s) {
      return { path: [], params: {}, target: '', ...r }
    }
    if (typeof s === 'object') {
      return { path: [], params: {}, target: '', ...r, ...s }
    }
    let p
    // extract type:
    p = s.indexOf(':')
    if (p > -1) {
      r.type = s.slice(0, p)
      s = s.slice(p + 1)
    }
    // extract data:
    p = s.indexOf('#')
    if (p > -1) {
      r.data = Object.decode(s.slice(p + 1))
      s = s.slice(0, p)
    }
    // extract query params:
    p = s.indexOf('?')
    r.params = r.params || {}
    if (p > -1) {
      for (const param of s.slice(p + 1).split('&')) {
        const [key, value] = param.split('=')
        if (value) {
          r.params[key] = Obj.decode(value)
        }
      }
      s = s.slice(0, p)
    }
    // target and path:
    const path = r.path = s.split('/').map(decodeURIComponent)
    while (path.length && !r.target) {
      r.target = path.shift()
    }
    return r
  },

  /**
*  Represents an URL object as a string
*
* @param {object} r URL object like `{type, target, path, params, data }`
* @returns string in format `type://target/path?params#data`
*/
  stringify  (r) {
    let result = ''
    if (!r) {
      return result
    }
    if (typeof r === 'string') {
      return r
    }
    if (r.target) {
      if (r.type) {
        result += `${r.type}://`
      }
      result += r.target
    }
    if (r.path) {
      result += `/${Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path}`
    }
    const params = r.params
    if (params) {
      const keys = Object.keys(params).filter(key => (params[key] != null))
      if (keys.length) {
        result += `?${keys.map(key => (`${key}=${Obj.encode(params[key])}`)).join('&')}`
      }
    }
    if (r.data) {
      result += `#${Obj.encode(r.data)}`
    }
    return result
  }

}
