
> __template__ is a text in formal grammar allows to define component composition, data flow and interaction.

# Insight Sample

```html

<template id="NavTreeItem">
  <a href="#{id}">
      <span>{name|limitSize:50}</span>
      <span ui:if={label} class="label">{label}</span>
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

# Control. 

## Conditionals

 With `ui:if` attribute, an element(and its inner context) presents only if value of expression is truthy.

  ```html
  <div ... ui:if={expression}>...</div>
  ```

#### full `then-else` syntax

  ```html
  <ui:fragment ui:if={enabled}>
    <ui:then><Case1/></ui:then>
    <ui:else><Case2/></ui:else>
  </ui:fragment>
  ```

## Iterations

 `ui:for` attribute multiples component instances along items from given  array.

  ```html
  <ul>
    <li ui:for="item of expression">
      <a href="/item/{item.id}">{{itemIndex}}. {{item.name}}</span>
    </li>
  </ul>
  ```
here 
> - items MUST BE distinguished by `item.id`
> - `itemIndex` contains current 0-based index
> - current item is accessible programmatically as `this.item`.

##### There are also two special containers: 

 - `<x:empty>` for empty list.
 - `<x:loading>` for non-existing list.

## Fragment

`<ui:fragment>` is a transparent container and works just like a parens for multiple compoments.

  ```html
  <ui:fragment ui:if="enabled">
    <innerContent1/>...<innerContentN/>
  </ui:fragment>
  ```
 
# Dynamic tags

There is able to calculate tag at runtime.

```html
  <ui:tag tag="{type}Field" ...>
```

## Reference

There is able to globally refer any component through `ui:ref` attribute.

```html
    <UserService ui:ref="user"/>
    ...
    <UserAvatar data="<- user.profile" onSave="->user.update"/>
```
  
# Data flow

Property values could be set 

## with constant 

`prop="value"` sets a `value` constant into `prop` property.

>  - 'true', 'false' values are narrowed to boolean, 
>  - numbers narrowed to number type.
>  - functions are bound to the owner instance.

## with resource

`prop=":resId"` sets value of resource from `app.resources[resId]` into `prop`.

## with result of instant expression

`prop={prop2}` sets value of `prop2` owner property

`prop={data.key}` sets value of `prop2.key` owner property in depth.

`class="{prop1} prefix-{prop2}"` produces string interpolation with values of owner `prop1` and `prop2` properties.

`ui:props={ownerData}` spreads keys/values of the object from `ownerData` into properties of an element.

`prop={expr|pipeFn1:arg1:arg2|pipeFn2:@prop2}` applies chain of pipes defined in `app.resources`. 

> - Optional arguments can be passed separated by colon. 
> - Use `@` prefix to refer owner props as agrument.

## with left arrow expression

`data="<-ref.prop|pipes"` makes a hot subscription to any property of orbitrary component by its `ref`.

## with right arrow expression
 
```html
    <Button ... 
      action="-> ref.key1|dataPipes" 
      data-key="val" 
      data={expr} />
```
Right arrow creates a function that invokes `app[ref].onKey1(data)` action handler with an `dataset`-object. 

> Pipes could be applied on `dataset`-object before it passed. 

> Invocation result-object then updates the `ref`-component.

> `click="-> this.action"`, where `this` keyword refers owner.

#### Right arrows as owner updaters

Often all what we need is just to update owner state

- `click="->"` updates owner properties with `dataset` object spreaded.
- `click="-> prop"` updates given property of owner with `dataset` object.

# Slots

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