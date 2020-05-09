# Arrmatura

`Arrmatura` introduces an ultimate `specification-as-a-code` approach to develop a data-driven systems by defining and composing components in a declarative way.

`Arrmatura` is intended to be

- declarative and codeless
- non-obtrusive, platform-independent
- reactive and functional oriented
- easy to learn and get started.

`Arrmatura` is a minimalistic UI framework, that enriches the pure HTML with components, arrows and pipes.

Born-for-dom, it is also may be adopted to develop wide range of modular component-based applications.

# Get Started

    npm i arrmatura

```javascript
import { launch } from "arrmatura";

const components = `<component id="Footer">
          <Button title=":send_title|upper">
        </component>`;

launch({
  types: [Application, SomeService, components],
  template: "<Application />",
  resources: {
    send_title: "Send",
  },
  pipes: {
    upper: (x) => x.toUpperCase(),
  },
});
```

Please take a look into [Todo App](https://alitskevich.github.io/arrmatura/todo.html) to get very basic insight how it works.

# Documentation

- [Glossary](md/GLOSSARY.md)
- [Templates](md/TEMPLATE.md)
- [Custom components](md/CUSTOM.md)

# Usages

- [Grodno.co](https://grodno.co)
