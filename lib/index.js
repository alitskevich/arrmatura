import { Component } from './component.js'
import { registerTypes } from './register.js'
import { DomAppContainer } from './dom.container'
import { Node } from './node'
import { compileTemplate } from './compile.js'

export function launch({ types, template = '<App/>', ...props } = {}) {
    registerTypes([Object.assign(DomAppContainer, {template}), ...types])
    const node = new Node('', null, compileTemplate(template, '[TOP]'))
    const top = new Component(DomAppContainer, node)
    top.up(props)
    return top.impl
}

if (typeof window === 'object') {
    window.launch = launch
}