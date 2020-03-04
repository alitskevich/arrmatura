import { applyAttributes, cleanupAttributes } from './dom.attrs'
import { arrangeElements } from './utils'

export class Element  {
    constructor($, elt) {
        this.$ = $
        this.elt = elt || ($.tag === '#text' ? document.createTextNode('') : document.createElement($.tag))
        this.elt.impl = this
    }
    done() {
        this.elt.parentElement && this.elt.parentElement.removeChild(this.elt)
        cleanupAttributes.call(this)
        this.elt = this.$ = null
    }
    stateChanged (attrs) {
        const $ = this.$
        applyAttributes.call(this, attrs)
        arrangeElements($) 
    }
}