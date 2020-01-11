
export function resolveTemplate(owner, tmpl, acc = new Map()) {
    if (!tmpl) { return acc; }
    if (tmpl.reduce) { return tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : acc; }
    const { tag, updates, initials, inits, nodes, uid, id, ref, $spec } = tmpl;
    const props = updates && updates.length ? updates.reduce((r, fn) => { fn(owner, r); return r; }, {}) : null;
    const content = nodes && nodes.length ? nodes.reduce((m, t) => resolveTemplate(owner, t, m), new Map()) : null;
    return acc.set(uid, { tag, id, uid, ref, owner, initials, inits, $spec, props, content });
}
