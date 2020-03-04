/* eslint-disable no-console */
import { applyValue, nextId, propGetter, upAsync, res, methodName } from './component.utils'
import { getByTag } from './register.js'
import { Element } from './element'
import { setNodeMap, stringifyComponent } from './utils.js'

/**
 * Component class.
 */
export class Component {
    constructor (Ctor, node, parent, container) {
        Object.assign(this, { node, uid: node.uid, tag: node.tag,id: node.id, state: {}, parent, container })
        if (parent) {
            this.parent = parent
            this.app = parent.app
            this.impl = new Ctor(this)
        } else {
            this.impl = this.app = new Ctor(this)
        }
        this.impl.$ = this

        if (this.refId) {
            const hidden = this.app[this.refId]
            this.app[this.refId] = this.impl
            this.defer(() => { this.app[this.refId] = hidden })
        }
    }

    get refId () {
        return this.node.refId
    }

    /**
     * State.
     */
    
    up (Δ={}) {
        if (this.isDone) { return null }
        if (Δ.then && Δ.catch) { return upAsync(this, Δ) }
        let changes = {}
        let changed = false
        Object.entries(Δ).forEach(([k, their]) => {
            if (their && their.then && their.catch) {
                upAsync(this, their, k)
            } else if (k && typeof their !== 'undefined' && their !== this.state[k]) {
                changes[k] = their
                changed = true 
            }
        })

        if (changed) {
            Object.assign(this.state, changes)
            this.stateChanged(changes)
            if (this.refId) { this.notify() }
        } else if (!this.isInited) {
            this.stateChanged(changes)
            if (this.refId) { this.notify() }          
        }
    }

    stateChanged (changes) {
        Object.assign(this.impl, changes)
        this.reconcileContent()
    }
    
    /**
     *  Left Arrow.
     */
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

    connect (key, applicator) {
        const [refId, propId] = key.split('.')
        const ref = refId === 'this' ? this.impl : this.app[refId]
        if (!ref) { return console.error('connect: No such ref ' + refId, key) }
        return ref.$.subscribe(this, c => applyValue(c.get(propId), applicator))
    }

    /**
     *  Right Arrow.
     */
    emit (key, data) {
        const $ = this

        if (!key || !key.includes('.')) {
            return $.up(key ? { [key]: data } : data)
        }

        const [type, target] = key.split('.')
        const event = { data, ...data }

        const ref = type === 'this' ? $.impl : $.app[type]
        if (!ref) {
            console.warn('emit: No such ref ' + type)
            return
        }

        try {
            const method = ref[methodName(target, 'on')]
            if (!method) { throw new ReferenceError('emit ' + type + ': No such method ' + methodName(target, 'on')) }

            const result = method.call(ref, event, ref, ref.$)
            this.log(type + ':' + methodName(target, 'on'), result, data, ref)
            if (result) { ref.$.up(result) }
        } catch (ex) {
            console.error('emit ' + key + ':', ex)
        }
    }
    /**
     * Life-cycle hooks.
     */
    init () {
        if (this.isDone || this.isInited) { return }
        this.isInited = true
        const initializers = this.node.initializers
        if (initializers) {
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
                Promise.all(all).then((args) => this.up(args.reduce((r,e)=>Object.assign(r,e), initials)))
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

    done () {
        if (this.isDone) { return }
        this.isDone = true
        if (this.impl.done) {
            this.impl.done(this)
            this.impl.$ = null
        }
        if (this.children) {
            this.children.forEach(c => { c.parent = null; c.done() })
        }
        if (this.parent) {
            this.parent.children.delete(this.uid)
        }
        if (this.defered) {
            this.defered.forEach(f => f(this))
            delete this.defered
        }
        ['parent', 'app', 'children', 'container', 'impl', 'state'].forEach(k => { delete this[k] })
    }
    /**
   * Routines.
   */

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

    defer (fn) { if (fn && typeof fn === 'function') { (this.defered || (this.defered = [])).push(fn) } }

    log (...args) {
        console.log(''+this.tag + this.uid, ...args)
    }

    res (key) {
        return res(this.app, key)
    }
    toString() {
        return stringifyComponent(this)
    }

    /**
     * Reconciliation.
     */
    get nodes(){
        return this.node.getNodes(this)
    }

    get(propId) {
        return propGetter(this, propId)()
    }

    prop (propId) {
        return this.container.get(propId)
    }

    reconcileProps () {
        this.up(this.node.resolveProps(this, !this.isInited))
        return this
    }

    reconcileContent () {
        reconcileContent(this, this.container, this.nodes)
    }
}

function reconcileContent (parent, container, content) {
    (parent.children || Array.EMPTY).forEach(c => !content || !content.has(c.uid) ? c.done() : 0)
    parent.last = parent.first = null
    if (!content || !content.size) return
    const children = parent.children || (parent.children = new Map())
    let p = null
    content.forEach((node, uid) => {
        const Registered = getByTag(node.tag)
        const Ctor = Ctors[node.tag] || (Registered ? ContainerComponent : ElementComponent)
        p = (p||parent)[p?'next':'first'] = (children.get(uid) || setNodeMap(children, new Ctor(Registered || Element, node, parent, container))).reconcileProps()
    })
    children.forEach(c => !c.isInited && c.init())
}

export class ContainerComponent extends Component {
    reconcileContent () {
        reconcileContent(this, this, this.impl.constructor.getTemplate())
    }
}

class ElementComponent extends Component {
    stateChanged (changes) {
        this.reconcileContent()
        this.impl.stateChanged(changes)
    }
}

class FragmentComponent extends Component {
}

class ForComponent extends Component {
}

class ItemComponent extends Component {
    reconcileContent () {
        reconcileContent(this, this, this.nodes)
    }
    prop(propId) {
        const itemName = this.state.itemName
        const pk = propId.slice(0, itemName.length)
        return propGetter(pk === itemName ? this : this.container, propId)()
    }
}

class SlotComponent extends Component {

    reconcileContent () {
        const $ = this
        const ocontent = $.container.nodes
        if (!ocontent) return null

        const otag = $.container.tag
        const content = new Map
        ocontent.forEach((v, idx) => {
            if ($.id) {
                if ((v.tag === otag + ':' + $.id || $.id === `#${idx}`)) {
                    v.nodes.forEach(vv => content.set(vv.uid, vv))
                }
            } else if (v.tag.slice(0, otag.length + 1) !== otag + ':') {
                content.set(v.uid, v)
            }
        })
        reconcileContent(this, this.container.container, content)
    }



}

const Ctors = {
    'ui:fragment': FragmentComponent,
    'ui:for': ForComponent,
    'ui:item': ItemComponent,
    'ui:slot': SlotComponent,
}