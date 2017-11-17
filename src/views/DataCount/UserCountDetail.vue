<template>
    <div class="user-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据分析" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell title="用户数量" val="7325"></mko-cell>

            <div class="chart-wrap">
                <mko-nav-bar>
                    <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" ref="chart"></div>
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
                tabI: 0,
                tabItems: ['区域分布', '单位占比', '用户占比', '行业占比']
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
                        text: '区域分布情况',
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
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '55%'],
                            data: [
                                {value: 1334, name: '宜兴市'},
                                {value: 612, name: '惠山区'},
                                {value: 817, name: '新吴区'},
                                {value: 1036, name: '梁溪区'},
                                {value: 1763, name: '江阴市'},
                                {value: 998, name: '滨湖区'},
                                {value: 765, name: '锡山区'},
                            ]
                        }
                    ]
                })
            },
            DrawChart1(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '单位类型占比',
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
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '55%'],
                            data: [
                                {value: 2382, name: '一级重点单位'},
                                {value: 1872, name: '二级重点单位'},
                                {value: 1236, name: '三级重点单位'},
                                {value: 1067, name: '一般重点单位'},
                                {value: 768, name: '九小场所'},
                            ]
                        }
                    ]
                })
            },
            DrawChart2(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '用户类型占比',
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
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '55%'],
                            data: [
                                {value: 504, name: '政府监管人员'},
                                {value: 1063, name: '单位安全责任人'},
                                {value: 2154, name: '单位安全管理人员'},
                                {value: 3318, name: '单位安全员'},
                                {value: 286, name: '第三方服务人员'},
                            ]
                        }
                    ]
                })
            },
            DrawChart3(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '行业占比',
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
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '55%'],
                            data: [
                                {value: 196, name: '交通'},
                                {value: 215, name: '公安'},
                                {value: 314, name: '国资'},
                                {value: 1154, name: '安监'},
                                {value: 726, name: '工商'},
                                {value: 335, name: '市政'},
                                {value: 637, name: '教育'},
                                {value: 3748, name: '消防'},
                            ]
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

    .user-count-detail-wrap {
        .chart-wrap {
            margin-top: 14px;
            .chart {
                height: 300px;
                background-color: #fff !important;
            }

        }
    }
</style>
