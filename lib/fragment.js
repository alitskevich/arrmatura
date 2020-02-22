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
        ocontent.forEach((v, idx) => {
            if ($.id) {
                if ((v.tag === otag + ':' + $.id || $.id === `#${idx}`) && v.content) {
                    v.content.forEach(vv => acc.set(vv.uid, vv));
                }
            } else if (v.tag.slice(0, otag.length + 1) !== otag + ':') {
                acc.set(v.uid, v);
            }
        });
        return acc;
    }
}

export class FragmentForItem {
    resolveTemplate($) {
        return resolveTemplate($, $.$spec);
    }
    init($) {
        $.prop = key => {
            const [pk, ...path] = key.split('.')
            if (pk === this.itemId || key === this.itemId + 'Index'){
                return path.reduce((r, p) => (r && (p in r) ? r[p] : void 0), this[pk])
            }
            return $.owner.prop(key);
        }
        //$.up = delta => $.owner.up(delta)
        $.connect = (key, applicator) => $.owner.connect(key, applicator)
        $.emit = (key, data) => $.owner.emit(key, data)
    }
}

export class FragmentFor {
    resolveTemplate($) {
        const acc = new Map();
        const { $data: data } = $.impl;
        const { itemId, itemNode, emptyNode, loadingNode } = $.$spec;
        const { tag, updates, initials = {}, nodes } = itemNode;
        if (data && data.length) {
            if (!data.forEach) {
                throw new Error('[ui:for] data has no forEach()', data)
            }
            data.forEach((d, index) => {
                const uid = `${itemNode.uid}-$${d.id || index}`;
                const $ownerImpl = Object.assign(Object.create($.owner.impl), { [itemId]: d, [itemId + 'Index']: index })
                const up = Δ => $.owner.up(Δ)
                const $owner = Object.assign(Object.create($.owner), { impl: $ownerImpl, $propFnMap: {}, up })
                resolveTemplate($owner, { tag, initials, updates, nodes, uid }, acc);

                // const uid = `${itemNode.uid}-$${d.id || index}`;
                // resolveTemplate($.owner, {
                //     tag:'ui:item', 
                //     initials:{ itemId, [itemId]: d, [itemId + 'Index']: index },
                //     $spec:{ tag, initials, updates, nodes, uid },
                //     uid: uid+'_item'
                // }, acc);
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


export const allFragments = [
    ['ui:fragment', Fragment],
    ['ui:for', FragmentFor],
    // ['ui:item', FragmentForItem],
    ['ui:if', FragmentIf],
    ['ui:tag', FragmentTag],
    ['ui:slot', FragmentSlot],
]