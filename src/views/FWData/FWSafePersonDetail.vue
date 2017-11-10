<template>
    <div class="FWSafePersonDetail">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="安全人员详细信息" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap fw-info-wrap" v-show="!noData&&!resError">
            <mko-edit-card title="基础信息" :edit="false" mode="readOnly">
                <mko-form-cell title="人员编号" :val="$route.query.personDetail.number"></mko-form-cell>
                <mko-form-cell title="姓名" :val="$route.query.personDetail.name"></mko-form-cell>
                <mko-form-cell title="联系方式" :val="$route.query.personDetail.phone"></mko-form-cell>
                <mko-form-cell title="职位" :val="$route.query.personDetail.office"></mko-form-cell>
                <mko-form-cell title="权限" :val="$route.query.personDetail.role"></mko-form-cell>
                <mko-form-cell title="证件类型" :val="$route.query.personDetail.credentialType"></mko-form-cell>
                <mko-form-cell title="证件号码" :val="$route.query.personDetail.credentialsNumber"></mko-form-cell>
                <mko-form-cell title="出生日期" :val="$route.query.personDetail.bornDate"></mko-form-cell>
                <mko-form-cell title="性别" :val="$route.query.personDetail.gender"></mko-form-cell>
                <mko-form-cell title="个人资质" :val="$route.query.personDetail.zz"></mko-form-cell>
                <mko-form-cell title="资格证书" val="查看"></mko-form-cell>
                <mko-form-cell title="工作时间" :val="$route.query.personDetail.jobTime"></mko-form-cell>
            </mko-edit-card>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .FWSafePersonDetail {

    }
</style>

<script>
    import { NoData, ResError } from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false
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


