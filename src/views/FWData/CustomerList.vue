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
    import { NoData, ResError } from 'components'
    import {Indicator} from 'mint-ui';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //数据
                customerDatas: [{
                    id: 1, name: '华润新鸿基地产（无锡）有限公司'
                }, {
                    id: 2, name: '万科地产有限公司'
                }, {
                    id: 3, name: '上海库南地产有限公司'
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
                        name: item.name
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


