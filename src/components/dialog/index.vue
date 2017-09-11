<template>
    <baseDialog v-show="visible" :customClass="customClass"
                :showCancelButton="showCancelButton"
                :showConfirmButton="showConfirmButton"
                :confirmButtonText="confirmButtonText"
                :cancelButtonText="cancelButtonText"
                :closeHandler="closeHandler"
                :confirmHandler="confirmHandler"
                :showClose="showClose"
                :header="header"
                :title="title"
                :footer="footer"
    >
        <div class="bee_dialog_content">
            <slot></slot>
        </div>
    </baseDialog>
</template>
<script>
    import basePopup from '../../mixins/basePopup';
    import baseDialog from './base.vue'
    export default{
        name: "snail-dialog",
        mixins: [basePopup],
        props: {
            customClass: String,
            showCancelButton: {
                type: Boolean,
                default: true
            },
            showConfirmButton: {
                type: Boolean,
                default: true
            },
            confirmButtonText: String,
            cancelButtonText: String,
            showClose: Boolean,
            footer: {
                type: Boolean,
                default: true
            },
            header: {
                type: Boolean,
                default: true
            },
            title: undefined,
            closeHandler: Function,
            confirmHandler: Function
        },
        data(){
            return {
                visible: false
            }
        },
        mounted() {
            if (this.value) {
                this.rendered = true;
                this.open();
            }
        },
        watch: {
            value(val) {
                this.visible = val;
            }
        },
        methods: {
            doClose(){
                this.value = false;
                this._closing = true;
                this.onClose && this.onClose();
                this.opened = false;
                if (!this.transition) {
                    this.doAfterClose();
                }
            }
        },
        components: {
            baseDialog
        }
    }
</script>