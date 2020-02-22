/** ***********************
 * Arrays.
 */

Array.EMPTY = Object.freeze([]);
Array.slice = (x, b = 0, e) => x ? x.slice(b, e) : [];

/**
 * Builds histogram on given field for given list.
 *
 * @param {*} list source
 * @param {*} field to be used as group key
 */
Array.groupBy = function (list, field = 'type') {
    const result = {};
    const fieldFn = typeof field === 'string' ? e => e[field] : field;
    const iter = (v, entry) => {
        const slot = result[v] || (result[v] = { id: v, count: 0, subs: [] });
        slot.count++;
        (slot.items || (slot.items = slot.subs)).push(entry);
    };
    (list || []).forEach((e) => {
        const value = fieldFn(e);
        if (Array.isArray(value)) {
            value.forEach(v => iter(v, e));
        } else {
            iter(value, e);
        }
    });
    return result;
}

/**
 * Sorts array by element property.
 *
 * @param {*} arr source
 * @param {*} property element property to sort by
 * @param {*} order
 */
Array.sortBy = function sortBy(arr, property = 'name', order = 1) {
    let fn = property;
    if (typeof property === 'string') {
        if (property[0] === '-') {
            /* eslint-disable */
            order = -1;
            property = property.substr(1);
        }
        fn = e => e[property];
    }

    function compare(a, b) {
        const aa = fn(a);
        const bb = fn(b);
        /* eslint-disable */
        return (aa < bb) ? -order : (aa > bb) ? order : 0;
    }
    return (arr || []).slice(0).sort(compare);
}

/**
 * Produces key/value index on given array.
 * 
 * @param {*} arr source array
 * @param {*} idKey id key
 * @param {*} valKey value key
 */
Array.index = Array.toHash = (arr, idKey = 'id', valKey) => {
    const r = {};
    if (arr) {
        const isKeyFn = typeof idKey === 'string' ? e => e[idKey] : idKey
        arr.forEach((e) => { r[isKeyFn(e)] = valKey ? e[valKey] : e; });
    }
    return r;
};