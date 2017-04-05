<template>
    <transition name="fade">
        <div class="bee_loading_toast" v-show="show">
            <div class="bee_mask_transparent" @touchmove="touchmoveHandler"></div>
            <div class="bee_toast" :style="{position: position}">
                <div class="bee_loading">
                    <div class="bee_loading_leaf" v-for="i in 12" :class="['bee_loading_leaf_' + (i-1)]"></div>
                </div>
                <p class="bee_toast_content">{{text}}
                    <slot></slot>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            show: Boolean,
            text: {
                type: String,
                default: '加载中'
            },
            position: String
        },
        methods: {
            touchmoveHandler(e){
                e.preventDefault();
            },
            destroy() {
//                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        watch: {
            show(newVal) {
                if (!newVal) {
//                    this.$el.addEventListener('transitionend', this.destroyElement);
//                    this.destroy();
                }
            }
        }
    }
</script>

<style lang="less">
    @import 'loading.less';
</style>
