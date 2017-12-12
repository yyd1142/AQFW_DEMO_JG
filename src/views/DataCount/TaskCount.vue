<template>
    <div class="task-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="任务执行数量(个)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type][monthIndex]}}
            </div>
            <!--<mko-cell class="title-cell" title="数据分析"></mko-cell>-->
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" main="left" :val="item.value" v-for="item in datas[type][monthIndex]"></mko-cell>
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
                monthIndex: 0,
                type: 0,
                counts: [
                    [1112032, 1123498],
                    [260503, 264041]
                ],
                datas: [
                    [
                        [
                            {value: 228412, name: '值班'},
                            {value: 458921, name: '巡查'},
                            {value: 183752, name: '维修'},
                            {value: 130627, name: '保养'},
                            {value: 46502, name: '检查'},
                            {value: 63818, name: '检测'},
                        ],
                        [
                            {value: 237412, name: '值班'},
                            {value: 428921, name: '巡查'},
                            {value: 173652, name: '维修'},
                            {value: 140927, name: '保养'},
                            {value: 67405, name: '检测'},
                            {value: 75181, name: '检查'},
                        ],
                    ],
                    [
                        [
                            {value: 111015, name: '巡查'},
                            {value: 50201, name: '值班'},
                            {value: 40476, name: '维修'},
                            {value: 31413, name: '保养'},
                            {value: 16487, name: '检测'},
                            {value: 10911, name: '检查'},
                        ],
                        [
                            {value: 112523, name: '巡查'},
                            {value: 50882, name: '值班'},
                            {value: 41026, name: '维修'},
                            {value: 31840, name: '保养'},
                            {value: 16711, name: '检测'},
                            {value: 11059, name: '检查'},
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
//            this.monthIndex = this.$route.query.month || 0;

            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.DrawChart1(echarts);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getMonthIndex(index){
                this.monthIndex = Math.abs(index);
                if (this.monthIndex > 1)
                    this.monthIndex = 1;
                this.DrawChart1(echarts)
            },
            DrawChart1(ec){
                let datas = this.datas[this.type][this.monthIndex];
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
        components: {
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
            height: 300px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
