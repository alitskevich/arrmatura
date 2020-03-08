import { Node } from './node'
import { parseAttrs } from './xml.utils'

// XML Parse for templates. XML -> NodeTree

const RE_EMPTY = /^\s*$/
const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g
const RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/g
const SINGLE_TAGS = 'img input br col'.split(' ').reduce((r, e) => { r[e] = 1; return r }, {})

export const parseXML = (_s, key) => {
  const s = ('' + _s).trim().replace(RE_XML_COMMENT, '')
  const ctx = [new Node()]
  let lastIndex = 0
  // head text omitted
  for (let e = RE_XML_TAG.exec(s); e; e = RE_XML_TAG.exec(s)) {
    // preceding text
    const text = e.index && s.slice(lastIndex, e.index)
    if (text && !text.match(RE_EMPTY)) {
      ctx[0].addChild('#text').setText(text)
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
      const elt = ctx[0].addChild(e[3], sAttrs ? parseAttrs(sAttrs) : undefined)
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
  return ctx[0]
}
