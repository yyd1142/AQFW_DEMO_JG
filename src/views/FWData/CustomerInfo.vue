<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="$route.query.customerDetail.name" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData||!resError">
            <mko-cell title="联系人" val="杨子康"></mko-cell>
            <mko-cell title="联系电话" val="134444333333"></mko-cell>
            <mko-cell title="合同签订日期" val="2015年10月11日"></mko-cell>
            <mko-cell title="合同起止日期" val="2015年10月11日-2018年10月11日"></mko-cell>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .customer-info-wrap {

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
                Indicator.close();
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


