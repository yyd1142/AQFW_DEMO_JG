<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="fwInfo.dwName" :background-color="scoreHeadColor(fwInfo.score)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap fw-info-wrap" v-show="!noData&&!resError">
            <div class="label-wrap" :style="{backgroundColor: scoreHeadColor(fwInfo.score)}" @click="goScoreInfo">
                <div class="label-item">
                    <div class="score-banner">
                        <i class="icon-star" :class="'icon-star-' + fwInfo.score"></i>
                    </div>
                    <i class="icon icon-arrow-right-white"></i>
                </div>
            </div>
            <div class="data-wrap">
                <!--<mko-cell title="平均服务评分" val="82.2" @click="go('/fw_score/'+ fwInfo.groupId)" is-link></mko-cell>-->
                <mko-cell title="任务执行记录" val="5" @click="go('/fw_task_history/'+ fwInfo.groupId)" is-link></mko-cell>
                <mko-cell title="消防安全人员" val="4" @click="go('/fw_safe_persons/'+ fwInfo.groupId)" is-link></mko-cell>
                <mko-cell title="签约客户" val="4" @click="go('/customer_list/' + fwInfo.groupId)" is-link></mko-cell>
            </div>
            <div class="data-wrap">
                <div class="title-wrap"><span>账号信息</span></div>
                <mko-cell title="账号" :val="fwInfo.userId"></mko-cell>
                <mko-cell title="单位编码" :val="fwInfo.groupId"></mko-cell>
                <mko-cell title="单位名称" :val="fwInfo.dwName"></mko-cell>
                <mko-cell title="组织机构代码" :val="fwInfo.dwCode"></mko-cell>
                <mko-cell title="单位地址" :val="fwInfo.dwAddress"></mko-cell>
                <mko-cell title="行政区域" :val="fwInfo.dwXZArea"></mko-cell>
                <mko-cell title="业务范围" :val="fwInfo.business"></mko-cell>
                <mko-cell title="资质信息" :val="fwInfo.zzInfo" @click="showAllContent(fwInfo.zzInfo)"></mko-cell>
                <mko-cell title="资质证书" val="查看" val-style="blue-font" is-link @click="goPhotoViewer"></mko-cell>
                <!--<photo-box max="8" :read-only="true" :photo-list="fwInfo.zzProve"></photo-box>-->
                <mko-cell title="发证部门" :val="fwInfo.issuedDepartment"></mko-cell>
                <mko-cell title="有效期" :val="fwInfo.zsStartTime + '至' + fwInfo.zsEndTime"></mko-cell>
            </div>
            <div class="data-wrap">
                <div class="title-wrap"><span>联系方式</span></div>
                <mko-cell title="管理员" :val="fwInfo.dwManager"></mko-cell>
                <mko-cell title="联系电话" :val="fwInfo.dwManagerPhone" phone></mko-cell>
                <mko-cell title="单位电话" :val="fwInfo.dwPhone" phone></mko-cell>
                <mko-cell title="单位传真" :val="fwInfo.dwFax" phone></mko-cell>
                <mko-cell title="邮政编码" :val="fwInfo.postalcode"></mko-cell>
                <mko-cell title="E-Mail" :val="fwInfo.dwEmail"></mko-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-info-wrap {
        > div {
            background: #fff;
        }
        .label-wrap {
            width: 100%;
            height: 32px;
            margin-bottom: 10px;
            .label-item {
                background: rgba(255, 255, 255, 0.50);
                border-radius: 4px;
                text-align: center;
                display: table;
                margin: 0 auto;
                padding: 3px 4px;
                position: relative;
                .score-banner {
                    width: 86px;
                    height: 14px;
                    position: relative;
                    .icon-star {
                        position: absolute;
                        left: 0;
                        right: 0;
                        margin: auto;
                        top: 0;
                        bottom: 0;
                    }
                }
                .main {
                    height: 18px;
                    border-radius: 2px;
                    text-align: center;
                    display: inline-block;
                    line-height: 12px;
                    padding: 2px;
                    box-sizing: border-box;
                    margin-right: 4px;
                    span {
                        color: #ffffff;
                        font-size: 12px;
                    }
                }
                .icon {
                    position: absolute;
                    right: -14px;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
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
            .title-wrap {
                height: 50px;
                width: 100%;
                padding-left: 14px;
                display: table;
                background-color: #ffffff;
                font-weight: bold;
                border-bottom: 1px solid #eee;
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
    }
</style>

<script>
    import api from 'api'
    import {NoData, ResError, PhotoBox, Star} from 'components'
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
            },
            scoreHeadColor(val) {
                val = parseInt(val);
                let colors = ['', '#FF8383', '#FF8383', '#FF9744', '#FF9744', '#34D986', '#34D986', '#52B0FE', '#52B0FE', '#8988FF', '#8988FF']
                return colors[val];
            },
            goPhotoViewer() {
                this.$MKOPush({
                    path: '/photo_viewer',
                    query: {
                        title: '资格证书',
                        url: this.fwInfo.zzProve[0]
                    }
                })
            },
            goScoreInfo() {
                this.$MKOPush({
                    path: `/fw_score_detail/${this.$route.params.id}`,
                    query: {
                        fwDetail: this.fwInfo
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
            PhotoBox,
            Star
        }
    }
</script>


