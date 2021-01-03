Array.EMPTY = []
Object.assign(Function, {
  ID: x => x,
  next: (COUNTER => (p = '') => p + (COUNTER++))(1),
  // system
  throw: (error, ErrorType = Error) => { throw typeof error === 'string' ? new ErrorType(error) : error }
})

export const parseValue = (map => value => {
  if (value && '1234567890+-'.includes(value[0]) && value.length <= 17) {
    const num = +value
    return isNaN(num) ? value : num
  }
  return value in map ? map[value] : value
})({
  true: true,
  false: false,
  null: null,
  undefined
})

export const setNodeMap = (map = new Map(), node) => {
  if (node) {
    map.set(node.uid, node)
  }
  return node
}

export const wrapNode = n => new Map([[n.uid, n]])

function appendElt (e, p, cursor) {
  const before = cursor ? cursor.nextSibling : p.firstChild
  if (!before) {
    if (p !== e.parentElement) {
      p.appendChild(e)
    }
  } else if (e !== before) {
    p.insertBefore(e, before)
  }
  return e
}

export function arrangeElements ($, parent, cursor = null) {
  for (let p = $.first; p; p = p.next) {
    if (p.isElementary) {
      const e = p.impl.elt
      if (e) {
        arrangeElements(p, e)
        cursor = appendElt(e, parent, cursor)
      }
    } else {
      cursor = arrangeElements(p, parent, cursor)
    }
  }
  return cursor
}

export const hasSlot = (c, id) => {
  let r = false
  const { tag, content } = c.container
  if (!content) return r
  if (id && id !== 'default') {
    content.forEach((e) => { r = r || (e.tag === tag + ':' + id) })
  } else {
    content.forEach((e) => { r = r || (e.tag.slice(0, tag.length + 1) !== tag + ':') })
  }
  return r
}

export const filterMapKey = (src, key) => {
  const r = new Map()
  src.forEach((v, k) => { if (k !== key) { r.set(k, v) } })
  return [src.get(key), r]
}

const stringifyAttrs = (attrs) => {
  if (!attrs) {
    return ''
  }
  const r = []
  Object.entries(attrs).forEach(([k, v]) => {
    if (v && k !== '#text') {
      r.push(' ' + k + '="' + (v) + '"')
    }
  })
  return r.join('')
}

export function stringifyComponent ({ uid, tag, state, container, children = new Map() }, tab = '') {
  const sattrs = stringifyAttrs(state)
  const ssubs = [...children.values()].map(c => stringifyComponent(c, `  ${tab}`)).join('\n')
  const text = state && state['#text']
  const stext = text ? `  ${tab}${text}` : ''
  if (tag === '#text') {
    return stext.trim()
  }
  return `${tab}<${tag}#${uid} ${container ? container.uid : '-'}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}#${uid}>`)
}

export function filterSlotNodes (slotId, container) {
  const { content, tag } = container
  if (!content) return null
  const r = new Map()
  content.forEach((v) => {
    if (slotId) {
      if ((v.tag === tag + ':' + slotId)) {
        v.nodeMap.forEach(vv => setNodeMap(r, vv))
      }
    } else if (v.tag.slice(0, tag.length + 1) !== tag + ':') {
      setNodeMap(r, v)
    }
  })
  return r
}
