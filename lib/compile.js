import { Node } from './node'
import { compileExpression } from './compile.expr'
import { parseXML } from './xml.js'
import { setNodeMap } from './utils'

const hasSlot = (c, id) => {
    let r = false
    const tag = c.container.tag
    const nodes = c.container.nodes
    if (!nodes) return r
    if (id && id !== 'default') {
        nodes.forEach((e) => { r = r || (e.tag === tag + ':' + id) })
    } else {
        nodes.forEach((e) => { r = r || (e.tag.slice(0, tag.length + 1) !== tag + ':') })
    }
    return r
}
const compiledNodeMap = nodes => nodes ? nodes.map(compileNode).reduce((map, node)=> map.set(node.uid, node), new Map()) : null

export const filterMapKey = (src, key) => {
    const r = new Map()
    src.forEach((v, k) => { if (k !== key) { r.set(k, v) } })
    return [src.get(key), r]
}

export function compileFor (r) {
    const { tag, nodes } = r
    const [formula, attrs] = filterMapKey(r.attrs, 'ui:for')
    const [itemName, , expr] = formula.split(' ')
    if ((expr.slice(0, 2) === '<-')) {
        r.addPropertyConnector(expr, data => ({ data }))
    } else {
        const gettr = compileExpression('{:'.includes(expr[0]) ? expr : '{' + expr + '}')
        r.addPropertyResolver(gettr, 'data')
    }
    const itemNode = compileNode(new Node(tag, attrs, nodes))
    return Object.assign(r, {
        tag: 'ui:for',
        getNodes: $ => {
            const acc = new Map()
            const { data } = $.state
            if (data && data.length) {
                if (!data.forEach) {
                    throw new Error('[ui:for] data has no forEach()', data)
                }
                data.forEach((d, index) => {
                    const uid = `${d.id || index}`
                    const node = itemNode//.clone('e:'+uid)
                    const item = new Node('ui:item', attrs, new Map([[node.uid, node]]))
                        .addInitialState({ itemName, [itemName]: d, [itemName + 'Index']: index })
                    item.uid = uid
                    setNodeMap(acc, item)
                })
            }
            return acc
        }
    })
}

export function compileIf (r) {
    const { tag, nodes } = r
    const [expr, attrs] = filterMapKey(r.attrs, 'ui:if')
    const iff = {}
    const ifNode = new Node('ui:fragment')
    if ((expr.slice(0, 2) === '<-')) {
        ifNode.addPropertyConnector( condition => ({ condition }))
    } else if ((expr.slice(0, 5) === 'slot(')) {
        ifNode.addPropertyResolver((slotId => c => hasSlot(c, slotId))(expr.slice(5, -1)), 'condition')
    } else {
        ifNode.addPropertyResolver(compileExpression(expr[0]==='{' ? expr : `{${expr}}`), 'condition')
    }
    const $then = new Node(tag, attrs, nodes)
    if (nodes && nodes.length) {
        const ifElse = nodes.find(e => e.tag === 'ui:else')
        const ifThen = nodes.find(e => e.tag === 'ui:then')
        if (ifElse) {
            iff.else = ifElse.nodes.map(compileNode)
            $then.nodes = ifThen ? ifThen.nodes : nodes.filter(e => e !== ifElse)
        } else if (ifThen) {
            $then.nodes = ifThen.nodes
        }
    }
    iff.then = [$then]
    return Object.assign(ifNode, {
        getNodes: ($) => compiledNodeMap($.state.condition ? iff.then : iff.else)
    })
}

export function compileTag (r) {
    const { uid:uid0, nodes } = r
    const [expr, attrs] = filterMapKey(r.attrs, 'tag')
    const node = compileRegularNode(new Node('', attrs, nodes ))
    if ((expr.slice(0, 2) === '<-')) {
        r.addPropertyConnector( tag => ({ tag }))
    } else {
        r.addPropertyResolver(compileExpression(expr), 'tag')
    }
    return Object.assign(r, {
        tag: 'ui:fragment',
        getNodes: ($, tag = $.state.tag, uid = uid0+':'+tag) => new Map([[uid, Object.assign(node, { tag, uid })]])
    })
}

export function compileRegularNode (r) {
    r.attrs.forEach((v, k) => {
        if (k==='id') { r.id = v }
        else if (k==='ui:ref') { r.refId = v }
        else if (k==='ui:props') { 
            if ((v.slice(0, 2) === '<-')) {
                r.addPropertyConnector(v, Function.ID)
            } else {
                r.addPropertyResolver(compileExpression(v))
            }
        } else {
            const v2 = v.slice(0, 2)
            if (v2 === '<-') {
                r.addPropertyConnector(v, rr => ({ [k]: rr }))
            } else if (v2 === '->') {
                r.addEmitter(v, k)
            } else {
                if (!v.includes('{') && v[0] !== ':') {
                    r.addInitialState({ [k]: v })
                } else {
                    r.addPropertyResolver(compileExpression(v), k)
                }
            }
        }
    })
    return Object.assign(r, {
        getNodes: (nodes => () => nodes)(compiledNodeMap(r.nodes))
    })
}
export function compileNode (node) {
    if (node.attrs.has('ui:for')) { return compileFor(node) }
    if (node.attrs.has('ui:if')) { return compileIf(node) }
    if (node.tag === 'ui:tag') { return compileTag(node) }
    return compileRegularNode(node)
}

export function compileTemplate(text, name) {
    try {
        const T = compiledNodeMap(text ? parseXML(text, name).nodes : [])
        return T
    } catch (ex) {
        // eslint-disable-next-line no-console
        console.error('compile ' + name, ex)
    }
    return []
}