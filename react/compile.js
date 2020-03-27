import { decodeXmlEntities, stringifyNode } from './xml.utils'
import { compileAttrs, withPipes } from './compile.attrs'
import { setKeyVal } from './utils'

let UID = 1

class Node {
  constructor (tag) {
    this.uid = '' + UID++
    this.tag = tag || ''
    this.initials = { key: this.uid }
  }

  // --- attrs
  setAttrs (attrs = new Map()) {
    this.attrs = attrs
    compileAttrs(this)
    this.id = attrs.get('id')
    return this
  }

  get (key) {
    const val = this.attrs.get(key)
    return val
  }

  // --- Nodes
  get firstChild () {
    return this.nodes.values().next().value
  }

  addList (nodes, key) {
    if (nodes) {
      nodes.forEach(({ tag, attrs, nodes }) => this.addTree(tag, attrs, nodes, key))
    }
    return this
  }

  addTree (tag, attrs, nodes, key = 'nodes') {
    if (attrs.has('ui:for')) {
      const [itemName, prep, expr = prep] = attrs.get('ui:for').split(' ')
      attrs.delete('ui:for')
      return this
        .addLeaf('ui:for', new Map([['itemName', itemName], ['items', '{:<'.includes(expr[0]) ? expr : `{${expr}}`]]))
        .addTree(tag, attrs, nodes)
    }
    if (attrs.has('ui:if')) {
      const expr = attrs.get('ui:if')
      attrs.delete('ui:if')
      const iff = this.addLeaf('ui:if', new Map([['condition', '{:<'.includes(expr[0]) ? expr : `{${expr}}`]]))
      if (nodes && nodes.length) {
        const ifElse = nodes.find(e => e.tag === 'ui:else')
        const ifThen = nodes.find(e => e.tag === 'ui:then')
        if (ifElse) {
          if (ifThen) {
            iff.addList(ifThen.nodes)
          } else {
            iff.addTree(tag, attrs, nodes.filter(e => e !== ifElse))
          }
          iff.addList(ifElse.nodes, 'nodes_else')
        } else if (ifThen) {
          iff.addList(ifThen.nodes)
        } else {
          iff.addTree(tag, attrs, nodes)
        }
      } else {
        iff.addLeaf(tag, attrs)
      }
      return iff
    }
    if (tag.startsWith(this.tag + ':')) {
      this.addList(nodes, 'nodes_' + tag)
    }
    if (tag === 'ui:tag') {
      const expr = attrs.get('tag')
      attrs.delete('tag')
      return this
        .addLeaf(tag, new Map([['tag', expr]]))
        .addTree('', attrs, nodes)
    }

    return this.addLeaf(tag, attrs).addList(nodes)
  }

  addLeaf (tag, attrs) {
    const e = new Node(tag)
    e.parent = this
    e.top = this.top || this
    e.setAttrs(attrs);
    (this.nodes || (this.nodes = new Map())).set(e.uid, e)
    return e
  }

  addTextChild (text) {
    if (this.tag === 'Text') {
      this.attrs.set('#text', text)
    } else {
      this.addLeaf('#text', new Map([['#text', decodeXmlEntities(text)]]))
    }
  }

  // --- compiled

  addPropertyResolver (getter, propKey) {
    (this.propertyResolvers || (this.propertyResolvers = [])).push(
      propKey
        ? (c, acc) => setKeyVal(acc, propKey, getter(c))
        : (c, acc) => Object.entries(getter(c) || {}).forEach(([key, val]) => setKeyVal(acc, key, val))
    )
  }

  addInitialState (key, val) {
    setKeyVal(this.initials, key, val)
    return this
  }

  addPropertyConnector (v, propKey) {
    const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
    const pipec = withPipes(pipes)
    const srcProp = key.replace('.', '__');
    (this.top.initializers || (this.top.initializers = [])).push(c => c.connect(key, srcProp))
    this.addPropertyResolver(container => pipec(container, container.get(srcProp)), propKey)
  }

  addEmitter (v, k) {
    const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
    const pipec = withPipes(pipes)
    this.addPropertyResolver(container => (data) => container.emit(key, pipec(container, data)), k)
  }

  resolveProps (container) {
    let props = this.propertyResolvers ? this.propertyResolvers.reduce((r, fn) => { fn(container, r); return r }, {}) : {}
    const initials = this.initials
    if (initials) {
      props = { ...initials, ...props }
    }
    if (props.data && initials && initials.data) {
      props.data = { ...initials.data, ...props.data }
    }
    return props
  }

  // --- utils

  opts (opts) {
    return Object.assign(this, opts)
  }

  clone (uid, tag = this.tag) {
    return new Node(this.tag).opts({
      uid,
      tag,
      top: this.top,
      parent: this.parent,
      attrs: this.attrs,
      nodes: this.nodes,
      propertyResolvers: this.propertyResolvers ? [...this.propertyResolvers] : null,
      initials: this.initials ? { ...this.initials } : null,
      initializers: this.initializers ? [...this.initializers] : null
    })
  }

  toString () {
    return stringifyNode(this)
  }
}

export const compileNode = (top) => {
  const root = new Node()
  if (top && top.nodes) {
    top.nodes.map(({ tag, attrs, nodes }) => root.addTree(tag, attrs, nodes))
  }
  return root
}
