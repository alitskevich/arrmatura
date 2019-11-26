import { getByTag } from './register.js';
import { Component } from './component.js';

export const render = (c, $content = c.resolveTemplate()) => {

    if (!$content || !$content.size) {
        c.eachChild(cc => cc.done());
        return;
    }

    c.eachChild(cc => !$content.has(cc.uid) ? cc.done() : 0);
    const ch = c.children || (c.children = new Map());
    $content.forEach(({ tag, content, owner, props, inits, initials, ref, $if, $for, $tag }, uid) => {
        let cc = ch.get(uid);
        if (!cc) {
            props = props && props.data && initials && initials.data
                ? { ...props, ...initials, data: { ...initials.data, ...props.data } }
                : { ...props, ...initials }
            cc = new Component(
                getByTag(tag),
                { props, tag, ref, $if, $for, $tag, uid, owner, inits, parent: c }
            );
            ch.set(uid, cc);
        }
        cc.owner = owner;
        cc.content = content;
        cc.prevElt = c.elt.cursor;
        cc.up(props);
    });
    c.eachChild(cc => !cc.isInited ? cc.init() : 0);

};
