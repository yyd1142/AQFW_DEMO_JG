<template>
    <div class="jg-banner-wrap">
        <div class="banner-bg" @click="go('/score_list')">
            <img :src="`/static/banner/bg_${calcBannerBg(score)}.png`" />
        </div>
        <div class="banner-title score-circle" :class="`score-${calcBannerCircle(score)}`" @click="go('/score_list')">
            <div class="score-text">{{calcScoreText(score)}}</div>
            <div class="score">{{score || '-'}}</div>
            <div class="name no-overflow">{{title}}</div>
            <div class="info">管辖单位平均安全得分 共{{dwCount || 0}}个</div>
        </div>
        <div class="banner-body">
            <div class="item" @click="go('/score_list?type='+item.type)" v-for="item in scoreLevel">
                <div class="text">{{item.text}}</div>
                <div class="count">{{item.dwCount || 0}}个</div>
                <div class="percent">{{dwCount ? Math.round((item.dwCount / dwCount) * 100) : 0}}</div>
                <div class="sign">%</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { calcScoreText, calcHeadColor, calcBannerCircle, calcBannerBg } from 'filters'
    import { Toast } from 'mint-ui';
    export default {
        props: ['title', 'score', 'datas', 'onlyRead'],
        data() {
            return {
                dwCount: 0,
                scoreLevel: [
                    {text: '优秀', dwCount: 0, type: 1},
                    {text: '良好', dwCount: 0, type: 2},
                    {text: '中等', dwCount: 0, type: 3},
                    {text: '较低', dwCount: 0, type: 4},
                    {text: '极低', dwCount: 0, type: 5}
                ],
            }
        },
        watch: {
            datas: function () {
                this.getScoreVal();
            }
        },
        mounted() {
        },
        activated() {
            this.getScoreVal();
        },
        deactivated() {

        },
        methods: {
            calcScoreText,
            calcHeadColor,
            calcBannerBg,
            calcBannerCircle,
            getScoreVal() {
                let datas = this.datas;
                this.dwCount = datas.count;
                this.scoreLevel = [
                    {text: '优秀', dwCount: datas.excellent, type: 1},
                    {text: '良好', dwCount: datas.good, type: 2},
                    {text: '中等', dwCount: datas.special, type: 3},
                    {text: '较低', dwCount: datas.low, type: 4},
                    {text: '极低', dwCount: datas.veryLow, type: 5}
                ];
            },
            calcScoreLevel(datas) {
                this.score = 0;
                this.dwCount = (datas && datas.length) ? datas.length : 0;
                let list = this.scoreLevel = [
                    {text: '优秀', dwCount: 0, type: 1},
                    {text: '良好', dwCount: 0, type: 2},
                    {text: '中等', dwCount: 0, type: 3},
                    {text: '较低', dwCount: 0, type: 4},
                    {text: '极低', dwCount: 0, type: 5}
                ];

                if (!datas || !datas.length)
                    return false;

                let totalScore = 0;
                datas.forEach(item => {
                    let val = item.dwSafeScore;
                    if (val) {
                        totalScore += val;
                        if (val >= 90) {
                            list[0].dwCount++;
                        } else if (val >= 80) {
                            list[1].dwCount++;
                        } else if (val >= 70) {
                            list[2].dwCount++;
                        } else if (val >= 60) {
                            list[3].dwCount++;
                        } else {
                            list[4].dwCount++;
                        }
                    } else {
                        this.dwCount--;
                    }
                });
                this.score = (totalScore / this.dwCount).toFixed(2);
                this.$emit('calcScore', this.score)
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

    .jg-banner-wrap {
        width: 100%;
        min-height: 460px;
        max-height: 510px;
        margin: -40px auto 0;
        padding: 0;
        position: relative;
        top: -1px;
        .banner-bg {
            //background: no-repeat center;
            //background-size: cover;
            img {
                width: 100%;
                min-height: 460px;
                max-height: 510px;
                display: block;
                margin: 0 auto;
            }
        }
        .banner-title {
            //z-index: 2;
            width: 230px;
            height: 156px;
            position: absolute;
            top: 65px;
            left: 50%;
            transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            color: #fff;
            text-align: center;
            .score-text {
                margin-top: 30px;
                font-size: 24px;
            }
            .score {
                margin: 10px auto;
                font-size: 60px;
            }
            .name {
                width: 184px;
                margin: auto;
                font-size: 16px;
            }
            .info {
                margin-top: 39px;
                font-size: 12px;
            }
        }
        .banner-body {
            position: absolute; //bottom:200px;
            top: 322px;
            left: 50%;
            width: 100%;
            max-width: 376px;
            transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            color: #fff;
            .item {
                float: left;
                width: 20%;
                /* For old syntax, otherwise collapses. */
                min-height: 110px;
                position: relative;
                background: url('/static/banner/square.png') no-repeat 50% 0/contain;
                > div {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 0);
                    -webkit-transform: translate(-50%, 0);
                }
                .text {
                    top: 11px;
                    width: 36px;
                    height: 18px;
                    border-radius: 91px;
                    border: 1px #fff solid;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                }
                .count {
                    top: 33px;
                    line-height: 14px;
                    font-size: 10px;
                }
                .percent {
                    top: 44px;
                    line-height: 48px;
                    font-size: 34px;
                }
                .sign {
                    top: 84px;
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
    }
</style>
