
/** ***********************
 * Objects.
 */
/**
 * Checks if argument is empty .
 */
Object.EMPTY = Object.freeze({});
Object.isEmpty = (x) => {
    if (!x) {
        return true;
    }
    if (x instanceof Object) {
        // (zero-length array)
        if (Array.isArray(x)) {
            return x.length === 0;
        }
        // (zero-size map)
        if (x instanceof Map) {
            return x.size === 0;
        }
        // (has no props)
        return Object.keys(x).length === 0;
    }
    return false;
};

/**
 * Digs value in a given object structure by a given path.
 *
 * @param {*} o source object
 * @param {*} steps path
 * @param {*} def default value
 */
Object.dig = (o, steps) => steps.split('.').reduce((r, e) => r ? r[e] : void 0, o);

/**
 * Formats given string template with params.
 *
 * Template should contain placeholders like `{someKey}`,
 * which will be replaced with value by key from params.
 *
 * @param {string} template string template
 * @param {object} params hash with parameters
 */
String.format = (template, params) => {
    return `${template || ''}`.replace(/\{([\S]+)\}/i, (_, key) => ((params && params[key]) != null) ? params[key] : '');
};

function capitalize(x) {
    if (!x) {
        return x;
    }
    const s = `${x}`;

    return s[0].toUpperCase() + s.slice(1);
}
function camelize(s, sep = '_') {
    return ((s && s.length && s.split(sep).map((t, i) => (i ? capitalize(t) : t)).join('')) || ``)
}
String.tail = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.lastIndexOf(sep);

    return pos === -1 ? x : x.slice(pos + sep.length);
};

String.lastTail = (key, sep = '.') => ('' + key).split(sep).slice(-1)[0];

String.head = (x, sep = '.') => {
    if (!x) {
        return '';
    }
    const pos = x.indexOf(sep);

    return pos === -1 ? x : x.slice(0, pos);
};


String.pad = (x, size = 2, fill = '0') => {
    let s = String(x);
    while (s.length < (size)) { s = `${fill}${s}`; }
    return s;
};
String.capitalize = capitalize;
String.camelize = camelize;
String.mirror = (x) => (x || '').split('').reduce((r, c) => (c + r), '');
String.snakeCase = (x) => (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
String.proper = (s) => capitalize(camelize(s));
String.upper = s => ('' + s).toUpperCase();

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
Array.groupBy = function (list, field = 'id') {
    const result = {};
    const fieldFn = typeof field === 'string' ? e => e[field] : field;
    const iter = (v, entry) => {
        const slot = result[v] || (result[v] = { id: v, count: 0, subs: [] });
        slot.count++;
        slot.subs.push(entry);
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
 * Transforms array into hash object.
 * 
 * @param {*} list source array
 * @param {*} idKey id key
 * @param {*} valKey value key
 */
Array.toHash = (list, idKey = 'id', valKey) => {
    const r = {};
    if (list) {
        const isKeyFn = typeof idKey === 'string' ? e => e[idKey] : idKey
        list.forEach((e) => { r[isKeyFn(e)] = valKey ? e[valKey] : e; });
    }
    return r;
};

/** ***********************
 * Crypto.
 */
/**
 * Functions
 */

Function.ID = x => x;
Function.next = (COUNTER => (p = '') => p + (COUNTER++))(1);
Function.throw = (error, ErrorType = Error) => {
    throw typeof error === 'string' ? new ErrorType(error) : error;
};
Function.assert = (b, error, errorType) => b || Function.throw(error, errorType);
Function.compose = (...ff) => x0 => ff.reduceRight((x, f) => f(x), x0);
Function.swap = f => (a, b) => f(b, a);
Function.curry = (() => {
    const _curry = (fn, args0, lengthLimit) => {
        const fx = (args) => args.length >= lengthLimit ?
            fn(...args) :
            _curry(fn, args, lengthLimit - args.length);

        return (...args) => fx([...args0, ...args]);
    };
    return (f, ...args) => _curry(f, args, f.length);
})();

/* Simple GUID generator. */
Function.guid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

/* eslint-disable */
/* Simple hash function. */
Function.hash = function (s) {
    let a = 1,
        c = 0,
        h,
        o;
    if (s) {
        a = 0;
        /* jshint plusplus:false bitwise:false */
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a << 6 & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ c >> 21 : a;
        }
    }
    return String(a);
};