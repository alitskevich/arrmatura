
export class WebServerApp {
    constructor(props, $) {
        Object.assign(this, props);
        $.ctx = {}
        $.elt = {}
    }
    init() {
        this.log('WebServerApp init')
        this.web.start();
    }
    log(...args) {
        console.log(...args)
        return this
    }
    configure(...args) {
        this.web.configure(...args)
        return this
    }
    use(...args) {
        this.web.use(...args)
        return this
    }
    hooks(...args) {
        this.web.hooks(...args)
        return this
    }
    get(...args) {
        return this.web.get(...args)
    }
    set(...args) {
        return this.web.set(...args)
    }
    service(...args) {
        return this.web.service(...args)
    }
}