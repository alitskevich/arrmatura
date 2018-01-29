/* eslint no-use-before-define: "off" */

const RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g
const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g
const RE_ATTRS = /\s+([a-z][a-z0-9-]+)(?:=(\w+|"[^"]*"))?/gi
const RE_ESCAPE_XML_ENTITY = /["'&<>]/g
const RE_XML_TAG = /(<)(\/?)([a-z][a-z0-9:.-]*)((?:\s+[a-z][a-z0-9-]+(?:=(?:\w+|(?:"[^"]*")))?)*)\s*(\/?)>/gi

let UID = 1

const SUBST_XML_ENTITY = {
  amp: '&',
  gt: '>',
  lt: '<',
  quot: `"`,
  nbsp: ' '
}

const ESCAPE_XML_ENTITY = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;'
}
const FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)]
const FN_XML_ENTITY = function (_) {
  const s = _.substring(1, _.length - 1)
  return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : (SUBST_XML_ENTITY[s] || ' ')
}

const decodeXmlEntities = (s = '') => s.replace(RE_XML_ENTITY, FN_XML_ENTITY)
const escapeXml = (s) => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY)

export const parsePrimitive = function (v) {
  if (v === 'null') {
    return null
  }
  if (v === 'undefined') {
    return undefined
  }
  if (v === 'true') {
    return true
  }
  if (v === 'false') {
    return false
  }
  const n = +v
  if (!isNaN(n)) {
    return n
  }
  return v
}

export function parseDataset (dataset) {
  return Object.keys(dataset).reduce((r, key) => {
    r[key] = parsePrimitive(dataset[key])
    return r
  }, {})
}

const parseAttrs = (s) => {
  const r = new Map()
  while (1) {
    let e = RE_ATTRS.exec(s)
    if (!e) {
      return r
    }
    r.set(e[1], parsePrimitive(decodeXmlEntities(e[2].slice(1, -1))))
  }
}
const stringifyAttrs = (attrs) => {
  if (!attrs || !attrs.size) {
    return ''
  }
  const r = []
  attrs.forEach((v, k) => {
    if (v && k !== '#text') {
      r.push(' ' + k + '="' + escapeXml(v) + '"')
    }
  })
  return r.join('')
}

class Node {
  constructor (tag, attrs) {
    this.uid = UID++
    this.tag = tag || ''
    this.attrs = attrs || new Map()
    this.subs = []
  }
  getChild (index) {
    return this.subs[index]
  }
  setText (text) {
    this.attrs.set('#text', text)
  }
  addChild (tag, attrs) {
    const e = new Node(tag, attrs)
    this.subs.push(e)
    return e
  }
  toString () {
    return stringify(this, '')
  }
}

function stringify ({ tag, attrs, subs }, tab) {
  const sattrs = stringifyAttrs(attrs)
  const ssubs = subs.map(c => stringify(c, `  ${tab}`)).join('\n')
  const text = attrs['#text']
  const stext = text ? `\n  ${tab}${escapeXml(text)}` : ''
  return `${tab}<${tag}${sattrs}` + (!ssubs ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}>`)
}

export const parseXML = (_s) => {
  const s = ('' + _s).trim().replace(RE_XML_COMMENT, '')
  const ctx = [new Node()]
  let lastIndex = 0
  // head text omitted
  while (1) {
    let e = RE_XML_TAG.exec(s)
    if (!e) {
      break
    }
    // preceding text
    const text = e.index && s.slice(lastIndex, e.index)
    if (text && text.trim()) {
      ctx[0].setText(text)
    }
    // closing tag
    if (e[2]) {
      ctx.shift()
    } else {
      const elt = ctx[0].addChild(e[3], parseAttrs(e[4]))
      // not single tag
      if (!e[5]) {
        ctx.unshift(elt)
        if (ctx.length === 1) {
          throw new Error('Parse error at: ' + text)
        }
      }
    }
    // up past index
    lastIndex = RE_XML_TAG.lastIndex
  }
  // tail text omitted
  return ctx[0].getChild(0)
}
