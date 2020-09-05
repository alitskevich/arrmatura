import { Service } from './Service'

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
