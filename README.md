# Arrmatura
    
    Web framework on arrows.

## Definitions	

`Arrmatura` provides an unified approach to develop a data-driven systems by defining and composing components of any kind.

It is intended to be 
 -  declarative and codeless as much as possible
 - non-obtrusive, platform-independent
 - reactive and functional oriented
 - easy to learn and get started. 

 ## Purpose 

`Arrmatura` is a minimalistic UI framework, 
that enriches the pure HTML with components, arrows and pipes.

Although born-for-dom, it is also may be adopted to develop wide range of modular component-based applications.

# Get Started

    npm i arrmatura

```javascript
    import { launch } from 'arrmatura';

    launch({
      types: [
        TopClass, 
        SomeService,
        '<component id="H1"><...></component>'
      ], 
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
