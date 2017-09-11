<template>
    <div class="snail_marquee">
        <ul class="" ref="root">
            <slot></slot>
        </ul>
    </div>
</template>
<style lang="less">
    .snail_marquee {
        width: 100%;
    }
</style>
<script>
    export default {
        name: 'marquee',
        props: {
            interval: {
                type: Number,
                default: 3000 //ms
            },
            duration: {
                type: Number,
                default: 600 //ms
            },
            direction: {
                validator (val) {
                    return val === 'up' || val === 'down';
                },
                default: 'up'
            },
            minLen: {
                type: Number,
                default: 4
            }
        },
        data() {
            return {
                timer: null
            };
        },
        mounted () {
            this.start();
        },
        deactivated() {
            this.destroy();
        },
        destroyed() {
            this.destroy();
        },
        methods: {
            destroy() {
                clearInterval(this.timer);
                this.timer = null;
                this.unbindTransitioneEvent();
            },
            bindTransitioneEvent() {
                let _root = this.getRootElm();
                _root.addEventListener('transitionend', this._transitionedHandler, false);
            },
            unbindTransitioneEvent() {
                let _root = this.getRootElm();
                _root.removeEventListener('transitionend', this._transitionedHandler, false);
            },
            _transitionedHandler() {
                let _root = this.getRootElm();
                this.unbindTransitioneEvent();
                this.setTransition(_root, 'transform 0ms ease-in-out');
                this.setTransform(_root, 'translate3d(0,0,0)');
                this.changePosition();
                this.bindTransitioneEvent();
            },
            changePosition() {
                let _root = this.getRootElm(),
                        node = _root.firstElementChild;
                _root.appendChild(node);
            },
            start () {
                let _root = this.getRootElm(), currenTranslateY,
                        moveHeight = this.getMoveSize();
                _root.addEventListener('transitionend', this._transitionedHandler, false);
                if (_root.children.length < this.minLen) return;
                this.timer = setInterval(() => {
                    // 正常轮播transition时间为用户设置duration时间
                    this.setTransition(_root, 'transform ' + this.duration + 'ms ease-in-out');
                    // 正常轮播每次currenTranslateY增加一个item高度
                    if (this.direction === 'up') {
                        currenTranslateY = -moveHeight + 'rem';
                    }
                    this.setTransform(_root, 'translate3d(0,' + currenTranslateY + ',0)');
                }, this.interval + this.duration);
            },
            getMoveSize() {
                var itemChildrem = this.getRootElm().firstElementChild;
                var _offset = 'offset';
                if (this.direction === 'left' || this.direction == 'right') {
                    _offset += 'Width';
                } else {
                    _offset += 'Height';
                }
                return this.setPxToRem(itemChildrem[_offset]);
            },
            getRootElm() {
                return this.$refs['root'];
            },
            getLen() {
                return this.getRootElm().children.length;
            },
            setPxToRem(val) {
                let _base = 750 / window.innerWidth;
                return _base * val / 100;
            },
            setTransition (ele, val) {
                ele.style.transition = val;
                ele.style.WebkitTransition = '-webkit-' + val;
                ele.style.MozTransition = '-moz-' + val;
                ele.style.OTransition = '-o-' + val;
            },
            setTransform (ele, val) {
                ele.style.transform = val;
                ele.style.WebkitTransform = val;
                ele.style.MozTransform = val;
                ele.style.OTransform = val;
            }
        }
    };
</script>
