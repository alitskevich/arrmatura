// ==========
// Component
// ----------
export class Component {
  constructor (Ctor) {
    this.$ = new Ctor()
    // mutual reference
    this.$.$ = this
  }
  init () {
    if (this.$.init) {
      this.defer(this.$.init(this))
    }
  }
  done () {
    if (this.defered) {
      this.defered.forEach(f => f.call(this, this))
      delete this.defered
    }
    this.$ = this.$.$ = null
  }
  defer (fn) {
    if (fn) {
      (this.defered || (this.defered = [])).push(fn)
    }
  }
  assign (delta) {
    this.$ && this.$.assign(delta)
  }
}
