<template>
    <div class="score-banner-jg-wrap">
        <div class="score-banner-wrap mof-clear">
            <div class="score-main-wrap" v-show="type==1">
                <div class="score abs-middle">{{score}}</div>
                <div class="score-text abs-middle">{{calcScoreText(score)}}</div>
                <div class="title abs-middle">{{title}}</div>
                <div class="refresh-wrap abs-middle">
                    <div class="btn icon-refresh">

                    </div>
                </div>
            </div>
            <div class="score-detail-wrap" v-show="type==2">

            </div>
            <div class="switch-wrap" @click="switchHandle">
                <div class="btn icon-link-arrow">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { calcScoreText } from 'filters'

    export default {
        props: ['score', 'title'],
        data () {
            return {
                type: 1,
            }
        },
        watch: {
            score(){
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            calcScoreText,
            switchHandle(){
                this.type = this.type == 1 ? 2 : 1;
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

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
                    text-align: center;
                }
            }
        }
    }
</style>
