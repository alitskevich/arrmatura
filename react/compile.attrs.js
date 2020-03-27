const RE_SINGLE_PLACEHOLDER = /^\{([^}]+)\}$/
const RE_PLACEHOLDER = /\{([^}]+)\}/g

function pipe ($, value, key) {
  const [id, ...args] = key.split(':')
  try {
    const fn = $.pipes(id)
    return fn.call($.impl, value, ...args.map(arg => arg[0] === '@' ? $.get(arg.slice(1)) : arg))
  } catch (ex) {
    console.error('ERROR: pipe ' + id, ex)
    return value
  }
}

export function withPipes (pipes) {
  return !pipes.length
    ? (_, value) => value
    : (comp, value) => pipes.reduce((r, pk) => pipe(comp, r, pk), value)
}

function stringInterpolation (v, fnx = []) {
  const pattern = v.replace(RE_PLACEHOLDER, (_, expr) => { fnx.push(placeholder(expr)); return '{{' + (fnx.length - 1) + '}}' })
  return comp => !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, (_, idx) => {
    const r = fnx[idx](comp)
    return !r && r !== 0 ? '' : r
  })
}

function resourceExpression (expr) {
  const [key, ...pipes] = expr.split('|').map(s => s.trim())
  const intrpltn = stringInterpolation(key)
  return !pipes.length
    ? comp => comp.res(intrpltn(comp))
    : (pipec => comp => pipec(comp, comp.res(intrpltn(comp))))(withPipes(pipes))
}

function placeholder (expr) {
  const [key, ...pipes] = expr.split('|').map(s => s.trim())
  if (!pipes.length) {
    return key[0] === ':'
      ? comp => comp.res(key.slice(1))
      : comp => comp.get(key)
  }
  return comp => pipes.reduce((r, pk) => pipe(comp, r, pk), comp.get(key))
}

function compileExpression (v) {
  if (typeof v !== 'string') { return () => v }
  if (v[0] === ':') { return resourceExpression(v.slice(1).trim()) }
  if (!v.includes('{')) { return () => v }
  if (v.match(RE_SINGLE_PLACEHOLDER)) { return placeholder(v.slice(1, -1).trim()) }
  return stringInterpolation(v)
}

export function compileAttrs (r) {
  r.attrs.forEach((v, k) => {
    if (typeof v !== 'string') {
      r.addInitialState(k, v)
    } else {
      if (v[0] === '<' && v[1] === '-') {
        r.addPropertyConnector(v, k === 'ui:props' ? null : k)
      } else if (v[0] === '-' && v[1] === '>') {
        r.addEmitter(v, k)
      } else {
        if (!v.includes('{') && v[0] !== ':') {
          r.addInitialState(k, v)
        } else {
          r.addPropertyResolver(compileExpression(v), (k === 'ui:props') ? undefined : k)
        }
      }
    }
  })
}
