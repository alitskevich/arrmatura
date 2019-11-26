import { parseXML } from './xml.js';
import { compileNode } from './compile.js';

let COUNTER = 1;

let ANY;

const nextId = (p = '') => p + (COUNTER++);

const fnName = ctor => (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');

const REGISTRY = new Map();

const reg = ctr => {
    const ctor = typeof ctr === 'function' ? ctr : Object.assign(function () { }, ctr);
    const name = ctor.NAME || ctor.name || fnName(ctor);
    const text = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE;
    ctor.$TEMPLATE = () => {
        try {
            const T = text ? compileNode(parseXML(typeof text === 'function' ? text() : text, name)) : [];
            ctor.$TEMPLATE = () => T;
            return T;
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.error('compile ' + name, ex)
        }
        return []
    }
    if (name==='Element') {
        ANY = ctor
    } else {
        REGISTRY.set(name, ctor);
    }

};

reg({ NAME: 'ui:fragment' });

export const registerTypes = types => types.forEach(reg);

export const getByTag = tag => REGISTRY.get(tag) || ANY;