const RE_ESCAPE_XML_ENTITY = /["'&<>]/g
const ESCAPE_XML_ENTITY = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;'
}
const FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)]
const RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g
const SUBST_XML_ENTITY = {
  amp: '&',
  gt: '>',
  lt: '<',
  quot: '"',
  nbsp: ' '
}

const FN_XML_ENTITY = function (_) {
  const s = _.substring(1, _.length - 1)
  return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : (SUBST_XML_ENTITY[s] || ' ')
}
export const escapeXml = (s) => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY)
export const skipQoutes = (s) => s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s
export const decodeXmlEntities = (s = '') => s.replace(RE_XML_ENTITY, FN_XML_ENTITY)

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

export function stringifyNode ({ tag, attrs, nodes = [] }, tab = '') {
  const sattrs = stringifyAttrs(attrs)
  const ssubs = nodes.map(c => stringifyNode(c, `  ${tab}`)).join('\n')
  const text = attrs && attrs.get('#text')
  const stext = text ? `  ${tab}${escapeXml(text)}` : ''
  if (tag === '#text') {
    return stext.trim()
  }
  return `${tab}<${tag}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}>`)
}
