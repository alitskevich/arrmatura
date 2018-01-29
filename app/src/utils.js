let _nextId = 1

export const nextId = () => _nextId++
export const zero = () => 0
export const ident = (_) => _

export const someOrNull = (a) => a === undefined || a === null ? null : a

export function fnThrow (error, ErrorType = Error) {
  throw new ErrorType(error)
}

export function fnName (fn) {
  return fn.name ||
  (/^function\s+([\w$]+)\s*\(/.exec(fn.toString()) || [])[1] ||
  ('$C' + nextId())
}
export function ensureTopCtor (ctor, supertop) {
  let top = ctor
  // for (; top.prototype.constructor !== Object; top = top.prototype.constructor) {}
  if (top.prototype.constructor === Object) {
    top.prototype.constructor = supertop
  }
}
export const assert = (b, error, errorType) => b || fnThrow(error, errorType)
export function callMethod ($, key, args) {
  const fn = $[key]
  if (fn) {
    return fn.call($, args)
  }
}

function _get (k) {
  const getter = this['get' + k[0].toUpperCase() + k.slice(1)]
  return getter ? getter.call(this) : this[k]
}

export function get (from, k) {
  let posE = k.indexOf('.')
  if (posE === -1) {
    return _get.call(from, k)
  }
  let posB = 0
  let rr = from
  while (posE !== -1) {
    rr = _get.call(rr, k.slice(posB, posE))
    if (!rr) {
      return
    }
    posB = posE + 1
    posE = k.indexOf('.', posB)
  }
  return _get.call(rr, k.slice(posB))
}
