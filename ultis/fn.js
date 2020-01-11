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