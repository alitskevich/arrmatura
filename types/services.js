import { Service } from './Service'

export class Invoke {
  init () {
    if (this.delay) {
      setTimeout(() => { if (!this.isDone) { this.action(this.data) } }, (this.delay) * 1000)
    } else {
      this.action(this.data)
    }
  }
}

export class Loader {
  init () {
    this.reload()
  }

  setTrigger (val) {
    this.trigger = val
    this.reload()
  }

  reload () {
    const { from, data, into } = this
    if (from && into) {
      from({ data, callback: (error, result) => into({ error, ...result }) })
    }
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
