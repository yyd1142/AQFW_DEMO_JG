<template>
    <div class="task-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="任务执行数量(个)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{datas.qyTotalTaskByJg}}
            </div>
            <!--<mko-cell class="title-cell" title="数据分析"></mko-cell>-->
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" main="left" :val="item.value" v-for="item in datas.qyTaskTypeCountByJg"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import api from 'api';
    import conf from 'config';
    import { ResError } from 'components'
    import { Indicator } from 'mint-ui';

    let theme = 'macarons';
    export default {
        data () {
            return {
                month: 0,
                type: 0,
                total: 0,
                datas: {}
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.month = this.$route.query.month;
            this.getData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId,
                    createDate: this.month
                };
                api.getQytaskCount(pas).then(res => {
                    if (res && res.code == 0) {
                        this.datas = res.response;
                        let that = this;
                        let match = function (key) {
                            let names = {
                                qyTaskTypeCountByJg: 'taskType',
                            };
                            if (res.response[key]) {
                                let other = res.response.qyTotalTaskByJg || 0;
                                that.datas[key] = res.response[key].map(item => {
                                    other -= item.count;
                                    let name = item[names[key]];
                                    return {
                                        value: item.count,
                                        name: conf.taskTypeList[name]
                                    }
                                });
                                //将剩余归为其他类
                                if (other > 0)
                                    that.datas[key].push({
                                        value: other,
                                        name: '其他'
                                    });
                                //排序
                                that.datas[key].sort(function (a, b) {
                                    return b.value - a.value;
                                });
                            }
                        };
                        match('qyTaskTypeCountByJg');
                        this.DrawChart1(echarts);
                    }
                    Indicator.close();
                })

            },
            DrawChart1(ec){
                let datas = this.datas.qyTaskTypeCountByJg;
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },

                    calculable: true,
                    color: ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '任务执行数量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: datas,
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: "{b}\n({d}%)",
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

    .task-count-wrap {
        .page-wrap {
            margin-top: @headerHeight + @headerTop - 1px;
        }
        .info-bar {
            height: 44px;
            line-height: 44px;
            font-size: 30px;
            text-align: center;
            color: #fff;
            background-color: @mainBlue;
        }

        .list-wrap {
            margin-top: 10px;
        }
        .mko-basic-cell {
            &.title-cell {
                height: 50px;
                .cell {
                    height: 50px;
                    box-shadow: none;
                    .title {
                        flex: 0 0 160px;
                        -webkit-flex: 0 0 160px;
                        width: 160px;
                    }
                }
            }
        }
        .chart-wrap {
            padding-top: 14px;
            height: 300px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
