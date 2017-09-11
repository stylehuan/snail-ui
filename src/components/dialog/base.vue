<template>
    <transition name="bee-dialog">
        <div class="bee_dialog" @touchmove="touchmoveHandler">
            <div class="bee_dialog_box" :class="customClass">
                <div class="bee_dialog_main">
                    <div class="bee_dialog_header" v-if="$slots.header">
                        <slot name="header"/>
                    </div>
                    <div class="bee_dialog_header" v-else-if="header">
                        <div class="title" v-if="title">{{title}}</div>
                        <i class="bee_dialog_close iconfont" v-if="showClose" @click="closeModal">
                            &#xe635;</i>
                    </div>
                    <div class="bee_dialog_body">
                        <slot></slot>
                    </div>
                    <div class="bee_dialog_footer" v-if="$slots.footer">
                        <slot name="footer"/>
                    </div>
                    <div class="bee_dialog_footer" v-else-if="footer">
                     <span class="bee_dialog_cancel_button" v-show="showCancelButton"
                           @click="closeModal">{{cancelButtonText}}</span>
                        <span class="bee_dialog_confirm_button" v-show="showConfirmButton"
                              @click="confirmModal">{{confirmButtonText}}
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/javascript">
    export default {
        name: 'dialog',
        props: {
            id: [Number, String],
            title: {
                type: String,
                default: ""
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            },
            customClass: {
                type: String,
                default: "bee_dialog_default"
            },
            showClose: {
                type: Boolean,
                default: true
            },
            showConfirmButton: {
                type: Boolean,
                default: true
            },
            showCancelButton: {
                type: Boolean,
                default: false
            },
            confirmButtonText: {
                type: String,
                default: "确定"
            },
            cancelButtonText: {
                type: String,
                default: "取消"
            },
            closeHandler: Function,
            confirmHandler: Function
        },
        methods: {
            closeModal(){
                typeof this.closeHandler == "function" && this.closeHandler();
            },
            confirmModal(){
                typeof this.confirmHandler == "function" && this.confirmHandler();
            },
            touchmoveHandler(e){
                e.preventDefault();
            }
        }
    };
</script>
<style lang="less">
    @import "../../styles/mask.less";
    @import "../../styles/dialog.less";
</style>