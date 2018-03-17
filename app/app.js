import { INFO } from './const.js'
import { stou, capitalize } from './utils.js'
import RES from './res.js'

const R = {...RES}

const nav = () => stou(window.location.hash.slice(1))

export class MyApplication {
  TEMPLATE () {
    return /* html */`
      <Sidebar>
        <Navs ui:key="aside"/>
        <ui:fragment ui:key="content">
          <Header/>
          <ui:module touch="{{touch}}"/>
          <Toast text="{{ts}}"/>
        </ui:fragment>
      </Sidebar>`
  }
  init () {
    Object.assign(this, INFO, nav())
    window.addEventListener('hashchange', () => this.assign(nav()))
    Object.go = (u) => {
      window.location.hash = JSON.stringify(u)
    }
    // this.list = [] || restoreHotReload()
    this.ts = 0
    setInterval(() => this.assign({ts: this.ts + 1}), 1)
  }

  getModule () {
    return capitalize(this.module || 'Home')
  }
  subscribe (url, source, cb) {
    const r = this.res(url)
    cb(null, r)
  }

  // mock navigation
  dispatch (url, data) {
    window.location.hash = url + '?' + Object.keys(data).map(k => k + '=' + data[k]).join('&')
  }
  // mock string localization
  res (k) {
    return R[k] || k.split('_').map(capitalize).join(' ')
  }
}
