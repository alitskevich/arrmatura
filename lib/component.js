// ==========
// Component
// ----------
export class Component {
    constructor (m, Ctor) {
      this.$ = new Ctor()
      // mutual reference
      this.$.$ = this
    }
    init () {
      if (this.$.init) {
        this.$.init(this)
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
      if (!delta || this.isDone) {
        return
      }
      // prevent recursive invalidations
      this.$assignDepth = (this.$assignDepth || 0) + 1
      if (delta._) {
        delta = {...delta._, ...delta, _: undefined}
      }
      // iterate payload
      for (let k of Object.keys(delta)) {
        const their = delta[k]
        const mine = this.$[k]
        if (k[0] === '$') {
          their.call(this)
        }
        if (their !== undefined && (their !== mine || (typeof their === 'object' && their !== null))) {
          const setter = this.$['set' + k[0].toUpperCase() + k.slice(1)]
          if (setter) {
            setter.call(this.$, their)
          } else {
            this.$[k] = their
          }
        }
      }
      // prevent recursive invalidations
      --this.$assignDepth
      if (this.$assignDepth === 0) {
        this.parentElt.cursor = this.prevElt
        this.$.render(this)
      }
    }
  }
  