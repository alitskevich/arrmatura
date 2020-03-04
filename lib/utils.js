export const setNodeMap = (map = new Map(), node)=>{
    if (node) {
        map.set(node.uid, node)
    }
    return node
}
function append(e, p, cursor) {
    let before = cursor ? cursor.nextSibling : p.firstChild
    if (!before) {
        if (p !== e.parentElement) {
            p.appendChild(e)
        }
    } else if (e !== before) {
        p.insertBefore(e, before)
    }
    return e
}

export function arrangeElements($, cursor={elt:null, parent: $.impl.elt}) {
    let p = $.first
    while (p) {
        const e = p.impl.elt
        if(e) {
            append(e, cursor.parent, cursor.elt) 
            cursor.elt = e
        } else {
            arrangeElements(p, cursor)
        }
        p = p.next
    }
}

const stringifyAttrs = (attrs) => {
    if (!attrs) {
        return ''
    }
    const r = []
    Object.entries(attrs).forEach(([k, v]) => {
        if (v && k !== '#text') {
            r.push(' ' + k + '="' + (v) + '"')
        }
    })
    return r.join('')
}

export function stringifyComponent({ uid, tag, state, container, children = new Map() }, tab = '') {
    const sattrs = stringifyAttrs(state)
    const ssubs = [...children.values()].map(c => stringifyComponent(c, `  ${tab}`)).join('\n')
    const text = state && state['#text']
    const stext = text ? `  ${tab}${text}` : ''
    if (tag === '#text') {
        return stext.trim()
    }
    return `${tab}<${tag}#${uid} ${container? container.uid: '-'}${sattrs}` + (!ssubs && !stext ? '/>' : `>\n${ssubs}${stext}\n${tab}</${tag}#${uid}>`)
}
