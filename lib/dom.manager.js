import { Component } from './component.js';
import { render } from './render';
import { registerTypes } from './register.js';
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

function findNextElt($, $0, below) {
    let e = null
    if(!$) return e

    if ($ !== $0){
      e=$.impl.elt
      if(e) return e
      if ($.children) {
        for (let ch of $.children.values()) {
          e = findNextElt(ch, $0, true)
          if (e) return e
        }
      }
    }
    e = $.next && findNextElt($.next, $0, true)
    if (e) return e
    e = !below && $.parent && (!$.parent.impl.elt || $.parent.impl.elt !== $0.impl.parent)  ? findNextElt($.parent.next, $0) : null
    return e
}

class DomNativeManager {
   constructor(app, props) {
     app.elt = props.rootElement || document.body;
   }
   onCreate(E, tag, attrs) {
    E.elt = tag === '#text' ? document.createTextNode('') : document.createElement(tag);
    applyAttributes.call(E, attrs);

    let $p = E.$.parent;
    while ($p && !$p.impl.elt) {$p=$p.parent}
    E.parent = $p

   }
   onDone(E) {
    const e = E.elt;
    const p = e.parentElement;
    if (p) {
      p.removeChild(e);
    }
    cleanupAttributes.call(E);
    E.elt = null;    
   }
   onRender(E, attrs, content, render) {
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
    append(e, p, findNextElt(E.$, E.$))
  }
}

class WebClientApp {
  constructor(props, $) {
    Object.assign(this, props);
    this.nativeManager = new DomNativeManager(this, props)
  }
}

export function launch({ types, template, App = WebClientApp, ...props } = {}) {
  App.template = template || App.template || `<${types[0].name || types[0].NAME}/>`;
  registerTypes([App].concat(types))
  const a = new Component(App, { props });

  const fn = () => { render(a); a.init(); }
  if (typeof window === 'object') {
    window.requestAnimationFrame(fn);
  } else {
    fn()
  }

  return a.impl;
}

if (typeof window === 'object') {
  window.launch = launch;
}