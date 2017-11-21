<template>
    <div class="qy-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据列表" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="data-wrap">
                <mko-cell class="title-cell" title="单位基本信息"></mko-cell>
                <mko-cell title="单位名称" :val="data.name"></mko-cell>
                <mko-cell title="单位地址" :val="data.desc"></mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell class="title-cell" title="单位联系方式"></mko-cell>
                <mko-cell title="单位名称" :val="data.person"></mko-cell>
                <mko-cell title="单位地址" :val="data.number"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data: {}
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.data = JSON.parse(sessionStorage.getItem('QYCountDetail'));
        },
        deactivated() {
            sessionStorage.removeItem('QYCountDetail');
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
        .data-wrap{
            margin-top:10px;
            .title-cell {
                height: 50px;
                .cell {
                    height: 50px;
                }
            }
        }
    }
</style>
