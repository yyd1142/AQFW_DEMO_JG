<template>
    <div class="qy-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据列表" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap"></div>
    </div>
</template>

<script>
    export default {
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
        methods: {
            back(){
                this.$MKOPop();
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .qy-count-detail-wrap {
    }
</style>
