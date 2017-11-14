<template>
    <div class="score-rank-admin-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="评分排名"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <div class="chart-wrap" ref="chart"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    let theme = 'macarons';
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['区域排名', '行业排名', '单位类型排名'],
            }
        },
        watch: {
            tabI(){
                this.DrawChart(echarts);
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
            this.DrawChart(echarts);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            DrawChart(ec){

                let y=[
                    ['宜兴市', '滨湖区', '新吴区', '锡山区', '江阴市', '惠山区', '梁溪区'],
                    ['交通', '公安', '国资', '安监', '工商', '市政', '教育','消防'],
                    ['一级重点单位', '二级重点单位', '三级重点单位', '一般重点单位', '九小场所'],
                ];
                let x=[
                    [1334, 612, 817, 1036, 1763, 998, 765],
                    [196, 215, 314, 1154, 726,335, 637,3748],
                    [2382, 1872, 1236, 1067, 768],
                ];

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: this.tabItems[this.tabI],
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
//                    legend: {
//                        data:['2011年', '2012年']
//                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: y[this.tabI]
                        }
                    ],
                    series: [
                        {
                            name: '区域排名',
                            type: 'bar',
                            data: x[this.tabI]

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
    @import "../../../config.less";

    .score-rank-admin-wrap {
        .chart-wrap {
            padding-left: 14px;
            height: 300px;
            background-color: #fff !important;

        }
    }
</style>
