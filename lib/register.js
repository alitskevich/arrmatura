import { compileTemplate } from './compile.js'

let COUNTER = 1

const nextId = (p = '') => p + (COUNTER++)

const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C')
class Fragment {}

const REGISTRY = new Map([
    ['ui:fragment', Fragment],
    ['ui:for', Fragment],
    ['ui:item', Fragment],
    ['ui:slot', Fragment],
])

const reg = ctr => {
    if (typeof ctr === 'string') {
        ctr.replace(/<component\sid="(.+)">([\s\S]*?)<\/component>/gm, (_, NAME, TEMPLATE)=> reg({ NAME, TEMPLATE}))
        return
    }
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr)
    const name = ctor.NAME || ctor.name || fnName(ctor)
    const text = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE
    ctor.getTemplate = () => (ctor.$template || (ctor.$template = compileTemplate(text, name)))
    REGISTRY.set(name, ctor)
}

export const registerTypes = types => types.forEach(reg)

export const getByTag = tag => REGISTRY.get(tag)