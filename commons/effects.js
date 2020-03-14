export class Delay {
  init () {
    setTimeout(() => { if (!this.isDone) { this.action(this.data) } }, (this.period || 5) * 1000)
  }
}

export class Invoke {
  init () {
    this.action(this.data)
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
      from({ ...data, callback: (error, result) => into({ error, ...result }) })
    }
  }
}
