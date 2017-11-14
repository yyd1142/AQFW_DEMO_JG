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
                <mko-form-cell title="人员编号" :val="personDetail.number"></mko-form-cell>
                <mko-form-cell title="姓名" :val="personDetail.name"></mko-form-cell>
                <mko-form-cell title="联系方式" :val="personDetail.phone"></mko-form-cell>
                <mko-form-cell title="职位" :val="personDetail.office"></mko-form-cell>
                <mko-form-cell title="权限" :val="personDetail.role"></mko-form-cell>
                <mko-form-cell title="证件类型" :val="personDetail.credentialType"></mko-form-cell>
                <mko-form-cell title="证件号码" :val="personDetail.credentialsNumber"></mko-form-cell>
                <mko-form-cell title="出生日期" :val="personDetail.bornDate"></mko-form-cell>
                <mko-form-cell title="性别" :val="personDetail.gender"></mko-form-cell>
                <mko-form-cell title="个人资质" :val="personDetail.zz"></mko-form-cell>
                <mko-form-cell title="工作时间" :val="personDetail.jobTime"></mko-form-cell>
                <mko-form-cell title="资格证书"></mko-form-cell>
                <photo-box max="8" :read-only="true" :photo-list="images"></photo-box>
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
    import { NoData, ResError, PhotoBox } from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                images: ['http://resources.aqfwy.com/44102aa778bd48a7baf00e1452aed32100000000']
            }
        },
        computed: {
            personDetail() {
                let item = {
                    id: '',
                    type: '',
                    name: '',
                    phone: '',
                    zz: '',
                    number: '',
                    office: '',
                    role: '',
                    credentialType: '',
                    credentialsNumber: '',
                    bornDate: '',
                    gender: '',
                    zzBook: '',
                    jobTime: ''
                }
                item = this.$route.query.personDetail ? this.$route.query.personDetail : item;
                return item;
            }
        },
        methods: {
            back(){
                this.$MKOPop();
            }
        },
        components: {
            NoData,
            ResError,
            PhotoBox
        }
    }
</script>


