<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="签约客户" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap customer-list-wrap" v-show="!resError">
            <mko-cell :title="item.name" @click="goInfo(item)" v-for="item in customerDatas" is-link></mko-cell>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .customer-list-wrap {
        .data-wrap {
            margin-bottom: 14px;
            .mint-cell {
                min-height: 44px;
                .mint-cell-wrapper {
                    padding: @cellPadding;
                    font-size: 14px;
                    letter-spacing: 0;
                    color: #232323;
                }
            }
        }
    }
</style>

<script>
    import api from 'api'
    import {NoData, ResError} from 'components'
    import {Indicator} from 'mint-ui';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //数据
                customerDatas: [{
                    id: 1,
                    name: '华润新鸿基地产（无锡）有限公司',
                    legalPerson: '唐勇',
                    phone: '051082722951',
                    contractSignTime: '2010-10-11',
                    contractStartTime: '2010-10-11',
                    contractEndTime: '2020-10-11',
                    attachment: ['http://resources.aqfwy.com/e21db97b2ab44f608505d96a3c47f27e02000000', 'http://resources.aqfwy.com/44f8ab192e7349e68bd5c1180cc7632b05000000'],
                    devices: [{
                        id: 1,
                        name: '消防水系统',
                        type: [1]
                    }, {
                        id: 1,
                        name: '电器火灾监控系统',
                        type: [1, 2]
                    }]

                }, {
                    id: 2,
                    name: '鸿伟达科技有限公司',
                    legalPerson: '张庆帅',
                    phone: '051088150621',
                    contractSignTime: '2004-11-30',
                    contractStartTime: '2004-11-30',
                    contractEndTime: '2040-11-30',
                    attachment: ['http://resources.aqfwy.com/cafdbd3419c24ed5820d2a3b054b94e000000000'],
                    devices: [{
                        id: 1,
                        name: '消防水系统',
                        type: [1]
                    }, {
                        id: 1,
                        name: '电器火灾监控系统',
                        type: [1, 2]
                    }]

                }, {
                    id: 3,
                    name: '金马房地产（江苏）有限公司',
                    legalPerson: '冯地',
                    phone: '05105063888',
                    contractSignTime: '2009-09-11',
                    contractStartTime: '2009-09-11',
                    contractEndTime: '2021-09-12',
                    attachment: ['http://resources.aqfwy.com/addca85c6f8d446ea0dab1f7b823d10c01000000', 'http://resources.aqfwy.com/378336c34aab476296999dfb0e9e2e0f02000000'],
                    devices: []

                }]
            }
        },
        methods: {
            goInfo(item){
                this.$MKOPush({
                    name: 'CustomerInfo',
                    params: {
                        id: item.id
                    },
                    query: {
                        name: item.name,
                        customerDetail: item
                    }
                });
            },
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


