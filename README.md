# Arrmatura
    
The "components-on-arrows" framework.

## Definitions	

`Arrmatura` provides an ultimate `specification-as-code` approach to develop a data-driven systems by defining and composing components of any kind.

It is intended to be 
 - declarative and codeless as much as possible
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
        Application,
        SomeService,
        '<component id="Footer"><Button title=":send_title"></component>'
      ], 
      template: '<Application />',
      resources: { 
        send_title:'Send'
      }	
    })
```

# Documentation

- [Glossary](md/GLOSSARY.md)
- [Templates](md/TEMPLATE.md)
- [Custom components](md/CUSTOM.md)

# Usages

- [TODO](https://alitskevich.github.io/arrmatura/todo.html)
- [Grodno.co](https://grodno.co)
