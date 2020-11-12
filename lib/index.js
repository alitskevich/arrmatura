import { ContainerComponent } from './component.js'
import { registerTypes } from './register.js'
import { Node } from './node'
import commonTypes from '../types'
import commonPipes from '../pipes'
import { arrangeElements } from './utils.js'

export function launch ({ types, template = '<App/>', rootElement = document.body, pipes, ...props } = {}) {
  class $AppContext {
    constructor () {
      this.elt = rootElement
      this.app = this
      this.pipes = { ...commonPipes, ...pipes }
      this.reflow = () => {
        arrangeElements(this.$, this.elt)
        this.reflowId = null
      }
    }

    requestReflow () {
      if (this.reflowId) return
      this.reflowId = setTimeout(this.reflow, 10)
    }
  }

  registerTypes([Object.assign($AppContext, { template }), ...commonTypes, ...types])
  const top = new ContainerComponent($AppContext, new Node('#top'))
  top.up(props)
  return top.impl
}

if (typeof window === 'object') {
  window.launch = launch
}
