/* eslint-disable no-console */
import { applyValue, nextId, propGetter, upAsync, res, pipes, methodName } from './component.utils'
import {
  setNodeMap,
  stringifyComponent,
  filterSlotNodes
} from './utils.js'
import { getByTag } from './register.js'
import { Element } from './element'

/**
 * Component class.
 */
class Component {
  constructor (Ctor, node, parent, container) {
    Object.assign(this, { node, uid: node.uid, tag: node.tag, id: node.id, state: {}, parent, container })
    if (parent) {
      this.parent = parent
      this.app = parent.app
      this.impl = new Ctor(this.getInitialState(), this)
    } else {
      this.impl = this.app = new Ctor(this.getInitialState(), this)
    }
    this.impl.$ = this

    if (this.refId) {
      const hidden = this.app[this.refId]
      this.app[this.refId] = this
      this.defer(() => {
        this.app[this.refId] = hidden
      })
    }
  }

  get refId () {
    return this.node.refId
  }

  getInitialState () {
    return this.node.resolveProps(this, true)
  }
  // --- State

  up (Δ = {}, force) {
    if (this.isDone) {
      return null
    }
    if (Δ.then && Δ.catch) {
      return upAsync(this, Δ)
    }

    const changes = []
    Object.entries(Δ).forEach(([k, v]) => {
      if (v && v.then && v.catch) {
        upAsync(this, v, k)
      } else if (k && typeof v !== 'undefined' && v !== this.state[k]) {
        changes.push([v, k])
        this.state[k] = v
      }
    })

    if (changes.length || force) {
      if (this.impl.stateChanged) {
        this.impl.stateChanged(changes)
      } else {
        changes.forEach(([v, k]) => {
          const setter = this.impl[methodName(k, 'set')]
          if (setter) {
            setter.call(this.impl, v)
          } else {
            this.impl[k] = v
          }
        })
      }
      this.recontent()
      if (this.refId) {
        this.notify()
      }
    }
  }

  get (propId) {
    return propGetter(this, propId)()
  }

  // --- Left Arrow.

  notify () {
    if (this.listeners && !this.notifying) {
      this.notifying = true
      this.listeners.forEach((e) => e())
      this.notifying = false
    }
  }

  subscribe (target, fn) {
    const uuid = nextId()
    const listeners = this.listeners || (this.listeners = new Map())
    listeners.set(uuid, () => {
      try {
        target.up(fn(this))
      } catch (ex) {
        console.error(this.tag + this.uid + ' notify ', ex)
      }
    })
    return { payload: fn(this), cancel: () => listeners.delete(uuid) }
  }

  connect (key, applicator) {
    const [refId, propId] = key.split('.')
    const ref = refId === 'this' ? this.impl : this.app[refId]
    if (!ref) {
      return console.error('connect: No such ref ' + refId, key)
    }

    return ref.subscribe(this, (c) => applyValue(c.get(propId), applicator))
  }

  // --- Right Arrow.

  emit (key, data) {
    const $ = this

    if (!key || !key.includes('.')) {
      return $.up(key ? { [key]: data } : data)
    }

    const [type, target] = key.split('.')
    // const event = { data, ...data }

    const ref = type === 'this' ? $ : $.app[type]
    if (!ref) {
      console.warn('emit: No such ref ' + type)
      return
    }

    try {
      const propId = methodName(target, 'on')
      const impl = ref.impl
      const method = impl[propId]

      if (!method) { Function.throw('emit ' + type + ': No such method ' + propId) }

      const result = method.call(impl, data, impl, ref)

      this.log(type + ':' + propId, result, data, impl)
      if (result) {
        ref.up(result)
      }
    } catch (ex) {
      console.error('emit ' + key + ':', ex)
    }
  }

  // --- Life-cycle hooks.

  init (initials) {
    if (this.isDone || this.isInited) {
      return
    }
    this.isInited = true
    const all = []
    const initializers = this.node.initializers
    if (initializers && initializers.length) {
      initializers
        .map((f) => f(this))
        .forEach((r) => {
          if (!r) return
          const { payload, cancel } = r
          this.defer(cancel)
          if (payload && payload.then) {
            all.push(payload)
          } else {
            Object.assign(initials, payload)
          }
        })
    }

    if (all.length) {
      Promise.all(all).then((args) => {
        this.up(args.reduce((r, e) => Object.assign(r, e), initials), true)
        if (this.impl.init) {
          const d = this.impl.init(this)
          if (d) {
            this.up(d)
          }
        }
      })
    } else {
      this.up(initials, true)
      if (this.impl.init) {
        const d = this.impl.init(this)
        if (d) {
          this.up(d)
        }
      }
    }
    return this
  }

