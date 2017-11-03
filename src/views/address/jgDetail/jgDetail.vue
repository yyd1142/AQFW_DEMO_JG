<template>
    <div class="main">
        <div class="placeholder-item" :style="{backgroundColor:calcHeadColor(data.scoreData.qyScoreAverage, data.headColors)}"></div>
        <div class="jg-detail-title">
            <span v-text="data.title"></span>
        </div>
        <mt-header class="header-wrap" :style="{backgroundColor:calcHeadColor(data.scoreData.qyScoreAverage, data.headColors)}" fixed>
            <mt-button class="header-item" slot="left" icon="back" @click="back"></mt-button>
        </mt-header>
        <div class="page-wrap">
            <div class="home-banner-wrap">
                <div class="banner-bg">
                    <img :src="`/static/banner/bg_${calcBannerBg(data.scoreData.qyScoreAverage)}.png`" />
                </div>
                <div class="banner-title score-circle" :class="`score-${calcBannerCircle(data.scoreData.qyScoreAverage)}`">
                    <div class="score-text">{{calcScoreText(data.scoreData.qyScoreAverage)}}</div>
                    <div class="score">{{data.scoreData.qyScoreAverage || '-'}}</div>
                    <div class="name no-overflow">{{data.title}}</div>
                    <div class="info">管辖单位平均安全得分 共{{data.scoreData.qyCount || 0}}个</div>
                </div>
                <div class="banner-body">
                    <div class="item" @click="goScoreList(item)" v-for="item in data.scoreData.list">
                        <div class="text">{{item.key}}</div>
                        <div class="count">{{item.value || 0}}个</div>
                        <div class="percent">
                            {{data.scoreData.qyCount ? Math.round((item.value / data.scoreData.qyCount) * 100) : 0}}
                        </div>
                        <div class="sign">%</div>
                    </div>
                </div>
            </div>
            <div class="xiaji-bumen-wrap xiaji-main">
                <div class="title">
                    <span class="xiajijiandu">下级监督部门</span>
                    <span class="anquanpingfen">管辖单位平均分</span>
                </div>
                <ul class="xiaji-table-view">
                    <li class="xiaji-table-cell" v-for="item in data.lowerDws" @click="goJGinfo(item)">
                        <span class="key" v-text="item.dwName"></span>
                        <span class="value">
                            {{item.qyScoreAverage || '暂无'}}
                            <span v-if="item.qyScoreAverage">分</span>
                        </span>
                    </li>
                    <li class="xiaji-table-cell" v-if="data.noData">
                        <span class="key">暂无</span>
                        <span class="value">暂无</span>
                    </li>
                </ul>
            </div>
            <div class="xiaji-bumen-wrap">
                <div class="title">
                    <span class="xiajijiandu">人员组成（角色）</span>
                    <span class="anquanpingfen">联系电话</span>
                </div>
                <ul class="xiaji-table-view">
                    <li class="xiaji-table-cell" v-for="item in data.persons" @click="goPersonInfo(item)">
                        <span class="key">{{item.name}}（{{item.role | JgRoleType}}）</span>
                        <span class="value">{{item.phone || '暂无'}}</span>
                    </li>
                    <li class="xiaji-table-cell" v-if="data.notPersons">
                        <span class="key">暂无</span>
                        <span class="value">暂无</span>
                    </li>
                </ul>
            </div>
        </div>
        <!--<res-error v-if="data.resError"></res-error>-->
    </div>
