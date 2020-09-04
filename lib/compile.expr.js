import { parseValue } from './utils'

const RE_SINGLE_PLACEHOLDER = /^\{([^}]+)\}$/
const RE_PLACEHOLDER = /\{([^}]+)\}/g

function pipe (value, key) {
  const [id, ...args] = key.split(':')
  try {
    const fn = this.pipes(id)
    const $ = this
    return fn.apply($.impl, [value, ...args.map(a => a[0] === '@' ? $.container.get(a.slice(1)) : parseValue(a))])
  } catch (ex) {
    console.error('ERROR: pipe ' + id, ex)
    return value
  }
}

export function withPipes (pipes) {
  return !pipes.length ? (c, v) => v : (c, initialValue) => pipes.reduce((r, pk) => pipe.call(c, r, pk), initialValue)
}

function stringInterpolation (v, fnx = []) {
  const pattern = v.replace(RE_PLACEHOLDER, (_, expr) => { fnx.push(placeholder(expr)); return '{{' + (fnx.length - 1) + '}}' })
  return c => !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, (s, idx) => {
    const r = fnx[idx](c)
    return !r && r !== 0 ? '' : r
  })
}

function resourceExpression (expr) {
  const [key, ...pipes] = expr.split('|').map(s => s.trim())
  const intrpltn = stringInterpolation(key)
  return !pipes.length ? c => c.res(intrpltn(c)) : (pipec => c => pipec(c, c.res(intrpltn(c))))(withPipes(pipes))
}

function placeholder (expr) {
  const [key, ...pipes] = expr.split('|').map(s => s.trim())
  const fn = key[0] === ':' ? c => c.res(key.slice(1)) : c => c.container.get(key)
  if (!pipes.length) return fn
  return c => pipes.reduce((r, pk) => pipe.call(c, r, pk), fn(c))
}

export function compileExpression (v) {
  if (typeof v !== 'string') { return () => v }
  if (v[0] === ':') { return resourceExpression(v.slice(1).trim()) }
  if (!v.includes('{')) { const vv = parseValue(v); return () => vv }
  if (v.match(RE_SINGLE_PLACEHOLDER)) { return placeholder(v.slice(1, -1).trim()) }
  return stringInterpolation(v)
}
