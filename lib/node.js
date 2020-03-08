import { withPipes } from './compile.expr'
import { decodeXmlEntities, stringifyNode } from './xml.utils'
import { setKeyVal } from './utils'

let UID = 1

export class Node {
  constructor (tag, attrs = new Map(), nodes = []) {
    this.uid = '' + UID++
    this.tag = tag || ''
    this.attrs = attrs
    this.nodes = nodes
  }

  // --- attrs

  updateAttrs (attrs) {
    attrs.forEach((v, k) => this.attrs.set(k, v))
    return this
  }

  updateAttrsFormObject (obj) {
    Object.entries(obj).forEach(([k, v]) => this.attrs.set(k, v))
    return this
  }

  setAttrs (attrs = []) {
    this.attrs = attrs
    return this
  }

  get (key) {
    const val = this.attrs.get(key)
    return val
  }

  extractAttr (key) {
    const val = this.get(key)
    this.attrs.delete(key)
    return val
  }

  // --- Nodes

  setNodes (nodes = []) {
    this.nodes = nodes
    return this
  }

  get firstChild () {
    return this.nodes.values().next
  }

  addChild (tag, attrs) {
    const e = new Node(tag, attrs)
    this.nodes.push(e)
    return e
  }

  // ---  text

  setText (text) {
    this.attrs.set('#text', decodeXmlEntities(text))
  }

  // --- compiled

  addPropertyResolver (getter, propKey) {
    (this.$propertyResolvers || (this.$propertyResolvers = [])).push(
      propKey
        ? (c, acc) => setKeyVal(acc, propKey, getter(c))
        : (c, acc) => Object.entries(getter(c) || {}).forEach(([key, val]) => setKeyVal(acc, key, val))
    )
  }

  addInitialState (values) {
    const obj = this.initialState || (this.initialState = {})
    Object.entries(values).forEach(([key, val]) => setKeyVal(obj, key, val))
    return this
  }

  get initializers () {
    return this.$initializers || (this.$initializers = [])
  }

  addPropertyConnector (v, getter) {
    const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
    const pipec = withPipes(pipes)
    this.initializers.push(c => c.connect(key, rr => (getter(pipec(c, rr)))))
  }

  addEmitter (v, k) {
    const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
    const pipec = withPipes(pipes)
    this.initializers.push(c => ({ payload: { [k]: data => c.container.emit(key, pipec(c, data)) } }))
  }

  resolveProps (c, isInitial) {
    let props = this.$propertyResolvers ? this.$propertyResolvers.reduce((r, fn) => { fn(c, r); return r }, {}) : {}
    const initialState = this.initialState
    if (isInitial && initialState) {
      props = { ...initialState, ...props }
    }
    if (props.data && initialState && initialState.data) {
      props.data = { ...initialState.data, ...props.data }
    }
    return props
  }

  // --- utils

  clone (uid, tag = this.tag) {
    return Object.assign(new Node(this.tag), {
      uid,
      tag,
      attrs: this.attrs,
      nodes: this.nodes,
      nodeMap: this.nodeMap,
      getNodes: this.getNodes,
      $propertyResolvers: this.$propertyResolvers ? [...this.$propertyResolvers] : null,
      initialState: this.initialState ? { ...this.initialState } : null,
      $initializers: this.$initializers ? [...this.$initializers] : null
    })
  }

  toString () {
    return stringifyNode(this)
  }
}
