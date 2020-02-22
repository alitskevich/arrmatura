import { render } from './render.js';

export class Element {
  constructor(attrs, $) {
    this.$ = $
    this.$.app.onCreateElement(this, $.tag, attrs)
  }
  done() {
    this.$.app.onDoneElement(this)
    this.$ = null
  }
  set(delta) {
    this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }
  render() {
    this.$.app.onRenderElement(this, this.delta, this.$.content, render)
    this.delta = null;
  }
}