<template>
    <div class="score-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="安全评分"
                    :right-icon-text="type==1?'单位排名':''" @handleRightClick="goDetail(type)"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <!--:right-icon-text="type==1?'查看明细':''" @handleRightClick="goDetail(type)"-->
        <div class="page-wrap">
            <!--<mko-cell :title="item.name" :val="`${item.score} (满分${item.total})`" v-for="item in counts[type]"></mko-cell>-->

            <div class="count-block-wrap clear">
                <div class="count-block" v-for="(item,key) in counts">
                    <div class="title abs-middle">{{item.name}}</div>
                    <div class="desc abs-middle">满分{{item.total}}</div>
                    <div class="value abs-middle">{{scoreInfoDatas[key] || '-'}}</div>
                </div>
            </div>

            <div class="chart-wrap">
                <mko-nav-bar v-if="type==0">
                    <mko-tab-item :activied="tabI==i" :label="t.text" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" :class="tabI==2?'big':''" ref="chart"></div>
            </div>

            <div class="list-wrap" v-show="tabI==0">
                <mko-cell class="title-cell" title="安全评级" val="平均分"></mko-cell>
                <mko-cell :title="scoreLabel[i]" :val="item" v-for="(item,i) in scoreDatas[type][0]"></mko-cell>
            </div>

        </div>
    </div>
</template>

