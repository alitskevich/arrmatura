import { getByTag } from './register.js';
import { Component } from './component.js';

export const render = (c, $content = c.resolveTemplate()) => {
    if (!$content || !$content.size) {
        if (c.children) { c.children.forEach(cc => cc.done()); }
        return;
    }
    if (c.children) { c.children.forEach(cc => !$content.has(cc.uid) ? cc.done() : 0); }
    const ch = c.children || (c.children = new Map());
    let previous = null;
    $content.forEach(({ tag, content, owner, props, inits, initials, ref, $spec, id }, uid) => {
        let cc = ch.get(uid);
        if (!cc) {
            if (initials) {
                props = props && props.data && initials.data
                    ? { ...props, ...initials, data: { ...initials.data, ...props.data } }
                    : { ...props, ...initials }
            }
            cc = new Component( getByTag(tag), { props, tag, ref, $spec, id, uid, owner, inits, parent: c } );
            ch.set(uid, cc);
        }
        cc.owner = owner;
        cc.previous = previous
        if (previous) {
            previous.next = cc
        }
        cc.content = content;
        cc.up(props);
        previous = cc
    });
    if (c.children) { c.children.forEach(cc => !cc.isInited ? cc.init() : 0); }
};
