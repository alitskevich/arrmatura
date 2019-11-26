# Templates

## Insight Sample

```html

<template id="NavTreeItem">
<a href="#{id}">
    <span>{name|limitSize:50}</span>
    <span ui:if={label} class="label label-error">{label}</span>
</a>
</template>

<template id="NavTree">
<ul class="nav">
    <li class="nav-item {item.class}" ui:for="item of data">
        <NavTreeItem ui:props={item}>
        <NavTree ui:if={item.subs} data={item.subs} />
    </li>
</ul>
</template>
```

## Control flow 


### Conditionals

#### Basic syntax
 - <... x:if="expression">
	- <x:else>
	- slot()

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

`prop=":resId"` sets resources from `app.resources[resId]` into `prop`.

`prop="{{from}}"` sets value of `from` component property into `prop`.
>values of `function` type are implicitly bound to component instance.



 - <... x:for="item of dataExpression">	
	- <x:empty>
	- <x:loading>

### Fragment

Fragment element `<ui:fragment>` is a transparent container and works just like a parens.

  ```html
  <ui:fragment ui:if="enabled">
    <innerContent1/>...<innerContentN/>
  </ui:fragment>
  ```

>Useful to apply `ui:if`, `ui:each` to multiple elements as a whole.
>
>Also can be used as a root element.

## Reference

Use `x:ref="id"` attribute to make global-scope reference to a component.	
	
## Slots

Component content may be parametrized from outside.
Slot is a placeholder to be replaced with Component content parameter.

__syntax__	
```html
    <Comp>
        <SomeContent/>
        <SomeContent2/>
    </Comp>
```

```html
<div class="component template">
    <!-- <SomeContent/><SomeContent2/> will be placed here 
    instead of <x:slot/> -->
    <x:slot> 
</div>
```

#### Partial slots

```html
    <Comp>
        <Comp:key1><SomeContent1/></Comp:key1>
        <Comp:key2><SomeContent2/></Comp:key2>
        <SomeContent/>
    </Comp>
```

```html
<div class="component template">
    <!-- <SomeContent1/> will be placed here 
    instead of <x:slot/> -->
    <x:slot  key="key1">
    <div class="component template">
        <!-- <SomeContent2/> will be placed here 
        instead of <x:slot/> -->
        <x:slot key="key2"> 
    </div> 
    <!-- <SomeContent/> will be placed here 
    instead of <x:slot/> -->
    <x:slot> 
</div>
	<x:slot>
```       

	
## Dynamic tags

Dynamic tag allows to calculate tag on the fly.
  `<ui:SomeType>` - specifies an element of type based on a value of a `SomeType` property
   
__syntax__ `<x:tag tag="interpolationExpression" ...>`
        
## Property binding

Property propagation

__syntax__ `prop={ownerPropPath}`

String Interpolation

`prop="prefix{{from}}suffix"` interpolates string with value of `from` property to be set into `prop`

__syntax__ `prop="{ownerProp}text{ownerProp2}"`

Spread properties from object
- `ui:props="expr"` spreads the `expr` expression object values into properties of an element.

__syntax__ `x:props={object}`

Assign global resources

__syntax__ `prop={:resPathExpression}`

Using of pipes

`"prop={{from|pipe|pipe2...}}"` applies chain of pipes defined in `app.pipes`.

__syntax__ `prop={expr|pipeFn1:arg1:arg2|pipeFn2:@prop2}`

## Left arrows: subscribe

Left arrow allows hot subscription to specifed property of refered component
`data="<- url"` subscribes to data from outside (`app.fetch(url, cb)`).

__syntax__ `targetProp="<-ref.prop|pipes"`

## Right arrows: events emitters

Right arrow create a function that emits event emit to specified 
event handler passing data payload.


`click="-> url"` produces function that emits a `data-*` payload to an `app.emit(url, payload)`.


@see `Comp.onSomeAction(data, This)` for details about how it will be handled.

__syntax__ 
    
    < ... actionProp="-> ref.action|dataPipes" data-key={} data={..} >

- `-> this.action` use keyword `this` to refer to owner component

## Right arrows: owner updaters


- `->` updates owner component with data
- `-> prop` updates givem prop of owner component with data

