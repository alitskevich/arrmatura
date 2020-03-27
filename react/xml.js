import { parseAttrs, decodeXmlEntities, stringifyNode } from './xml.utils'

let UID = 1

export class Node {
  constructor (tag, attrs) {
    this.uid = '' + UID++
    this.tag = tag || ''
    this.attrs = attrs
    this.id = attrs && attrs.get('id')
  }

  get (key) {
    return this.attrs.get(key)
  }

  addChild (tag, attrs) {
    const e = new Node(tag, attrs);
    (this.nodes || (this.nodes = [])).push(e)
    return e
  }

  addTextChild (text) {
    return this.addChild('#text', new Map([['#text', decodeXmlEntities(text)]]))
  }

  toString () {
    return stringifyNode(this)
  }
}
// XML Parse for templates. XML -> NodeTree

const RE_EMPTY = /^\s*$/
const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g
const RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:\.]*)((?:\s+[a-z][a-zA-Z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/g
const SINGLE_TAGS = 'img input br col'.split(' ').reduce((r, e) => { r[e] = 1; return r }, {})

export const parseXML = (_s, key) => {
  const top = new Node()
  try {
    const s = ('' + _s).trim().replace(RE_XML_COMMENT, '')
    const ctx = [top]
    let lastIndex = 0
    // head text omitted
    for (let e = RE_XML_TAG.exec(s); e; e = RE_XML_TAG.exec(s)) {
    // preceding text
      const text = e.index && s.slice(lastIndex, e.index)
      if (text && !text.match(RE_EMPTY)) {
        ctx[0].addTextChild(text)
      }
      // closing tag
      if (e[2]) {
        if (ctx[0].tag !== e[3]) {
          throw new Error(
            (key || '') + ' XML Parse closing tag does not match at: ' + e.index +
                    ' near ' +
                    e.input.slice(Math.max(e.index - 150, 0), e.index) +
                    '^^^^' +
                    e.input.slice(e.index, Math.min(e.index + 150, e.input.length))
          )
        }
        ctx.shift()
      } else {
        const sAttrs = e[4].trim()
        const elt = ctx[0].addChild(e[3], parseAttrs(sAttrs))
        // not single tag
        if (!(e[5] || (e[3] in SINGLE_TAGS))) {
          ctx.unshift(elt)
          if (ctx.length === 1) {
            throw new Error('Parse error at: ' + e[0])
          }
        }
      }
      // up past index
      lastIndex = RE_XML_TAG.lastIndex
    }
    // tail text omitted
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('compile ' + key, error)
    top.error = error
  }
  return top
}
