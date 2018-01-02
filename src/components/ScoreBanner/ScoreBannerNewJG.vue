<template>
    <div class="score-banner-jg-wrap">
        <div class="score-banner-wrap mof-clear">
            <div class="loading-wrap" v-if="isLoading">
                <div class="circle-1"></div>
                <div class="circle-2"></div>
                <div class="circle-3"></div>
                <div class="circle-4"></div>
                <div class="circle-5"></div>
                <div class="text">正在统计</div>
            </div>
            <transition :name="first?'fade':null">
                <div class="score-main-wrap" @click="switchHandle" v-show="!isLoading&&type==1">
                    <div class="breath abs-all-middle"></div>
                    <div class="score abs-middle">{{score}}</div>
                    <div class="score-text abs-middle">{{calcScoreText(score)}}级</div>
                    <div class="title no-overflow abs-middle">{{title}}</div>
                    <div class="refresh-wrap abs-middle">
                        <div class="btn icon-refresh" :class="isRefresh?'rotate':null"></div>
                    </div>
                </div>
            </transition>
            <div class="score-detail-wrap" @click="switchHandle" v-show="!isLoading&&type==2">
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
    let _loadingTime = 3000;
    let _timer1 = null;
    let _timer2 = null;
    export default {
        props: ['score', 'title', 'datas'],
        data () {
            return {
                type: 1,
                isRefresh: false,
                isLoading: false,
                first: false,
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
            let that = this;
            this.isLoading = true;
            this.first = true;
            _timer2 = setTimeout(function () {
                that.isLoading = false;
                clearTimeout(_timer2);
            }, _loadingTime);
        },
        activated(){
            if (this.type == 2)
                this.$nextTick(() => {
                    this.DrawChart(echarts);
                })
        },
        deactivated() {
            this.isRefresh = false;
            clearTimeout(_timer1);
            clearTimeout(_timer2);
        },
        destroyed(){
        },
        methods: {
            calcScoreText,
            switchHandle(){
                let that = this;
                this.first = false;
                if (this.type == 1) {
                    this.isRefresh = true;
                    _timer1 = setTimeout(function () {
                        that.type = 2;
                        that.isRefresh = false;
                        clearTimeout(_timer1);
                    }, _refreshTime);
                } else {
                    this.type = 1;
                }
            },
            DrawChart(ec){
                let total = this.datas.count;
                let data = this.datas;
                for (let key in data) {
                    if (key == 'count') break;
                    if (!data[key]) {
                        data[key] = 1;
                    } else if (data[key] > total) {
                        data[key] = total;
                    }
                }

                let myChart = ec.init(this.$refs['chart'], theme);
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
    @circleTime: 2s;
    @circleTime-fast: 1s;
    @breathTime: 2s;
    .score-banner-jg-wrap {
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
        @keyframes rotate-anti {
            from {
                transform: rotate(360deg);
                -ms-transform: rotate(360deg); /* IE 9 */
                -moz-transform: rotate(360deg); /* Firefox */
                -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
                -o-transform: rotate(360deg); /* Opera */
            }
            to {
                transform: rotate(0deg);
                -ms-transform: rotate(0deg); /* IE 9 */
                -moz-transform: rotate(0deg); /* Firefox */
                -webkit-transform: rotate(0deg); /* Safari 和 Chrome */
                -o-transform: rotate(0deg); /* Opera */
            }
        }
        @keyframes scale {
            from {
                transform: scale(1, 1);
                -ms-transform: scale(1, 1); /* IE 9 */
                -moz-transform: scale(1, 1); /* Firefox */
                -webkit-transform: scale(1, 1); /* Safari 和 Chrome */
                -o-transform: scale(1, 1); /* Opera */
            }
            to {
                transform: scale(0.94, 0.94);
                -ms-transform: scale(0.94, 0.94); /* IE 9 */
                -moz-transform: scale(0.94, 0.94); /* Firefox */
                -webkit-transform: scale(0.94, 0.94); /* Safari 和 Chrome */
                -o-transform: scale(0.94, 0.94); /* Opera */
            }
        }
        @keyframes breath {
            from {
                opacity: 1;
            }
            to {
                opacity: 0.1;
            }
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 1s;
        }

        .fade-enter,
        .fade-leave-active {
            opacity: 0;
        }
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
            .loading-wrap {
                position: absolute;
                top: 28px;
                left: 50%;
                transform: translate(-50%, 0);
                -webkit-transform: translate(-50%, 0);
                width: 202px;
                height: 202px;
                text-align: center;
                [class|="circle"] {
                    position: absolute;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    animation: rotate @circleTime linear infinite;
                    -moz-animation: rotate @circleTime linear infinite;
                    -webkit-animation: rotate @circleTime linear infinite;
                    -o-animation: rotate @circleTime linear infinite;
                }
                .text {
                    position: absolute;
                    color: #fff;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    font-size: 14px;
                }
                .circle-1 {
                    top: 0;
                    left: 0;
                    width: 202px;
                    height: 202px;
                    background-image: url('/static/index/banner_circle_01.png');
                    animation: scale @circleTime-fast linear infinite alternate;
                    -moz-animation: scale @circleTime-fast linear infinite alternate;
                    -webkit-animation: scale @circleTime-fast linear infinite alternate;
                    -o-animation: scale @circleTime-fast linear infinite alternate;
                }
                .circle-2 {
                    top: 13px;
                    left: 13px;
                    width: 176px;
                    height: 176px;
                    background-image: url('/static/index/banner_circle_02.png');
                }
                .circle-3 {
                    top: 28px;
                    left: 28px;
                    width: 146px;
                    height: 146px;
                    background-image: url('/static/index/banner_circle_03.png');
                    animation-name: rotate-anti;
                    -moz-animation-name: rotate-anti;
                    -webkit-animation-name: rotate-anti;
                    -o-animation-name: rotate-anti;
                }
                .circle-4 {
                    top: 32px;
                    left: 32px;
                    width: 138px;
                    height: 138px;
                    background-image: url('/static/index/banner_circle_04.png');
                    animation-duration: @circleTime-fast;
                    -moz-animation-duration: @circleTime-fast;
                    -webkit-animation-duration: @circleTime-fast;
                    -o-animation-duration: @circleTime-fast;
                }
                .circle-5 {
                    top: 13px;
                    left: 13px;
                    width: 176px;
                    height: 176px;
                    background-image: url('/static/index/banner_circle_05.png');
                    animation: none;
                    -moz-animation: none;
                    -webkit-animation: none;
                    -o-animation: none;
                }
            }
            .score-main-wrap {
                position: relative;
                margin-top: 28px;
                height: 200px;
                background: url('/static/index/index_score_jg.png') center no-repeat;
                background-size: contain;
                overflow: hidden;
                color: #fff;
                .breath {
                    width: 426px;
                    height: 426px;
                    background: url('/static/index/index_score_breath_jg.png') center no-repeat;
                    background-size: contain;
                    animation: breath @breathTime linear infinite alternate;
                    -moz-animation: breath @breathTime linear infinite alternate;
                    -webkit-animation: breath @breathTime linear infinite alternate;
                    -o-animation: breath @breathTime linear infinite alternate;
                }
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
                    max-width: 130px;
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
