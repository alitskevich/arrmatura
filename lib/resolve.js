
export function resolveTemplate(owner, tmpl, acc = new Map()) {
    if (!tmpl) { return acc; }
    if (tmpl.reduce) { return tmpl.length ? tmpl.reduce((m, t) => resolveTemplate(owner, t, m), acc) : acc; }
    const { tag, updates, initials, inits, nodes, uid, id, ref, $spec } = tmpl;
    return acc.set(uid, {
        tag, id, uid, ref,
        owner, initials, inits,
        $spec,
        props: updates && updates.length ? updates.reduce((acc, fn) => { fn(owner, acc); return acc; }, {}) : null,
        content: nodes && nodes.length ? nodes.reduce((m, t) => resolveTemplate(owner, t, m), new Map()) : null
    });
}
