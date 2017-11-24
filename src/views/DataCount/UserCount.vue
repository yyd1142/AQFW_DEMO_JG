<template>
    <div class="user-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="用户数量(人)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{total[monthIndex]}}
            </div>
            <mko-cell title="数据分析"></mko-cell>

            <div class="chart-wrap">
                <mko-nav-bar>
                    <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <div class="chart" ref="chart"></div>
            </div>
            <div>
                <mko-cell :title="item.name" :val="item.value" main="left"
                          v-for="item in datas[tabI][monthIndex]"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>

    import echarts from 'echarts';
    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B', '#7E80FF'];
    let itemStyle = {
        normal: {
            label: {
//                formatter: "{b} ({d}%)",
//                position:'inner',
                formatter: function (data) {
                    return `${data.name}\n(${data.percent}%)`
                },
                textStyle: {
                    color: '#666',
                    fontSize: '14px'
                }
            },
            labelLine: {
                length: 20,
                lineStyle: {
                    color: '#ddd',
                }
            }
        },
    };
    let noLabel = {normal: {label: {show: false}, labelLine: {show: false}}};

    export default {
        data () {
            return {
                monthIndex: 0,
                tabI: 0,
                tabItems: ['区域', '单位类型', '用户类型', '行业类型'],
                total: [6359, 6355],
                datas: [
                    [
                        [
                            {value: 1643, name: '江阴市'},
                            {value: 1318, name: '梁溪区'},
                            {value: 872, name: '滨湖区'},
                            {value: 725, name: '宜兴市'},
                            {value: 676, name: '锡山区'},
                            {value: 636, name: '新吴区'},
                            {value: 489, name: '惠山区'},
                        ],
                        [
                            {value: 1643, name: '江阴市'},
                            {value: 1318, name: '梁溪区'},
                            {value: 868, name: '滨湖区'},
                            {value: 725, name: '宜兴市'},
                            {value: 676, name: '锡山区'},
                            {value: 636, name: '新吴区'},
                            {value: 489, name: '惠山区'},
                        ],
                    ],
                    [
                        [
                            {value: 3616, name: '一级重点\n单位'},
                            {value: 2318, name: '二级重点\n单位'},
                            {value: 406, name: '三级重点\n单位'},
                            {value: 19, name: '一般单位'},
                        ],
                        [
                            {value: 3616, name: '一级重点单位'},
                            {value: 2318, name: '二级重点单位'},
                            {value: 402, name: '三级重点单位'},
                            {value: 19, name: '一般单位'},
                        ],
                    ],
                    [
                        [
                            {value: 3545, name: '消防安全\n管理人'},
                            {value: 849, name: '保安'},
                            {value: 844, name: '专兼职消防\n管理人员'},
                            {value: 509, name: '消防控制室\n管理人员'},
                            {value: 202, name: '消防安全责任人'},
                            {value: 97, name: '社会单位员工'},
                            {value: 70, name: '专职（志愿）消防队员'},
                            {value: 66, name: '其他重点岗位人员'},
                            {value: 63, name: '消防引导员'},
                            {value: 38, name: '电工、电气焊工等特殊工种作业人员'},
                            {value: 37, name: '消防安全监测人员'},
                            {value: 31, name: '易燃易爆危险化学品从业人员'},
                            {value: 6, name: '建设工程消防设施施工、监理、检测、维保等执业人员'},
                            {value: 2, name: '建设工程设计人员'},
                        ],
                        [
                            {value: 3544, name: '消防安全\n管理人'},
                            {value: 849, name: '保安'},
                            {value: 843, name: '专兼职消防\n管理人员'},
                            {value: 507, name: '消防控制室\n管理人员'},
                            {value: 202, name: '消防安全责任人'},
                            {value: 97, name: '社会单位员工'},
                            {value: 70, name: '专职（志愿）消防队员'},
                            {value: 66, name: '其他重点岗位人员'},
                            {value: 63, name: '消防引导员'},
                            {value: 38, name: '电工、电气焊工等特殊工种作业人员'},
                            {value: 37, name: '消防安全监测人员'},
                            {value: 31, name: '易燃易爆危险化学品从业人员'},
                            {value: 6, name: '建设工程消防设施施工、监理、检测、维保等执业人员'},
                            {value: 2, name: '建设工程设计人员'},
                        ],
                    ],
                    [
                        [
                            {value: 1993, name: '安监'},
                            {value: 1959, name: '工商'},
                            {value: 867, name: '文化'},
                            {value: 746, name: '公安'},
                            {value: 222, name: '住建'},
                            {value: 190, name: '教育'},
                            {value: 174, name: '卫计'},
                            {value: 53, name: '民政'},
                            {value: 53, name: '规划'},
                            {value: 46, name: '交通'},
                            {value: 29, name: '人社'},
                            {value: 19, name: '质监'},
                            {value: 8, name: '新闻'},
                        ],
                        [
                            {value: 1993, name: '安监'},
                            {value: 1955, name: '工商'},
                            {value: 867, name: '文化'},
                            {value: 746, name: '公安'},
                            {value: 222, name: '住建'},
                            {value: 190, name: '教育'},
                            {value: 174, name: '卫计'},
                            {value: 53, name: '民政'},
                            {value: 53, name: '规划'},
                            {value: 46, name: '交通'},
                            {value: 29, name: '人社'},
                            {value: 19, name: '质监'},
                            {value: 8, name: '新闻'},
                        ],
                    ]
                ]
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
            this.tabI = 0;
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
            getonthIndex(index){
                this.monthIndex = Math.abs(index);
                if (this.monthIndex > 1)
                    this.monthIndex = 1;
                this.DrawChart(echarts);
            },
            DrawChart(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                let data = JSON.parse(JSON.stringify(this.datas[this.tabI][this.monthIndex]));
                let length = [7, 4, 4, 4];
                for (let i = data.length - 1; i >= length[this.tabI]; i--) {
                    data[i].itemStyle = noLabel;
                }
                myChart.setOption({
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: this.tabItems[this.tabI],
                            type: 'pie',
                            radius: '55%',
//                            clockWise: false,
                            center: ['50%', '50%'],
//                            minAngle: 10,
                            data: data,
                            itemStyle: itemStyle
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
                height: 450px;
                background-color: #fff !important;
            }

        }
    }
</style>
