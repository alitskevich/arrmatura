import React from 'react';
import { createElt } from './resolve';

export class Fragment extends React.Component {
    render() {
        return this.props.children;
    }
}

export class FragmentSlot extends React.Component {
    render() {
        const $ = this;
        const { $data, $spec, $owner } = this.props;
        // const ocontent = $owner.content;
        // if (!ocontent) return null;
        // const otag = $.owner.tag;
        // const acc = new Map();
        // ocontent.forEach((v) => {
        //     if ($.id) {
        //         if ((v.tag === otag + ':' + $.id) && v.content) {
        //             v.content.forEach(vv => acc.set(vv.uid, vv));
        //         }
        //     } else if (v.tag.slice(0, otag.length + 1) !== otag + ':') {
        //         acc.set(v.uid, v);
        //     }
        // });
        return null;
    }
}

export class ForItem extends React.Component {
    render() {
        const { $id, $node } = this.props;
        const { tag, updates, initials = {}, nodes } = $node;
        return createElt({ tag, initials: { ...initials, key: $id }, updates, nodes, uid: $id }, this);
    }
    prop(key) {
        const [pk, ...path] = key.split('.');

        return pk in this.props ? path.reduce((r, p) => (r && (p in r) ? r[p] : void 0), this.props[pk]) : this.props.$owner.prop(key);
    }
}

export class FragmentFor extends React.Component {
    render() {
        const { $spec, $data: data, $owner } = this.props;
        const { itemId, itemNode, emptyNode, loadingNode } = $spec;
        const { tag, updates, initials = {}, nodes, uid } = itemNode;
        if (data && data.length) {
            if (!data.forEach) {
                throw new Error('wrong ui:for data', data)
            }
            return data.map((d, index) => {
                const $id = `${uid}-$${d.id || index}`;
                const $item = React.createElement(ForItem,
                    { key: $id, [itemId]: d, [itemId + '-index']: index, $owner, $node: itemNode, $id },
                );
                return $item;
            });
            // } else if (!data) {
            //     if (loadingNode) { resolveTemplate($.owner, loadingNode, acc); }
            // } else if (!data.length) {
            //     if (emptyNode) { resolveTemplate($.owner, emptyNode, acc); }
        }
        return null;
    }
}

export class FragmentIf extends React.Component {
    render() {
        const { $data, $spec, $owner } = this.props;
        const node = $spec($data);
        return node ? createElt(node, $owner) : null;
    }
}

export class FragmentTag extends React.Component {
    render() {
        const $ = this;

        const { $data } = this.$;
        const acc = new Map();
        const tag = $data;
        if (tag) {
            resolveTemplate($.owner, { ...$.$spec, tag, uid: tag + ':' + $.uid }, acc);
        }
        return acc;
    }
}

export const allFragments = [
    ['ui:fragment', Fragment],
    ['ui:for', FragmentFor],
    ['ui:if', FragmentIf],
    ['ui:tag', FragmentTag],
    ['ui:slot', FragmentSlot],
]