<template>
    <div class="user-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="用户数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                7325
            </div>
            <week-nav-bar></week-nav-bar>
            <mko-cell title="数据分析"></mko-cell>

            <div class="chart-wrap">
                <mko-nav-bar>
                    <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" ref="chart"></div>
            </div>
            <div>
                <mko-cell :title="item.name" :val="item.value" v-for="item in datas[tabI]"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import { WeekNavBar } from 'components'

    import echarts from 'echarts';
    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B','#7E80FF'];
    let itemStyle = {
        normal: {
            label: {
                formatter: "{b} ({d}%)",
                textStyle: {
                    color: '#666',
                    fontSize: '12px'
                }
            },
            labelLine: {
                length: 30,
                lineStyle: {
                    color: '#ddd',
                }
            }
        },
    };
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['区域分布', '单位占比', '用户占比', '行业占比'],
                datas: [
                    [
                        {value: 1334, name: '宜兴市'},
                        {value: 612, name: '惠山区'},
                        {value: 817, name: '新吴区'},
                        {value: 1036, name: '梁溪区'},
                        {value: 1763, name: '江阴市'},
                        {value: 998, name: '滨湖区'},
                        {value: 765, name: '锡山区'},
                    ],
                    [
                        {value: 2382, name: '一级重点单位'},
                        {value: 1872, name: '二级重点单位'},
                        {value: 1236, name: '三级重点单位'},
                        {value: 1067, name: '一般重点单位'},
                        {value: 768, name: '九小场所'},
                    ],
                    [
                        {value: 504, name: '政府监管人员'},
                        {value: 1063, name: '单位安全责任人'},
                        {value: 2154, name: '单位安全管理人员'},
                        {value: 3318, name: '单位安全员'},
                        {value: 286, name: '第三方服务人员'},
                    ],
                    [
                        {value: 196, name: '交通'},
                        {value: 215, name: '公安'},
                        {value: 314, name: '国资'},
                        {value: 1154, name: '安监'},
                        {value: 726, name: '工商'},
                        {value: 335, name: '市政'},
                        {value: 637, name: '教育'},
                        {value: 3748, name: '消防'},
                    ]
                ]
            }
        },
        watch: {
            tabI(){
                this.DrawChart();
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
            this.DrawChart();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            DrawChart(){
                if (this[`DrawChart${this.tabI}`])
                    this[`DrawChart${this.tabI}`](echarts);
            },
            DrawChart0(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
//                        text: '区域分布情况',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['宜兴市', '惠山区', '新吴区','梁溪区','江阴市','滨湖区','锡山区']
//                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas[0],
                            itemStyle: itemStyle
                        }
                    ]
                })
            },
            DrawChart1(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
//                        text: '单位类型占比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['宜兴市', '惠山区', '新吴区','梁溪区','江阴市','滨湖区','锡山区']
//                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas[1],
                            itemStyle: itemStyle
                        }
                    ]
                })
            },
            DrawChart2(ec){
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
//                        data: ['宜兴市', '惠山区', '新吴区','梁溪区','江阴市','滨湖区','锡山区']
//                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas[2],
                            itemStyle: itemStyle
                        }
                    ]
                })
            },
            DrawChart3(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
//                        text: '行业占比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
//                    legend: {
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['宜兴市', '惠山区', '新吴区','梁溪区','江阴市','滨湖区','锡山区']
//                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas[3],
                            itemStyle: itemStyle
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

    .user-count-wrap {
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
            margin-bottom: 10px;
            .chart {
                height: 300px;
                background-color: #fff !important;
            }

        }
    }
</style>
