## Custom components

It is allowed to develop `component classes`, to be register and then used by `runtime` to create and manage appropriate component instanses with custom behavior.

> Each component has reference to its own context `this.$` and can invoke its methods like `this.$.up()`, `this.$.emit()`, `this.$.defer()`.

```javascript
class Comp1 {

    // returns a template of a component
    get TEMPLATE() {
        return '<...>'
    }

    constructor($context) {
    }

    // life-cycle hooks

    // hook called once on component init
    init($context) {
        // use defer() here if needed
        const cancel = api.listen(this)
        $context.defer(() => cancel(this))

        // will update component state with returned result
        // can be promise as well
        return {
            prop1:'value',
        }
    }

    //    getters/setters

    // optional getter used in the template.
    // (Otherwise read from `this.src`)
    getSrc(){
        return this.url.toString()
    }
    // optional setter invoked when `up()`
    // (Otherwise writes into `this.src`)
    setSrc(value){
        this.url = URL.parse(value)
    }

    // can be promise as well
    getAsyncProp() {
        return this.fechData()
    }

    // action handler invoked when '-> ref.someAction' called
    onSomeAction(data, This) {
        if (asyncMode) {
            return promise.then(() => delta)
        }
        // state update delta object
        return {
            // instant value for 'prop'
            prop: data.value,
            // async evaluation for 'prop'. 'Promise' postfix is optional.
            propPromise: This.fetchProp(),
            // async spread
            '...': Promise.resolve({
                prop1: 'val1'
                prop2: 'val2'
            })
        }
    }

    // logic
    someMethodDemonstratingContextUsages() {
        // reference to this instance context.
        const $ = this.$;

        // update its props state programmatically:
        $.up({ prop: 'value' });

        // emit event programmatically
        $.emit('other.action', data);
    }
}
```
