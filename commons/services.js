export class Service {
  constructor ($) {
    Object.assign(this, {
      refId: $.refId,
      lookupService: (ref) => $.app ? $.app[ref] : null,
      up: (...args) => $.up(...args),
      emit: (...args) => $.emit(...args)
    })
  }

  log (...args) {
    console.log(this.refId + ': ', ...args)
  }

  handleError ({ message = '', code = '' }) {
    // may  overriden from props
    const handler = this.lookupService('errorHandler')
    if (handler) {
      handler.handleError({ message, code, source: this.refId })
    } else {
      console.error(this.refId + ': ERROR: ', message, code)
    }
  }

  safe (p, def) {
    return p.catch(error => {
      this.handleError(error)
      return def ? def(error) : { error }
    })
  }
}

export class ErrorHandlingService extends Service {
  handleError ({ message = '', code, source = {} }) {
    this.show({ message: source + ': ' + message, code, mode: 'error' })
  }

  show ({ message = '', code = '', source }) {
    console.error(source + ': ERROR: ', code, message)
  }
}

export class ToastService extends Service {
  onSend ({ data }) {
    return {
      top: { ...data, close: () => this.emit('this.close'), closeAfter: 5 }
    }
  }

  onClose () {
    return {
      top: null
    }
  }
}
