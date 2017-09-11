/**
 * @popupManager
 * @author  stylehuan
 * @create  2016-12-30 11:55
 */
import {addClass, removeClass} from '../tools/dom';
const instances = {};
let hasMask = false;
const getModal = function () {
    let mask = PopupManager.mask;
    if (mask) {
        hasMask = true;
    } else {
        hasMask = false;
        mask = document.createElement('div');
        PopupManager.mask = mask;
        mask.addEventListener('touchmove', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        mask.addEventListener('click', function () {
            PopupManager.doOnModalTap && PopupManager.doOnModalTap();
        });
    }
    return mask;
};
const PopupManager = {
    zIndex: 2000,
    getInstance: function (id) {
        return instances[id];
    },
    register: function (id, instance) {
        if (id && instance) {
            instances[id] = instance;
        }
    },
    unregister: function (id) {
        if (id) {
            instances[id] = null;
            delete instances[id];
        }
    },
    nextZIndex: function () {
        return PopupManager.zIndex++;
    },
    modalStack: [],
    doOnModalTap: function () {
        const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topItem) return;
        const instance = PopupManager.getInstance(topItem.id);
        if (instance && instance.isCloseByTapMasK) {
            instance.close();
        }
    },
    openMask: function (id, zIndex, dom) {
        if (!id || zIndex === undefined) return;
        const modalStack = this.modalStack;
        for (let i = 0, j = modalStack.length; i < j; i++) {
            const item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }
        const modalDom = getModal();
        addClass(modalDom, 'bee_mask');
        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom);
        } else {
            document.body.appendChild(modalDom);
        }
        if (zIndex) {
            modalDom.style.zIndex = zIndex;
        }
        modalDom.style.display = '';
        this.modalStack.push({id: id, zIndex: zIndex});
    },
    closeMask: function (id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();
        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            } else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (modalStack.length === 0) {
            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
            modalDom.style.display = 'none';
            PopupManager.modalDom = undefined;
        }
    },
    closeAll(){
        for (let key in instances) {
            if (instances.hasOwnProperty(key)) {
                let _instances = instances[key];
                _instances.value = false;
            }
        }
    }
};
export default PopupManager;