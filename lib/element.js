import { render } from './render.js';

export class Element {
  get nativeManager(){
    return this.$.app.nativeManager
  }
  constructor(attrs, $) {
    this.$ = $
    this.nativeManager.onCreate(this, $.tag, attrs)
  }
  done() {
    this.nativeManager.onDone(this)
    this.$ = null
  }
  set(delta) {
    this.delta = this.delta ? Object.assign(this.delta, delta) : delta;
    return this.$.nodes || delta && Object.keys(delta).length;
  }
  render() {
    this.nativeManager.onRender(this, this.delta, this.$.content, render)
    this.delta = null;
  }
}