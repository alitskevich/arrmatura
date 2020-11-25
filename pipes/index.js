import obj from './obj.js'
import str from './str.js'
import arr from './arr.js'
import date from './date.js'

// useful pipes
export default {
  ID: x => x,
  next: (COUNTER => (p = '') => p + (COUNTER++))(1),

  // system
  throw: (error, ErrorType = Error) => { throw typeof error === 'string' ? new ErrorType(error) : error },
  assert: (b, error, ErrorType = Error) => { if (!b) { throw typeof error === 'string' ? new ErrorType(error) : error } },
  log: (x, pre) => { console.log(pre || 'pipe', x); return x },
  track: (fn, x, y) => (...args) => { console.log('track', x || y); return (fn || Function.ID)(...args) },
  // eslint-disable-next-line no-debugger
  debugger: () => { debugger },

  // data structures
  dot: (x, k) => x && k in x ? x[k] : undefined,
  wrap: (x, k) => ({ [k]: x }),
  includes: (x, p) => x.includes && x.includes(p),
  dig: (o, steps) => (steps.reduce ? steps : steps.split('.')).reduce((r, e) => r ? r[e] : undefined, o),

  // logical
  then: (x, p = '', n = '') => x ? p : n,
  not: x => !x,
  isUndefined: x => typeof x === 'undefined',
  isTrue: x => x === true,
  isFalse: x => x === false,
  or: (x, s) => x || s,
  and: (x, s) => x && s,

  // math
  // eslint-disable-next-line eqeqeq
  equals: (x, p) => x == p,
  greater: (x, p) => x > p,
  less: (x, p) => x < p,
  plus: (x, alt) => (+x) + (+alt),
  minus: (x, alt) => (+x) - (+alt),
  multiply: (x, alt) => (+x) * (+alt),
  compose: (...ff) => x0 => ff.reduceRight((x, f) => f(x), x0),
  swap: f => (a, b) => f(b, a),
  curry: (() => {
    const _curry = (fn, args0, lengthLimit) => {
      const fx = (args) => args.length >= lengthLimit
        ? fn(...args)
        : _curry(fn, args, lengthLimit - args.length)

      return (...args) => fx([...args0, ...args])
    }
    return (f, ...args) => _curry(f, args, f.length)
  })(),
  /* Simple GUID generator. */
  guid: (s4 => () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`)(() => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
  /* Simple hash function. */
  hash: function (s) {
    let a = 1; let c = 0; let h; let o
    if (s) {
      a = 0
      /* jshint plusplus:false bitwise:false */
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h)
        a = (a << 6 & 268435455) + o + (o << 14)
        c = a & 266338304
        a = c !== 0 ? a ^ c >> 21 : a
      }
    }
    return String(a)
  },

  str,
  arr,
  obj,
  date: Object.assign((s, format) => date.format(s, format), date)
}
