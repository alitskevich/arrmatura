export class Element  {
    constructor($) {
        this.$ = $
        this.$.app.onCreateElement(this, $.node.tag)
    }
    done() {
        this.$.app.onDoneElement(this)
        this.$ = null
    }
    setState (Δ) {
        this.$.app.onRenderElement(this, Δ, this.$.nodes)
    }
}