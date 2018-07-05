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
        <img ui:ref="img1" src="{{item.src}}" data-value="{{item.value}}" click="{{assign}}"/>
        <span>{{itemIndex}}. {{item.name}}</span>
      </li>
    </ul>`
  }
  // hook called once on component init
  init(){
    // can refer its elements having `ui:ref`: this.img1.style="width:100px"
    // may return defered function
  }
  // updates component state and re-render. Patched by framework.
  assign(delta) {
    // May use 'this.super_assign(delta)' in overriden method.
  }
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
  // optional interceptor. to be used to resolve all template expression placeholders
  // (like a `Proxy`).
  get(key) { return this.state[key] }
}
```

... or `bare-template` definition in html file:

```html
<script type="text/x-template" id="MyHeader">
  <header class="header">
    <h1 ui:if="title">{{title}}</h1>
    <input type="text" class="new-todo" placeholder=":new_todo_hint" enter="-> add"/>
  </header>
</script>
```

## Templates

### Fragments

Fragment element `<ui:fragment>` is a transparent container and works just like a parens.

  ```html
  <ui:fragment ui:if="enabled">
    <innerContent1/>...<innerContentN/>
  </ui:fragment>
  ```

>Useful to apply `ui:if`, `ui:each` to multiple elements as a whole.
>
>Also can be used as a root element.

### Conditionals

#### Basic syntax

Attribute `ui:if` enables an element(and its inner context) if value of a specific component property is truthy.

  ```html
  <tag ui:if="prop">
  ```

> No brackets here.
>
> No expressions, except can use excl to invert condition `ui:if="!prop"`

#### Extended syntax

  ```html
  <ui:fragment ui:if="enabled">
    <ui:then><innerContent1/></ui:then>
    <ui:else><innerContentN/></ui:else>
  </ui:fragment>
  ```

### Iterations

 `ui:each` attribute created multiple copies of an element iterating over items of from specified component property.

  ```html
  <ul>
    <li ui:each="item of items">
      <span>{{itemIndex}}. {{item.name}}</span>
    </li>
  </ul>
  ```

> Current list item is set into `this.item` and accessible programmatically.
>
> iterative elements are matched and re-used based on `item.id`
>
> `itemIndex` contains current index
>
> Beside properties, it's able to iterate instantly over specific resource `<ul ui:each="item of :resId">`

### properties (_and inner text_)

`prop="value"` sets any primitive `value` into `prop` property of an element just like plain HTML.

>'true', 'false' are narrowed to boolean.

`prop=":resId"` sets resources from `app.resource(resId)` into `prop`.

`prop="{{from}}"` sets value of `from` component property into `prop`.
>values of `function` type are implicitly bound to component instance.

#### interpolation

`prop="prefix{{from}}suffix"` interpolates string with value of `from` property to be set into `prop`

#### pipes

`"prop={{from|pipe|pipe2...}}"` applies chain of pipes defined in `app.pipes`.

#### spreading

- `ui:props="expr"` spreads the `expr` expression object values into properties of an element.

### dynamic elements

- `<ui:SomeType>` - specifies an element of type based on a value of a `SomeType` property

### side-effects

`data="<- url"` subscribes to data from outside (`app.fetch(url, cb)`).

`click="-> url"` produces function that emits a `data-*` payload to an `app.emit(url, payload)`.

### Translusion

`<ui:transclude>` - a placeholder to be relaced by inner content of a component.

  ```html
  component usage:
  <C1>
    <innerContent1/>
  </C1>

  in tempalate of C1:
  <div class="c1">
    <transclude/>
  </div>
  ```

#### partial translude

 There can be more than one transclusions

  ```html
  component usage:
  <C1>
    <innerContent1 ui:key="header"/>
    <innerContent2 ui:key="footer"/>
  </C1>

  in tempalate of C1:
  <div>
    <transclude key="header"/>
    <hr/>
    <transclude key="footer"/>
  </div>
  ```

### references

- `ui:ref="some"` - makes an element be accessible programmatically within current component at `init()`.

#### DOM extras

- use flags for conditional classes like `class="active:{{item.flag}}"`
- use equals operation for conditional classes like `class="active:{{item.id}}=={{value}}"`
- use `enter` event handler for `<input type="input">`
- use `toggle` event handler for `<input type="checkbox">`

## Run

```js
Dzi.launch(AppComponent, ...otherComponents)
```

## Sample

[TODOS](https://alitskevich.github.io/dzi-todomvc/)
