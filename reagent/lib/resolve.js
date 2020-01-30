import { applyDomAttrs } from './dom.js';
import { RComponent } from './component';
import React from 'react';
import { applyTemplate, createTemplate } from './compile.js';

const REGISTRY = new Map();

export const register = ctor => {
    const name = ctor.NAME || ctor.name;

    if (ctor.prototype && ctor.prototype.isReactComponent) {
        REGISTRY.set(name, ctor);
        return ctor;
    }

    const template = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE;
    const ctr = (typeof ctor === 'function') ? ctor : function () { };

    applyTemplate(ctr, template, name);
    class TComp extends RComponent {
        constructor(props) {
            super(props);
            this.origin = Object.assign(new ctr(props), props);
            this.origin.$ = this;
        }
    }
    REGISTRY.set(name, TComp);

    return TComp;
};

export const createElt = (node, $owner, key) => {

    if (Array.isArray(node)) return node.map((n, i) => createElt(n, $owner, i));

    const { tag, updates, initials, $spec, nodes } = node;
    const ini = { key, ...initials, $owner };
    const state = updates && updates.length ? updates.reduce((r, fn) => { fn($owner, r); return r; }, ini) : ini;
    if (tag === '#text') {
        return state['#text'] || '';
    }
    const type = REGISTRY.get(tag);
    const props = type ? state : applyDomAttrs(state);
    if ($spec) {
        props.$spec = $spec;
    }
    return React.createElement(
        type || tag || 'p',
        props,
        ...(nodes || []).map(node => createElt(node, $owner))
    );
}