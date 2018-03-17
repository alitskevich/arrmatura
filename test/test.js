
export default function (fn) {
  let description = ''
  function assert (b, error, w) {
    if (!b) {
      console.warn(b, 'context:', w)
      throw new Error(error)
    }
  }

  function describe (s) {
    description = s
  }

  assert.equal = function (a, b, error, w) {
    if (a !== b) {
      console.warn(a, '===', b, 'context:', w)
      throw new Error(error)
    }
  }

  function run (...args) {
    const all = ([].concat(...args))
    all.forEach(Ctor => {
      const t = new Ctor()
      let errorCount = 0
      let count = 0
      Object.getOwnPropertyNames(Ctor.prototype).filter(k => k !== 'constructor').forEach(k => {
        const fn = Ctor.prototype[k]
        try {
          description = fn.name
          fn.call(t)
        } catch (e) {
          // document.write('Test failed: ' + )
          console.error([Ctor.name, description, e.message].join(': '))
          errorCount++
        }
        count++
      })
      if (errorCount) {
        console.error('[' + Ctor.name + '] Tests failed: ' + errorCount + ' of ' + count)
      } else {
        console.log('[' + Ctor.name + '] Tests passed successfully: ' + count)
      }
    })
  }

  fn({assert, run, describe})
}
