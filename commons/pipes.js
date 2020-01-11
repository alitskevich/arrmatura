
export default {
  // system
  log: (x, pre) => { console.log(pre || 'pipe', x); return x },
  track: (fn, x, y) => (...args) => { console.log('track', x || y); return (fn || Function.ID)(...args) },
  // eslint-disable-next-line no-debugger
  debug: () => { debugger; },

  // logical
  equals: (x, p) => x == p,
  greater: (x, p) => x > p,
  includes: (x, p) => x.includes && x.includes(p),
  then: (x, p = '', n = '') => x ? p : n,
  not: x => !x,
  or: (x, alt) => x || alt,
  plus: (x, alt) => (+x) + (+alt),
  minus: (x, alt) => (+x) - (+alt),
  multiply: (x, alt) => (+x) * (+alt),

  fn: Function,
  str: String,
  arr: Array,
  date: Object.assign((s, format) => Date.format(s, format), Date, {
    orNow: x => x || (new Date()),
    time: Date.formatTime,
  }),
};
