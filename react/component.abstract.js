/* eslint-disable react/prop-types */
import React from 'react'
import { applyValue, nextId, propGetter, upAsync, res, pipes, methodName } from './component.utils'
import { compileNode } from './compile'
import { parseXML } from './xml'

export class AbstractComponent extends React.Component {
  constructor (props) {
    super(props)
    const { node = compileNode(), container, ...initials } = props
    Object.assign(this, { container, node, uid: node.uid, key: node.uid, tag: node.tag, id: node.id })

    this.app = container ? container.app : this

    if (this.id) {
      this.createRef(this.id)
    }
    this.impl = this.ImplType ? new this.ImplType(initials, this) : initials
  }

  createRef (id) {
    const refs = this.app.$refs || (this.app.$refs = {})
    const hidden = refs[id]
    refs[id] = this
    this.$notify = () => this.notify()
    this.defer(() => { this.app.$refs[id] = hidden })
  }

  lookup (id) {
    const refs = this.app && this.app.$refs
    return refs ? refs[id] : null
  }

  // --- State
  get (propId) {
    return propGetter(this, propId)()
  }

  up (Δ = {}, force) {
    if (this.isDone) { return null }
    if (Δ.then && Δ.catch) { return upAsync(this, Δ) }

    this.log('up', Δ, force)
    let changed = false
    const changes = {}
    Object.entries(Δ).forEach(([k, v]) => {
      if (v && v.then && v.catch) {
        upAsync(this, v, k)
      } else if (k && typeof v !== 'undefined' && v !== this.impl[k]) {
        changes[k] = v
        changed = true
      }
    })

    if (changed || force) {
      this.commit(changes)
      this.forceUpdate(this.$notify)
    }
  }

  commit (changes) {
    Object.entries(changes).forEach(([k, v]) => {
      const setter = this.impl[methodName(k, 'set')]
      if (setter) { setter.call(this.impl, v) } else { this.impl[k] = v }
    })
    return this.impl
  }

  render () {
    return null
  }

  get rootNode () {
    return this.$rootNode || (this.$rootNode = compileNode(parseXML(this.template, this.node.tag)))
  }

  // --- Left Arrow.

  notify () {
    if (this.listeners && !this.notifying) {
      this.notifying = true
      this.listeners.forEach(e => e())
      this.notifying = false
    }
  }

  subscribe (target, fn) {
    const uuid = nextId()
    const listeners = (this.listeners || (this.listeners = new Map()))
    listeners.set(uuid, () => {
      try {
        target.up(fn(this))
      } catch (ex) {
        console.error(this.tag + this.uid + ' notify ', ex)
      }
    })
    return { payload: fn(this), cancel: () => listeners.delete(uuid) }
  }

  connect (key, targetProp) {
    const [id, propId] = key.split('.')
    const ref = id === 'this' ? this : this.lookup(id)
    if (!ref) { return console.error('connect: No such ref ' + id, key) }

    return ref.subscribe(this, c => applyValue(c.get(propId), rr => ({ [targetProp]: rr })))
  }

  // --- Right Arrow.

  emit (key, data) {
    if (!key || !key.includes('.')) {
      return this.up(key ? { [key]: data } : data)
    }

    const [refId, target] = key.split('.')
    const event = { data, ...data }

    const ref = refId === 'this' ? this : this.lookup(refId)
    if (!ref) {
      console.warn('emit: No such ref ' + refId)
      return
    }

    try {
      const propId = methodName(target, 'on')
      const impl = ref.impl
      const method = impl[propId]

      if (!method) Function.throw('emit ' + refId + ': No such method ' + propId)

      const result = method.call(impl, event, impl, ref)

      this.log(refId + ':' + propId, result, data, impl)
      if (result) { ref.up(result) }
    } catch (ex) {
      console.error('emit ' + key + ':', ex)
    }
  }

  // --- Life-cycle hooks.

  componentDidMount () {
    if (this.isDone || this.isInited) { return }
    this.isInited = true
    const initializers = this.rootNode.initializers
    if (initializers && initializers.length) {
      const initials = (this.impl.init ? this.impl.init(this) : null) || {}
      const all = []
      initializers.map(f => f(this)).forEach(r => {
        if (!r) return
        const { payload, cancel } = r
        this.defer(cancel)
        if (payload && payload.then) {
          all.push(payload)
        } else {
          Object.assign(initials, payload)
        }
      })
      if (all.length) {
        Promise.all(all).then((args) => this.up(args.reduce((r, e) => Object.assign(r, e), initials)))
      } else {
        this.up(initials)
      }
    } else {
      if (this.impl.init) {
        const d = this.impl.init(this)
        if (d) { this.up(d) }
      }
    }
    return this
  }

  componentWillUnmount () {
    if (this.isDone) { return }
    this.isDone = true
    if (this.impl.done) {
      this.impl.done(this)
    }
    if (this.defered) {
      this.defered.forEach(f => f(this))
      delete this.defered
    }
    ['parent', 'app', 'children', 'container', 'impl'].forEach(k => { delete this[k] })
  }

  // --- Routines.

  raceCondition (key) {
    const COUNTERS = this.$weak || (this.$weak = new Map())
    let counter = 1 + (COUNTERS.get(key) || 0)
    COUNTERS.set(key, counter)
    return (fn) => { if (counter === COUNTERS.get(key)) { counter = 0; fn() } }
  }

  defer (fn) {
    if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn) }
  }

  log (...args) {
    console.log('' + this.tag + '@' + this.uid, ...args)
  }

  res (key) {
    return res(this.app, key)
  }

  pipes (key) {
    return pipes(this.app, key)
  }

  toString () {
    return '' + this.tag + '@' + this.uid // stringifyComponent(this)
  }
}
