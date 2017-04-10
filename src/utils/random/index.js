/**
 * @index
 * @author  stylehuan
 * @create  2017-04-06 14:40
 */

let _createUid = () => {
    function s4() {
        return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
export default {
    getUid(){
        return this._createUid();
    },
    getIntRandomRange(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    },
    getRandom(len){
        if (typeof len == "undefined" || len < 0) {
            len = 18;
        }
        return Math.random().toString(36).slice(2).slice(0, len);
    },
    getFloatRandomRange(min, max, toFixed){
        toFixed = toFixed || 1;
        return (Math.random() * (max - min) + min).toFixed(toFixed);
    }
}