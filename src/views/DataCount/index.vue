<template>
    <div class="data-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据统计" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="count-block-wrap clear">
                <div class="count-block" @click="goDetail(item.path)" v-for="item in counts[type]">
                    <div class="num">{{item.num}}</div>
                    <div class="label">{{item.label}}</div>
                </div>
            </div>
            <div class="chart-wrap" ref="lineChart"></div>
            <div class="btn-wrap">
                <mko-button size="large" no-radius @click="goScore">评分详情</mko-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api';
    import echarts from 'echarts';
    let theme = 'macarons';
    let gId = '';
    export default {
        data () {
            return {
                type: 0,
                counts: [
                    [
                        {label: '社会单位数量', num: 3746, path: '/qy_count_detail'},
                        {label: '累积执行任务数量', num: 826852, path: '/task_count_detail'},
                        {label: '用户数量', num: 7325, path: '/user_count_detail'},
                        {label: '生成数据总量', num: 1511926, path: '/produce_count_detail'}
                    ],
                    [
                        {label: '社会单位数量', num: 546, path: '/qy_count_detail'},
                        {label: '累积执行任务数量', num: 68904, path: '/task_count_detail'},
                    ],
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
                gId = this.$store.getters.groupId;
                let params = {
                    groupId: gId
                };
                api.getJGDwInfo(params).then(res => {
                    if (res && res.code == 0) {
                        let data = res.response;
                        let path = data.path.split('/');
                        this.type = path[1] == data.id ? 0 : 1;
//                        this.type = path[1] != data.id ? 0 : 1;
                        sessionStorage.setItem(`jgDwType${gId}`, this.type);
                        this.DrawChart1(echarts);
                    }
                })
            },
            goDetail(path){
                this.$MKOPush(path)
            },
            goScore(){
                this.$MKOPush('/score_count');
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
                sessionStorage.removeItem(`jgDwType${gId}`);
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
            margin-bottom: 0;
            .count-block {
                float: left;
                width: 49%;
                margin-bottom: 8px;
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
