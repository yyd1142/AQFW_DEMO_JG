<template>
    <div class="task-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="累积执行任务数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type]}}
            </div>
            <mko-cell class="title-cell" title="数据分析"></mko-cell>
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value" v-for="item in datas[type]"></mko-cell>
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
                type: 0,
                counts: ['826852', '68904'],
                datas: [
                    [
                        {value: 170136, name: '值班'},
                        {value: 340366, name: '巡查'},
                        {value: 136870, name: '维修'},
                        {value: 97314, name: '保养'},
                        {value: 47528, name: '检测'},
                        {value: 34638, name: '检查'},
                    ],
                    [
                        {value: 13278, name: '值班'},
                        {value: 29364, name: '巡查'},
                        {value: 10706, name: '维修'},
                        {value: 8309, name: '保养'},
                        {value: 4361, name: '检测'},
                        {value: 2886, name: '检查'},
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
            DrawChart1(ec){
                let datas = this.datas;
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
                            data: datas[this.type],
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: "{b} ({d}%)",
                                        textStyle: {
                                            color: '#666',
                                            fontSize: '12px'
                                        }
                                    },
                                    labelLine: {
                                        length: 40,
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
            height: 270px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
