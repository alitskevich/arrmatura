import { resolveTemplate } from './resolve.js';

export class Fragment {
    resolveTemplate($) {
        return $.content;
    }
}

export class FragmentFor {
    resolveTemplate($) {
        const acc = new Map();
        const { $data: data } = $.impl;
        const { itemId, itemNode, emptyNode, loadingNode } = $.$for;
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
        const $if = $.$if;
        const { $data } = $.impl;
        const node = $data ? $if.then : $if.else;
        return resolveTemplate($, node);
    }
}

export class FragmentTag {
    resolveTemplate($) {
        const acc = new Map();
        const tag = $.impl.$data;
        if (tag) {
            resolveTemplate($, { ...$.$tag, tag, uid: tag + ':' + $.uid }, acc);
        }
        return acc;
    }
}

