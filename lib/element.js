import { applyAttributes, cleanupAttributes } from './dom.attrs'

export class Element {
  constructor (attrs, $, elt) {
    this.$ = $
    this.elt = elt || ($.tag === '#text' ? document.createTextNode('') : document.createElement($.tag))
    this.elt.impl = this
  }

  done () {
    this.elt.parentElement && this.elt.parentElement.removeChild(this.elt)
    cleanupAttributes.call(this)
    this.elt = null
  }

  stateChanged (attrs) {
    applyAttributes.call(this, attrs)
  }
}
