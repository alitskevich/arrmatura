const accQ = function (u, p) {
  u[p[0]] = p[1]
  return u
}
const accP = function (u, p, i, a) {
  if (i % 2 === 0) {
    u[p] = a[1 + i] || true
  }
  return u
}
export function stou (s) {
  const [path, query = ''] = (s || '').split('?')
  return query.split('&').map(p => p.split('=')).reduce(accQ, path ? path.split('/').reduce(accP, {}) : {})
}

export function capitalize (s) {
  return s ? s.slice(0, 1).toUpperCase() + s.slice(1) : ''
}

export function restoreHotReload () {
  const hot = module && module.hot
  if (hot) {
    hot.addStatusHandler(function (d) {})
    // hot.accept();
    hot.dispose(data2 => {
      data2.list = this.list
    })
    const data = hot.data
    if (data) {
      return data.list || []
    }
  }
  return []
}

export function incCounter (inc = 1) {
  const c = Math.max(0, this.counter + inc * 11)
  const gen = () => c < 1 ? [] : Array.apply(null, Array(c)).map((e, i) =>
      ({ id: i, name: 'n' + (i + 1) }))
  const result = gen()
        .map((e, i) => ({ name: e.name, value: e.id, key: 100 + i, key2: 2100 + i, key3: 3100 + i }))

    // result.forEach(e => (e.children = gen()));

  this.update({ list: result })
}