</template>
<script>
    import api from 'api'
    import { ResError, NoData } from 'components'
    import { JgRoleType, calcHeadColor, calcBannerBg, calcBannerCircle, calcScoreText } from 'filters'
    import { Toast } from 'mint-ui';

    var page = 1;
    export default {
        data() {
            return {
                data: {
                    headColors: ['#B484F7', '#77A0F1', '#97D72E', '#D6CB2F', '#FFA466'],
                    title: '',
                    groupId: '',
                    resError: false,
                    noData: false,
                    notPersons: false,
                    lowerDws: [],
                    persons: [],
                    scoreData: {
                        qyCount: 0,
                        qyScoreAverage: 0,
                        list: [
                            {key: '优秀', value: 0, type: 1},
                            {key: '良好', value: 0, type: 2},
                            {key: '中等', value: 0, type: 3},
                            {key: '较低', value: 0, type: 4},
                            {key: '极低', value: 0, type: 5}]
                    }
                }
            }
        },
        activated() {
            if (page == 1) {
                this.getScoreData(this.$route.params.pid, this.$route.query.jgDetail);
                this.getLowerDws(this.$route.params.pid);
                this.getPersons(this.$route.params.pid);
            }
            this.onBackButtonEvent()
        },
        methods: {
            calcHeadColor,
            calcBannerBg,
            calcBannerCircle,
            calcScoreText,
            back() {
                if (page == 1) {
                    sessionStorage.removeItem(`jgDetailData_${page}`)
                    this.$MKOPop();
                } else {
                    sessionStorage.removeItem(`jgDetailData_${page}`)
                    page -= 1;
                    if (sessionStorage.getItem(`jgDetailData_${page}`)) {
                        this.data = JSON.parse(sessionStorage.getItem(`jgDetailData_${page}`));
                    } else {
                        this.$MKOPop();
                    }
                }
            },
            getScoreData(groupId, jgDetail) {
                if (!jgDetail.dwName) {
                    if (sessionStorage.getItem(`jgDetailData_${page}`))
                        this.data = JSON.parse(sessionStorage.getItem(`jgDetailData_${page}`));
                    return;
                }
                this.data.title = jgDetail.dwName;
                this.data.groupId = groupId;
                let data = JSON.parse(localStorage['USER_DATA']);
                api.getJGScoreTypes({
                    m: 'qydwScore',
                    groupId: groupId,
                    type: data.type
                }).then(res => {
                    if (!res) {
                        this.data.resError = true;
                        return false;
                    }
                    if (res.code == 0) {
                        this.data.scoreData = {
                            qyCount: res.response.count,
                            qyScoreAverage: jgDetail.qyScoreAverage || 0,
                            list: [
                                {key: '优秀', value: res.response.excellent, type: 1},
                                {key: '良好', value: res.response.good, type: 2},
                                {key: '中等', value: res.response.special, type: 3},
                                {key: '较低', value: res.response.low, type: 4},
                                {key: '极低', value: res.response.veryLow, type: 5}]
                        }
                        this.data.resError = false;
                    } else {
                        this.data.resError = true;
                    }
                })
            },
            getLowerDws(groupId) {
                this.data.lowerDws = [];
                this.data.noData = false;
                api.lowerDw({
                    groupId: groupId
                }).then(res => {
                    if (!res) return false;
                    if (res.code == 0) {
                        if (res.response.length <= 0) {
                            this.data.lowerDws = [];
                            this.data.noData = true;
                        } else {
                            this.data.lowerDws = res.response
                            this.data.noData = false;
                        }
                    } else {
                        this.data.noData = true;
                    }
                })
            },
            goJGinfo(item) {
                sessionStorage.setItem(`jgDetailData_${page}`, JSON.stringify(this.data))
                this.$nextTick(() => {
                    page += 1;
                    this.data.scoreData = {
                        qyCount: 0,
                        qyScoreAverage: 0,
                        list: [
                            {key: '优秀', value: 0, type: 1},
                            {key: '良好', value: 0, type: 2},
                            {key: '中等', value: 0, type: 3},
                            {key: '较低', value: 0, type: 4},
                            {key: '极低', value: 0, type: 5}]
                    }
                    this.getScoreData(item.groupId, item);
                    this.getLowerDws(item.groupId);
                    this.getPersons(item.groupId);
                })
            },
            onBackButtonEvent() {
                let that = this;
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                window.mkoBackButton.callback = function () {
                    // alert('onBackButtonEvent')
                    that.back()
                }
            },
            goScoreList(item) {
                if (!this.data.scoreData.qyScoreAverage) {
                    Toast({
                        message: '暂无分数信息',
                        duration: 1500
                    });
                    return false;
                }
                window.mkoBackButton.bInputData = false;
                this.$MKOPush(`/score_list?type=${item.type}&groupId=${this.data.groupId}&from=${this.$route.fullPath}`)
            },
            getPersons(groupId) {
                this.data.persons = [];
                this.data.notPersons = false
                api.jgPersons({
                    page: 1,
                    count: 40,
                    search_EQ_groupId: groupId
                }).then(res => {
                    if (!res) return false;
                    if (res.code == 0) {
                        if (res.response.datas.length <= 0) {
                            this.data.persons = [];
                            this.data.notPersons = true;
                        } else {
                            this.data.persons = res.response.datas;
                            this.data.notPersons = false;
                        }
                    } else {
                        this.data.notPersons = true;
                    }
                })
            },
            goPersonInfo(item) {
                window.mkoBackButton.bInputData = false;
                this.$MKOPush({
                    path: '/personDetail',
                    query: {
                        person: item
                    }
                })
            }
        },
        components: {
            ResError, NoData
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../config.less";

    .main {
        .home-banner-wrap {
            width: 100%;
            min-height: 460px;
            max-height: 510px;
            margin: -40px auto 0;
            padding: 0;
            position: relative;
            top: -1px;
            .banner-bg {
                //background: no-repeat center;
                //background-size: cover;
                img {
                    width: 100%;
                    min-height: 460px;
                    max-height: 510px;
                    display: block;
                    margin: 0 auto;
                }
            }
            .banner-title {
                //z-index: 2;
                width: 230px;
                height: 156px;
                position: absolute;
                top: 65px;
                left: 50%;
                transform: translate(-50%, 0);
                -webkit-transform: translate(-50%, 0);
                color: #fff;
                text-align: center;
                .score-text {
                    margin-top: 30px;
                    font-size: 24px;
                }
                .score {
                    margin: 10px auto;
                    font-size: 60px;
                }
                .name {
                    width: 184px;
                    margin: auto;
                    font-size: 16px;
                }
                .info {
                    margin-top: 39px;
                    font-size: 12px;
                }
            }
            .banner-body {
                position: absolute; //bottom:200px;
                top: 322px;
                left: 50%;
                width: 100%;
                max-width: 376px;
                transform: translate(-50%, 0);
                -webkit-transform: translate(-50%, 0);
                color: #fff;
                .item {
                    float: left;
                    width: 20%;
                    /* For old syntax, otherwise collapses. */
                    min-height: 110px;
                    position: relative;
                    background: url('/static/banner/square.png') no-repeat 50% 0/contain;
                    > div {
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%, 0);
                        -webkit-transform: translate(-50%, 0);
                    }
                    .text {
                        top: 11px;
                        width: 36px;
                        height: 18px;
                        border-radius: 91px;
                        border: 1px #fff solid;
                        font-size: 12px;
                        line-height: 18px;
                        text-align: center;
                    }
                    .count {
                        top: 33px;
                        line-height: 14px;
                        font-size: 10px;
                    }
                    .percent {
                        top: 44px;
                        line-height: 48px;
                        font-size: 34px;
                    }
                    .sign {
                        top: 84px;
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }
        }
        .banner-score-wrap {
            width: 100%;
            background-color: #ffffff;
            .title {
                width: 100%;
                height: 44px;
                display: table;
                span:first-child {
                    width: 80%;
                    height: 44px;
                    line-height: 44px;
                    display: table-cell;
                    vertical-align: middle;
                    padding-left: 10px;
                }
                span:last-child {
                    width: 20%;
                    height: 44px;
                    line-height: 44px;
                    display: table-cell;
                    vertical-align: middle;
                    text-align: RIGHT;
                    padding-right: 10px;
                }
            }
            .score-table-view {
                width: 100%;
                display: -webkit-inline-box;
                .score-table-cell {
                    width: 100% / 5;
                    text-align: center;
                    margin-bottom: 10px;
                    .key {
                        width: 100%;
                    }
                    .value {
                        width: 100%;
                    }
                }
            }
        }
        .xiaji-bumen-wrap {
            width: 100%;
            margin: 10px 0;
            &.xiaji-main {
                margin: -1px 0 10px 0;
            }
            .title {
                width: 100%;
                height: 44px;
                display: table;
                background-color: #ffffff;
                .border-btm(#E0E0E0);
                .xiajijiandu {
                    width: 50%;
                    line-height: 44px;
                    vertical-align: middle;
                    display: table-cell;
                    font-size: 14px;
                    color: #232323;
                    padding-left: 14px;
                }
                .anquanpingfen {
                    width: 50%;
                    line-height: 44px;
                    vertical-align: middle;
                    display: table-cell;
                    font-size: 14px;
                    color: #72787D;
                    text-align: right;
                    padding-right: 14px;
                }
            }
            .xiaji-table-view {
                width: 100%;
                background-color: #Ffffff;
                box-sizing: border-box;
                padding-left: 14px;
                .xiaji-table-cell {
                    width: 100%;
                    height: 44px;
                    .border-btm(#E0E0E0);
                    display: table;
                    .key {
                        height: 44px;
                        display: table-cell;
                        line-height: 44px;
                        vertical-align: middle;
                        width: 80%;
                        font-size: 14px;
                        color: #72787D;
                        letter-spacing: 0px;
                    }
                    .value {
                        height: 44px;
                        display: table-cell;
                        line-height: 44px;
                        vertical-align: middle;
                        width: 20%;
                        text-align: right;
                        padding-right: 14px;
                        font-size: 14px;
                        color: #A8AEB2;
                        letter-spacing: 0px;
                    }
                    .person-name,
                    .person-phone,
                    .person-role {
                        display: table-cell;
                        vertical-align: middle;
                        height: 44px;
                        line-height: 44px;
                        width: 100% / 3;
                    }
                    .person-name {
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .person-phone {
                        text-align: center;
                    }
                    .person-role {
                        text-align: right;
                        padding: 0 10px 0 0;
                    }
                }
                .not-data {
                    width: 100%;
                    text-align: center;
                }
            }
        }
        .jg-detail-title {
            position: fixed;
            z-index: 20;
            color: #fff;
            margin: 0 auto;
            left: 0;
            right: 0;
            text-align: CENTER;
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 17px;
            top: @headerTop;
            height: 40px;
            display: table;
            span {
                display: table-cell;
                vertical-align: middle;
                line-height: 40px;
            }
        }
    }
</style>


