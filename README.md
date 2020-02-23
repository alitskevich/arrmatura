# Arrmatura
    
    web framework on arrows

## Definitions	

`Arrmatura` proposes an unified approach to define and compose data-driven components of any kind.

It is   
 - declarative and codeless
 - non-obtrusive, platform-independent
 - reactive and functional oriented
 - easy to learn and get started. 

 ## Purpose 

`Arrmatura` is a minimalistic UI framework, 
that extends pure HTML with arrows, pipes and dynamic components.

Despite born-for-dom, it is also well-suited to develop wide range of modular component-based applications.

## Audience	

- Newbies, amateurs, students - to dig into a web dev easy and fast.
- Professional developers - to re-think, simplify and unify zoo of their creatures using one single declarative language.
- start-upers - to fail fast.

# Get Started

    npm i arrmatura

```javascript
    import {launch} from 'arrmatura';
    ...

    const types = [
        TopClass, 
        SomeService,
        // template only
        {NAME:'Name2', TEMPLATE:'<...>'}
    ];

    launch({
      types, 
      template: '<TopClass/>',
      resources: { ... }	
    })
```

# Documentation

- [Glossary](md/GLOSSARY.md)
- [Templates](md/TEMPLATE.md)
- [Custom components](md/CUSTOM.md)

# Usages

- [TODO](https://alitskevich.github.io/arrmatura/todo.html)
- [Grodno.co](https://grodno.co)
