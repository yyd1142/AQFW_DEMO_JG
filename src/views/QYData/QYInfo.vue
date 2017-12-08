<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="this.$route.query.name || '社会单位'" :background-color="scoreHeadColor($route.query.score || dwScore.totalScore)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap qy-info-wrap" v-if="!noData&&!resError">
            <div class="score-banner" :style="{backgroundColor:scoreHeadColor($route.query.score || dwScore.totalScore)}" @click="$MKOPush(`/score/${$route.params.id}?name=${$route.query.name}`)">
                <span>{{$route.query.score || dwScore.totalScore}}</span>
            </div>
            <div class="label-wrap" :style="{backgroundColor:scoreHeadColor($route.query.score || dwScore.totalScore)}" @click="goQYComment">
                <div class="label-item">
                    <div class="main" :class="scoreColorStyle($route.query.score || dwScore.totalScore)" :style="{ marginRight: index === (dwInfo.attributes.length - 1) ? 0 : '4px' }" v-for="item, index in dwInfo.attributes" v-if="!noAttributes">
                        <span>{{attributesFilter(item.attributeName)}}</span></div>
                    <div class="main" :class="scoreColorStyle($route.query.score || dwScore.totalScore)" v-if="noAttributes">
                        <span>暂无标签</span></div>
                    <i class="icon icon-arrow-right-white"></i>
                </div>
            </div>
            <div class="data-wrap">
                <mko-cell title="火灾记录" :is-link="recoredCount.hzResult != 0" @click="goRecord(1)">
                    <div :style="{color: recoredCount.hzResult === 0 ? '#333' : '#666'}">{{recoredCount.hzResult}}条记录</div>
                </mko-cell>
                <mko-cell title="监督执法记录" :is-link="recoredCount.jdResult != 0" @click="goRecord(2)">
                    <div :style="{color: recoredCount.jdResult === 0 ? '#333' : '#666'}">{{recoredCount.jdResult}}条记录</div>
                </mko-cell>
            </div>
            <div class="data-wrap">
                <mko-cell title="风险管理" is-link @click="go('/hidden_danger/'+$route.params.id)"></mko-cell>
                <mko-cell title="建筑信息" is-link @click="go('/build_list/'+$route.params.id)"></mko-cell>
                <mko-cell title="消防安全责任单位" is-link @click="go('/xfzr_list/'+$route.params.id)"></mko-cell>
                <mko-cell title="安全活动" is-link @click="go('/safe_activity_list/'+$route.params.id)"></mko-cell>
            </div>

            <div class="data-wrap">
                <div class="title-wrap" @click="showInfo('user')">
                    <span>账号信息</span>
                    <span class="sign" :class="show.user?'icon-arrow-down':'icon-arrow-up'"></span>
                </div>
                <div v-show="show.user">
                    <mko-cell title="账号" :val="dwInfo.userName||'暂无'"></mko-cell>
                    <mko-cell title="单位编码" :val="dwInfo.groupId||'暂无'"></mko-cell>
                </div>
            </div>
            <div class="data-wrap">
                <div class="title-wrap" @click="showInfo('basic')">
                    <span>基本信息</span>
                    <span class="sign" :class="show.basic?'icon-arrow-down':'icon-arrow-up'"></span>
                </div>
                <div v-show="show.basic">
                    <mko-cell title="单位名称" :val="dwInfo.dwName||'暂无'"></mko-cell>
                    <mko-cell title="单位简称" :val="dwInfo.dwShortName||'暂无'"></mko-cell>
                    <mko-cell title="组织机构代码" :val="dwInfo.dwCode||'暂无'"></mko-cell>
                    <mko-cell title="单位地址"
                              :val="(dwInfo.dwProvinceName||'未知')+'-'+(dwInfo.dwCityName||'未知')+'-'+(dwInfo.dwAreaName||'未知')"></mko-cell>
                    <mko-cell title="详细地址" :val="dwInfo.dwAddress||'暂无'"></mko-cell>
                    <!--<mko-cell title="行政区域"-->
                    <!--:val="(dwInfo.dwXZProvinceName+dwInfo.dwXZCityName+dwInfo.dwXZAreaName)||'暂无'"></mko-cell>-->
                    <mko-cell title="单位类型" :val="(dwInfo.dwTypeName+dwInfo.dwSubTypeName)||'暂无'" @click="showAllContent(dwInfo.dwTypeName+dwInfo.dwSubTypeName)"></mko-cell>
                    <mko-cell title="经济所有制" :val="dwJJSYZ(dwInfo.dwJJSYZ)"></mko-cell>
                    <!--<mko-cell title="单位其他属性" :val="dwInfo.dwAttribute||'暂无'"></mko-cell>-->
                    <mko-cell title="消防管辖" :val="dwInfo.gxDWName ? dwInfo.gxDWName : '暂无'"></mko-cell>
                    <mko-cell title="监督员" :val="dwInfo.jgName||'暂无'"></mko-cell>
                    <mko-cell title="行业" val="国家机关"></mko-cell>
                    <mko-cell title="已连接设备" val="电气监测"></mko-cell>
                </div>

            </div>
            <div class="data-wrap">
                <div class="title-wrap" @click="showInfo('contact')">
                    <span>联系方式</span>
                    <span class="sign" :class="show.contact?'icon-arrow-down':'icon-arrow-up'"></span>
                </div>
                <div v-show="show.contact">
                    <mko-cell title="消防安全管理人" :val="dwInfo.dwManager||'暂无'"></mko-cell>
                    <mko-cell title="联系电话" :val="dwInfo.dwManagerPhone||'暂无'">
                        <a class="phone" :href="'tel:' + dwInfo.dwManagerPhone"
                           v-if="dwInfo.dwManagerPhone">{{dwInfo.dwManagerPhone}}</a>
                    </mko-cell>
                    <mko-cell title="消防安全责任人" :val="dwInfo.dwZRPerson||'暂无'"></mko-cell>
                    <mko-cell title="联系电话" :val="dwInfo.dwZRPhone||'暂无'">
                        <a class="phone" :href="'tel:' + dwInfo.dwZRPhone" v-if="dwInfo.dwZRPhone">{{dwInfo.dwZRPhone}}</a>
                    </mko-cell>
                    <mko-cell title="企业法人" :val="dwInfo.dwFaRen||'暂无'"></mko-cell>
                    <mko-cell title="联系电话" :val="dwInfo.dwFaRenPhone||'暂无'">
                        <a class="phone" :href="'tel:' + dwInfo.dwFaRenPhone"
                           v-if="dwInfo.dwFaRenPhone">{{dwInfo.dwFaRenPhone}}</a>
                    </mko-cell>
                    <mko-cell title="法人证件号" :val="dwInfo.dwFaRenID||'暂无'"></mko-cell>
                    <mko-cell title="单位电话" :val="dwInfo.dwPhone||'暂无'">
                        <a class="phone" :href="'tel:' + dwInfo.dwPhone" v-if="dwInfo.dwPhone">{{dwInfo.dwPhone}}</a>
                    </mko-cell>
                    <mko-cell title="单位传真" :val="dwInfo.dwFax||'暂无'"></mko-cell>
                    <mko-cell title="邮政编码" :val="dwInfo.dwPostcode||'暂无'"></mko-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api'
    import { NoData, ResError, ScoreBanner } from 'components';
    import { dwJJSYZ, calcScoreText, calcBannerCircle, calcBannerBg } from 'filters'
    import { Indicator } from 'mint-ui';
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
                noAttributes: false,
                recoredCount: '',
                show: {
                    user: false,
                    basic: false,
                    contact: false
                }
            }
        },
        mounted() {

        },
        activated(){
            this.getData();
            this.show = {
                user: false,
                basic: false,
                contact: false
            }
            this.getRecords()
        },
        methods: {
            dwJJSYZ,
            showInfo(key){
                this.show[key] = !this.show[key];
            },
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
                    if (!res.response.attributes || (res.response.attributes && res.response.attributes.length <= 0)) {
                        this.noAttributes = true;
                    } else {
                        res.response.attributes = res.response.attributes.splice(0, 4);
                        this.noAttributes = false;
                    }
                    if (!this.dwInfo)
                        this.noData = true;
                    this.dwInfo = res.response || "";
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
                    return '#FF9744'
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
                if (item.length >= 7) {
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
            },
            showAllContent(text) {
                this.$MKODialog({ msg: text });
            },
            getRecords() {
                api.getQyRecordCount({
                    m: 'enforceLowNumber',
                    groupId: this.$route.params.id
                }).then(result => {
                    if(!result) return false;
                    if(result.code == 0) {
                        this.recoredCount = result.response;
                    } else {
                        this.recoredCount = {
                            hzResult: 0,
                            jdResult: 0
                        }
                    }
                })
            },
            goRecord(type) {
                if(this.recoredCount.hzResult == 0 && type == 1) return false;
                if(this.recoredCount.jdResult == 0 && type == 2) return false;
                let path = type == 1 ? 'fire_record' : 'jgzf_record';
                this.$MKOPush(`/${path}/${this.$route.params.id}`);
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
        .score-banner {
            height: 120px;
            width: 100%;
            display: table;
            text-align: center;
            span {
                display: table-cell;
                vertical-align: middle;
                line-height: 120px;
                margin: 10px auto;
                font-size: 60px;
                color: #ffffff;
            }
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
            .title-wrap {
                position: relative;
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
                .sign {
                    position: absolute;
                    right: 14px;
                    top: 19px;
                    transition: transform 0.3s;
                    -webkit-transition: transform 0.3s;
                }
            }
            .gray-font {
                color: @textGray;
            }
        }
    }
</style>
