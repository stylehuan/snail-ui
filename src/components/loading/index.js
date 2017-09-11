/**
 * @index
 * @author  stylehuan
 * @create  2017-04-05 09:50
 */
import LoadingConstructor from "./loading.vue"
let _instance;
let plugin = {
    install(vue, options){
        const Loading = vue.extend(LoadingConstructor);
        if (!_instance) {
            _instance = new Loading({
                el: document.createElement('div')
            });
            document.body.appendChild(_instance.$el);
        }
        let loading = {
            show(option){
                if (typeof options === 'string') {
                    _instance.text = options
                }
                _instance.show = true
            },
            hide () {
                _instance.show = false
            }
        };
        if (!vue.$snail) {
            vue.$snail = {
                loading
            }
        } else {
            vue.$snail.loading = loading
        }
        vue.mixin({
            created: function () {
                this.$loading = vue.$snail.loading
            }
        })
    }
}
export default plugin;
 