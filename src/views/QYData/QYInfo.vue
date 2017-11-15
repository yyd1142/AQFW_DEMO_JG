<template>
    <div>
        <mt-header class="header-wrap qy-info-header"
                   :style="{backgroundColor:scoreHeadColor($route.query.score || dwScore.totalScore)}"
                   :title="this.$route.query.name || '社会单位'"
                   fixed>
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap qy-info-wrap" v-if="!noData&&!resError">
            <!--<div @click="$MKOPush(`/score/${$route.params.id}?name=${$route.query.name}`)">-->
                <!--<score-banner :unit-info="$route.query.name||dwInfo.dwName"-->
                              <!--:unit-score="$route.query.score||dwScore.totalScore"></score-banner>-->
            <!--</div>-->
            <div class="label-wrap" :style="{backgroundColor:scoreHeadColor($route.query.score || dwScore.totalScore)}" @click="$MKOPush(`/score/${$route.params.id}?name=${$route.query.name}`)">
                <div class="label-item">
                    <div class="main" :class="scoreColorStyle($route.query.score || dwScore.totalScore)" :style="{ marginRight: index === (dwInfo.attributes.length - 1) ? 0 : '4px' }" v-for="item, index in dwInfo.attributes" v-if="!noAttributes"><span>{{attributesFilter(item.attributeName)}}</span></div>
                    <div class="main" :class="scoreColorStyle($route.query.score || dwScore.totalScore)" v-if="noAttributes"><span>暂无评价</span></div>
                    <i class="icon icon-link-arrow"></i>
                </div>
            </div>
            <div class="data-wrap" style="margin-top: 48px;">
                <div @click="go('/hidden_danger/'+$route.params.id)">
                    <mt-cell title="企业风险管理" is-link></mt-cell>
                </div>
                <div @click="go('/build_list/'+$route.params.id)">
                    <mt-cell title="建筑信息" is-link></mt-cell>
                </div>
                <div @click="go('/xfzr_list/'+$route.params.id)">
                    <mt-cell title="消防安全责任单位" is-link></mt-cell>
                </div>
                <div @click="go('/safe_activity_list/'+$route.params.id)">
                    <mt-cell title="安全活动" is-link></mt-cell>
                </div>
                <div @click="go('/fire_record/'+$route.params.id)">
                    <mt-cell title="火灾记录" is-link></mt-cell>
                </div>
                <div @click="go('/jgzf_record/'+$route.params.id)">
                    <mt-cell title="监督执法记录" is-link></mt-cell>
                </div>
                <div @click="goQYComment">
                    <mt-cell title="单位评价" is-link></mt-cell>
                </div>
                <div @click="go('/qy_attributes/'+$route.params.id)">
                    <mt-cell title="单位属性" is-link></mt-cell>
                </div>
            </div>

            <div class="data-wrap">
                <mt-cell title="账号信息" :value="dwInfo.userName||'暂无'"></mt-cell>
                <mt-cell title="单位编码" :value="dwInfo.groupId||'暂无'"></mt-cell>
            </div>
            <div class="data-wrap">
                <mt-cell title="单位名称" :value="dwInfo.dwName||'暂无'"></mt-cell>
                <mt-cell title="单位简称" :value="dwInfo.dwShortName||'暂无'"></mt-cell>
                <mt-cell title="组织机构代码" :value="dwInfo.dwCode||'暂无'"></mt-cell>
                <mt-cell title="单位地址"
                         :value="(dwInfo.dwProvinceName||'未知')+'-'+(dwInfo.dwCityName||'未知')+'-'+(dwInfo.dwAreaName||'未知')"></mt-cell>
                <mt-cell title="详细地址" :value="dwInfo.dwAddress||'暂无'"></mt-cell>
                <!--<mt-cell title="行政区域"-->
                <!--:value="(dwInfo.dwXZProvinceName+dwInfo.dwXZCityName+dwInfo.dwXZAreaName)||'暂无'"></mt-cell>-->
                <mt-cell title="单位类型" :value="(dwInfo.dwTypeName+dwInfo.dwSubTypeName)||'暂无'"></mt-cell>
                <mt-cell title="经济所有制" :value="dwJJSYZ(dwInfo.dwJJSYZ)"></mt-cell>
                <mt-cell title="单位其他属性" :value="dwInfo.dwAttribute||'暂无'"></mt-cell>
                <mt-cell title="消防管辖" :value="dwInfo.gxDWName ? dwInfo.gxDWName : '暂无'"></mt-cell>
                <mt-cell title="监督员" :value="dwInfo.jgName||'暂无'"></mt-cell>
            </div>
            <div class="data-wrap">
                <mt-cell title="消防安全管理人" :value="dwInfo.dwManager||'暂无'"></mt-cell>
                <mt-cell title="联系电话" :value="dwInfo.dwManagerPhone||'暂无'">
                    <a class="phone" :href="'tel:' + dwInfo.dwManagerPhone"
                       v-if="dwInfo.dwManagerPhone">{{dwInfo.dwManagerPhone}}</a>
                </mt-cell>
                <mt-cell title="消防安全责任人" :value="dwInfo.dwZRPerson||'暂无'"></mt-cell>
                <mt-cell title="联系电话" :value="dwInfo.dwZRPhone||'暂无'">
                    <a class="phone" :href="'tel:' + dwInfo.dwZRPhone" v-if="dwInfo.dwZRPhone">{{dwInfo.dwZRPhone}}</a>
                </mt-cell>
                <mt-cell title="企业法人" :value="dwInfo.dwFaRen||'暂无'"></mt-cell>
                <mt-cell title="联系电话" :value="dwInfo.dwFaRenPhone||'暂无'">
                    <a class="phone" :href="'tel:' + dwInfo.dwFaRenPhone"
                       v-if="dwInfo.dwFaRenPhone">{{dwInfo.dwFaRenPhone}}</a>
                </mt-cell>
                <mt-cell title="法人证件号" :value="dwInfo.dwFaRenID||'暂无'"></mt-cell>
                <mt-cell title="单位电话" :value="dwInfo.dwPhone||'暂无'">
                    <a class="phone" :href="'tel:' + dwInfo.dwPhone" v-if="dwInfo.dwPhone">{{dwInfo.dwPhone}}</a>
                </mt-cell>
                <mt-cell title="单位传真" :value="dwInfo.dwFax||'暂无'"></mt-cell>
                <mt-cell title="邮政编码" :value="dwInfo.dwPostcode||'暂无'"></mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api'
    import {NoData, ResError, ScoreBanner} from 'components';
    import {dwJJSYZ, calcScoreText, calcBannerCircle, calcBannerBg} from 'filters'
    import {Indicator} from 'mint-ui';
    var _id = '';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //数据
                dwInfo: {
                    attributes: []
                },
                dwScore: '',
                noAttributes: false
            }
        },
        mounted() {

        },
        activated(){
            this.getData();
        },
        methods: {
            dwJJSYZ,
            getData(){
//        Indicator.open({spinnerType: 'fading-circle'});
                this.resError = false;
                this.noData = false;
                this.dwInfo = {};
                this.dwScore = '';
                let params = {
                    groupId: this.$route.params.id
                };
                api.getQyInfo(params).then(res => {
                    _id = this.$route.params.id;
                    if (!res) {
                        this.resError = true;
                        return;
                    }
                    this.dwInfo = res.response || "";
                    if(res.response.attributes.length <= 0) {
                        this.noAttributes = true;
                    } else {
                        this.noAttributes = false;
                    }
                    if (!this.dwInfo)
                        this.noData = true;
                });
                api.getScoreList(params).then(res => {
                    if (!res) {
                        return;
                    }
                    this.dwScore = res.msg.length ? res.msg[res.msg.length - 1] : {};
                    if (!this.dwScore.totalScore)
                        this.dwScore.totalScore = 0;
                });
            },
            calcScoreText,
            calcBannerCircle,
            calcBannerBg,
            go(path){
                this.$MKOPush(path);
            },
            back(){
                this.$MKOPop();
                Indicator.close();
            },
            scoreHeadColor(val) {
                val = parseFloat(val);
                if (!val)
                    return '#8988FF';
                if (val >= 90) {
                    return '#8988FF'
                } else if (val >= 80) {
                    return '#52B0FE'
                } else if (val >= 70) {
                    return '#34D986'
                } else if (val >= 60) {
                    return '#FFC128'
                } else {
                    return '#FF8383'
                }
            },
            scoreColorStyle(score) {
                let val = parseFloat(score);
                if (!val)
                    return 'gradients90';
                if (val >= 90) {
                    return 'gradients90'
                } else if (val >= 80) {
                    return 'gradients80'
                } else if (val >= 70) {
                    return 'gradients70'
                } else if (val >= 60) {
                    return 'gradients60'
                } else {
                    return 'gradients50'
                }
            },
            attributesFilter(item) {
                if(item.length >= 7) {
                    return `${item.substring(0, 4)}...`;
                } else {
                    return item;
                }
            },
            goQYComment() {
                this.$MKOPush({
                    path: `/qy_comment/${this.$route.params.id}`,
                    query: {
                        score: this.$route.query.score
                    }
                })
            }
        },
        components: {
            NoData,
            ResError,
            ScoreBanner
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .qy-info-header {
        background-color: #A386F3;
        /*opacity: 0;*/
    }

    .qy-info-wrap {
        .label-wrap {
            width: 100%;
            height: 32px;
            margin-bottom: 10px;
            position: fixed;
            z-index: 22;
            .label-item {
                background: rgba(255, 255, 255, 0.50);
                border-radius: 4px;
                text-align: center;
                display: table;
                margin: 0 auto;
                padding: 3px 4px;
                position: relative;
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
        .data-wrap {
            & + .data-wrap {
                margin-top: 14px;
            }
            .phone {
                color: @mainBlue;
            }
            .mint-cell {
                min-height: 44px;
                background: none;
                background-color: #fff;
                .mint-cell-wrapper {
                    padding: @cellPadding;
                    font-size: 14px;
                    letter-spacing: 0;
                    color: #232323;
                    .mint-cell-title {
                        min-width: 100px;
                        white-space: nowrap;
                    }
                    .mint-cell-value {
                        display: block;
                        padding-left: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
