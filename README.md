# Introduction

## Definitions	

`Armatura` is a mean to define and compose components of any kind.

It is   
 - declarative, thus almost codeless
 - reactive and functional oriented
 - non-obtrusive, platform-independent
 - easy to learn and get started. 

 ## Purpose 

`Armatura` is a first-citizen a minimalistic UI framework, that extends pure HTML with true dynamic components.

Despite born-for-dom, it is also well-suited to develop wide range of modular component-based applications.

## Audience	

- Newbies, amateurs, students - to dig into a web dev world easy and fast.
- Professional developers, start-upers - to adopt, simplify and unify their creatures using one single declarative language.

# Get Started

    npm i armatura

```javascript
    import {launch} from 'arrmatura';

    const classes = [
        TopClass, // first one is the top one
        Class1,
        {NAME:'Name2', TEMPLATE:'<...>'}
    ];

    launch({
      classes, 
      resources:{
            key:val // to be used in placeholders
      }	
    })
```

# Links

- [Glossary](md/GLOSSARY.md)
- [Templates](md/TEMPLATE.md)
- [Custom components](md/CUSTOM.md)
- [TODOS Application](https://alitskevich.github.io/dzi-todomvc)
