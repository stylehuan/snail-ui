/**
 * @index
 * @author  stylehuan
 * @create  2017-04-10 09:25
 */
import Button from './components/button'
import Loading from './components/loading'
import Dialog from "./components/dialog"
import Toast from "./components/toast"
const snail = {
    Button,
    Loading,
    Toast,
    Dialog
};
const install = function (Vue) {
    if (install.installed) return;
    Vue.component(Button.name, Button);
    Vue.component(Dialog.name, Dialog);
    Object.keys(snail).forEach((key) => {
        Vue.component(key, snail[key]);
    });
};
module.exports = Object.assign(snail, {install});