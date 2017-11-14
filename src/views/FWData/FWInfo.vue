<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="fwInfo.dwName" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap fw-info-wrap" v-show="!noData&&!resError">
            <div class="data-wrap">
                <mko-cell title="平均服务评分" val="83" @click="go('/fw_score/'+ fwInfo.groupId)" is-link></mko-cell>
                <mko-cell title="任务执行记录" val="5" @click="go('/fw_task_history/'+ fwInfo.groupId)" is-link></mko-cell>
                <mko-cell title="消防安全人员" val="4" @click="go('/fw_safe_persons/'+ fwInfo.groupId)" is-link></mko-cell>
                <mko-cell title="签约客户" val="10" @click="go('/customer_list/' + fwInfo.groupId)" is-link></mko-cell>
            </div>
            <mko-edit-card title="基础信息" :edit="false" mode="readOnly">
                <mko-form-cell title="账号" :val="fwInfo.userId"></mko-form-cell>
                <mko-form-cell title="单位编码" :val="fwInfo.groupId"></mko-form-cell>
                <mko-form-cell title="单位名称" :val="fwInfo.dwName"></mko-form-cell>
                <mko-form-cell title="组织机构代码" :val="fwInfo.dwCode"></mko-form-cell>
                <mko-form-cell title="单位地址" :val="fwInfo.dwAddress"></mko-form-cell>
                <mko-form-cell title="行政区域" :val="fwInfo.dwXZArea"></mko-form-cell>
                <mko-form-cell title="业务范围" :val="fwInfo.business"></mko-form-cell>
                <mko-form-cell title="资质信息" :val="fwInfo.zzInfo"></mko-form-cell>
                <mko-form-cell title="资质证书"></mko-form-cell>
                <photo-box max="8" :read-only="true" :photo-list="fwInfo.zzProve"></photo-box>
                <mko-form-cell title="发证部门" :val="fwInfo.issuedDepartment"></mko-form-cell>
                <mko-form-cell title="有效期" :val="fwInfo.zsStartTime + '至' + fwInfo.zsEndTime"></mko-form-cell>
            </mko-edit-card>
            <mko-edit-card title="联系信息" :edit="false" mode="readOnly">
                <mko-form-cell title="管理员" :val="fwInfo.dwManager"></mko-form-cell>
                <mko-form-cell title="联系电话" :val="fwInfo.dwManagerPhone"></mko-form-cell>
                <mko-form-cell title="单位电话" :val="fwInfo.dwPhone"></mko-form-cell>
                <mko-form-cell title="单位传真" :val="fwInfo.dwFax"></mko-form-cell>
                <mko-form-cell title="邮政编码" :val="fwInfo.postalcode"></mko-form-cell>
                <mko-form-cell title="E-Mail" :val="fwInfo.dwEmail"></mko-form-cell>
            </mko-edit-card>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-info-wrap {
        > div {
            background: #fff;
        }
        .info-wrap {
            position: relative;
            display: block;
            box-sizing: border-box;
            height: 50px;
            padding: 6px 14px;
            .border-btm(#E0E0E0);
            .score {
                position: absolute;
                top: 6px;
                right: 8px;
            }
            .info {
                letter-spacing: 0;
                .title {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #232323;
                }
                .desc {
                    height: 17px;
                    line-height: 17px;
                    font-size: 12px;
                    color: #B7B7B7;
                }
            }
        }
        .score-wrap {
            height: 144px;
            padding: 10px 14px;
            margin-bottom: 10px;
            .title {
                margin-bottom: 6px;
                font-size: 10px;
                letter-spacing: 0;
                color: #606060;
            }
            .item {
                display: flex;
                margin-bottom: 3px;
                .star {
                    flex: 0 0 95px;
                    -webkit-flex: 0 0 95px;
                }
                .mt-progress {
                    flex: 1;
                    -webkit-flex: 1;
                    height: 18px;
                    margin-left: 17px;
                    .mt-progress-content {
                        position: relative;
                        bottom: 1px;
                        .mt-progress-progress {
                            background: #FC6842;
                        }
                    }
                }
            }
        }
        .data-wrap {
            margin-bottom: 10px;
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
    import { NoData, ResError, PhotoBox } from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false
            }
        },
        computed: {
            fwInfo() {
                let item = {
                    groupId: '',
                    dwName: '',
                    dwCode: '',
                    dwAddress: '',
                    dwXZArea: '',
                    business: '',
                    zzInfo: '',
                    zzProve: [],
                    issuedDepartment: '',
                    zsStartTime: '',
                    zsEndTime: '',
                    dwManager: '',
                    dwManagerPhone: '',
                    dwPhone: '',
                    dwFax: '',
                    postalcode: '',
                    dwEmail: '',
                    score: ''
                }
                item = this.$route.query.fwDetail ? this.$route.query.fwDetail : item;
                return item;
            }
        },
        methods: {
            go(path){
                this.$MKOPush(path);
            },
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


