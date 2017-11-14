<template>
    <div class="score-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="安全评分"
                    :right-icon-text="type==1?'明细':'排名'" @handleRightClick="goDetail(type)"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="item.name" :val="`${item.score} (满分${item.total})`" v-for="item in counts[type]"></mko-cell>
            <div class="chart-wrap">
                <mko-nav-bar>
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
                tabItems: ['安全评级分布', '安全评分趋势'],
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
                if (this[`DrawChart${this.tabI}`])
                    this[`DrawChart${this.tabI}`](echarts);
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
                    polar: [
                        {
                            indicator: [
                                {text: '优秀', max: 100},
                                {text: '极差', max: 100},
                                {text: '较差', max: 100},
                                {text: '一般', max: 100},
                                {text: '良好', max: 100},
                            ],
                            radius: 110
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'radar',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data: [
                                {
                                    value: datas[_t],
                                    name: '单位数量'
                                }
                            ]
                        }
                    ]
                })
            },
            DrawChart1(ec){
                let scores = [
                    [65.7, 72.8, 76.2, 83.4, 87.5, 85.6],
                    [68.5, 77.8, 79.2, 86.4, 86.4, 87.3],
                ];

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['安全评分趋势',]
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['2017年5月', '2017年6月', '2017年7月', '2017年8月', '2017年9月', '2017年10月'],
                            axisLabel: {
//                                interval: 0,
                                textStyle: {
                                    fontSize: 1,
                                    fontWeight: 100
                                }
                            },
//                            axisTick: {
//                                interval: 0
//                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '安全评分趋势',
                            type: 'line',
                            stack: '分数',
                            data: scores[this.type],
                            markPoint: {
                                data: [
//                                    {type: 'max', name: '最大值'},
                                    {
                                        xAxis: 5,
                                        yAxis: scores[this.type][scores[this.type].length - 1]
                                    },
                                ]
                            },
                        }
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
        .chart-wrap {
            margin-top: 14px;
            .chart {
                padding-top: 14px;
                height: 300px;
                background-color: #fff !important;
            }

        }
    }
</style>
