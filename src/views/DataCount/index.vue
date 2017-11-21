<template>
    <div class="data-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据统计" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="count-block-wrap">
                <mko-cell :title="item.label" :val="item.num"
                          @click="goDetail(item.path)" is-link
                          v-for="item in counts[type]"></mko-cell>
            </div>
            <div class="chart-wrap" ref="lineChart"></div>
            <mko-cell title="评分详情" is-link @click="goScore"></mko-cell>
            <!--<div class="btn-wrap">-->
            <!--<mko-button size="large" no-radius @click="goScore">评分详情</mko-button>-->
            <!--</div>-->
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
                type: -1,
                counts: [
                    [
                        {label: '社会单位数量(家)', num: 3746, path: '/qy_count'},
                        {label: '累积执行任务数量(个)', num: 826852, path: '/task_count'},
                        {label: '用户数量(人)', num: 7325, path: '/user_count'},
                        {label: '生成数据总量(次)', num: 1511926, path: '/produce_count'}
                    ],
                    [
                        {label: '社会单位数量(家)', num: 546, path: '/qy_count'},
                        {label: '累积执行任务数量(个)', num: 68904, path: '/task_count'},
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
//                        this.type = path[1] == data.id ? 0 : 1;
                        this.type = path[1] != data.id ? 0 : 1;
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
//                        data: ['安全评分趋势',]
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#3399ff'],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: ['2017.5', '2017.6', '2017.7', '2017.8', '2017.9', '2017.10'],
                            axisLine: {
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                textStyle: {
                                    fontSize: 10,
                                    fontWeight: 100,
                                    color: '#999'
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#979797'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontSize: 10,
                                    fontWeight: 100,
                                    color: '#999'
                                }
                            },
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
            margin: 10px 0;
            .mko-basic-cell {
                .title {
                    flex: 0 0 160px;
                    -webkit-flex: 0 0 160px;
                    width: 160px;
                }
            }
        }
        .chart-wrap {
            height: 300px;
            /*padding-top: 10px;*/
            border-bottom: 1px solid @baseBorder;
            background-color: #fff !important;
        }
        .btn-wrap {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
</style>
