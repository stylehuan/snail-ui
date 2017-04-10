/**
 * @index
 * @author  stylehuan
 * @create  2017-04-06 15:31
 */

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const OBJECT_STRING = '[object Object]';
export function isDef(v) {
    return v !== undefined && v !== null;
}
export function isTrue(v) {
    return v === true;
}
export function isObject(v) {
    return obj !== null && typeof obj === 'object';
}
export function isPlainObject(obj) {
    return toString.call(obj) === OBJECT_STRING;
}
export function _toString(val) {
    return val == null
        ? ''
        : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
}
export function toNumber(val) {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

export function extend(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
}