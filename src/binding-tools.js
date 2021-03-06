const React = require('react')

class Binding {
  constructor(yourClass, applicationState) {
    this.class = yourClass
    this.state = applicationState
    this.prototypeMethods = Object.getOwnPropertyNames(yourClass.prototype).filter(property => typeof (new yourClass(applicationState))[property] === 'function')
    this.instanceProperties = Object.getOwnPropertyNames(new yourClass(applicationState)).filter(property => typeof (new yourClass(applicationState))[property] !== 'function')
  }

  methods() {
    return this.prototypeMethods
  }

  properties() {
    return this.instanceProperties
  }

  reactProps() {
    if ((new this.class() instanceof React.Component)) {
      return new this.class(this.state).props
    }

    console.error('This is not a React class.')
  }

  describeInstance() {
    return new this.class(this.state)
  }

  describeMethod(methodName) {
    return this.class.prototype[methodName].toString()
  }

  runMethod(methodName, methodArguments, state = this.state) {
    const instance = new this.class(state)
    console.log('Running method:', methodName)
    console.log('Arguments:', methodArguments || 'None')
    console.log('Instance\n----------------\n', this.showClassInfo(state), '\n----------------\n')
    console.log('Function\n----------------\n', this.describeMethod(methodName), '\n----------------\n')
    console.log('Return Value\n----------------\n')
    return instance[methodName](methodArguments)
  }

  extractMethods(log = true, useCallback = false, callback) {
    this.prototypeMethods.slice(1).forEach((method, index) => {
      const stringifiedMethod = this.class.prototype[method].toString()

      if (log) {
        console.log('\n -------------------------- \n', stringifiedMethod, '\n -------------------------- \n')
      }

      if (callback) {
        callback(stringifiedMethod)
      }
    })

    return `Completed extracting ${this.prototypeMethods.length - 1} methods.`
  }

  showReactInfo() {
    if ((new this.class() instanceof React.Component)) {
      return new this.class(this.state)
    }

    console.error('This is not a React class.')
  }

  showClassInfo() {
    return {
      name: (new this.class(this.state)).constructor.name,
      state: this.state,
      methods: this.prototypeMethods,
      properties: this.instanceProperties
    }
  }
}

const pry = () => {
  let Binding = Binding
  debugger
}

module.exports = (yourClass, state = {}) => {
  state.pry = pry
  return new Binding(yourClass, state)
}