/**
 * @index
 * @author  stylehuan
 * @create  2017-04-06 14:51
 */
import random from "../../tools/random"
import * as helper from "../../tools/helper"
import throttle from "../../tools/throttle"
import queryString from "query-string"
import queryUrl from "../../tools/url"
export default {
    install(Vue){
        let _snail = Vue.prototype.$snail;
        if (!_snail) {
            _snail = {
                util: {}
            };
        } else {
            if (!_snail.util) {
                _snail.util = {};
            }
        }
        for (let key in helper) {
            if (helper.hasOwnProperty(key)) {
                _snail.util[key] = helper[key];
            }
        }
        _snail.util.random = random;
        _snail.util.throttle = throttle;
        _snail.util.queryString = queryString;
        _snail.util.url = queryUrl;
        Vue.prototype.$snail = _snail;
    }
}