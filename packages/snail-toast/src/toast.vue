<template>
    <transition name="toast">
        <div class="ctui_toast ctui_toast_text" v-show="show">
            <p class="ctui_toast_content" v-if="text" v-html="text"></p>
        </div>
    </transition>
</template>
<style lang="less">
    @import './toast.less';

    .toast-enter-active, .toast-leave-active {
        transition: opacity .5s
    }

    .toast-enter, .toast-leave-active {
        opacity: 0
    }
</style>
<script>
    export default {
        data(){
            return {
                show: false,
                duration: 2000,
                timer: null,
                text: "",
                closed: false
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init(){
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.duration);
                }
            },
            close(){
                this.closed = true;
            },
            clearTimer(){
                clearTimeout(this.timer);
                this.timer = null;
            },
            destroyElement() {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            destroy(){

            }
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                    this.show = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        }
    }
</script>