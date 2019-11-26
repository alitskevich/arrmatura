# Glossary

`Program` it is formal presciption 
 - given to a runtime 
 - to perform some trasformation tasks 
 - on an input data, 
 - correlated over the time 
 - in given context.

`Object-oriented programming` - both a runtime architecture and a programming approach, based on concept of _composable black-boxed components interacting with each others_.

`Component` is a separate *runtime* entity(instance), that 
  - _continuous_: has life-time phases over the time - such as creation, initalization, update, render, destroy.
  - _stateful_: behaves depending on its own current state
  - _reliable_: communicates with others as defined per its public interface
  - _composable_: can be composed with others - contains and being contained.

`Class` is a *design-time* programmatic definition of type and behavior, used by a runtime to instantiate components.

`Property` of key/value pair, that exclusively owned by some component instance - only the owner can address his property by its key and has read/write access to its value.

`State` is a set of component properties, that can be initialized and changed over the time. State is usually black-boxed, but some props can be published for read/write from ouside.

`Behavior` is a specification, that certainly defines both own state mutation and reaction on external impact depending on on its current state or context.

`Interface` is *design-time* programmatic definition of set of methods names with its signatures, that are applicable to given component from outside.

`Type` is a specification, that defined set of keys and possible values can form component state.

`Composition` is a parent-child and owner-content relations between Components. 
Composition defines life-time and a scope of components that they can interact with.

`Template` is a text of formal language, that allows to programmatically describe a component composition and property bindig in a declarative way - focused on `what we want, instead of how to do`

`Property binding` is an expression assigned to a given component property, that enforces instant updates of the property value with its result.

- `Property propagation` is kind of one-way binding that pass property values unchanged from container component to its content.

`Hook` is method to be called at some specific event happens in component life-time.
	