<script>
    import { WeekNavBar } from 'components'
    import api from 'api';
    import conf from 'config';
    import { ResError } from 'components'
    import { Indicator } from 'mint-ui';

    import echarts from 'echarts';
    let theme = 'macarons';
    export default {
        data () {
            return {
                month: 0,
                tabI: 0,
//                tabItems: ['安全评级', '区域排名', '行业排名', '单位类型'],
                tabItems: [
                    {text: '安全评级', key: ''},
                    {text: '区域排名', key: 'scoreAreaCount'},
                    {text: '行业排名', key: 'scoreSafetyCount'},
                    {text: '单位类型', key: 'scoreTypeCount'},
                ],
                type: 0,
                counts: {
                    scoreXfSafetyCount: {name: '消防安全管理', score: 0, total: 60},
                    scoreXfSSSbScoreCount: {name: '消防设备管理', score: 0, total: 20},
                    scoreJzHzScoreCount: {name: '建筑火灾风险', score: 0, total: 20},
                },
                scoreLabel: ['优秀', '良好', '一般', '较差', '极差'],
                scoreDatas: [
                    [
                        [90.6, 83.5, 74.2, 67.9, 58.6],
                        [90.7, 82.3, 75.2, 68.5, 51.8],
                    ],
                    [
                        [91.2, 84, 75.7, 68.1, 51.7],
                        [90.7, 82.5, 75, 68.6, 52.1],
                    ]
                ],
                scoreDwCounts: [
                    [
                        [51, 1267, 2126, 51, 49],
                        [8, 697, 2449, 353, 26],
                    ],
                    [
                        [20, 331, 449, 8, 16],
                        [7, 186, 535, 82, 13],
                    ],
                ],
                scoreInfoDatas: {}
            }
        },
        watch: {
            tabI(){
                this.DrawChart();
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
            this.month = this.$route.query.month;
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.tabI = 0;
            this.DrawChart();
            this.getScoreInfo();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            goDetail(type){
                let paths = [
                    '/score_count_rank_admin',
//                    '/score_count_detail?month=' + this.month,
                    '/score_count_rank?month=' + this.month
                ];
                this.$MKOPush(paths[type]);
            },
            getScoreInfo(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
//                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId,
//                    createDate: this.month
                    createDate: '2017-11-00'
                };
                api.getQyDwScoreInfo(pas).then(res => {
                    if (res && res.code == 0) {
                        this.scoreInfoDatas = res.response;
                        let that = this;
                        let match = function (key) {
                            let names = {
                                scoreAreaCount: 'dwAreaName',
                                scoreTypeCount: 'dwTypeName',
                                scoreSafetyCount: 'safetyName'
                            };

                            if (res.response && res.response[key]) {
                                let other = res.response.qydwTotalCount || 0;
                                that.scoreInfoDatas[key] = res.response[key].map(item => {
                                    other -= item.count;
                                    return {
                                        value: item.average,
                                        name: item[names[key]]
                                    }
                                });
                                //将剩余归为其他类
                                if (other > 0)
                                    that.scoreInfoDatas[key].push({
                                        value: other,
                                        name: '其他'
                                    });
//                                //排序
                                that.scoreInfoDatas[key].sort(function (a, b) {
                                    return b.value - a.value;
                                });
                            }
                        };
                        match('scoreAreaCount');
                        match('scoreTypeCount');
                        match('scoreSafetyCount');
                        this.DrawChart();
                    }
                    Indicator.close();
                })
            },
            DrawChart(){
                let tab = this.tabI > 1 ? 1 : this.tabI;
                if (this[`DrawChart${tab}`])
                    this[`DrawChart${tab}`](echarts);
            },
            DrawChart0(ec){
                let label = this.scoreLabel;
                let datas = this.scoreDwCounts;

                let height = 400;
                this.$refs['chart'].style.height = height + 'px';

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({

                    title: {
                        show: this.type != 0,
                        text: '安全评级分布',
                        x: 'center',
                        y: '14px',
                        textStyle: {
                            color: ' #3399ff',
                            fontSize: 14,
                        }
                    },
                    tooltip: {
                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                        formatter: function (data) {
                            return `单位数量<br/>${label[data.dataIndex]} : ${data.value} (${data.percent})%`;
                        },
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '安全评级分布',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: datas[this.type][0],
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function (data) {
                                            return `${label[data.dataIndex]}\n(${data.percent})%`;
                                        },
                                        textStyle: {
                                            color: '#666',
                                            fontSize: '12px'
                                        }
                                    },
                                    labelLine: {
                                        length: 30,
                                        lineStyle: {
                                            color: '#ddd',
                                        }
                                    }
                                },
                            },
                        }
                    ],
                })
            },
            DrawChart1(ec){
                let fontSize = [12, 10, 12, 10];
                let datas = this.scoreInfoDatas[this.tabItems[this.tabI].key] || [];
                let y = [];
                let x = [];
                datas.forEach(item => {
                    y.push(item.name);
                    x.push(item.value);
                });

                //根据图表数据量调整画布高度
                let min = 300;
                let height = min + (y.length - 1) * 20;
                this.$refs['chart'].style.height = height + 'px';

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
//                    title: {
//                        show: this.type != 0,
//                        text: this.tabItems[this.tabI],
//                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#70BBFE'],
                    grid: {
//                        left: '5%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 1],
                            min: 0,
                            max: 100,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            splitLine: {
                                show: true,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#666',
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: y,
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                formatter: function (data) {
                                    let max = 6;
                                    let name = data || '';
                                    if (name.length > max) {
                                        name = name.split('').splice(0, max).join('');
                                        name += '…'
                                    }
                                    return `${name}`
                                },
                                margin: 2,
                                textStyle: {
                                    color: '#666',
                                    fontSize: fontSize[this.tabI]
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '安全评分',
                            type: 'bar',
                            center: ['70%', '50%'],
                            data: x,
                            itemStyle: {
                                normal: {
                                    barBorderColor: '#3399ff'
                                }
                            },
                            barMaxWidth: 30
                        },

                    ]
                })
            },
            back(){
                this.$MKOPop();
            }
        },
        components: {
            WeekNavBar
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../config.less";

    .score-count-wrap {
        .page-wrap {
            margin-top: @headerHeight + @headerTop - 1px;
        }
        .count-block-wrap {
            background-color: #3091F2;
            .count-block {
                position: relative;
                float: left;
                width: 33.3%;
                height: 100px;
                letter-spacing: 0;
                color: #fff;
                background-color: #3091F2;
                font-family: STHeitiSC-Light;
                &:not(:last-child) {
                    &:after {
                        box-sizing: border-box;
                        content: '';
                        position: absolute;
                        top: 14px;
                        right: 0;
                        width: 1px;
                        height: 72px;
                        opacity: .8;
                        background-color: #fff;
                        transform: scale(0.5, 1);
                        -webkit-transform: scale(.5, 1);
                        transform-origin: 0 0;
                        -webkit-transform-origin: 0 0;
                    }
                }
                .title {
                    top: 14px;
                    min-width: 84px;
                    font-size: 14px;
                }
                .desc {
                    top: 33px;
                    font-size: 12px;
                }
                .value {
                    top: 55px;
                    font-size: 30px;
                    font-family: HelveticaNeue;
                }
            }
        }
        .chart-wrap {
            .chart {
                /*padding-top: 14px;*/
                padding-left: 14px;
                height: 400px;
                background-color: #fff !important;
            }

        }
        .list-wrap {
            margin-top: 14px;
            .title-cell {
                height: 50px;
                font-weight: bolder;
                .cell {
                    height: 50px;
                }
            }
        }
    }
</style>
