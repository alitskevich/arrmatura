# Glossary

`Program` it is formal presciption 
 - given to a `runtime` 
 - to perform some trasformation tasks  on an `input` data, 
 - correlated over the time in given context.

`Object-oriented programming` - a programming approach, based on a concept of _composition of components interacting with each others over the time_.

`Component` is a separate *runtime* entity(instance), that
  - _continuous_: has life-time phases over the time - such as creation, initalization, update, render, destroy;
  - _stateful_: behaves depending on its own current state;
  - _reliable_: communicates with others as per its public interface;
  - _composable_: can contains and being contained with others in any order.
  - _coupled_: can evaluate and pass data to each other as defined in some expressive manner.

`Class` is a *design-time* programmatic definition of state and behavior, used by a runtime as a template to instantiate components.

`State` is a set of key/value pairs, that can be initialized and changed over the time. State is usually black-boxed, but some props can be published for read/write from ouside.

`Property` of key/value pair belongs to a component and getter/setter, that allow public read/write access to the value by key.

`Behavior` is a specification, that certainly defines both own state mutation and reaction on external impact depending on on its current state or context.

`Interface` is *design-time* programmatic definition of set of methods names with its signatures, that are applicable to given component from outside.

`Type` is a specification, that defines set of keys and possible values can form component state.

`Composition` is a parent-child and owner-content relations between Components. 
Composition defines life-time and a scope of components that they can interact with.

`Template` is a text of formal language, that allows to programmatically describe a component composition and property bindig in a declarative way - focused on `what we want, instead of how to do`

`Property binding` is a formal sentence that expresses a dependence of target component property value calculated from others. 
It enforces a runtime to perform instant updates of the property value with result such dependence once it changed.

`Property propagation` is kind of one-way binding that pass property values from container component to its content.

`Hook` is method to be called by runtime at some specific event happens in component life-time.
	
