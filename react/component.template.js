/* eslint-disable no-console */
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { REGISTRY } from './utils.js'

import { AbstractComponent } from './component.abstract'

export function renderContent (container, nodes, elements = []) {
  if (!nodes || !nodes.size) return null
  nodes.forEach((node) => {
    const props = node.resolveProps(container)
    if (node.tag === 'ui:slot') {
      const slotId = node.get('key')
      if (slotId) {
        renderContent(container.container, container.node['nodes_' + slotId], elements)
      } else if (container.props.children) {
        elements.push(...container.props.children)
      }
    } else if (node.tag === 'ui:fragment') {
      renderContent(container, node.nodes, elements)
    } else if (node.tag === 'ui:if') {
      renderContent(container, node['nodes' + (props.condition ? '' : '_else')], elements)
    } else if (node.tag === 'ui:tag') {
      Object.assign(node.firstChild, { tag: props.tag, uid: node.uid + ':' + props.tag })
      renderContent(container, node.nodes, elements)
    } else if (node.tag === 'ui:for') {
      const { items, itemName, ...itemProps } = props
      if (items && items.length) {
        if (!items.forEach) Function.throw('[ui:for] Items has no forEach() ' + items)
        items.forEach((d, index) => {
          const pk = d.id || index
          elements.push(React.createElement(ItemComponent, { itemProps, itemName, [itemName]: d, [itemName + 'Index']: index, key: pk, node, container }))
        })
      }
    } else {
      const Registered = REGISTRY.get(node.tag)
      const { style: inlineStyle, onPress: touch, ...tProps } = props

      const { props: rProps, style, tag: rTag, rawStyle } = container.app.resolveClass(
        `${node.tag} ${container.node.tag + ':' + node.tag}${props.class ? ' ' : ''}`,
        inlineStyle
      )
      const rChildren = renderContent(container, node.nodes)
      const actualProps = { ...rProps, ...tProps, style, onPress: touch ? (ev) => touch(props.data, ev) : undefined }

      if (Registered) {
        console.log('render Registered ' + node.tag + node.uid, actualProps, rawStyle, touch)
        elements.push(React.createElement(Registered,
          Registered.prototype instanceof TemplateComponent
            ? { ...actualProps, node, container }
            : actualProps, rChildren
        ))
      } else if (node.tag === '#text') {
        elements.push(React.createElement(Text, { key: node.uid }, props['#text']))
      } else {
        console.log('render elementary ' + node.tag + '@' + node.uid, actualProps, rawStyle)
        elements.push(touch
          ? React.createElement(TouchableOpacity, actualProps, rChildren)
          : React.createElement(REGISTRY.get(rTag) || View, actualProps, rChildren)
        )
      }
    }
  })
  return elements
}

export class TemplateComponent extends AbstractComponent {
  render () {
    return renderContent(this, this.rootNode.nodes)
  }
}

class ItemComponent extends AbstractComponent {
  render () {
    return renderContent(this, this.node.nodes)
  }

  emit (key, data) {
    return this.container.emit(key, data)
  }

  get (propId) {
    const itemName = this.impl.itemName
    const pk = propId.slice(0, itemName.length)
    return pk === itemName ? super.get(propId) : this.container.get(propId)
  }
}
