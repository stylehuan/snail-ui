/**
 * @index
 * @author  stylehuan
 * @create  2017-04-10 11:10
 */
import axios from "axios"
let emptyFn = function () {
};
export default {
    install(Vue){
        const ajax = function (options) {
            let request = {};
            var CancelToken = axios.CancelToken;
            let _url = options.url;
            let _headers = options.headers || null;
            let _data = options.data || null;
            let _method = options.method || "get";
            let _success = options.success || emptyFn;
            let _error = options.error || emptyFn;
            let _beforeSend = options.beforeSend || emptyFn;
            let _complete = options.complete || emptyFn;
            let _isMode = options.isMode || false;
            if (options.url == "") return;
            let config = {
                method: _method,
                url: _url,
                data: _data,
                cancelToken: new CancelToken(function executor(c) {
                    request.cancel = c;
                })
            };
            if (_method == "get") {
                config.data = null;
                config.params = _data;
            }
            if (_headers) {
                config.headers = _headers;
            }
            if (_isMode) {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
            _beforeSend();
            console.log("--ajaxSend--", _url);
            axios(config).then(function (response) {
                console.log("--ajaxSuccess--", response);
                _complete(response.request, response.status);
                if (response.data) {
                    _success(response.data);
                } else {
                    console.log("--ajaxSuccess--", "no data");
                }
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log("请求abort");
                } else {
                    console.log("--ajaxError--", thrown);
                    _error(thrown);
                }
            });
            return request;
        };
        let _snail = Vue.prototype.$snail;
        if (!_snail) {
            _snail = {
                http: ajax
            };
        } else {
            _snail.http = ajax;
        }
        Vue.prototype.$snail = _snail;
    }
}