import { Component } from './component.js';
import React from 'react';

export const render = (c, $content = c.resolveTemplate()) => {
    if (!$content || !$content.size) {
        if (c.children) { c.children.forEach(cc => cc.done()); }
        return;
    }
    if (c.children) { c.children.forEach(cc => !$content.has(cc.uid) ? cc.done() : 0); }
    const ch = c.children || (c.children = new Map());
    $content.forEach(({ tag, content, owner, props, inits, initials, ref, $spec, id }, uid) => {
        let cc = ch.get(uid);
        if (!cc) {
            if (initials) {
                props = props && props.data && initials.data
                    ? { ...props, ...initials, data: { ...initials.data, ...props.data } }
                    : { ...props, ...initials }
            }
            cc = new Component(
                getByTag(tag),
                { props, tag, ref, $spec, id, uid, owner, inits, parent: c }
            );
            ch.set(uid, cc);
        }
        cc.owner = owner;
        cc.content = content;
        cc.prevElt = c.elt.cursor;
        cc.up(props);
    });
    if (c.children) { c.children.forEach(cc => !cc.isInited ? cc.init() : 0); }
    return React.createElement('div', { className: '1312' })
};
