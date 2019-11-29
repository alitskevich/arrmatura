import { resolveTemplate } from './resolve.js';

export class Fragment {
    resolveTemplate($) {
        return $.content;
    }
}

export class FragmentSlot {
    resolveTemplate($) {
        const ocontent = $.owner.content;
        if (!ocontent) return null;
        const otag = $.owner.tag;
        const acc = new Map();
        ocontent.forEach((v) => {
            if ($.id) {
                if ((v.tag === otag + ':' + $.id) && v.content) {
                    v.content.forEach(vv => acc.set(vv.uid, vv));
                }
            } else if (v.tag.slice(0, otag.length + 1) !== otag + ':') {
                acc.set(v.uid, v);
            }
        });
        return acc;
    }
}

export class FragmentFor {
    resolveTemplate($) {
        const acc = new Map();
        const { $data: data } = $.impl;
        const { itemId, itemNode, emptyNode, loadingNode } = $.$spec;
        const { tag, updates, initials = {}, nodes, uid } = itemNode;
        if (data && data.length) {
            if (!data.forEach) {
                throw new Error('wrong ui:for data', data)
            }
            data.forEach((d, index) => {
                const id = `${uid}-$${d.id || index}`;
                const $ownerImpl = Object.assign(Object.create($.owner.impl), { [itemId]: d, [itemId + 'Index']: index })
                const up = Δ => $.owner.up(Δ)
                const $owner = Object.assign(Object.create($.owner), { impl: $ownerImpl, $propFnMap: {}, up })
                resolveTemplate($owner, { tag, initials, updates, nodes, uid: id }, acc);
            });
        } else if (!data) {
            if (loadingNode) { resolveTemplate($.owner, loadingNode, acc); }
        } else if (!data.length) {
            if (emptyNode) { resolveTemplate($.owner, emptyNode, acc); }
        }
        return acc;
    }
}

export class FragmentIf {

    resolveTemplate($) {
        const { $data } = $.impl;
        const node = $data ? $.$spec.then : $.$spec.else;
        return resolveTemplate($.owner, node);
    }
}

export class FragmentTag {
    resolveTemplate($) {
        const acc = new Map();
        const tag = $.impl.$data;
        if (tag) {
            resolveTemplate($.owner, { ...$.$spec, tag, uid: tag + ':' + $.uid }, acc);
        }
        return acc;
    }
}

