// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

const RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/
const RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g
const FETCH_FINALIZER = (c) => {
  const memo = c.$fetchMemo
  Object.keys(memo).filter(k => memo[k].cancel).forEach(k => memo[k].cancel())
}

let COUNTER = 1

export function compile ({ tag, attrs, uid, subs }) {
  const r = { uid, type: compileType(tag), props: compileAttrs(attrs), key: attrs.get('ui:key') }

  const aIf = attrs.get('ui:if')
  if (aIf) {
    const neg = aIf[0] === '!' ? aIf.slice(1) : null
    r.iff = neg ? c => !prop(c, neg) : c => !!prop(c, aIf)
    if (subs.length) {
      const ifElse = subs.find(e => e.tag === 'ui:else')
      const ifThen = subs.find(e => e.tag === 'ui:then')
      if (ifElse) {
        r.iff.else = compile(ifElse).subs
        subs = ifThen ? ifThen.subs : subs.filter(e => e !== ifElse)
      } else if (ifThen) {
        subs = ifThen.subs
      }
    }
  }

  const aEach = attrs.get('ui:each')
  if (aEach) {
    const [ itemId, , dataId ] = aEach.split(' ')
    const dataGetter = dataId[0] === ':' ? c => c.app.resource(dataId.slice(1)) : (c) => prop(c, dataId)
    r.each = { itemId, dataGetter }
  }

  r.subs = subs.map(compile)
  return r
}

function compileType (tag) {
  const dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null
  return dtype ? (dtype === 'fragment' || dtype === 'transclude' ? c => dtype : c => prop(c, dtype)) : c => tag
}

function compileAttrs (attrs) {
  const r = []
  let aProps = null
  attrs.forEach((v, k) => {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v
      }
      return
    }
    // localize by key
    if (v[0] === ':') {
      const key = v.slice(1)
      return r.push((c, p) => { p[k] = c.app.resource(key); return p })
    }
    if (v[0] === '<' && v[1] === '-') {
      const fctr = compileAttrValue(k, v.slice(2).trim())
      return r.push((c, p) => {
        p['$' + k] = function () {
          let memo = this.$fetchMemo
          if (!memo) {
            memo = this.$fetchMemo = {}
            this.defer(FETCH_FINALIZER)
          }
          const counter = COUNTER++
          const cb = (error, r) => {
            // check alive and race condition
            if (!this.isDone && counter === memo[k].counter) {
              this.assign({ error, [k]: r })
            }
          }
          const ev = memo[k] || (memo[k] = { cb, counter })
          const url = fctr(c, {})[k]
          if (url !== ev.url) {
            // cancel previous subscription if any
            if (ev.cancel) {
              ev.cancel()
              delete ev.cancel
            }
            ev.url = url
            setTimeout(() => {
              if (this.app) {
                ev.cancel = this.app.fetch(ev.url, ev.cb)
              }
            }, 10)
          }
        }
        return p
      })
    }
    if (v[0] === '-' && v[1] === '>') {
      const fctr = compileAttrValue(k, v.slice(2).trim())
      return r.push((c, p) => {
        const url = fctr(c, {})[k]
        p[k] = (data, opts) => c.app.emit(url, data, opts)
        return p
      })
    }

    r.push(compileAttrValue(k, v))
  })
  if (aProps) {
    const fn = compileAttrs((new Map()).set('_', aProps))[0]
    r.push((c, p) => {
      fn(c, p)
      return p
    })
  }
  return r
}

function compileAttrValue (k, v) {
  if (!v.includes('{{')) {
    const r = v === 'true' ? true : v === 'false' ? false : v
    return (c, p) => { p[k] = r; return p }
  }
  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return compilePlaceholder(k, v.slice(2, -2))
  }
  const fnx = []
  v.replace(RE_PLACEHOLDER, (s, key) => fnx.push(compilePlaceholder('p' + fnx.length, key)))
  return (c, p) => {
    let idx = 0
    const pp = {}
    p[k] = v.replace(RE_PLACEHOLDER, (s, key) => {
      const r = fnx[idx](c, pp)['p' + idx]
      idx++
      return r == null ? '' : r
    })
    return p
  }
}

function compilePlaceholder (k, v) {
  const keys = v.split('|')
  const key = keys[0]
  if (keys.length === 1) {
    return (c, p) => { p[k] = prop(c, key); return p }
  } else {
    const fnx = keys.slice(1).map(k => k.trim())
    return (c, p) => { p[k] = fnx.reduce((r, k) => c.app.pipes[k] ? c.app.pipes[k](r, c) : r, prop(c, key)); return p }
  }
}

function prop (c, k) {
  let $ = c.$
  if ($.get) {
    return $.get(k)
  }
  let posE = k.indexOf('.')
  if (posE === -1) {
    const getter = $['get' + k[0].toUpperCase() + k.slice(1)]
    const v = getter ? getter.call($, k) : $[k]
    return v
  }
  let posB = 0
    // dig
  while (posE !== -1) {
    $ = $[k.slice(posB, posE)]
    if (!$) {
      return
    }
    posB = posE + 1
    posE = k.indexOf('.', posB)
  }
  return $[k.slice(posB)]
}
