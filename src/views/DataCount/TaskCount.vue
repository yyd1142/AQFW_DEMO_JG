<template>
    <div class="task-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="累积执行任务数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type]}}
            </div>
            <mko-cell class="title-cell" title="数据分析"></mko-cell>
            <div class="chart-wrap" ref="chart">

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
                counts: ['826852', '68904']
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
                let datas = [
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

                ];
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
                        orient: 'vertical',
                        x: 'left',
                        data: ['任务', '图片', '通知公告']
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    series: [
                        {
                            name: '累积执行任务数量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: datas[this.type]
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