  done () {
    if (this.isDone) {
      return
    }
    this.isDone = true
    if (this.impl.done) {
      this.impl.done(this)
    }
    if (this.children) {
      this.children.forEach((c) => {
        c.parent = null
        c.done()
      })
    }
    if (this.parent) {
      this.parent.children.delete(this.uid)
    }
    if (this.defered) {
      this.defered.forEach((f) => f(this))
      delete this.defered
    }
    this.impl.$ = null;
    ['parent', 'app', 'children', 'container', 'impl', 'state'].forEach((k) => {
      delete this[k]
    })
  }

  // --- Routines.

  raceCondition (key) {
    const COUNTERS = this.$weak || (this.$weak = new Map())
    let counter = 1 + (COUNTERS.get(key) || 0)
    COUNTERS.set(key, counter)
    return (fn) => {
      if (counter === COUNTERS.get(key)) {
        counter = 0
        fn()
      }
    }
  }

  defer (fn) {
    if (fn && typeof fn === 'function') {
      (this.defered || (this.defered = [])).push(fn)
    }
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
    return stringifyComponent(this)
  }

  // --- Content Reconciliation.

  get content () {
    return this.node.getNodes ? this.node.getNodes(this) : this.node.nodeMap
  }

  recontent () {
    recontent(this, this.container, this.content)
  }
}

function recontent (parent, container, content) {
  parent.last = parent.first = null

  container.app.requestReflow();

  (parent.children || Array.EMPTY)
    .forEach((c) => (!content || !content.has(c.uid) ? c.done() : 0))

  if (!content || !content.size) return
  const children = parent.children || (parent.children = new Map())
  let p = null

  content.forEach((node, uid) => {
    let c = null
    if (node.tag === 'ui:slot') {
      const snode = node.clone(node.uid)
      snode.id = node.id
      snode.nodeMap = filterSlotNodes(node.id, container)
      c = children.get(uid) || setNodeMap(children, new Component(getByTag('ui:fragment'), snode, parent, container.container))
    } else {
      c = children.get(uid)
      if (!c) {
        const Registered = getByTag(node.tag)
        const Ctor = Ctors[node.tag] || (Registered ? ContainerComponent : Component)
        c = setNodeMap(children, new Ctor(Registered || Element, node, parent, container))
      }
    }
    c.next = null
    p = (p || parent)[p ? 'next' : 'first'] = c
  })

  children.forEach((c) => !c.isInited ? c.init(c.node.resolveProps(c, true)) : c.up(c.node.resolveProps(c, false), true))
}

export class ContainerComponent extends Component {
  recontent () {
    recontent(this, this, this.impl.constructor.getTemplate())
  }
}

class ForComponent extends Component {
  recontent () {
    const nodes = new Map()
    const { items } = this.state
    if (items && items.length) {
      if (!items.forEach) { Function.throw('[ui:for] Items has no forEach() ' + items) }
      const itemNode = this.node.nodes[0]
      const itemName = itemNode.get('itemName')
      this.pkHash = {}
      items.forEach((datum) => {
        const pk = `${datum.id || ''}`
        if (pk == null || this.pkHash[pk]) {
          console.error('ERROR: empty/duplicate item id: ' + pk, datum)
          return
        }
        this.pkHash[pk] = datum
        setNodeMap(
          nodes,
          itemNode
            .clone(this.uid + '#' + pk)
            .addPropertyResolver(() => this.pkHash[pk], itemName)
        )
      })
    }
    recontent(this, this.container, nodes)
  }
}

class ItemComponent extends Component {
  recontent () {
    recontent(this, this, this.content)
  }

  emit (key, data) {
    return this.container.emit(key, data)
  }

  get (propId) {
    const iName = this.state.itemName
    return propId.startsWith(iName + '.') || propId === iName
      ? super.get(propId)
      : this.container.get(propId)
  }
}

const Ctors = {
  'ui:fragment': Component,
  'ui:for': ForComponent,
  'ui:item': ItemComponent
}
