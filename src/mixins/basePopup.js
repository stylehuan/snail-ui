/**
 * @basePopup
 * @author  stylehuan
 * @create  2016-12-30 10:07
 */
import Vue from "vue";
import PopupManager from "../utils/popupManager"
import {extend as merge} from "../tools/helper"
let idSeed = 1;
const getDOM = function (dom) {
    if (dom.nodeType === 3) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
};
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        zIndex: {},
        mask: {
            type: Boolean,
            default: true
        },
        isCloseByTapMasK: {
            type: Boolean,
            default: true
        }
    },
    beforeMount() {
        this._popupId = 'popup_' + idSeed++;
        PopupManager.register(this._popupId, this);
    },
    beforeDestroy() {
        PopupManager.unregister(this._popupId);
        PopupManager.closeMask(this._popupId);
    },
    data(){
        return {
            opened: false,
            rendered: false
        };
    },
    methods: {
        open(options){
            if (!this.rendered) {
                this.rendered = true;
                this.$emit('input', true);
            }
            const props = merge({}, this.$props || this, options);
            this.doOpen(props);
        },
        doOpen(props) {
            if (this.opened) return;
            this._opening = true;
            this.visible = true;
            this.$emit('input', true);
            const dom = getDOM(this.$el);
            const mask = props.mask;
            const zIndex = props.zIndex;
            if (zIndex) {
                PopupManager.zIndex = zIndex;
            }
            if (mask) {
                if (this._closing) {
                    PopupManager.closeMask(this._popupId);
                    this._closing = false;
                }
                PopupManager.openMask(this._popupId, PopupManager.nextZIndex(), dom);
            }
            if (getComputedStyle(dom).position === 'static') {
                dom.style.position = 'absolute';
            }
            dom.style.zIndex = PopupManager.nextZIndex();
            this.opened = true;
            this.onOpen && this.onOpen();
            if (!this.transition) {
                this.doAfterOpen();
            }
        },
        doAfterOpen() {
            this._opening = false;
        },
        doClose() {
            this.visible = false;
            this.$emit('input', false);
            this._closing = true;
            this.onClose && this.onClose();
            this.opened = false;
        },
        doAfterClose() {
            PopupManager.closeMask(this._popupId);
            this._closing = false;
        },
        close(){
            this.doClose();
        },
        onCloseHandler(){
            let isDoClose = true;
            if (typeof this.close == "function") {
                isDoClose = this.close.call(this);
            }
            if (typeof isDoClose == "undefined" || isDoClose) {
                this.value = false;
            }
        },
        onConfirmHandler(){
            let isDoClose = true;
            if (typeof this.ok == "function") {
                isDoClose = this.ok.call(this);
            }
            if (typeof isDoClose == "undefined" || isDoClose) {
                this.value = false;
            }
        },
        destroyElement() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    },
    watch: {
        value(val) {
            if (val) {
                if (this._opening) return;
                if (!this.rendered) {
                    this.rendered = true;
                    Vue.nextTick(() => {
                        this.open();
                    });
                } else {
                    this.open();
                }
            } else {
                this.close();
            }
        }
    }
}