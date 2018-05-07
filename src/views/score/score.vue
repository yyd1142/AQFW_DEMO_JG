<template>
    <div>
        <div class="placeholder-item" :style="{backgroundColor:calcHeadColor(score.totalScore)}"></div>
        <mko-header title="社会单位安全评分" :background-color="calcHeadColor(score.totalScore)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap score-page-wrap">
            <score-banner :unit-info="unitInfo" :unit-score="score.totalScore"></score-banner>

            <div class="bar-wrap">
                <div class="item des" :class="`color-${item.minScore}`" v-for="item in barData">
                    <i class="sign abs-middle" :class="`color-${item.minScore}`" v-if="item.active"></i>{{item.text}}
                </div>
            </div>
            <div class="bar-wrap">
                <div class="item" :class="{'active':item.active}" v-for="item in barData">
                    {{item.score}}分
                </div>
            </div>
            <!--总分-->
            <div class="total">
                <div class="label">社会单位安全评分构成 (共100分)</div>
                <div class="val">合计 {{score.totalScore | scoreFilter}}分</div>
            </div>
            <!--火灾风险评估得分-->
            <mko-menu-header title="建筑火灾风险评分 (共20分)" icon="icon-info" @clickIcon="showScoreDesc('jzhz')"
                             @show="showDetail.jzhz=!showDetail.jzhz">
                {{score.jzhzScore | scoreFilter}}分
            </mko-menu-header>
            <div v-show="showDetail.jzhz">
                <mko-menu-cell title="建筑属性 (共20分)">{{score.jzhzScore | scoreFilter}}分</mko-menu-cell>
            </div>

            <!--消防设施管理得分-->
            <mko-menu-header title="消防设施管理评分 (共16分)" icon="icon-info" @clickIcon="showScoreDesc('xfsssb')"
                             @show="showDetail.xfsssb=!showDetail.xfsssb">
                {{xfsssbScore | scoreFilter}}分
            </mko-menu-header>
            <div v-show="showDetail.xfsssb">
                <mko-menu-cell title="消防设施完好率 (共4分)">{{score.xfsssbFullScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="消防设施安装情况 (共12分)">{{score.xfsssbInstallScore | scoreFilter}}分</mko-menu-cell>
            </div>

            <!--消防安全管理得分-->
            <mko-menu-header title="消防安全管理得分 (共64分)" icon="icon-info" @clickIcon="showScoreDesc('xfaqgl')"
                             @show="showDetail.xfaqgl=!showDetail.xfaqgl">
                {{xfaqglScore | scoreFilter}}分
            </mko-menu-header>
            <div v-show="showDetail.xfaqgl">
                <mko-menu-cell title="基本信息完善率 (共16分)">{{basicInfoScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="消控中心在岗率 (共2分)">{{score.ryzbScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="人员履职率 (共8分)">{{score.ryxcScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="检查项目达标率 (共5分)">{{(score.checkScore + score.wbScore) | scoreFilter}}分
                </mko-menu-cell>
                <mko-menu-cell title="安全管理执行率 (共5分)">{{aqglScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="学习培训覆盖率 (共14分)">{{xuexipeixunScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="第三方服务签约率 (共4分)">{{disanfangScore | scoreFilter}}分</mko-menu-cell>
                <mko-menu-cell title="物联网设备接入率 (共10分)">{{wuliuScore | scoreFilter}}分</mko-menu-cell>
            </div>

            <div class="data-count-wrap">
                <div class="section">
                    <div class="folder">总体评分构成</div>
                    <div class="sub-folder">
                        <div id="chart1" style="margin: 0 auto; width:90%; height:300px"></div>
                    </div>
                </div>
                <!--<div class="section">-->
                <!--<div class="folder">详细失分率</div>-->
                <!--<div class="sub-folder">-->
                <!--<div id="chart3" style="margin: 0 auto; width:90%; height:550px"></div>-->
                <!--</div>-->
                <!--</div>-->
                <div class="section">
                    <div class="folder">总体评分趋势</div>
                    <div class="sub-folder">
                        <div id="chart2" style="margin: 0 auto; width:90%; height:350px"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import api from 'api'
    import conf from 'config'
    import echarts from 'echarts';
    import { ScoreBanner } from 'components';
    import { Toast, Indicator } from 'mint-ui'
    import { calcHeadColor, calcScoreStyle, calcBannerCircle, scoreFilter } from 'filters'
    import moment from 'moment'
    let theme = 'macarons';
    let keys = ['dwInfoScore', 'jzInfoScore', 'ryInfoScore', 'xfsssbInfoScore', 'ryzbScore', 'ryxcScore', 'sssbCheckScore', 'xfgzryScore', 'xfaqzdScore', 'xfgzjhScore', 'xfgzlhScore', 'yjyaScore', 'yjssylScore', 'zyxfdScore', 'dqzgpxScore', 'xfaqpxqkScore', 'yggqpxScore', 'sfqywbScore', 'sfqyjcScore', 'sfqybxScore', 'spjkfxScore', 'dqjcScore', 'ywgjcScore', 'sxtjcScore', 'krqtjcScore']
    let currentScore = {};
    let pastScore = [];
    export default {
        data() {
            return {
                unitInfo: {},
                score: {},
                barData: [
                    {text: '低', score: '0-80', minScore: 1, maxScore: 79, active: false},
                    // {text: '较低', score: '60-69', minScore: 60, maxScore: 69, active: false},
                    {text: '中', score: '80-89', minScore: 80, maxScore: 89, active: false},
                    // {text: '良好', score: '80-89', minScore: 80, maxScore: 89, active: false},
                    {text: '高', score: '90-100', minScore: 90, maxScore: 100, active: false}
                ],
                showDetail: {jzhz: false, xfsssb: false, xfaqgl: false},
                scoreDesc: conf.scoreDesc
            }
        },
        activated() {
            this.$nextTick(() => {
                this.unitInfo = this.$route.query.name;
                this.score = '';
                this.getScoreInfo();
                this.getHistoryScoreList();
            });
        },
        deactivated() {
            this.showDetail = {jzhz: false, xfsssb: false, xfaqgl: false};
        },
        computed: {
            xfsssbScore(){
                let score = this.score;
                return score.xfsssbFullScore + score.xfsssbInstallScore;
            },
            xfaqglScore(){
                let score = this.score;
                return this.basicInfoScore + score.ryzbScore + score.ryxcScore + score.checkScore + score.wbScore + this.aqglScore + this.xuexipeixunScore + this.disanfangScore + this.wuliuScore;
            },
            basicInfoScore() {
                //基本信息完善率
                return this.score.dwInfoScore + this.score.ryInfoScore + this.score.jzInfoScore + this.score.xfsssbInfoScore
            },
            aqglScore() {
                //安全管理执行率
                return this.score.xfgzryScore + this.score.xfaqzdScore + this.score.xfgzjhScore + this.score.xfgzlhScore + this.score.yjyaScore + this.score.yjssylScore + this.score.zyxfdScore
            },
            xuexipeixunScore() {
                //学习培训覆盖率
                return this.score.dqzgpxScore + this.score.xfaqpxqkScore + this.score.yggqpxScore
            },
            disanfangScore() {
                //第三方服务签约率
                return this.score.sfqywbScore + this.score.sfqyjcScore + this.score.sfqybxScore
            },
            wuliuScore() {
                //物联网设备接入率
                return this.score.physnetScore + this.score.miniFirehouseScore + this.score.citynetScore;
            },
            // 火灾风险评级
            hzfxLevel() {
                let value = this.score.jzhzScore
                let level = '';
                if (value >= 0 && value < 10) {
                    level = '超严重级'
                } else if (value >= 10 && value < 20) {
                    level = '严重级'
                } else if (value >= 20 && value < 30) {
                    level = '中级'
                } else if (value >= 30) {
                    level = '轻级'
                }
                return level;
            },
            userInfo() {
                return JSON.parse(localStorage.getItem('USER_DATA'))
            }
        },
        methods: {
//            scoreFilter,
            showScoreDesc(type){
                this.$MKODialog({
                    title: this.scoreDesc[type].title,
                    msg: this.scoreDesc[type].desc,
                }).then(res => {
                });
            },
            back() {
                this.$MKOPop()
            },
            getScoreInfo() {
                Indicator.open({spinnerType: 'fading-circle'});
                let params = {
                    m: 'homePageScore',
                    groupId: this.$route.params.id
                };
                api.getHistoryScoreDetail(params).then(result => {
                    Indicator.close();
                    if (result.code == 0) {
                        if (result.msg) {
                            this.score = result.msg;
                            currentScore = result.msg;
                        }
                        this.calcScoreBar();
                        this.DrawChart1(echarts);
                        this.getHistoryScoreList();
                    }
                })
            },
            getHistoryScoreList() {
                let params = {
                    m: 'list', //往期评分列表
                    groupId: this.$route.params.id,
                    count: 5,
                };
                api.getHistoryScoreList(params).then(result => {
                    if (result.code == 0) {
                        pastScore = [];
                        let data = result.response.datas;
                        for (let i = data.length - 1; i >= 0; i--) {
                            pastScore.push(data[i]);
                        }
                        this.DrawChart2(echarts);
                    }
                })
            },
            calcScoreBar() {
                let scoreValue = this.score.totalScore;
                this.barData.forEach((score) => {
                    if (scoreValue >= score.minScore && scoreValue <= score.maxScore) {
                        score.active = true
                    } else {
                        score.active = false
                    }
                });
            },
            calcHeadColor,
            calcScoreStyle,
            //数据统计
            DrawChart1(ec) {
                var chart = ec.init(document.getElementById('chart1'), theme);
                let total = this.score.totalScore;
                let data = [
                    {
                        value: this.score.jzhzScore,
                        name: '建筑火灾风险'
                    },
                    {
                        value: this.xfsssbScore,
                        name: '消防设施管理'
                    },
                    {
                        value: this.xfaqglScore,
                        name: '消防安全管理'
                    }
                ];
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].value || data[i].value == NaN) {
                        data.splice(i, 1);
                        i--;
                    }
                }
                chart.setOption({
                    calculable: true,
                    series: [{
                        type: 'pie',
                        radius: [40, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        let name = params.name;
                                        if (!total) return params.name + '0%';
                                        return name.slice(0, 2) + '\n' + name.slice(2, name.length) + '\n' + parseInt(params.value * 100 / total) + '%'
                                    }
                                }
                            }
                        },
                        data: data.length <= 0 ? [{value: 0, name: '无数据'}] : data
                    }]
                });
            },
            DrawChart2(ec) {
                let chart = ec.init(document.getElementById('chart2'), theme);
                let dateList = [];
                let scoreList = [];
                let Data = [];
                let non = '-';

                let matchData = function (item, x) {
                    let score = item.totalScore;
                    let date = moment(item.createDate).format("YYYY年MM月DD日");
                    if (date == 'Invalid date') date = non;
                    dateList.push(date);
                    scoreList.push(score);
                    Data.push({
                        name: date,
                        value: score,
                        xAxis: x,
                        yAxis: score
                    });
                };

                //处理往期分数
                if (pastScore.length <= 0) {
                    dateList.push(non);
                    Data.push({
                        name: non,
                        value: 0,
                        xAxis: 0,
                        yAxis: 0
                    });
                }
                pastScore.forEach((item, index) => {
                    matchData(item, index);
                });
                //处理当前分数
//                matchData(currentScore, pastScore.length);

                chart.setOption({
                    legend: {
                        data: ['最高分']
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: dateList
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} '
                        },
                    }],
                    series: [
                        {
                            name: '往期分数',
                            type: 'line',
                            data: scoreList,
                            markPoint: {
                                data: Data
                            },
                        },
                    ]
                });
            },
            DrawChart3(ec) {
                var chart = ec.init(document.getElementById('chart3'), theme);
                var builderJson = {
                    "all": 100,
                    "charts": {
                        "安全服务云": 0.00,
                        "烟、温感监测": this.score.ywgjcScore,
                        "水系统监测": this.score.sxtjcScore,
                        "视频监控分析": this.score.spjkfxScore,
                        "可燃气体监测": this.score.krqtjcScore,
                        "电气监测": this.score.dqjcScore,
                        "消防设施完好率": 0,
                        "基本信息完善率": 0,
                        "中介机构": 0,
                        "户籍化上报率": 0,
                        "检查项目达标率": 0,
                        "消控中心在岗率": 0,
                        "学习培训覆盖率": this.score.dqzgpxScore + this.score.xfaqpxqkScore,
                        "安全管理执行率": 0,
                        "人员履职率": 0,
                        "建筑属性": 0
                    }
                };

                chart.setOption({


                    grid: [{
                        top: 0,
                        width: '95%',
                        bottom: '10%',
                        left: 0,
                        containLabel: true
                    }],
                    xAxis: [{
                        type: 'value',

                        max: builderJson.all,
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value + '%'
                                    }
                                }
                            }
                        },

                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }, {
                        type: 'bar',
                        stack: 'chart',
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.all - builderJson.charts[key];
                        })
                    }]


                });
            },

        },
        components: {
            ScoreBanner
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../config.less";

    @cellHeight: 44px;
    @borderColor: #DEE3E8;
    .score-page-wrap {
        .bar-wrap {
            width: 100%;
            height: 36px;
            font-size: 0;
            & + .bar-wrap {
                margin-bottom: 10px;
            }
            .item {
                position: relative;
                float: left;
                width: 100% / 3;
                height: 36px;
                line-height: 36px;
                letter-spacing: 0.5px;
                font-size: 12px;
                text-align: center;
                background: #fff;
                color: #72787D;
                &.des {
                    color: #fff;
                    background: 0 0 no-repeat;
                    background-size: cover;
                    &.color-90 {
                        background-image: url('/static/colorBar/color_bar_5.png');
                    }
                    &.color-80 {
                        background-image: url('/static/colorBar/color_bar_4.png');
                    }
                    &.color-70 {
                        background-image: url('/static/colorBar/color_bar_3@.png');
                    }
                    &.color-60 {
                        background-image: url('/static/colorBar/color_bar_2@.png');
                    }
                    &.color-1 {
                        background-image: url('/static/colorBar/color_bar_1@.png');
                    }
                }
                .sign {
                    z-index: 2;
                    bottom: -4px;
                    width: 6px;
                    height: 4px;
                    background: 0 0 no-repeat;
                    background-size: cover;
                    &.color-90 {
                        background-image: url(/static/colorBar/triangle_5.png);
                    }
                    &.color-80 {
                        background-image: url(/static/colorBar/triangle_4.png);
                    }
                    &.color-70 {
                        background-image: url(/static/colorBar/triangle_3@.png);
                    }
                    &.color-60 {
                        background-image: url(/static/colorBar/triangle_2@.png);
                    }
                    &.color-1 {
                        background-image: url(/static/colorBar/triangle_1@.png);
                    }
                }
            }
        }
        .total {
            padding: @cellPadding;
            height: @cellHeight;
            line-height: @cellHeight;
            font-size: 14px;
            letter-spacing: 0;
            background: #fff;
            color: @baseText01;
            .border-top(@baseBorder);
            .label {
                float: left;
            }
            .val {
                float: right;
            }
        }
        .data-wrap {
            background: #fff;

            .total {
                position: relative;
                padding: 0;
                padding-right: 36px;
                color: #72787D;
                .sign-wrap {
                    width: 36px;
                    height: 44px;
                    float: left;
                    padding-left: 14px;
                    .sign {
                        position: relative;
                        top: 2px;
                        color: #979797;
                    }
                }
                .arrow {
                    position: absolute;
                    right: 14px;
                    top: 15px;
                    transition: transform 0.3s;
                    -webkit-transition: transform 0.3s;
                }
            }
            .main {
                font-size: 14px;
                background: #F5F6F7;
                color: #72787D;
                .item {
                    padding-right: 36px;
                    margin-left: 36px;
                    height: @cellHeight;
                    line-height: @cellHeight;
                    box-shadow: 0 0.5px 0 @borderColor;
                    &:last-child {
                        margin: 0;
                        padding-left: 36px;
                    }
                    .label {
                        float: left;
                    }
                    .val {
                        float: right;
                    }
                }
            }
        }
        .data-count-wrap {
            margin-top: 10px;
            background: #fff;
            p,
            div,
            ul {
                margin: 0;
                padding: 0;
            }
            .section {
                .border-btm(@baseBorder);
                &:last-child {
                    &:after {
                        bottom: -1px;
                    }
                }
            }
            .folder {
                display: block;
                width: 100%;
                height: 48px;
                text-align: center;
                line-height: 48px;
            }
            .folder p {
                line-height: 48px;
                padding: 0;
                display: block;
            }
            .item {
                padding: 20px 0;
            }
            .item .lab {
                text-align: left;
                float: left;
                width: 60%;
                margin-left: 12px;
            }
            .item .val {
                text-align: right;
                float: right;
                width: 20%;
                margin-right: 12px;
            }
            .sub-folder {
                position: relative;
                /*margin-top: 30px;*/
                /*display: none;*/
            }
            .sub-folder table {
                padding-bottom: 50px;
                margin: 0 auto;
            }
            .sub-folder table tr,
            .sub-folder table td {
                text-align: center;
                line-height: 38px;
            }
        }
        .btn-wrap {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 10px 13px;
            .btn {
                font-size: 18px;
                letter-spacing: 0.75px;
                background: @blueColor;
                color: #fff;
            }
        }
    }
</style>
