> **template** is a text in formal grammar allows to define component composition, data flow and interaction.

# Insight Sample

```html

<component id="NavTreeItem">
  <a href="#{id}">
      <span>{name|limitSize:50}</span>
      <span ui:if={label} class="label">{label}</span>
  </a>
</component>

<component id="NavTree">
  <ul class="nav">
      <li class="nav-item {item.class}" ui:for="item of data">
          <NavTreeItem ui:props={item}>
          <NavTree ui:if={item.subs} data={item.subs} />
      </li>
  </ul>
</component>
```

# Control.

## Conditionals

With `ui:if` attribute, an element(and its inner context) presents only if value of expression is truthy.

```html
<div ... ui:if="{expression}">...</div>
```

#### full `then-else` syntax

```html
<ui:fragment ui:if="{enabled}">
  <ui:then><Case1 /></ui:then>
  <ui:else><Case2 /></ui:else>
</ui:fragment>
```

## Iterations

`ui:for` attribute multiplies component instances along items from given array.

```html
<ul>
  <li ui:for="item of data">
    <a href="/item/{item.id}">{{item.position}}. {{item.name}}</span>
  </li>
</ul>
```

here

> - items MUST HAVE unique `id` field

## Fragment

`<ui:fragment>` is a transparent container and works just like a parens for multiple components.

```html
<ui:fragment ui:if="enabled">
  <innerContent1 />...<innerContentN />
</ui:fragment>
```

# Dynamic tags

Used to calculate tag at runtime.

```html
<ui:tag tag="{type}Field" ...></ui:tag>
```

## Reference

`ui:ref` attribute used to globally refer any component in expressions.

```html
<UserService ui:ref="user" />
...
<UserAvatar data="<- user.profile" onSave="->user.update" />
```

# Data flow

Property values could be set

## with constant

`prop="value"` sets a `value` constant into `prop` property.

> - 'true', 'false' values are narrowed to boolean,
> - numbers narrowed to number type.

## with resource

`prop=":resId"` sets value of resource from `app.resources[resId]` into `prop`.

## with result of expression

`prop={prop2}` sets value of `prop2` owner property

`prop={data.key}` sets value of `prop2.key` owner property in depth.

`class="{prop1} prefix-{prop2}"` produces string interpolation with values of owner `prop1` and `prop2` properties.

`ui:props={ownerData}` spreads keys/values of the object from `ownerData` into properties of an element.

> - functions are bound to the owner instance.

## with result of chain of pipes

`prop={expr|pipeFn1:arg1:arg2|pipeFn2:@prop2}` applies chain of pipes.

> - Optional arguments can be passed separated by colon.
> - Use `@` prefix to refer owner props as agrument.

## with left arrow expression

`data="<-ref.prop"` makes a hot subscription to any property of orbitrary component.

> may use pipes to transform received value.

## with right arrow expression

```html
<button ... action="-> ref.key1" data-key="val" data="{expr}" />
```

Right arrow creates a function that invokes `app[ref].onKey1(data)` action handler with an `dataset`-object as parameter.

> pipes may be applied on `dataset`-object before it passed.

> Invocation result-object then updates the `ref`-component.

> `click="-> this.action"`, where `this` keyword refers owner.

#### Right arrows as updater

Often all what we need is just to update the owner state

- `click="->"` updates owner properties with `dataset` object spreaded.
- `click="-> prop"` updates given property of owner with `dataset` object.

# Slots

Slots are placeholders to inject an inner content.

```html
<Comp>
  <InnerContent />
</Comp>
```

```html
<component id="Comp">
<div class="container"  ui:if="slot(key2)">
    <!-- Inner content will be placed here instead of <ui:slot/> -->
    <ui:slot>
</div>
</component>
```

#### Multi-part extra content.

Inner content could be multiple-part and thus, distributed separately inside component template.

```html
<Comp>
  <Comp:key1><Extra1 /></Comp:key1>
  <Comp:key2><Extra2 /></Comp:key2>
  <DefaultContent />
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

> special `slot(key)` conditional could be used to check if non-empty extra content passed.
