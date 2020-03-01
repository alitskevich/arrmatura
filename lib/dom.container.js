import { applyAttributes, cleanupAttributes } from './dom.attrs'
import { renderContent } from './render.js'

function append(e, p, cursor) {
    let before = cursor ? cursor.nextSibling : p.firstChild
    if (!before) {
        if (p !== e.parentElement) {
            p.appendChild(e)
        }
    } else if (e !== before) {
        p.insertBefore(e, before)
    }
    return e
}

export class DomAppContainer {
    constructor(props) {
        Object.assign(this, props)
        this.elt = this.rootElement || document.body
        this.app = this
    }

    onCreateElement(E, tag) {
        E.elt = tag === '#text' ? document.createTextNode('') : document.createElement(tag)
        E.elt.impl = E

        let $p = E.$.parent
        while ($p && !$p.impl.elt) {$p=$p.parent}
        E.parent = $p
    }
    onDoneElement(E) {
        const e = E.elt
        const p = e.parentElement
        if (p) {
            p.removeChild(e)
        }
        cleanupAttributes.call(E)
        E.elt = null    
    }
    onRenderElement(E, attrs, content) {
        const e = E.elt 
        // render underlying content
        if (content) {
            e.cursor = {elt:null}
            renderContent(E.$.owner, E.$, content)
            e.cursor = null
        }
        // apply attributes
        if (attrs) {
            applyAttributes.call(E, attrs)
        }
    
        const p = E.parent.impl.elt
    
        // Case 1. we are under parent rendering flow
        if (p.cursor) {
            p.cursor.elt = append(e, p, p.cursor.elt)
            return
        } 
        // Case 2. instant rendering
        p.cursor = {elt:null}
        renderContent(E.parent.owner, E.parent, E.parent.content)
        p.cursor = null
    }
}
