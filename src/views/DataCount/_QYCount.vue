<template>
    <div class="qy-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="社会单位数量(家)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{counts[type][monthIndex]}}
            </div>
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <!--<mko-cell class="title-cell" title="数据分析"></mko-cell>-->

            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value" main="left" v-for="item in datas[type][monthIndex][tabI]"></mko-cell>
            </div>
            <!--<mko-cell title="数据列表" is-link @click="goList"></mko-cell>-->
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B', '#7E80FF', '#38b48b', '#96514b', '#ED6D35', '#824880'];
    let itemStyle = {
        normal: {
            label: {

                formatter: function (data) {
                    return `${data.name}\n(${data.percent}%)`
                },
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
    };
    let noLabel = {normal: {label: {show: false}, labelLine: {show: false}},emphasis:{label: {show: false}, labelLine: {show: false}}};
    export default {
        data () {
            return {
                type: 0,
                tabI: 0,
                tabItems: ['区域', '行业', '单位类型'],
                monthIndex: 0,
                counts: [
                    [3544, 3533],
                    [824, 823],
                ],
                datas: [
                    [//支队
                        [//本月
                            [
                                {value: 824, name: '江阴大队'},
                                {value: 452, name: '宜兴大队'},
                                {value: 421, name: '锡山大队'},
                                {value: 389, name: '滨湖大队'},
                                {value: 325, name: '惠山大队'},
                                {value: 295, name: '新区大队'},
                                {value: 275, name: '崇安大队'},
                                {value: 208, name: '南长大队'},
                                {value: 186, name: '北塘大队'},
                                {value: 122, name: '无锡支队'},
                                {value: 28, name: '公交大队'},
                                {value: 19, name: '水上大队'}
                            ],
                            [
                                {value: 1197, name: '安监'},
                                {value: 935, name: '工商'},
                                {value: 534, name: '公安'},
                                {value: 509, name: '文化'},
                                {value: 113, name: '教育'},
                                {value: 85, name: '住建'},
                                {value: 81, name: '卫计'},
                                {value: 29, name: '民政'},
                                {value: 19, name: '规划'},
                                {value: 19, name: '交通'},
                                {value: 11, name: '质监'},
                                {value: 10, name: '人社'},
                                {value: 2, name: '新闻'},
                            ],
                            [
                                {value: 1845, name: '二级重点单位'},
                                {value: 1564, name: '三级重点单位'},
                                {value: 123, name: '一级重点单位'},
                                {value: 12, name: '一般单位'},
                            ]
                        ],
                        [//上个月
                            [
                                {value: 823, name: '江阴大队'},
                                {value: 452, name: '宜兴大队'},
                                {value: 421, name: '锡山大队'},
                                {value: 387, name: '滨湖大队'},
                                {value: 325, name: '惠山大队'},
                                {value: 291, name: '新区大队'},
                                {value: 274, name: '崇安大队'},
                                {value: 208, name: '南长大队'},
                                {value: 186, name: '北塘大队'},
                                {value: 119, name: '无锡支队'},
                                {value: 28, name: '公交大队'},
                                {value: 19, name: '水上大队'}
                            ],
                            [
                                {value: 1194, name: '安监'},
                                {value: 933, name: '工商'},
                                {value: 534, name: '公安'},
                                {value: 507, name: '文化'},
                                {value: 113, name: '教育'},
                                {value: 83, name: '住建'},
                                {value: 81, name: '卫计'},
                                {value: 29, name: '民政'},
                                {value: 19, name: '规划'},
                                {value: 19, name: '交通'},
                                {value: 11, name: '质监'},
                                {value: 8, name: '人社'},
                                {value: 2, name: '新闻'},
                            ],
                            [
                                {value: 1842, name: '二级重点单位'},
                                {value: 1559, name: '三级重点单位'},
                                {value: 120, name: '一级重点单位'},
                                {value: 12, name: '一般单位'},
                            ]
                        ],
                    ],
                    [//大队
                        [//本月
                            [
                                {value: 284, name: '安监'},
                                {value: 214, name: '工商'},
                                {value: 136, name: '文化'},
                                {value: 135, name: '公安'},
                                {value: 16, name: '卫计'},
                                {value: 13, name: '教育'},
                                {value: 7, name: '质监'},
                                {value: 5, name: '交通'},
                                {value: 5, name: '住建'},
                                {value: 4, name: '规划'},
                                {value: 4, name: '民政'},
                                {value: 1, name: '人社'},
                            ],
                            [
                                {value: 515, name: '二级重点单位'},
                                {value: 305, name: '三级重点单位'},
                                {value: 3, name: '一级重点单位'},
                                {value: 1, name: '一般单位'},
                            ]
                        ],
                        [//上个月
                            [
                                {value: 283, name: '安监'},
                                {value: 214, name: '工商'},
                                {value: 136, name: '文化'},
                                {value: 135, name: '公安'},
                                {value: 16, name: '卫计'},
                                {value: 13, name: '教育'},
                                {value: 7, name: '质监'},
                                {value: 5, name: '交通'},
                                {value: 5, name: '住建'},
                                {value: 4, name: '规划'},
                                {value: 4, name: '民政'},
                                {value: 1, name: '人社'},
                            ],
                            [
                                {value: 514, name: '二级重点单位'},
                                {value: 305, name: '三级重点单位'},
                                {value: 3, name: '一级重点单位'},
                                {value: 1, name: '一般单位'},
                            ]
                        ],
                    ],
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
            this.monthIndex = this.$route.query.month || 0;
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.tabI = 0;
            this.tabItems = this.type == 0 ? ['区域', '行业', '单位类型'] : ['行业', '单位类型'];
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
            tabFn(i){
                this.tabI = i;
            },
            DrawChart(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                let data = JSON.parse(JSON.stringify(this.datas[this.type][this.monthIndex][this.tabI]));
                let length = 8;
                for (let i = data.length - 1; i >= length; i--) {
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
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: this.tabItems[this.tabI],
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: data,
                            itemStyle: itemStyle
                        }
                    ]
                })
            },
            _DrawChart(ec){
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
                        selectedMode: false,
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
        }
        .chart-wrap {
            /*padding-top: 14px;*/
            margin-bottom: 10px;
            height: 300px;
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
