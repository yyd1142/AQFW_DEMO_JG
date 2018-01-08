<template>
    <div class="mko-load-more" @click="loadBottom">
        <div class="main">
            <span class="text">查看更多</span>
            <i class="icon icon-small-up-arrow"></i>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        loadBottom() { 
            this.$emit('click')
        }
    }
}
</script>

<style lang="less">
.mko-load-more {
    width: 100%;
    height: 36px;
    text-align: center;
    background-color: #ffffff;
    display: table;
    margin-bottom: 50px;
    &:active {
        background-color: rgba(255, 255, 255, 0.5);
    }
    .main {
        width: 100%;
        height: 36px;
        display: table-cell;
        vertical-align: middle;
        line-height: 36px;
        .text {
            color: #666666;
            font-size: 12px;
        }
        .icon {
            display: inline-block;
        }
    }
}
</style>
