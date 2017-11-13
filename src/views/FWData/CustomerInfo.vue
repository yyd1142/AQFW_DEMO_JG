<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="$route.query.name" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData||!resError">
            <div class="data-wrap">
                <mko-cell title="联系人" val="杨子康"></mko-cell>
                <mko-cell title="联系电话" val="134444333333"></mko-cell>
                <mko-cell title="合同签订日期" val="2015年10月11日"></mko-cell>
                <mko-cell title="合同起止日期" val="2015年10月11日-2018年10月11日"></mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell title="合同文件"></mko-cell>
                <mko-cell title="xxx服务合同文件.pdf" val="查看"></mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell title="委托管理设备"></mko-cell>
                <mko-cell title="消防水系统" val="维修"></mko-cell>
                <mko-cell title="电气火灾监控系统" val="维修,保养"></mko-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .data-wrap {
        width: 100%;
        margin-bottom: 14px;
    }
</style>

<script>
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
            }
        },
        methods: {
            back(){
                this.$MKOPop();
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


