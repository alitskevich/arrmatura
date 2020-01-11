
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
