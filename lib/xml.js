// ==========
// XML Parse for templates. XML -> NodeTree
// ----------
const RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
const RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
const RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)(="[^"]*"|={[^}]*})?/g;
const RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
const RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/g;
const SINGLE_TAGS = 'img input br col'.split(' ').reduce((r, e) => { r[e] = 1; return r; }, {});
const SUBST_XML_ENTITY = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: `"`,
    nbsp: ' '
};
const ESCAPE_XML_ENTITY = {
    34: '&quot;',
    38: '&amp;',
    39: '&#39;',
    60: '&lt;',
    62: '&gt;'
};
const RE_EMPTY = /^\s*$/
const FN_ESCAPE_XML_ENTITY = m => ESCAPE_XML_ENTITY[m.charCodeAt(0)];
const FN_XML_ENTITY = function (_) {
    const s = _.substring(1, _.length - 1);
    return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : (SUBST_XML_ENTITY[s] || ' ');
};
const decodeXmlEntities = (s = '') => s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
const escapeXml = (s) => !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);
const skipQoutes = (s) => s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s;

let UID = 1;

const parseAttrs = (s) => {
    const r = new Map();
    if (!s) { return r; }
    for (let e = RE_ATTRS.exec(s); e; e = RE_ATTRS.exec(s)) {
        if (!e[2]) {
            r.set(e[1], "true");
        } else {
            r.set(e[1], decodeXmlEntities(skipQoutes(e[2].slice(1))));
        }
    }
    return r;
};
const stringifyAttrs = (attrs) => {
    if (!attrs || !attrs.size) {
        return '';
    }
    const r = [];
    attrs.forEach((v, k) => {
        if (v && k !== '#text') {
            r.push(' ' + k + '="' + escapeXml(v) + '"');
        }
    });
    return r.join('');
};

class Node {
    constructor(tag, attrs = new Map()) {
        this.uid = UID++;
        this.tag = tag || '';
        this.attrs = attrs;
        this.nodes = [];
    }
    getChild(index) {
        return this.nodes[index];
    }
    setText(text) {
        this.attrs.set('#text', decodeXmlEntities(text));
    }
    addChild(tag, attrs) {
        const e = new Node(tag, attrs);
        this.nodes.push(e);
        return e;
    }
    toString() {
        return stringify(this);
    }
}

export function stringify({ tag, attrs, nodes = [] }, tab = '') {
    const sattrs = stringifyAttrs(attrs);
    const ssubs = nodes.map(c => stringify(c, `  ${tab}`)).join('\n');
    const text = attrs && attrs.get('#text');
    const stext = text ? `  ${tab}${escapeXml(text)}` : '';
    if (tag === '#text') {
        return stext.trim()
    }
    return `${tab}<${tag}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}>`);
}

export const parseXML = (_s, key) => {
    const s = ('' + _s).trim().replace(RE_XML_COMMENT, '');
    const ctx = [new Node()];
    let lastIndex = 0;
    // head text omitted
    for (let e = RE_XML_TAG.exec(s); e; e = RE_XML_TAG.exec(s)) {
        // preceding text
        const text = e.index && s.slice(lastIndex, e.index);
        if (text && !text.match(RE_EMPTY)) {
            ctx[0].addChild('#text').setText(text);
        }
        // closing tag
        if (e[2]) {
            if (ctx[0].tag !== e[3]) {
                throw new Error(
                    (key || '') + ' XML Parse closing tag does not match at: ' + e.index +
                    ' near ' +
                    e.input.slice(Math.max(e.index - 150, 0), e.index) +
                    '^^^^' +
                    e.input.slice(e.index, Math.min(e.index + 150, e.input.length))
                );
            }
            ctx.shift();
        } else {
            const elt = ctx[0].addChild(e[3], parseAttrs(e[4]));
            // not single tag
            if (!(e[5] || (e[3] in SINGLE_TAGS))) {
                ctx.unshift(elt);
                if (ctx.length === 1) {
                    throw new Error('Parse error at: ' + e[0]);
                }
            }
        }
        // up past index
        lastIndex = RE_XML_TAG.lastIndex;
    }
    // tail text omitted
    return ctx[0].getChild(0);
};
