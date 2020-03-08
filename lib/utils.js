export const setNodeMap = (map = new Map(), node) => {
  if (node) {
    map.set(node.uid, node)
  }
  return node
}

export const wrapNode = n => new Map([[n.uid, n]])

function append (e, p, cursor) {
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

export const setKeyVal = (acc, k, val) => {
  if (k.slice(0, 5) === 'data-') {
    acc.data = acc.data ? { ...acc.data, [k.slice(5)]: val } : { [k.slice(5)]: val }
  } else {
    acc[k] = val
  }
}

export function arrangeElements ($, cursor = { elt: null, parent: $.impl.elt }) {
  let p = $.first
  while (p) {
    const e = p.impl.elt
    if (e) {
      append(e, cursor.parent, cursor.elt)
      cursor.elt = e
    } else {
      arrangeElements(p, cursor)
    }
    p = p.next
  }
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
