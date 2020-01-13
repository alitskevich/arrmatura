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

 With `ui:if` attribute, an element(and its inner context) presents only if value of expression is truthy.

  ```html
  <tag ... ui:if={expression}>
  ```

##### `then-else` syntax

  ```html
  <ui:fragment ui:if={enabled}>
    <ui:then><innerContent1/></ui:then>
    <ui:else><innerContentN/></ui:else>
  </ui:fragment>
  ```

### Iterations

 `ui:for` attribute multiples component instsnces iterating over given items array.

  ```html
  <ul>
    <li ui:for="item of itemsExpression">
      <span>{{itemIndex}}. {{item.name}}</span>
    </li>
  </ul>
  ```

> - Current list item is set into `this.item` and accessible programmatically.
> - iterative elements are MUST BE distinguished by `item.id`
>  - `itemIndex` contains current 0-based index

##### There are also two special containers: 

 - `<x:empty>` for empty list.
 - `<x:loading>` for non-existing list.

### Fragment

`<ui:fragment>` is a transparent container and works just like a parens for multiple compoments.

  ```html
  <ui:fragment ui:if="enabled">
    <innerContent1/>...<innerContentN/>
  </ui:fragment>
  ```
      
## Properties binding expressions

__syntax__ `prop="value"` sets a constant `value` into `prop` property.

>  - 'true', 'false' are narrowed to boolean, 
>  - numbers narrowed to number type.

__syntax__ `prop=":resId"` sets value of resource from `app.resources[resId]` into `prop`.

__syntax__ `prop={owner.Prop.Path}` sets bvalue of owner property

> values of `function` type are bound to the owner instance.

__syntax__ `prop="prefix{prop1}suffix{prop2}"` interpolates string with values of owner `prop1` and `prop2` properties into `prop`

__syntax__ `ui:props={ownerDataProp}` spreads keys/values of the object from `ownerDataProp` into properties of an element.

__syntax__ `prop={expr|pipeFn1:arg1:arg2|pipeFn2:@prop2}` applies chain of pipes defined in `app.pipes`. Optional arguments can be passed separated by colon. Use `@` prefix to refer to owner props.

## Reference

There is able to globally refer any component through `ui:ref` attribute.

```html
    <UserService ui:ref="user"/>
    ...
    <UserAvatar data="<- user.profile" onSave="->user.update"/>
```

## Left arrows

Left arrow makes hot subscription to specifed property of refered component:

```html
    <List data="<-ref.prop|pipes"/>
```

## Right arrows
 
```html
    <Button ... 
      action="-> ref.key1|dataPipes" 
      data-key="val" 
      data={expr} />
```
Right arrow creates a function that invokes `app[ref].onKey1(data)` action handler with an `dataset`-object. 

> Pipes could be applied on `dataset`-object before it passed. 

> Invocation result-object then updates the `ref`-component.

>  use `this` keyword to refer owner component: 
`click="-> this.action"`

### Right arrows as owner updaters

Often all what we need is just to update owner state
- `->` updates owner properties with `dataset` object spreaded.
- `-> prop` updates given property of owner with `dataset` object.

## Dynamic tags

There is able to calculate tag at runtime.

```html
  <ui:tag tag="{type}Field" ...>
```

## Slots

Slots are placeholders for extra content.

```html
    <Comp>
        <ExtraContent/>
    </Comp>
```

```html
<template id="Comp">
<div class="container"  ui:if="slot(key2)">
    <!-- Extra content will be placed here 
    instead of <x:slot/> -->
    <x:slot> 
</div>
</template>
```

> special `slot(key)` conditional could be used to check if non-empty extra content passed.

#### Multi-part extra content.

Extra content could be multiple-part and thus, orbitrary distributed inside component template.

```html
    <Comp>
        <Comp:key1><Extra1/></Comp:key1>
        <Comp:key2><Extra2/></Comp:key2>
        <DefaultContent/>
    </Comp>
```

```html
<div class="component template">
    <!-- <Extra1/> will be placed here-->
    <x:slot key="key1">
    <div class="comp" ui:if="slot(key2)">
        <!-- <Extra2/> will be placed here -->
        <x:slot key="key2"> 
    </div> 
    <!-- <DefaultContent/> will be placed here -->
    <x:slot> 
</div>
```       


 