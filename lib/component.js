/* eslint-disable no-console */
import { renderContent } from './render.js'
import { applyValue, nextId, propGetter, upAsync, res, methodName } from './component.utils'

/**
 * Component class.
 */
export class Component {
    constructor (Ctor, node, parent, owner) {
        Object.assign(this, { node, uid: node.uid, tag: node.tag,id: node.id, state: {}, parent, owner })
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
    get nodes () {
        return this.node.getNodes(this)
    }
    get content() {
        return this.impl.constructor.getTemplate ? this.impl.constructor.getTemplate() : this.nodes
    }
    get containerElement () {
        if (this.$containerElement) return this.$containerElement
        let $p = this.parent
        while ($p && !$p.impl.elt) { $p = $p.parent }
        this.$containerElement = $p.impl.elt
        return this.$containerElement
    }

    /**
     * State.
     */
    up (Δ={}) {
        if (this.isDone) { return null }
        if (Δ.then && Δ.catch) { return upAsync(this, Δ) }
        let changes = {}
        Object.entries(Δ).forEach(([k, their]) => {
            if (their && their.then && their.catch) {
                upAsync(this, their, k)
            } else if (k && typeof their !== 'undefined' && their !== this.state[k]) {
                this.state[k] = changes[k] = their 
            }
        })
        return this.setState(changes)
    }

    setState (changes) {
        if (this.impl.setState) {
            this.impl.setState(changes, this)
        } else {
            Object.assign(this.impl, changes)
            renderContent(this, this, this.content)
        }
        if (this.refId && changes) { this.notify() }
    }

    prop (propId) {
        return propGetter(this, propId)()
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
        return ref.$.subscribe(this, ($) => applyValue($.prop(propId), applicator))
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
        const initializers = this.initializers
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
            delete this.initializers
            this.up(initials)
            if (all.length) {
                Promise.all(all).then((args) => this.up(args.reduce(Object.assign, {})))
            }
        } else {
            if (this.impl.init) {
                const d = this.impl.init(this)
                if (d) { this.up(d) }
            }
        }
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
        ['parent', 'app', 'children', 'owner', 'impl', 'state'].forEach(k => { delete this[k] })
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
        console.log(''+this.type + this.uid, ...args)
    }

    res (key) {
        return res(this.app, key)
    }
}
