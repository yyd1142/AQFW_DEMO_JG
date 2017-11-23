<template>
    <div class="task-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="累积执行任务数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type][weekIndex]}}
            </div>
            <week-nav-bar @get="getWeekIndex"></week-nav-bar>
            <mko-cell class="title-cell" title="数据分析"></mko-cell>
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value" v-for="item in datas[type][weekIndex]"></mko-cell>
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
                type: 0,
                counts: [
                    [56852, 54687],
                    [9512, 9187]
                ],
                datas: [
                    [
                        [
                            {value: 11136, name: '值班'},
                            {value: 20366, name: '巡查'},
                            {value: 7870, name: '维修'},
                            {value: 9314, name: '保养'},
                            {value: 2528, name: '检测'},
                            {value: 5638, name: '检查'},
                        ],
                        [
                            {value: 10846, name: '值班'},
                            {value: 19325, name: '巡查'},
                            {value: 7576, name: '维修'},
                            {value: 9487, name: '保养'},
                            {value: 2369, name: '检测'},
                            {value: 5264, name: '检查'},
                        ]
                    ],
                    [
                        [
                            {value: 2378, name: '值班'},
                            {value: 3464, name: '巡查'},
                            {value: 1259, name: '维修'},
                            {value: 1164, name: '保养'},
                            {value: 761, name: '检测'},
                            {value: 486, name: '检查'},
                        ],
                        [
                            {value: 2247, name: '值班'},
                            {value: 3526, name: '巡查'},
                            {value: 1135, name: '维修'},
                            {value: 1093, name: '保养'},
                            {value: 649, name: '检测'},
                            {value: 528, name: '检查'},
                        ]
                    ],
                ]
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
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
                let datas = this.datas[this.type][this.weekIndex];
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
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['任务', '图片', '通知公告']
//                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },

                    calculable: true,
                    color: ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '累积执行任务数量',
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
        components: {
            WeekNavBar
        }
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
            height: 270px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
