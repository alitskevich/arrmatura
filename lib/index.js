import { Component } from './component.js';
import { render } from './render';
import { registerTypes } from './register.js';
import { DomAppContainer } from './dom.container';

export function launch({ types, template = '<App/>',  ...props } = {}) {
  DomAppContainer.template = template;
  registerTypes([DomAppContainer].concat(types))
  const a = new Component(DomAppContainer, { props });

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