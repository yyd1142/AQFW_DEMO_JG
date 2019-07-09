<template>
    <div class="data-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据统计" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <month-nav-bar @get="getMonthIndex"></month-nav-bar>
            <div class="count-block-wrap">
                <mko-cell :title="item.label" :val="item.num"
                          @click="goDetail(item.path)" is-link
                          v-for="item in counts[type]"></mko-cell>
            </div>
            <div class="chart-wrap" ref="lineChart"></div>
            <div>
                <mko-cell title="评分详情" is-link @click="goScore"></mko-cell>
            </div>
            <!--<div class="btn-wrap">-->
            <!--<mko-button size="large" no-radius @click="goScore">评分详情</mko-button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import api from 'api';
    import conf from 'config'
    import { MonthNavBar } from 'components'
    import echarts from 'echarts';
    import { formatDate } from 'filters';
    import { Indicator } from 'mint-ui';

    let theme = 'macarons';
    let gId = '';
    export default {
        data () {
            return {
                month: '',
                type: -1,
                counts: [
                    [
                        {label: '社会单位数量(家)', num: 0, path: '/qy_count', key: 'qyTotal'},
                        {label: '用户数量(人)', num: 0, path: '/user_count', key: 'qyUserTotal'},
                        {label: '任务执行数量(个)', num: 0, path: '/task_count', key: 'qyTaskTotal'},
                        {label: '生成数据总量(条)', num: 0, path: '/produce_count', key: 'qyDataTotal'}
                    ],
                    [
                        {label: '社会单位数量(家)', num: 0, path: '/qy_count', key: 'qyTotal'},
                        {label: '任务执行数量(个)', num: 0, path: '/task_count', key: 'qyTaskTotal'},
                    ],
                ]
            }
        },
        watch: {
            month(){
                this.getTotalData();
            }
        },
        computed: {},
        mounted() {
            this.getMonthIndex(new Date());
        },
        activated(){
            this.getDwData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            formatDate,
            getMonthIndex(data){
                this.month = this.formatDate(data, 'YYYY-MM');
                if (this.month)
                    this.month += '-00';
            },
            getDwData(){
                Indicator.open({spinnerType: 'fading-circle'});
                gId = this.$store.getters.groupId;
                let params = {
                    groupId: gId
                };
                api.getJGDwInfo(params).then(res => {
                    if (res && res.code == 0 && res.response) {
                        let data = res.response;
                        let path = data.path.split('/');
                        this.type = (data.id == 1 || path[1] == data.id) ? 0 : 1;
//                        this.type = path[1] == data.id ? 0 : 1;
//                        this.type = path[1] != data.id ? 0 : 1;
                        sessionStorage.setItem(`jgDwType${gId}`, this.type);
                        this.getTotalData();
                        this.DrawChart1(echarts);
                    } else {
                        Indicator.close();
                    }
                })
            },
            getTotalData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
//                    dwId: this.$store.getters.userInfo.dwId,
                    date: this.month,
                    groupId: this.$store.getters.groupId
                };
                api.getAllTotalCount(pas).then(res => {
                    if (res && res.code == 0 && res.response) {
                        let data = res.response;
                        if (this.counts[this.type])
                            this.counts[this.type].forEach(item => {
                                item.num = data[item.key] || 0;
                            })

                    }
                    Indicator.close();
                })
            },
            goDetail(path){
                this.$MKOPush(path + '?month=' + this.month)
            },
            goScore(){
                this.$MKOPush('/score_count?month=' + this.month);
            },
            DrawChart1(ec){
                let scores = [
                    [71.7, 63.5, 71.8, 73.5, 75.8, 85.6],
                    [71, 63.8, 71.1, 73.3, 75.8, 84.9],
                ];

                let myChart = ec.init(this.$refs['lineChart'], theme);
                myChart.setOption({
                    title: {
                        text: '安全评分趋势',
                        x: 'center',
                        y: 10,
                        textStyle: {
                            color: conf.mainBlue,
                            fontSize: 14,
                        }

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
//                        data: ['安全评分趋势'],
                        selectedMode: false
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: [conf.mainBlue],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: ['2018.10', '2018.11', '2018.12', '2019.01', '2019.02', '2019.03'],
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
                            max: 100,
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
                            name: '安全评分',
                            clickable: false,
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
        components: {
            MonthNavBar
        }
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
