<template>
    <div class="FWSafePersonDetail">
        <div class="placeholder-item"></div>
        <mko-header title="消防安全人员详请" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap fw-info-wrap" v-show="!noData&&!resError">
            <div class="data-wrap">
                <div class="title-wrap"><span>基础信息</span></div>
                <mko-cell title="姓名" :val="personDetail.name"></mko-cell>
                <mko-cell title="编号" :val="personDetail.number"></mko-cell>
                <mko-cell title="电话" :val="personDetail.phone" phone></mko-cell>
                <mko-cell title="性别" :val="personDetail.gender"></mko-cell>
                <mko-cell title="职位" :val="personDetail.office"></mko-cell>
                <mko-cell title="权限" :val="personDetail.role"></mko-cell>
                <!--<photo-box max="8" :read-only="true" :photo-list="images"></photo-box>-->
            </div>
            <div class="data-wrap">
                <div class="title-wrap"><span>证件资历</span></div>
                <mko-cell title="证件类型" :val="personDetail.credentialType"></mko-cell>
                <mko-cell title="证件号码" :val="personDetail.credentialsNumber"></mko-cell>
                <mko-cell title="出生日期" :val="personDetail.bornDate"></mko-cell>
                <mko-cell title="个人资质" :val="personDetail.zz" @click="showAllContent(personDetail.zz)"></mko-cell>
                <mko-cell title="资格证书" val="查看" val-style="blue-font" is-link @click="goPhotoViewer"></mko-cell>
                <mko-cell title="工作时间" :val="personDetail.jobTime"></mko-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .FWSafePersonDetail {
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
                color: @mainBlue;
                letter-spacing: 0;
            }
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
            },
            goPhotoViewer() {
                this.$MKOPush({
                    path: '/photo_viewer',
                    query: {
                        title: '资格证书',
                        url: this.images[0]
                    }
                })
            },
            showAllContent(text) {
                this.$MKODialog({ msg: text });
            }
        },
        components: {
            NoData,
            ResError,
            PhotoBox
        }
    }
</script>


