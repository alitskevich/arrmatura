	
## Custom components 

It is allowed to develop and register custom component classes, to be used to create and manage light-weight component instanses.

```javascript
class Comp1 {

    // returns a template of a component
    TEMPLATE() {
        return '<...>'
    }

    constructor(initialProps, $) {
        // not need to assign initialProps here
        // all the initials props will be passed into $.up() just after
    }

    // life-cycle hooks

    // hook called once on component init
    init($) {
        // use defer() here if needed
        $.defer(()=> this.close())

        // can be promise as well
        return {
            prop1:'',
        }
    }

    //    getters/setters	

    // optional getter used to resolve specific template property placeholder.
    // (Otherwise read from `this.src`)
    getSrc(){
        return this.url.toString()
    }
    // optional setter invoked from `assign()`
    // (Otherwise writes into `this.src`)
    setSrc(value){
        this.url = URL.parse(value)
    }

    // can be promise as well
    getAsyncProp() {
        return this.fechData() 
    }	

    
    // action events handler
    onSomeAction(data, This) {
        
        if (asynch) {
            return promise.then(()=>delta)
        }
        // state update delta object
        return {
            prop: data.value,
            propPromise: This.fetchProp(),
            '...': Promise.resolve({
                prop: 'val2'
            })
        }
    }

    render($, renderFn) {
        // custom rendering. very rare need to override
    }
```

Such instances are wrapped with each own context from internal components hierarhy built according templates and current data. Component code has reference to its context `this.$` and may invoke some of its useful methods, such as `up()`, `emit()`, `defer()`.

```javascript

    // logic
    someMethodDemonstratingContextUsages() {
        // reference to this instance context.
        const $ = this.$;
        // update its props state programmatically:
        //  - instant
        $.up(delta);
        //  - async delta
        $.up(promise.then(()=>delta));
        //  - async properties:
        $.up({
            prop: 'instantValue',
            propPromise: This.fetchProp(),
        });
        // - spread props
        $.up({
            '...': Promise.resolve({
                prop: 'val2'
            })
        });

        // emit event programmatically
        $.emit('other.action', data);

    }
}
```