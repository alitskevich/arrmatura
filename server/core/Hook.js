export class Hook {
    init() {
        const handler = this.createHandler();
        ['before', 'after', 'error'].forEach(point => (
            this[point] && this[point].split(',').forEach(key =>
                this.$.parent.impl.addHook(point + ':' + key, handler)
            ))
        );
    }
    createHandler() {
        return (ctx) => this.handle(ctx)
    }
    handle(ctx) {

    }
}
