<template>
    <div class="produce-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="生成数据总量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{total[weekIndex]}}
            </div>
            <week-nav-bar @get="getWeekIndex"></week-nav-bar>

            <mko-cell class="title-cell" title="数据分析"></mko-cell>
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value" v-for="item in datas[weekIndex]"></mko-cell>
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
                weekIndex: 0,
                total: [121926, 107429],
                datas: [
                    [
                        {value: 71852, name: '任务'},
                        {value: 41798, name: '图片'},
                        {value: 8276, name: '通知公告'},
                    ],
                    [
                        {value: 64946, name: '任务'},
                        {value: 36751, name: '图片'},
                        {value: 5732, name: '通知公告'},
                    ],

                ]
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.DrawChart1(echarts);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getWeekIndex(index){
                this.weekIndex = Math.abs(index);
                if (this.weekIndex > 1)
                    this.weekIndex = 1;
                this.DrawChart1(echarts)
            },
            DrawChart1(ec){

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
                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['任务', '图片', '通知公告']
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '生成数据总量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas[this.weekIndex],
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
        components: {
            WeekNavBar
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .produce-count-wrap {
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
            height: 270px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
