import { parseXML } from './xml.js'
import { fnName, get } from './utils.js'
// type registry
const REGISTRY = new Map()
export const getType = name => REGISTRY.get(name)
export const registerType = ctor => {
  const name = ctor.NAME = fnName(ctor)
  const template = ctor.TEMPLATE || (ctor.prototype.TEMPLATE && ctor.prototype.TEMPLATE()) || ``
  const meta = compile(parseXML(template))
  ctor.prototype.$TEMPLATE = $ => resolve(new Map(), $, meta)
  REGISTRY.set(name, ctor)
}

function resolve (map, $, meta) {
  if (!meta) {
    return map
  }
  if (Array.isArray(meta)) {
    return meta.reduce((m, e) => resolve(m, $, e), map)
  }
  const { type, tag, props, subs, uid, iff, each } = meta
  if (iff && !iff($)) {
    return resolve(map, $, iff.else)
  }
  if (tag === 'ui:transclude') {
    $.$transclude.forEach((v, k) => map.set(k, v))
    return map
  }
  if (tag === 'ui:block') {
    return resolve(map, $, subs)
  }
  if (each) {
    const data = get($, each.dataId)
    return !data ? resolve(map, $, each.empty) : data.reduce((m, d, index) => {
      $[each.itemId] = d
      $[each.itemId + 'Index'] = index
      const id = `${uid}-$${d.id || index}`
      return resolve(m, $, { type, tag, props, subs, uid: id, iff })
    }, map)
  }
  return map.set(uid, {
    tag,
    ctor: type($),
    props: props.reduce((acc, fn) => fn($, acc), {}),
    subs: subs.reduce((m, s) => resolve(m, $, s), new Map())
  })
}

function compile ({ tag, attrs, uid, subs }) {
  const dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null
  const type = dtype ? $ => getType(get($, dtype)) : $ => getType(tag)
  const r = { uid, tag, type, props: compileAttrs(attrs) }
  const aIf = attrs.get('ui:if')
  if (aIf) {
    r.iff = $ => !!get($, aIf)
    if (subs.length) {
      const ifElse = subs.find(e => e.tag === 'ui:else')
      const ifThen = subs.find(e => e.tag === 'ui:then')
      if (ifElse) {
        r.iff.else = compile(ifElse).subs
        subs = ifThen ? ifThen.children : subs.filter(e => e !== ifElse)
      } else if (ifThen) {
        subs = ifThen.children
      }
    }
  }
  const aEach = attrs.get('ui:each')
  if (aEach) {
    const [ itemId, , dataId ] = aEach.split(' ')
    r.each = { itemId, dataId }
    const empty = subs.find(e => e.tag === 'ui:empty')
    if (empty) {
      r.empty = empty
      subs = subs.filter(e => e !== empty)
    }
  }
  r.subs = subs.map(compile)
  return r
}

const RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$]+)\}\}$/
const RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$]+)\}\}/g
function compileAttrs (attrs) {
  const r = []
  let aProps = null
  attrs.forEach((v, k) => {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v
      }
    } else {
      r.push(compileAttrValue(k, v))
    }
  })
  if (aProps) {
    r.push(($, p) => { Object.assign(p, get($, aProps)); return p })
  }
  return r
}

function compileAttrValue (k, v) {
  if (!v.includes('{{')) {
    return ($, p) => { p[k] = v; return p }
  } else if (v.match(RE_SINGLE_PLACEHOLDER)) {
    let key = v.slice(2, -2)
    return ($, p) => { p[k] = get($, key); return p }
  } else {
    return ($, p) => {
      p[k] = v.replace(RE_PLACEHOLDER, (s, key) => {
        const v = get($, key)
        return v == null ? '' : v
      })
      return p
    }
  }
}
