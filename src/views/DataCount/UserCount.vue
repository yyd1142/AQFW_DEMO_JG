<template>
    <div class="user-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="用户数量" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{total[weekIndex]}}
            </div>
            <week-nav-bar @get="getWeekIndex"></week-nav-bar>
            <mko-cell title="数据分析"></mko-cell>

            <div class="chart-wrap">
                <mko-nav-bar>
                    <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" ref="chart"></div>
            </div>
            <div>
                <mko-cell :title="item.name" :val="item.value" v-for="item in datas[tabI][weekIndex]"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import { WeekNavBar } from 'components'

    import echarts from 'echarts';
    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B', '#7E80FF'];
    let itemStyle = {
        normal: {
            label: {
//                formatter: "{b} ({d}%)",
                formatter: function(data){
                    return `${data.name}\n(${data.percent}%)`
                },
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
                weekIndex: 0,
                tabI: 0,
                tabItems: ['区域分布', '单位占比', '用户占比', '行业占比'],
                total:[7046,6765],
                datas: [
                    [
                        [
                            {value: 1234, name: '宜兴市'},
                            {value: 672, name: '惠山区'},
                            {value: 857, name: '新吴区'},
                            {value: 1006, name: '梁溪区'},
                            {value: 1463, name: '江阴市'},
                            {value: 1098, name: '滨湖区'},
                            {value: 716, name: '锡山区'},
                        ],
//                        [
//                            {value: 81.6, name: '宜兴市'},
//                            {value: 78.8, name: '惠山区'},
//                            {value: 83.7, name: '新吴区'},
//                            {value: 84.9, name: '梁溪区'},
//                            {value: 87.3, name: '江阴市'},
//                            {value: 85.2, name: '滨湖区'},
//                            {value: 80.4, name: '锡山区'},
//                        ],
                        [
                            {value: 1253, name: '宜兴市'},
                            {value: 682, name: '惠山区'},
                            {value: 847, name: '新吴区'},
                            {value: 816, name: '梁溪区'},
                            {value: 1463, name: '江阴市'},
                            {value: 998, name: '滨湖区'},
                            {value: 706, name: '锡山区'},
                        ],

                    ],
                    [
                        [
                            {value: 2187, name: '一级重点单位'},
                            {value: 1776, name: '二级重点单位'},
                            {value: 1458, name: '三级重点单位'},
                            {value: 1057, name: '一般重点单位'},
                            {value: 568, name: '九小场所'},
                        ],
//                        [
//                            {value: 91.6, name: '一级重点单位'},
//                            {value: 87.3, name: '二级重点单位'},
//                            {value: 83.7, name: '三级重点单位'},
//                            {value: 80.2, name: '一般重点单位'},
//                            {value: 75.4, name: '九小场所'},
//                        ],
                        [
                            {value: 2387, name: '一级重点单位'},
                            {value: 1576, name: '二级重点单位'},
                            {value: 1278, name: '三级重点单位'},
                            {value: 957, name: '一般重点单位'},
                            {value: 567, name: '九小场所'},
                        ],
                    ],
                    [
                        [
                            {value: 522, name: '政府监管人员'},
                            {value: 936, name: '单位安全责任人'},
                            {value: 2054, name: '单位安全管理人员'},
                            {value: 3148, name: '单位安全员'},
                            {value: 386, name: '第三方服务人员'},
                        ],
                        [
                            {value: 506, name: '政府监管人员'},
                            {value: 908, name: '单位安全责任人'},
                            {value: 1897, name: '单位安全管理人员'},
                            {value: 3088, name: '单位安全员'},
                            {value: 366, name: '第三方服务人员'},
                        ],
                    ],
                    [
                        [
                            {value: 296, name: '交通'},
                            {value: 315, name: '公安'},
                            {value: 414, name: '国资'},
                            {value: 1354, name: '安监'},
                            {value: 926, name: '工商'},
                            {value: 435, name: '市政'},
                            {value: 837, name: '教育'},
                            {value: 2469, name: '消防'},
                        ],
//                        [
//                            {value: 93.4, name: '消防'},
//                            {value: 87.6, name: '安监'},
//                            {value: 86.9, name: '交通'},
//                            {value: 86.7, name: '教育'},
//                            {value: 85.8, name: '商务'},
//                            {value: 85.3, name: '民政'},
//                            {value: 84.5, name: '旅游'},
//                            {value: 83.2, name: '经信'},
//                            {value: 80.1, name: '文广'},
//                            {value: 80.7, name: '建设'},
//                        ],
                        [
                            {value: 256, name: '交通'},
                            {value: 307, name: '公安'},
                            {value: 389, name: '国资'},
                            {value: 1196, name: '安监'},
                            {value: 916, name: '工商'},
                            {value: 405, name: '市政'},
                            {value: 827, name: '教育'},
                            {value: 2469, name: '消防'},
                        ],
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
            getWeekIndex(index){
                this.weekIndex = Math.abs(index);
                if (this.weekIndex > 1)
                    this.weekIndex = 1;
                this.DrawChart();
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
                            data: this.datas[0][this.weekIndex],
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
                            data: this.datas[1][this.weekIndex],
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
                            data: this.datas[2][this.weekIndex],
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
                            data: this.datas[3][this.weekIndex],
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
