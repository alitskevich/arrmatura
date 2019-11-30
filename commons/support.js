import { Service } from "./Service"

export class Delay {
  init() {
    setTimeout(() => { if (!this.isDone) { this.action(this.data) } }, (this.period || 5) * 1000)
  }
}
export class Invoke {
  init() {
    this.action(this.data)
  }
}
export class Loader {
  init() {
    this.reload()
  }
  setTrigger(val) {
    this.trigger = val
    this.reload()
  }
  reload() {
    const { from, data, into } = this;
    if (from && into) {
      from({ ...data, callback: (error, result) => into({ error, ...result }) })
    }
  }
}

export class ErrorHandlingService extends Service {

  handleError({ message = '', code, source = {} }) {
    this.show({ message: source + ': ' + message, code, mode: 'error' });
  }
  show({ message = '', code = '', source }) {
    console.error(source + ': ERROR: ', code, message);
  }
}

export class ToastService extends Service {
  onSend({ data }) {
    return {
      top: { ...data, close: () => this.onClose(), closeAfter: 5 }
    }
  }
  onClose() {
    return {
      top: null
    }
  }
}