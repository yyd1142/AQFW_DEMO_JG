<template>
    <div class="qy-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="社会单位数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type]}}
            </div>
            <mko-cell class="title-cell" title="数据分析"></mko-cell>
            <div class="chart-wrap" ref="chart"></div>
            <mko-cell title="数据列表" is-link @click="goList"></mko-cell>
            <!--<div class="btn-wrap">-->
            <!--<mko-button size="large" no-radius @click="goList">数据列表</mko-button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    let theme = 'macarons';
    let datas = [
        {jh: 3468, hy: 2937},
        {jh: 488, hy: 372},
    ];
    export default {
        data () {
            return {
                type: 0,
                counts: [3746, 546]
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.DrawChart(echarts);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            goList(){
                this.$MKOPush('/qy_count_list');
            },
            DrawChart(ec){
                let _t = this.type;
                let total = this.counts[_t];
                let jh = datas[_t].jh;
                let hy = datas[_t].hy;

                let myChart = ec.init(this.$refs['chart'], theme);
                let radius = [72, 75];
                let labelTop = {
                    normal: {
                        label: {
                            show: false,
//                            position: 'center',
//                            formatter: '{b}',
                            textStyle: {
                                baseline: 'bottom',
                                color: '#3399ff',
                                fontSize: 12
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }
                };
                let labelFromatter = {
                    normal: {
                        label: {
                            formatter: function (params) {
                                return ((total - params.value) / total * 100).toFixed(2) + '%'
                            },
                            textStyle: {
                                baseline: 'bottom',
                                color: '#333',
                                fontSize: 28
                            }
                        }
                    },
                };
                let labelBottom = {
                    normal: {
                        color: '#ccc',
                        label: {
                            show: true,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: '#ccc'
                    }
                };
                myChart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'center',
                        y: 195,
                        itemGap: 217,
                        formatter: function (name) {
                            let val = name == '激活单位数' ? jh : hy;
                            return `${name}：${val}`
                        },
                        data: [
                            '激活单位数', '活跃单位数'
                        ],
                        textStyle: {
                            color: '#666',
                            fontSize: 18
                        }
                    },
                    title: {
//                        text: '社会单位数据',
//                        x: 'center'
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    color: ['#2CABFF', ' #2CABFF'],
                    categories: {},
                    series: [
                        {
                            type: 'pie',
                            center: ['50%', '20%'],
                            radius: radius,
                            x: '0%', // for funnel
                            itemStyle: labelFromatter,
                            data: [
                                {name: 'other', value: parseInt(total - jh), itemStyle: labelBottom},
                                {name: '激活单位数', value: jh, itemStyle: labelTop}
                            ]
                        },
                        {
                            type: 'pie',
                            center: ['50%', '70%'],
                            radius: radius,
                            x: '20%', // for funnel
                            itemStyle: labelFromatter,
                            data: [
                                {name: 'other', value: parseInt(total - hy), itemStyle: labelBottom},
                                {name: '活跃单位数', value: hy, itemStyle: labelTop}
                            ]
                        },
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

    .qy-count-wrap {
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
                }
            }
            .cell {
                box-shadow: none;
            }
        }
        .chart-wrap {
            /*padding-top: 14px;*/
            height: 487px;
            border-top: 1px solid @baseBorder;
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
