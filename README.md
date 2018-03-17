Dzi-UI
======
Dzi-UI is a minimalistic UI framework 
that powers the front-end with the true dynamic components.

Style
-----
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Run
---

```js
    Dzi
    .bootstap(rootElt, AppComponent, ...otherComponents)
    .render()
```  

Compose
-------

```js
    class MyComponent {
        // returns a component template text as a strict XML
        TEMPLATE(){
            return `<img src="{{src}}" data-src="{{other}}" click="{{assign}}"/>`
        }
        // called once on component init
        init(ctx){
            return () => deferedCode
        }
        // called once on component done
        done(){
        }
        // optional getter used to resolve specific template expression placeholder.
        // (If no getter specified, then just `this.src` used)
        getSrc(){
            return this.url.toString()
        }
        // optional setter used from `assign()`
        setSrc(value){
            this.url = URL.parse(value)
        }
        // will be pathed by library. do not override.
        // assign (delta) { <library code> }
        // optonal interceptor used to resolve ALL template expression placeholder.
        // get (key) { return this.state[key] }
    }
```  
... or `bare-template` definition
```html
<script type="text/x-template" id="MyHeader">
  <header class="header">
    <h1>{{title}}</h1>
    <input type="text" class="new-todo" placeholder=":new_todo_hint" autofocus="true" enter="-> add"/> 
  </header>
</script>
```

Cheatsheet
----------

tags:
 - `<ui:fragment>` - a transparent container
 - `<ui:then>` - a positive conditional container
 - `<ui:else>` - a negative conditional container
 - `<ui:transclude>` - a placeholder for a component content to be transcluded in place of.
 - `<ui:prop>` - a true dynamic tag/component based on a value of a `prop` property
 
attributes
 - `ui:if="prop"` conditional inclusion based on a value of a `prop` property
 - `ui:each="item of prop"` - iteration over items of list from a `prop` property placing current list item in `item`.(`item.id` is used here to match and re-use item components)
 - `ui:prop="expr"` - spread values of object from `expr` expression into properties of a target component.
 - `ui:key="some"` - to mark a inner component to be transcluded in place of `<ui:transclude key="some"/>`.

attribute expressions (also used for inner text)
 - `"value"` - any primitive string. 'true', 'false' are narrowed to boolean.
 - `":resId"` - value of an application resource by `resId`
 - `"{{prop}}"` - value of `prop` property
 - `"prefix{{prop}}suffix"` - interpolate string with value of `prop` property

attribute side-effects
 - `"<- expr"` - produces and register a callback which to recieve from and subscribe to an application data channel.
 - `"-> expr"` - produces an event handler which to send a data payload to an application dispatcher.

syntactic sugar (often allows `bare-template` component definition):
 - use flags for conditional classes like `class="active:{{flag}}"`
 - use equals operation for conditional classes like `class="active:{{v1}}={{v2}}"`
 - `enter` event handler for `<input type="input">`
 - `toggle` event handler for `<input type="checkbox">`
 - use colon to iterate over resource `ui:each="item of :resId"`
 