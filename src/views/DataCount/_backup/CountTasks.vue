<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="任务统计" fixed>
            <router-link to="/data_count_list" slot="left">
                <mt-button class="header-item" icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-wrap count-tasks-page">
            <div class="section">
                <div class="folder">关键数据指标</div>
                <div class="sub-folder">
                    <div id="" style="margin: 0 auto; width:90%; height:260px">
                        <div class="item">
                            <p class="lab">单位数量</p>
                            <p class="val">44</p>
                        </div>
                        <!-- <div class="item">
                            <p class="lab">执法人员数</p>
                            <p class="val">110</p>
                        </div>
                        <div class="item">
                            <p class="lab">检查项目数</p>
                            <p class="val">278</p>
                        </div> -->
                        <div class="item">
                            <p class="lab">下发通知数</p>
                            <p class="val">246</p>
                        </div>
                        <div class="item">
                            <p class="lab">回复通知数</p>
                            <p class="val">196</p>
                        </div>
                        <div class="item">
                            <p class="lab">通知回复率</p>
                            <p class="val">79.67%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="folder">回复率趋势</div>
                <div class="sub-folder">
                    <div id="chart1" style="margin: 0 auto; width:90%; height:280px"></div>
                </div>
            </div>

            <div class="section">
                <div class="folder">街道办回复率分布</div>
                <div class="sub-folder">
                    <div id="chart2" style="margin: 0 auto; width:90%; height:280px"></div>
                </div>
            </div>

            <div class="section">
                <div class="folder">单位回复率排名</div>
                <div class="sub-folder">
                    <table width="95%">
                        <thead>
                        <tr>
                            <th width="10%">排名</th>
                            <th width="70%">安全员</th>
                            <th width="20%">完成率</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>无锡瑞年实业有限公司</td>
                            <td>90.00%</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>江阴金润化工制品有限公司</td>
                            <td>90.00%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>无锡刘潭服装有限公司</td>
                            <td>88.89%</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>无锡光生科技有限公司</td>
                            <td>88.89%</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>江苏雅克科技股份有限公司</td>
                            <td>88.89%</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>八乐梦床业（中国）有限公司</td>
                            <td>88.89%</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>无锡市三凤桥肉庄有限责任公司</td>
                            <td>87.50%</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>江阴市协丰棉麻有限公司</td>
                            <td>87.50%</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>江苏省电力公司无锡供电公司</td>
                            <td>87.50%</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>中国贝卡尔特钢帘线有限公司</td>
                            <td>85.71%</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    .count-tasks-page {
        background: #fff;
        .section {
            border-bottom: #ccc 1px solid;
        }

        .folder {
            display: block;
            width: 100%;
            height: 48px;

            text-align: center;
            line-height: 48px;
        }

        .folder p {
            line-height: 48px;
            padding: 0;
            display: block;

        }

        .item {
            padding: 20px 0;
        }

        .item .lab {
            text-align: left;
            float: left;
            width: 60%;
            margin-left: 12px;
        }
        .item .val {
            text-align: right;
            float: right;
            width: 20%;
            margin-right: 12px;
        }

        .sub-folder {
            position: relative;

            margin-top: 30px;
            /*display: none;*/
        }
        .sub-folder table {
            padding-bottom: 50px;
            margin: 0 auto;
        }
        .sub-folder table tr, .sub-folder table td {
            text-align: center;
            line-height: 38px;
        }
    }
</style>

<script>
    import echarts from 'echarts';
    let theme = 'macarons';
    export default{
        mounted() {
            this.$nextTick(() => {
                this.DrawChart1(echarts);
                this.DrawChart2(echarts);
            });
        },
        methods: {
            DrawChart1(ec){
                var chart = ec.init(document.getElementById('chart1'), theme);
                chart.setOption(
                    {

                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['最高分']
                        },

                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ['2016年8月', '2016年9月', '2016年10月', '2016年11月', '2016年12月', '2017年1月', '2017年2月']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            }
                        ],
                        series: [
                            {
                                name: '当月分数',
                                type: 'line',
                                data: [62.61, 66.77, 74, 77.41, 70.76, 83.16, 84.99],
                                markPoint: {
                                    data: [
                                        {name: '2016年8月', value: 59.39, xAxis: 0, yAxis: 59.39},
                                        {name: '2016年9月', value: 71.26, xAxis: 1, yAxis: 71.26},
                                        {name: '2016年10月', value: 55.39, xAxis: 2, yAxis: 55.39},
                                        {name: '2016年11月', value: 72.06, xAxis: 3, yAxis: 72.06},
                                        {name: '2016年12月', value: 71.30, xAxis: 4, yAxis: 71.30},
                                        {name: '2017年1月', value: 70.59, xAxis: 5, yAxis: 70.59},
                                        {name: '2017年2月', value: 79.67, xAxis: 6, yAxis: 79.67},
                                    ]
                                },

                            },
                        ]
                    });
            },

            DrawChart2(ec){
                var chart = ec.init(document.getElementById('chart2'), theme);
                chart.setOption({

                    tooltip: {
                        trigger: 'axis'
                    },
                    calculable: true,
                    legend: {
                        data: ['下发通知数', '回复率']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['澄江街道', '璜土镇', '临港街道', '南闸街道', '青阳镇', '徐霞客镇', '月城镇', '云亭街道']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '下发通知数',
                            axisLabel: {
                                formatter: '{value} 条'
                            }
                        },
                        {
                            type: 'value',
                            name: '回复率',
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [

                        {
                            name: '下发通知数',
                            type: 'bar',
                            data: [52, 48, 40, 39, 22, 6, 11, 28]
                        },
                        {
                            name: '回复率',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [76.92, 81.25, 80, 82.05, 77.27, 66.66, 81.81, 82.14]
                        }
                    ]


                });
            }
        },
        components: {}
    }
</script>


