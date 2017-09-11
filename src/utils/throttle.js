/**
 * @index
 * @author  stylehuan
 * @create  2017-04-12 13:34
 */
export default (fn, timeout)=> {
    timeout = timeout || 20;
    var timeoutID;
    return function () {
        var scope = this, args = arguments;
        if (timeoutID) {
            return;
        }
        timeoutID = setTimeout(function () {
            clearTimeout(timeoutID);
            timeoutID = null;
            fn.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    }
};