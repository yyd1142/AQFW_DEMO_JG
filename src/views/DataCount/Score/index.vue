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
                    <div class="value abs-middle">{{item.score}}</div>
                </div>
            </div>

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
    import echarts from 'echarts';
    let theme = 'macarons';
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['安全评级分布', '区域排名', '行业排名', '单位类型排名'],
                type: 0,
                counts: [
                    {
                        aqgl: {name: '消防安全管理', score: 52.9, total: 60},
                        sbgl: {name: '消防设备管理', score: 12.7, total: 20},
                        hzfx: {name: '建筑火灾风险', score: 20, total: 20},
                    },
                    {
                        aqgl: {name: '消防安全管理', score: 53.7, total: 60},
                        sbgl: {name: '消防设备管理', score: 13.6, total: 20},
                        hzfx: {name: '建筑火灾风险', score: 20, total: 20},
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
                let _t = this.type;
                let datas = [
                    [92.3, 84.5, 76.2, 64.7, 57.4],
                    [91.2, 84.5, 75.4, 66.7, 54.6]
                ];
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#3399ff'],
                    polar: [
                        {
                            indicator: [
                                {text: '优秀', max: 100},
                                {text: '极差', max: 100},
                                {text: '较差', max: 100},
                                {text: '一般', max: 100},
                                {text: '良好', max: 100},
                            ],
                            radius: 110,
                            splitLine: {
                                show: true,
                                lineStyle: {
//                                    color: '#ddd'
                                }
                            }
                        }
                    ],
                    textStyle: {
                        color: '#666',
                        fontSize: 14
                    },
                    series: [
                        {
                            name: '',
                            type: 'radar',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default',
                                        color: '#70BBFE'
                                    },
                                    lineStyle: {
                                        color: '#3399ff'
                                    },
                                    borderColor: '#3399ff',
                                    nodeStyle: {
//                                        color: '#ff6666'
                                    }
                                }
                            },
                            data: [
                                {
                                    value: datas[_t],
                                    name: '单位数量',
                                    itemStyle: {
                                        normal: {
                                            color: '#ff6666'
                                        }
                                    },
                                }
                            ]
                        }
                    ]
                })
            },
            DrawChart1(ec){

                let y = [
                    [],
                    ['宜兴市', '滨湖区', '新吴区', '锡山区', '江阴市', '惠山区', '梁溪区'],
                    ['交通', '公安', '国资', '安监', '工商', '市政', '教育', '消防'],
                    ['一级重点单位', '二级重点单位', '三级重点单位', '一般重点单位', '九小场所'],
                ];
                let x = [
                    [],
                    [1334, 612, 817, 1036, 1763, 998, 765],
                    [196, 215, 314, 1154, 726, 335, 637, 3748],
                    [2382, 1872, 1236, 1067, 768],
                ];

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
//                    title: {
//                        text: this.tabItems[this.tabI],
//                    },
                    tooltip: {
                        trigger: 'axis'
                    },
//                    legend: {
//                        data:['2011年', '2012年']
//                    },
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
                                textStyle:{
                                    color:'#666'
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
                                textStyle:{
                                  color:'#666'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '区域排名',
                            type: 'bar',
                            data: x[this.tabI],
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
        components: {}
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
                height: 300px;
                background-color: #fff !important;
            }

        }
    }
</style>
