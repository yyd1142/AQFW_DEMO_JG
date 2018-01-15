<template>
    <div class="produce-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="生成数据总量(条)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{total}}
            </div>

            <!--<mko-cell class="title-cell" title="数据分析"></mko-cell>-->
            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value" non-text="0" v-for="item in datas"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api';
    import conf from 'config';
    import { ResError } from 'components'
    import { Indicator } from 'mint-ui';
    import echarts from 'echarts';
    let theme = 'macarons';


    export default {
        data () {
            return {
                month: 0,
                total: 0,
//                datas: [
//                    [
//                        {value: 2766573, name: '任务'},
//                        {value: 1745134, name: '图片'},
//                        {value: 545383, name: '通知公告'},
//                    ],
//                    [
//                        {value: 2766573, name: '任务'},
//                        {value: 1904876, name: '图片'},
//                        {value: 349963, name: '通知公告'},
//                    ],
//
//                ],
                datas: [
                    {value: 0, name: '任务', key: 'qyTaskCountByJg'},
                    {value: 0, name: '图片', key: 'qyResourcesCountByJg'},
                    {value: 0, name: '通知公告', key: 'qyNoticeCountByJg'},
                ]
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.month = this.$route.query.month;
//            this.DrawChart1(echarts);
            this.getData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId,
                    createDate: this.month
                };
                api.getQyDataCount(pas).then(res => {
                    if (res && res.code == 0 && res.response) {
                        this.total = res.response.qyTotalDataByJg;
                        this.datas.forEach(item => {
                            item.value = res.response[item.key] || 0;
                        });
                        this.datas.sort(function (a, b) {
                            return b.value - a.value;
                        });
                        this.DrawChart1(echarts);
                    }
                    Indicator.close();

                })
            },
            DrawChart1(ec){

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
//                        orient: 'vertical',
//                        x: 'left',
//                        data: ['任务', '图片', '通知公告']
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: [conf.mainBlue, '#55DD66', '#F5A623', '#50E3C2 ', '#F8E71C', '#FF336B'],
                    series: [
                        {
                            name: '生成数据总量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: this.datas,
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: "{b}\n({d}%)",
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

    .produce-count-wrap {
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
            height: 300px;
            border-top: 1px solid @baseBorder;
            background-color: #fff !important;
        }
    }
</style>
