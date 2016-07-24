# Binding Tools
Inspired from Elm's Debug.log and Rails' binding.pry, a simple set of debug tools specifically made to wrap ES6 classes and easily log properties, methods, and state of the instance.

# Install
`npm install binding-tools`

# Usage
```
import BindingTools from ('binding-tools')

class App {
  methodOne() {
    return 1
  }

  methodTwo() {
    return 2
  }

  methodThree() {
    return 3
  }
}

const state = {
    myState: 'California'
}

console.log(BindingTools(App, state).extractMethods())
```

# API
### Wrapping a class
`BindingTools(yourClassHere, optionalStateHere)`

### Methods
.describeMethod(methodName)
  stringifies the function and returns it
```
methodName - string. name of method you want to call on the class.

Example:
console.log(BindingTools(App, state).describeMethod('methodOne'))

methodOne() {
    return 1
  }
```

.runMethod(methodName, methodArguments, state)
  runs the method and outputs information on current state. returns the return value of the method.
```
methodName - string. name of method you want to call on the class.
methodArguments - anything. pass in arguments as if you're passing them directly to the method.
state - optional state object can be passed in

Example:
Running method: methodThree
Arguments: None
Instance
----------------
 { name: 'App',
  state: null,
  methods: [ 'constructor', 'methodOne', 'methodTwo', 'methodThree' ],
  properties: [] }
----------------

Function
----------------
 methodThree() {
    return 3
  }
----------------

Return Value
----------------

3
```

.extractMethods(log = true, useCallback = false, callback)
  will list the methods on the prototype for you
```
log - boolean. defaults to true, will console.log a list to copy and paste
useCallback - boolean. defaults to false
callback - function. will invoke if useCallback is true

Example:
console.log(BindingTools(App, state).extractMethods())

 --------------------------
 methodOne() {
    return 1
  }
 --------------------------


 --------------------------
 methodTwo() {
    return 2
  }
 --------------------------


 --------------------------
 methodThree() {
    return 3
  }
 --------------------------

Completed extracting 3 methods.
```

.showClassInfo(state)
  returns information about the class
```
state - object. optional state object can be passed in to override

Example:
{ name: 'App',
  state: null,
  methods: [ 'constructor', 'methodOne', 'methodTwo', 'methodThree' ],
  properties: [] }
```
