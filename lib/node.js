import { compileExpression, withPipes } from './compile.expr'
import { decodeXmlEntities, stringifyNode } from './xml.utils'

let UID = 1
const setKeyVal = (acc, k, val)=>{
    if (k.slice(0, 5) === 'data-') {
        acc.data = { ...acc.data, [k.slice(5)]: Object.decode(val) }
    } else {
        acc[k] = val
    }
}

export class Node {
    constructor(tag, attrs = new Map(), nodes = []) {
        this.uid = ''+UID++
        this.tag = tag || ''
        this.attrs = attrs
        this.nodes = nodes
    }

    setAttrs(attrs) {
        attrs.forEach((v,k) => this.attrs.put(k,v))
        return this
    }
    setNodes(nodes = []) {
        this.nodes = nodes
        return this
    }
    getNodes() {
        return this.nodes
    }
    setText(text) {
        this.attrs.set('#text', decodeXmlEntities(text))
    }
    addChild(tag, attrs) {
        const e = new Node(tag, attrs)
        this.nodes.push(e)
        return e
    }
    toString() {
        return stringifyNode(this)
    }

    addPropertyResolver(getter, propKey) {
        (this.$propertyResolvers || (this.$propertyResolvers = [])).push(
            propKey
                ? (c, acc)=> setKeyVal(acc, propKey, getter(c))
                : (c, acc)=> Object.entries(getter(c)||{}).forEach(([key, val])=>setKeyVal(acc, key, val))
        )
    }
              
    addInitialState(values) {
        const obj = this.initialState || (this.initialState = {})
        Object.entries(values).forEach(([key, val])=> setKeyVal(obj, key, val))
        return this
    }
              
    get initializers(){
        return this.$initializers || (this.$initializers = [])
    }

    addPropertyConnector(v, getter) {
        const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
        const pipec = withPipes(pipes)
        this.initializers.push(c => c.connect(key, rr => (getter(pipec(c, rr)))))
    }

    addEmitter(v, k) {
        const [key, ...pipes] = v.slice(2).split('|').map(s => s.trim())
        const pipec = withPipes(pipes)
        this.initializers.push(c => ({payload: { [k]: data => c.emit(key, pipec(c, data))}}))
    } 

    clone(uid) {
        return Object.assign(new Node(this.tag), {
            uid,
            getNodes: this.getNodes,
            $propertyResolvers: this.$propertyResolvers ? [...this.$propertyResolvers] : null,
            initialState: this.initialState ? {...this.initialState} : null,
            $initializers: this.$initializers ? [...this.$initializers] : null,
        })
    }

    resolveProps(c, isInitial) {
        let props = this.$propertyResolvers ? this.$propertyResolvers.reduce((r, fn) => { fn(c, r); return r }, {}) : {}
        if (isInitial && this.initialState) {
            const initialState = this.initialState
            props = { ...initialState, ...props }
            if (props.data && initialState.data) {
                props.data = { ...initialState.data, ...props.data }
            }
        }
        return props
    }
}