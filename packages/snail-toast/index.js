/**
 * @index
 * @author  stylehuan
 * @create  2017-04-05 09:50
 */
import toastConstructor from "./src/toast"
let instances = [];
let seed = 1;
let defaultZindex = 3000;
let closeTotal = function (id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};
export default {
    install(vue){
        const Toast = vue.extend(toastConstructor);
        const toast = function (options) {
            options = options || {};
            if (typeof options === 'string') {
                options = {
                    text: options
                };
            }
            let userOnClose = options.onClose;
            let id = 'message_' + seed++;
            options.onClose = function () {
                closeTotal(id, userOnClose);
            };
            let _instance = new Toast({
                el: document.createElement('div'),
                data: options
            });
            _instance.id = id;
            document.body.appendChild(_instance.$el);
            _instance.vm = _instance.$mount();
            _instance.vm.show = true;
            _instance.dom = _instance.vm.$el;
            _instance.dom.style.zIndex = defaultZindex++;
            instances.push(_instance);
            return _instance.vm;
        };
        if (!vue.$snail) {
            vue.$snail = {
                toast: toast
            }
        } else {
            vue.$snail.toast = toast
        }
        vue.mixin({
            created: function () {
                this.$toast = vue.$snail.toast
            }
        });
    }
}
 