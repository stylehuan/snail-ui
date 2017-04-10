/**
 * @index
 * @author  stylehuan
 * @create  2017-04-06 14:51
 */
import random from "../../utils/random"
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
        _snail.util.random = random;
    }
}