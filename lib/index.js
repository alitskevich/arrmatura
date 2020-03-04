import { ContainerComponent } from './component.js'
import { registerTypes } from './register.js'
import { Node } from './node'
import { arrangeElements } from './utils'

export function launch({ types, template = '<App/>', rootElement = document.body, ...props } = {}) {
    class $AppContext {
        constructor() {
            this.elt = rootElement
            this.app = this
        }
    }
    registerTypes([Object.assign($AppContext, {template}), ...types])
    const top = new ContainerComponent($AppContext, new Node('#top'))
    top.up(props)
    top.log(''+top)
    arrangeElements(top)
    return top.impl
}

if (typeof window === 'object') {
    window.launch = launch
}