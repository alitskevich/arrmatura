import { Service } from './Service'

export class NavigationService extends Service {
  init () {
    this.prevHash = ''
    this.hashchange = () => {
      const hash = window.location.hash.slice(1)
      if (hash[0] === '/' && hash !== this.prevHash) {
        this.emit('this.hash', { value: hash.slice(1) })
        this.prevHash = hash
      } else if (!this.prevHash) {
        this.emit('this.hash', { value: 'main' })
        this.prevHash = '/main'
      }
    }
    window.addEventListener('hashchange', this.hashchange)
    setTimeout(() => this.hashchange(), 0)
  }

  done () {
    window.removeEventListener('hashchange', this.hashchange)
  }

  update (d) {
    const { target, path = ['*'], params } = Object.urlParse(d)
    const state = {
      target: (!target || target === '*' ? this.target : target) || 'main',
      path: path[0] === '*' ? this.path : path,
      params: params.reset ? { ...params, reset: null } : { ...this.params, ...params }
    }
    window.location.hash = this.prevHash = '/' + Object.urlStringify(state)
    return state
  }

  getRoute () {
    return {
      target: this.target,
      path: this.path,
      params: this.params
    }
  }

  onHash ({ value }) { return this.update(value) }
  onParams (params) { return this.update({ params: { ...params, data: null } }) }
}
