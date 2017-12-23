<template>
    <div class="mko-group-bar-wrap">
        <div class="group-bar">
            <div class="build-name" v-text="title" v-if="title"></div>
            <slot name="title"></slot>
            <div class="build-device-count" v-if="value">{{value}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["title", "value"],
        data () {
            return {}
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {},
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .mko-group-bar-wrap {
        .group-bar {
            width: 100%;
            height: 36px;
            position: relative;
            // .border-btm(#eeeeee);
            &::after {
                z-index: 10;
            }
            .build-name, .build-device-count {
                font-size: 12px;
                position: absolute;
                letter-spacing: 0px;
                top: 14px;
                bottom: 10px;
                margin: auto;
                height: 12px;
            }
            .build-name {
                left: 14px;
                color: #666666;
            }
            .build-device-count {
                right: 14px;
                color: #999999;
            }
        }
    }
</style>
