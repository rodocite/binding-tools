class Binding {
  constructor(yourClass, applicationState) {
    this.class = yourClass
    this.state = applicationState || null
    this.methods = Object.getOwnPropertyNames(yourClass.prototype).filter(property => typeof (new yourClass())[property] === 'function')
    this.properties = Object.getOwnPropertyNames(yourClass.prototype).filter(property => typeof (new yourClass())[property] !== 'function')
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
    this.methods.slice(1).forEach((method, index) => {
      const stringifiedMethod = this.class.prototype[method].toString()

      if (log) {
        console.log('\n -------------------------- \n', stringifiedMethod, '\n -------------------------- \n')
      }

      if (callback) {
        callback(stringifiedMethod)
      }
    })

    return `Completed extracting ${this.methods.length - 1} methods.`
  }

  showClassInfo(state = this.state) {
    return {
      name: (new this.class(state)).constructor.name,
      state: this.state,
      methods: this.methods,
      properties: this.properties
    }
  }
}

module.exports = function(yourClass) {
  return new Binding(yourClass)
}