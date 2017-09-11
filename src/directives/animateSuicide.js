/**
 * @index
 * @author  stylehuan
 * @create  2017-03-14 14:28
 */
import {removeClass, addClass} from  "../../tools/dom"
export default {
    install(Vue){
        // 注册一个全局自定义指令 v-focus
        Vue.directive('animate', {
            inserted(el, binding){
                let _class = "";
                if (binding && binding.value) {
                    _class = binding.value;
                    addClass(el, _class);
                    el.addEventListener("webkitAnimationEnd", ()=> {
                        removeClass(el, _class);
                    });
                }
            }
        });
    }
}