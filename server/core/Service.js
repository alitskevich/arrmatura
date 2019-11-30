const logger = require('./logger');
export class Service {
    constructor(props, $) {
        Object.assign(this, props)
        this.app = $.app;
        this.parent = $.parent.impl;
    }
    init() {
        this.app.log(this.$.tag, 'entity')
        this.configure(this.app)
    }
    configure(app) {

    }
    render($, render) {
        render($, $.content)
    }
    log(...args) {
        return logger.info(...args)
    }
    error(...args) {
        return logger.error(...args)
    }
}