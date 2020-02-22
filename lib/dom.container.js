import { applyAttributes, cleanupAttributes } from './dom.attrs';

function append(e, p, before) {
  if (!before) {
    if (p !== e.parentElement) {
      p.appendChild(e);
    }
  } else if (e !== before) {
    p.insertBefore(e, before);
  }
}

export class DomAppContainer {
  constructor(props) {
    Object.assign(this, props);
    this.elt = this.rootElement || document.body
  }

  onCreateElement(E, tag, attrs) {
    E.elt = tag === '#text' ? document.createTextNode('') : document.createElement(tag);
    E.elt.impl = E
    applyAttributes.call(E, attrs);

    let $p = E.$.parent;
    while ($p && !$p.impl.elt) {$p=$p.parent}
    E.parent = $p
   }
   onDoneElement(E) {
    const e = E.elt;
    const p = e.parentElement;
    if (p) {
      p.removeChild(e);
    }
    cleanupAttributes.call(E);
    E.elt = null;    
   }
   onRenderElement(E, attrs, content, render) {
    const e = E.elt; 
    // render underlying content
    if (content) {
      e.cursor = {elt:null}
      render(E.$, content);
      e.cursor = null
    }
    // apply attributes
    if (attrs) {
      applyAttributes.call(E, attrs);
    }
    
    const p = E.parent.impl.elt
    
    // Case 1. we are under parent rendering flow
    if (p.cursor) {
      let before = p.cursor.elt ? p.cursor.elt.nextSibling : p.firstChild
      append(e, p, before)
      p.cursor.elt = e
      return
    } 
    // Case 2. instant rendering
    p.cursor = {elt:null}
    render(E.parent, E.parent.content);
    p.cursor = null
  }
}
