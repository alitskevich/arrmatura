import { Component } from './component.js'
import { getByTag } from './register.js'
import { Element } from './element'

export const renderContent = (owner, parent, content) => {
    (parent.children || Array.EMPTY).forEach(child => !content || !content.has(child.uid) ? child.done() : 0)
    if(!content) return
    const children = parent.children || (parent.children = new Map())
    content.forEach((meta, uid) => {
        let child = children.get(uid)
        if (!child) {
            child = new Component(getByTag(meta.tag) || Element, meta, parent, owner)
            children.set(uid, child)
        }
        child.up(meta.resolveProps(owner, !child.isInited))
    })
    children.forEach(child => !child.isInited ? child.init() : 0)
}