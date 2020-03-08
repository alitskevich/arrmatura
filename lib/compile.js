import { Node } from './node'
import { compileExpression } from './compile.expr'
import { parseXML } from './xml.js'
import { filterMapKey, hasSlot, wrapNode } from './utils'

export const compiledNodeMap = nodes => nodes ? nodes.map(compileNode).reduce((map, node) => map.set(node.uid, node), new Map()) : null

export function compileFor (r) {
  const [itemName, prep, expr = prep] = r.extractAttr('ui:for').split(' ')
  return compileNode(new Node(
    'ui:for',
    new Map([['items', '{:<'.includes(expr[0]) ? expr : `{${expr}}`]]),
    [new Node(
      'ui:item',
      new Map([['itemName', itemName]]),
      [r]
    )]))
}

export function compileIf (r) {
  const { tag, nodes } = r
  const [expr, attrs] = filterMapKey(r.attrs, 'ui:if')
  const iff = {}
  const ifNode = new Node('ui:fragment')
  if (expr[0] === '<' && expr[1] === '-') {
    ifNode.addPropertyConnector(expr, condition => ({ condition }))
  } else if ((expr.slice(0, 5) === 'slot(')) {
    ifNode.addPropertyResolver((slotId => c => hasSlot(c, slotId))(expr.slice(5, -1)), 'condition')
  } else {
    ifNode.addPropertyResolver(compileExpression(expr[0] === '{' ? expr : `{${expr}}`), 'condition')
  }
  const $then = new Node(tag, attrs, nodes)
  if (nodes && nodes.length) {
    const ifElse = nodes.find(e => e.tag === 'ui:else')
    const ifThen = nodes.find(e => e.tag === 'ui:then')
    if (ifElse) {
      iff.else = compiledNodeMap(ifElse.nodes)
      $then.nodes = ifThen ? ifThen.nodes : nodes.filter(e => e !== ifElse)
    } else if (ifThen) {
      $then.nodes = ifThen.nodes
    }
  }
  iff.then = compiledNodeMap([$then])
  return Object.assign(ifNode, {
    getNodes: ($) => $.state.condition ? iff.then : iff.else
  })
}

export function compileTag (r) {
  const { uid: uid0, nodes } = r
  const [expr, attrs] = filterMapKey(r.attrs, 'tag')
  const node = compileRegularNode(new Node('', attrs, nodes))
  if (expr[0] === '<' && expr[1] === '-') {
    r.addPropertyConnector(expr, tag => ({ tag }))
  } else {
    r.addPropertyResolver(compileExpression(expr), 'tag')
  }
  return Object.assign(r, {
    tag: 'ui:fragment',
    getNodes: ($, tag = $.state.tag, uid = uid0 + ':' + tag) => wrapNode(Object.assign(node, { tag, uid }))
  })
}

export function compileRegularNode (r) {
  r.attrs.forEach((v, k) => {
    if (k === 'id') {
      r.id = v
      r.addInitialState({ [k]: v })
    } else if (k === 'ui:ref') {
      r.refId = v
    } else if (k === 'ui:props') {
      if (v[0] === '<' && v[1] === '-') {
        r.addPropertyConnector(v, Function.ID)
      } else {
        r.addPropertyResolver(compileExpression(v))
      }
    } else {
      if (v[0] === '<' && v[1] === '-') {
        r.addPropertyConnector(v, rr => ({ [k]: rr }))
      } else if (v[0] === '-' && v[1] === '>') {
        r.addEmitter(v, k)
      } else {
        if (typeof v === 'string' && !v.includes('{') && v[0] !== ':') {
          r.addInitialState({ [k]: v })
        } else {
          r.addPropertyResolver(compileExpression(v), k)
        }
      }
    }
  })
  return Object.assign(r, {
    nodeMap: compiledNodeMap(r.nodes)
  })
}
export function compileNode (node) {
  if (node.attrs.has('ui:for')) { return compileFor(node) }
  if (node.attrs.has('ui:if')) { return compileIf(node) }
  if (node.tag === 'ui:tag') { return compileTag(node) }
  return compileRegularNode(node)
}

export function compileTemplate (text, name) {
  try {
    const T = compiledNodeMap(text ? parseXML(text, name).nodes : [])
    return T
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error('compile ' + name, ex)
  }
  return []
}
