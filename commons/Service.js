export class Service {
    constructor(props, $) {
        Object.assign(this, props, {
            ref: $.ref,
            lookupService: (ref) => $.app[ref],
            up: (...args) => $.up(...args),
            emit: (...args) => $.emit(...args),
        });
    }

    log(...args) {
        console.log(this.ref + ': ', ...args)
    }

    handleError({ message = '', code = '' }) {
        // may  overriden from props
        const handler = this.lookupService('errorHandler');
        if (handler) {
            handler.handleError({ message, code, source: this.ref });
        } else {
            console.error(this.ref + ': ERROR: ', message, code)
        }
    }

    safe(p, def) {
        return p.catch(error => {
            this.handleError(error);
            return def ? def(error) : { error };
        })
    }
}