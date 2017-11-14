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
                <mko-cell title="联系人" :val="customerDetail.legalPerson"></mko-cell>
                <mko-cell title="联系电话" :val="customerDetail.phone"></mko-cell>
                <mko-cell title="合同签订日期" :val="customerDetail.contractSignTime"></mko-cell>
                <mko-cell title="合同生效日期" :val="customerDetail.contractStartTime"></mko-cell>
                <mko-cell title="合同失效日期" :val="customerDetail.contractEndTime"></mko-cell>
                <mko-cell title="合同文件"></mko-cell>
                <photo-box max="8" :read-only="true" :photo-list="images"></photo-box>
            </div>
            <div class="data-wrap" v-if="customerDetail.devices.length > 0">
                <mko-cell title="委托管理设备"></mko-cell>
                <mko-cell :title="item.name" :val="typeFilter(item.type)" v-for="item in customerDetail.devices"></mko-cell>
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
    import {NoData, ResError, PhotoBox} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                images: ['http://resources.aqfwy.com/e21db97b2ab44f608505d96a3c47f27e02000000', 'http://resources.aqfwy.com/44f8ab192e7349e68bd5c1180cc7632b05000000']
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
            }
        },
        components: {
            NoData,
            ResError,
            PhotoBox
        }
    }
</script>


