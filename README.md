# Dzi-UI

Dzi-UI is a minimalistic UI framework
that powers the front-end with the true dynamic components.

## Application

An Application is the top-level component which may provide app-scope features such as side-effects, resources and pipes.

```js
export class SampleApplication {
  // handles `-> ...` side-effect
  emit (url, payload) {
    store.dispatch(url, payload)
  }
  // handles `<- ...` side-effect
  fetch (url, cb) {
    const cancelFn = store.subscribe(url, cb)
    return cancelFn
  }
  // resolves static resources from `:key` pattern.
  resource (key) {
    return RES[key] || key
  }
  // pipes used to adjust component properties values, `{{prop|pipe}}`
  get pipes() {
    return PIPES
  }
}
```

## Component

Component is UI building block consist of template, state accessors, life-time hooks.
```js
class MyComponent {
    // returns a template of a component
    TEMPLATE(){
        return /*template*/`
        <ul>
          <li ui:each="item of items" ui:if="item.enabled">
            <img id="img1" src="{{item.src}}" data-value="{{item.value}}" click="{{assign}}"/>
            <span>{{itemIndex}}. {{item.name}}</span>
          </li>
        </ul>
        `
    }
    // hook called once on component init
    init(){
      // may address DOM elements by id: this.img1.style="width:100px"
      // may invoke this.defer(finalizerFn)
    }
    // optional getter used to resolve specific template property placeholder.
    // (Otherwise `this.src` will be read)
    getSrc(){
        return this.url.toString()
    }
    // optional setter invoked from `assign()`
    // (Otherwise `this.src` will be written into)
    setSrc(value){
        this.url = URL.parse(value)
    }
    // updates component state. Patched by framework. May use '__assign__' in overriden method.
    assign(delta) { ... }
    // renders component UI. Patched by framework. May use '__render__' in overriden method.
    render() { ... }
    // adds function to be called on component done. Patched by framework.
    defer(cb){ ... }
    // optional interceptor. may be used to resolve all template expression placeholders 
    // (like a `Proxy`).
    get(key) { return this.state[key] }
}
```

... or `bare-template` definition

```html
<script type="text/x-template" id="MyHeader">
  <header class="header">
    <h1 ui:if="title">{{title}}</h1>
    <input type="text" class="new-todo" placeholder=":new_todo_hint" enter="-> add"/>
  </header>
</script>
```

## Template Cheatsheet

### attributes

- `ui:if="prop"` conditional presence based on a value of a `prop` property
- `ui:each="item of prop"` - iteration over items of list from a `prop` property. Current list item is set into `item`. (`item.id` is used here to match and re-use item components) (`itemIndex` contains current index)
- `ui:props="expr"` - spreads values of object from `expr` expression into properties of a component.
- `ui:key="some"` - to mark a inner content element to be transcluded in place of `<ui:transclude key="some"/>`.

### tags

- `<ui:fragment>` - a transparent container. Useful to wrap multiple tags, apply `ui:if`, `ui:each`
- `<ui:then>` - a positive conditional container. Used with `ui:if`.
- `<ui:else>` - a negative conditional container. Used with `ui:if`.
- `<ui:transclude [key="key"]>` - a placeholder for a component content to be inserted in place of.
- `<ui:Some>` - a true dynamic tag/component based on a value of a `Some` property

### attribute expressions (also used for inner text)

- `"value"` any primitive string. ('true', 'false' are narrowed to boolean.)
- `":resId"` gets resources from `app.res(resId)`
- `"{{prop[|pipe]*}}"` value of `prop` property. Optional left-to-right chain pipes defined in `app.pipes` object.
- `"prefix{{prop}}suffix"` interpolate string with value of `prop` property

### attribute side-effects

- `data="<- url"` subscribes to data from outside (`app.fetch(url, cb)`).
- `click="-> url"` produces event handler that emits a `data-*` payload to an `app.emit(url, payload)`.

### syntactic sugar (often allows `bare-template` component definition)

- use flags for conditional classes like `class="active:{{item.flag}}"`
- use equals operation for conditional classes like `class="active:{{item.id}}=={{value}}"`
- use `enter` event handler for `<input type="input">`
- use `toggle` event handler for `<input type="checkbox">`
- use colon to iterate over resource `ui:each="item of :resId"`
- use excl to invert conditional `ui:if="!prop"`

## Run

```js
Dzi.launch(AppComponent, ...otherComponents)
```

## Sample

[TODOS](https://alitskevich.github.io/dzi-todomvc/)
