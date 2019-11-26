const resolveSlot = (owner, id, acc) => {
    let $ = owner
    // eslint-disable-next-line no-empty
    for (; $.owner && $.tag === 'ui:fragment'; $ = $.owner) { }

    $.content && $.content.forEach((v) => {
        if (id) {
            if ((v.tag === $.tag + ':' + id) && v.content) {
                v.content.forEach(vv => acc.set(vv.uid, vv));
            }
        } else if (v.tag.slice(0, $.tag.length + 1) !== $.tag + ':') {
            acc.set(v.uid, v);
        }
    });
    return acc; 
};

const resolveTemplateArray = (owner, tmpl, acc = new Map()) =>
    tmpl && tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : null;

const resolveProps = (props, c) =>
    props && props.length ? props.reduce((acc, fn) => { fn(c, acc); return acc; }, {}) : null;

function resolveRegular(acc, owner, { tag, updates, initials, inits, nodes, uid, id, ref, $if, $for, $tag }) {
    if (tag === 'ui:slot') { return resolveSlot(owner, id, acc); }
    const props = resolveProps(updates, owner);
    const content = resolveTemplateArray(owner, nodes)
    return acc.set(uid, { tag, id, uid, ref, owner, initials, inits, $if, $for, $tag, props, content });
}

export function resolveTemplate(owner, tmpl, acc = new Map()) {
    if (!tmpl) { return acc; }
    if (tmpl.reduce) { return tmpl.length ? resolveTemplateArray(owner, tmpl, acc) : acc; }
    return resolveRegular(acc, owner, tmpl);
}
