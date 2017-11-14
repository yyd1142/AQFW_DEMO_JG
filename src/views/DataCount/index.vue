<template>
    <div class="data-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据统计" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="count-block-wrap clear">
                <div class="count-block" v-for="(item,key) in counts[type]">
                    <div class="num">{{item}}</div>
                    <div class="label">{{key}}</div>
                </div>
            </div>
            <div class="chart-wrap" ref="lineChart"></div>
            <div class="btn-wrap">
                <mko-button size="large" no-radius>评分详情</mko-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api';
    import echarts from 'echarts';
    let theme = 'macarons';

    export default {
        data () {
            return {
                type: 0,
                counts: [
                    {
                        '社会单位数量': 3746,
                        '累积执行任务数量': 826852,
                        '用户数量': 7325,
                        '生成数据总量': 1511926
                    },
                    {
                        '社会单位数量': 546,
                        '累积执行任务数量': 68904,
                    }
                ]
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.getDwData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getDwData(){
                let params = {
                    groupId: this.$store.getters.groupId
                };
                api.getJGDwInfo(params).then(res => {
                    if (res && res.code == 0) {
                        let data = res.response;
                        let path = data.path.split('/');
                        this.type = path[1] == data.id ? 0 : 1;
//                        this.type = path[1] != data.id ? 0 : 1;
                        this.DrawChart1(echarts);
                    }
                })
            },
            DrawChart1(ec){
                let scores = [
                    [65.7, 72.8, 76.2, 83.4, 87.5, 85.6],
                    [68.5, 77.8, 79.2, 86.4, 86.4, 87.3],
                ];

                let myChart = ec.init(this.$refs['lineChart'], theme);
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
    @import "../../config.less";

    .data-count-wrap {
        .count-block-wrap {
            margin: 8px;
            .count-block {
                float: left;
                width: 48%;
                margin-bottom: 14px;
                background-color: #fff;
                &:nth-child(even) {
                    float: right;
                }
                padding: 10px;
                .num {
                    color: @mainBlue;
                    font-size: 18px;
                    margin-bottom: 14px;
                }
                .label {
                    font-size: 16px;
                    margin-bottom: 14px;
                }
            }
        }
        .chart-wrap {
            height: 300px;
            padding-top: 10px;
            background-color: #fff !important;
        }
        .btn-wrap {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
</style>
