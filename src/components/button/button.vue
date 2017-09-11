<template>
    <button @touchstart="onTouchStart"
            @touchend="onTouchEnd"
            @click="onclick"
            @touchcancel="onTouchCancel"
            :class="classes">
        <slot></slot>
    </button>
</template>
<script>
    export default{
        name: "xButton",
        data(){
            return {
                defaultSkin: null,
                isTouch: false
            }
        },
        props: {
            skin: {
                type: Array,
                validator: function (oValue) {
                    return oValue.length >= 2;
                }
            },
            disabled: Boolean
        },
        created(){
            this.defaultSkin = ['snail_btn_default', 'snail_btn_touch', 'snail_btn_disabled'];
        },
        computed: {
            classes(){
                var _aClass = this.defaultSkin;
                if (this.skin) {
                    _aClass = this.skin;
                }
                return [
                    'snail_btn',
                    _aClass[0] ? _aClass[0] : "",
                    this.isTouch ? _aClass[1] : "",
                    this.disabled ? (_aClass[2] ? _aClass[2] : "") : "",
                ]
            }
        },
        methods: {
            onTouchStart(){
                if (this.disabled) return;
                this.isTouch = true;
            },
            onTouchEnd(){
                this.isTouch = false;
            },
            onclick(e){
                if (this.disabled) return;
                this.$emit('click', e);
            },
            onTouchCancel(){
                this.isTouch = false;
            }
        }
    };
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../styles/button.less";
</style>
