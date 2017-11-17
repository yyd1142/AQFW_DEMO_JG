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
                <div class="title-wrap"><span>基本信息</span></div>
                <mko-cell title="联系人" :val="customerDetail.legalPerson"></mko-cell>
                <mko-cell title="联系电话" :val="customerDetail.phone"></mko-cell>
                <mko-cell title="合同签订日期" :val="customerDetail.contractSignTime"></mko-cell>
                <mko-cell title="合同截止日期" :val="customerDetail.contractEndTime"></mko-cell>
                <!--<photo-box max="8" :read-only="true" :photo-list="customerDetail.attachment"></photo-box>-->
            </div>
            <div class="data-wrap">
                <div class="title-wrap"><span>合同文件</span></div>
                <mko-cell :title="item.fileName" val="查看" val-style="blue-font" is-link @click="goPhotoViewer(item)" v-for="item in customerDetail.attachment"></mko-cell>
            </div>
            <div class="data-wrap" v-if="customerDetail.devices.length > 0">
                <div class="title-wrap"><span>委托管理设备</span></div>
                <mko-cell :title="item.name" :val="typeFilter(item.type)" v-for="item in customerDetail.devices"></mko-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .data-wrap {
        margin-bottom: 10px;
        .title-wrap {
            height: 50px;
            width: 100%;
            padding-left: 14px;
            display: table;
            background-color: #ffffff;
            span {
                display: table-cell;
                vertical-align: middle;
                line-height: 50px;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
            }
        }
        .mint-cell {
            min-height: 44px;
            .mint-cell-wrapper {
                padding: @cellPadding;
                font-size: 14px;
                letter-spacing: 0;
                color: #232323;
            }
        }
        .blue-font {
            font-size: 14px;
            color: #3399FF;
            letter-spacing: 0;
        }
    }
</style>

<script>
    import {NoData, ResError, PhotoBox} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false
            }
        },
        computed: {
            customerDetail() {
                let item = {
                    id: '',
                    name: '',
                    legalPerson: '',
                    phone: '',
                    contractSignTime: '',
                    contractStartTime: '',
                    contractEndTime: '',
                    attachment: [],
                    devices: []
                }
                item = this.$route.query.customerDetail ? this.$route.query.customerDetail : item;
                return item;
            }
        },
        methods: {
            back(){
                this.$MKOPop();
            },
            typeFilter(type) {
                let text = [];
                type.map(item => {
                    if(item == 1) {
                        text.push('维修')
                    } else if(item == 2){
                        text.push('保养')
                    } else {
                        text.push('其他')
                    }
                    return text;
                });
                text = text.join(',');
                return text;
            },
            goPhotoViewer(item) {
                this.$MKOPush({
                    path: '/photo_viewer',
                    query: {
                        title: item.fileName,
                        url: item.url
                    }
                })
            }
        },
        components: {
            NoData,
            ResError,
            PhotoBox
        }
    }
</script>


