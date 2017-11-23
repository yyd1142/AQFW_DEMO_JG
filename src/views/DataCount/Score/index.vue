<template>
    <div class="score-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="安全评分"
                    :right-icon-text="type==1?'查看明细':''" @handleRightClick="goDetail(type)"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <!--<mko-cell :title="item.name" :val="`${item.score} (满分${item.total})`" v-for="item in counts[type]"></mko-cell>-->

            <div class="count-block-wrap clear">
                <div class="count-block" v-for="item in counts[type]">
                    <div class="title abs-middle">{{item.name}}</div>
                    <div class="desc abs-middle">满分{{item.total}}</div>
                    <div class="value abs-middle">{{item.score[monthIndex]}}</div>
                </div>
            </div>
            <!--<week-nav-bar></week-nav-bar>-->

            <div class="chart-wrap">
                <mko-nav-bar v-if="type==0">
                    <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" ref="chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { WeekNavBar } from 'components'

    import echarts from 'echarts';
    let theme = 'macarons';
    export default {
        data () {
            return {
                monthIndex: 0,
                tabI: 0,
                tabItems: ['安全评级分布', '区域排名', '行业排名', '单位类型排名'],
                type: 0,
                counts: [
                    {
                        aqgl: {name: '消防安全管理', score: [48.9,46.5], total: 60},
                        sbgl: {name: '消防设备管理', score: [14.2,15.6], total: 20},
                        hzfx: {name: '建筑火灾风险', score: [15.5,13.7], total: 20},
                    },
                    {
                        aqgl: {name: '消防安全管理', score: [50.5,46.7], total: 60},
                        sbgl: {name: '消防设备管理', score: [13.6,12.6], total: 20},
                        hzfx: {name: '建筑火灾风险', score: [14.8,16.5], total: 20},
                    },
                ]
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
            this.monthIndex = this.$route.query.month || 0;

            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.tabI = 0;
            this.DrawChart();
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
                    '/score_count_detail'
                ];
                this.$MKOPush(paths[type]);
            },
            DrawChart(){
                let tab = this.tabI > 1 ? 1 : this.tabI;
                if (this[`DrawChart${tab}`])
                    this[`DrawChart${tab}`](echarts);
            },
            DrawChart0(ec){
                let datas = [
                    [
                        [90.6, 83.5, 74.2, 67.9, 58.6],
                        [90.7, 82.3, 75.2, 68.5, 51.8],
                    ],
                    [
                        [91.2, 84, 75.7, 68.1, 51.7],
                        [90.7, 82.5, 75, 68.6, 52.1],
                    ]
                ];
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({

                    title: {
                        show: this.type != 0,
                        text: '安全评级分布',
                        x: 'center',
                        textStyle: {
                            color: ' #3399ff',
                            fontSize: 14,
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '安全评级分布',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '55%'],
                            data: datas[this.type][this.monthIndex],
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function (data) {
                                            let label = ['优秀', '良好', '一般', '较差', '极差'];
                                            return `${label[data.dataIndex]}\n(${data.percent})%`;
                                        },
                                        textStyle: {
                                            color: '#666',
                                            fontSize: '12px'
                                        }
                                    },
                                    labelLine: {
                                        length: 20,
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
                let fontSize = [12, 10, 12, 12];
                let y = [
                    [],
                    ['宜兴市', '惠山区', '江阴市', '锡山区', '滨湖区', '梁溪区', '新吴区'],
                    ['公安', '教育', '新闻', '安监', '住建', '民政', '工商', '文化', '卫计', '交通', '规划', '人社', '质监'],
                    ['一级\n单位', '二级\n单位', '三级\n单位', '一般\n单位'],
                ];
                let x = [
                    [],
                    [
                        [79.4, 79.3, 78.9, 78.7, 78.5, 78, 77.9],
                        [76.8, 76.6, 76, 75.8, 75.6, 75.4, 74.9],
                    ],
                    [
                        [79.9, 79.8, 79.7, 78.8, 78.7, 78.5, 78.1, 78, 77.8, 77.2, 76.5, 76, 76],
                        [77.6, 76.9, 76.6, 75.9, 75.6, 75.6, 75.5, 75.4, 74.8, 74.4, 74.3, 73.9, 72.4],
                    ],
                    [
                        [76.9, 78.6, 78.9, 76.5],
                        [75.1, 75.7, 75.9, 75.2],
                    ],
                ];

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
                    xAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 1],
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
                            data: y[this.tabI],
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
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
                            name: this.tabItems[this.tabI],
                            type: 'bar',
                            data: x[this.tabI][this.monthIndex],
                            itemStyle: {
                                normal: {
                                    barBorderColor: '#3399ff'
                                }
                            },

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
                height: 320px;
                background-color: #fff !important;
            }

        }
    }
</style>
