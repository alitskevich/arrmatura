import { parseDataset } from './xml.js'

const w3 = 'http://www.w3.org/'

const DOMNamespaces = {
  html: w3 + '1999/xhtml',
  mathml: w3 + '1998/Math/MathML',
  svg: w3 + '2000/svg'
}

const flagAttrs = {
  disabled: 'yes',
  selected: 'true'
}

const instantAttrs = {
  value: 1,
  checked: 1
}

export function applyDOMAttributes (e, _attrs) {
  if (_attrs) {
    const lastAttrs = e.$attributes || {}
    for (let key in lastAttrs) {
      if (lastAttrs.hasOwnProperty(key) && _attrs[key] == null) {
        removeDOMAttribute(e, key)
      }
    }
    for (let key in _attrs) {
      if (_attrs.hasOwnProperty(key)) {
        const value = _attrs[key]
        const lastValue = instantAttrs[key] ? e[key] : lastAttrs[key]
        if (value != null && value !== lastValue) {
          setDOMAttribute(e, key, value)
        }
      }
    }
    e.$attributes = _attrs
  }
}

export function setDOMAttribute (e, k, value) {
  if (typeof value === 'function') {
    const lstnrs = e.$listeners || (e.$listeners = {})
    if (lstnrs[k]) {
      e.removeEventListener(k, lstnrs[k])
    }
    const fn = (ev) => value(parseDataset(ev.currentTarget.dataset), ev)
    lstnrs[k] = fn
    e.addEventListener(k, fn, false)
  } else if (k === 'data') {
    Object.assign(e.dataset, Object.keys(value).reduce((r, key) => {
      const v = value[key]
      if (typeof v !== 'object') {
        r[key] = v
      }
      return r
    }, {}))
  } else if (flagAttrs[k]) {
    e[k] = value ? true : null
  } else if (instantAttrs[k]) {
    e[k] = value
  } else if (k === '#text') {
    e.textContent = value == null ? '' : value
  } else {
    e.setAttribute(k, value)
  }
}

export function removeDOMAttribute (e, k) {
  if (e.$listeners && e.$listeners[k]) {
    e.removeEventListener(k, e.$listeners[k])
  } else if (k === 'data') {
    e.dataset = {}
  } else if (flagAttrs[k]) {
    e[k] = null
  } else if (instantAttrs[k]) {
    e[k] = null
  } else {
    e.removeAttribute(k)
  }
}
// ----- dom manipulation
export function appendDOMElement
 (element, parent, before) {
  if (before) {
    parent.insertBefore(element, before)
  } else {
    parent.appendChild(element)
  }
}

export function createDOMElement (tag, _namespace) {
  let e = null
  const namespace = DOMNamespaces[tag] || _namespace
  if (namespace) {
    e = document.createElementNS(namespace, tag)
    e._namespaceURI = namespace
  } else {
    e = document.createElement(tag)
  }
  e.$attributes = {}
  return e
}

export function removeDOMElement (e) {
  const parentElt = e.parentElement
  if (parentElt) {
    parentElt.removeChild(e)
    const lstnrs = e.$listeners
    if (lstnrs) {
      Object.keys(lstnrs).forEach(k => e.removeEventListener(k, lstnrs[k]))
      e.$listeners = null
    }
    e.$attributes = null
  }
}
