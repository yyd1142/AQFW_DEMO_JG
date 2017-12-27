<template>
    <div class="score-banner-jg-wrap">
        <div class="score-banner-wrap mof-clear">
            <div class="score-main-wrap" @click.self="switchHandle" v-show="type==1">
                <div class="score abs-middle">{{score}}</div>
                <div class="score-text abs-middle">{{calcScoreText(score)}}</div>
                <div class="title abs-middle">{{title}}</div>
                <div class="refresh-wrap abs-middle">
                    <div class="btn icon-refresh" :class="isRefresh?'rotate':null">

                    </div>
                </div>
            </div>
            <div class="score-detail-wrap" @click="switchHandle" v-show="type==2">
                <div class="chart-wrap" ref="chart"></div>
                <div class="desc">
                    管辖单位平均安全得分 共{{datas.count || 0}}家
                </div>
            </div>
            <div class="switch-wrap" @click="go('/score_list')">
                <div class="btn icon-arrow-right-white">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import { calcScoreText } from 'filters'
    let theme = 'macarons';
    let _refreshTime = 100;
    let _timer = null;
    export default {
        props: ['score', 'title', 'datas'],
        data () {
            return {
                type: 1,
                isRefresh: false,
            }
        },
        watch: {
            type(val){
                if (val == 2)
                    this.$nextTick(() => {
                        this.DrawChart(echarts);
                    })
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
            if (this.type == 2)
                this.$nextTick(() => {
                    this.DrawChart(echarts);
                })
        },
        deactivated() {
            this.isRefresh = false;
            clearTimeout(_timer);
        },
        destroyed(){
        },
        methods: {
            calcScoreText,
            switchHandle(){
                let that = this;
                if (this.type == 1) {
                    this.isRefresh = true;
                    _timer = setTimeout(function () {
                        that.type = 2;
                        that.isRefresh = false;
                        clearTimeout(_timer);
                    }, _refreshTime);
                } else {
                    this.type = 1;
                }
            },
            DrawChart(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                let total = this.datas.count;
                let data = this.datas;
                for (let key in data) {
                    if (!data[key] && key != 'count') data[key] = 1;
                }
                myChart.setOption({
                    title: {},
                    tooltip: {
                        trigger: 'axis'
                    },
                    calculable: true,
                    polar: [
                        {
                            indicator: [
                                {text: '优秀', max: total},
                                {text: '中等', max: total},
                                {text: '极低', max: total},
                                {text: '较低', max: total},
                                {text: '良好', max: total},
                            ],
                            radius: 90,
                            name: {
                                textStyle: {color: '#fff'}
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['transparent']
                                }
                            },
                        }
                    ],
                    series: [
                        {

                            name: '',
                            type: 'radar',
//                            center:['30%','50%'],
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    },
                                }
                            },
                            data: [
                                {
                                    value: [data.excellent, data.good, data.special, data.low, data.veryLow],
//                                    value: [0, 0, 1, 6, 1],
                                    name: '',
                                    itemStyle: {
                                        normal: {
                                            color: '#fff',
                                        },
                                        emphasis: {}
                                    }
                                }
                            ]
                        }
                    ]
                });
            },
            go(url) {
                if (!this.score) {
                    Toast({
                        message: '暂无分数信息',
                        duration: 1500
                    });
                    return false;
                }
                if (!this.onlyRead)
                    this.$MKOPush(url);
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    @refreshTime: 1s;
    .score-banner-jg-wrap {
        .score-banner-wrap {
            position: relative;
            height: 300px;
            background: url('/static/index/index_bg.png') center;
            background-size: cover;
            .switch-wrap {
                height: 200px;
                width: 30px;
                position: absolute;
                right: 14px;
                top: 28px;
                .btn {
                    position: absolute;
                    top: 86px;
                    right: 0;
                }
            }
            .score-main-wrap {
                position: relative;
                margin-top: 28px;
                height: 200px;
                background: url('/static/index/index_score_jg.png') center no-repeat;
                background-size: contain;
                color: #fff;
                .score {
                    top: 40px;
                    line-height: 50px;
                    font-size: 50px;
                    font-weight: bold;
                }
                .score-text {
                    top: 90px;
                    line-height: 14px;
                    font-size: 14px;
                }
                .title {
                    top: 108px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .refresh-wrap {
                    top: 140px;
                    width: 80px;
                    height: 30px;
                    text-align: center;
                    .btn.rotate {
                        animation: rotate @refreshTime linear infinite;
                        -moz-animation: rotate @refreshTime linear infinite;
                        -webkit-animation: rotate @refreshTime linear infinite;
                        -o-animation: rotate @refreshTime linear infinite;
                        @keyframes rotate {
                            from {
                                transform: rotate(0deg);
                                -ms-transform: rotate(0deg); /* IE 9 */
                                -moz-transform: rotate(0deg); /* Firefox */
                                -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
                                -o-transform: rotate(0deg); /* Opera */
                            }
                            to {
                                transform: rotate(360deg);
                                -ms-transform: rotate(360deg); /* IE 9 */
                                -moz-transform: rotate(360deg); /* Firefox */
                                -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
                                -o-transform: rotate(360deg); /* Opera */
                            }
                        }
                    }

                }
            }
            .score-detail-wrap {
                position: relative;
                /*margin-top: 28px;*/
                .chart-wrap {
                    height: 270px;
                }
                .desc {
                    position: relative;
                    bottom: 30px;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                }
            }
        }
    }
</style>
