<template>
    <div class="fw-score-detail">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="fwInfo.dwName" fixed
                   :style="{backgroundColor: scoreHeadColor(fwInfo.score)}">
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <div class="score-wrap">
                <div class="total-score-wrap">
                    <div class="total-score">
                        <span>{{(fwInfo.score / 2).toFixed(1)}}</span>
                        <span>满星5星</span>
                    </div>
                    <div class="star-total-count">3个评星</div>
                </div>
                <div class="score-cell first">
                    <i class="icon-star icon-star-10"></i>
                    <div class="score-progress"><span class="percent value-1"></span></div>
                </div>
                <div class="score-cell">
                    <i class="icon-star icon-star-7"></i>
                    <div class="score-progress"><span class="percent value-2"></span></div>
                </div>
                <div class="score-cell">
                    <i class="icon-star icon-star-6"></i>
                    <div class="score-progress"><span class="percent value-4"></span></div>
                </div>
                <div class="score-cell">
                    <i class="icon-star icon-star-3"></i>
                    <div class="score-progress"><span class="percent value-2"></span></div>
                </div>
                <div class="score-cell last">
                    <i class="icon-star icon-star-1"></i>
                    <div class="score-progress"><span class="percent value-0"></span></div>
                </div>
            </div>
            <div class="score-wrap" v-for="item in comments">
                <div class="header">
                    <div class="comment-title">
                        <div class="title">{{item.title}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div class="comment-star">
                        <div class="star"><i class="icon" :class="'icon-star-' + item.score"></i></div>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="desc">{{item.desc}}</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-score-detail {
        .score-wrap {
            width: 100%;
            background-color: #ffffff;
            padding: 14px;
            margin-bottom: 10px;
            .total-score-wrap {
                width: 100%;
                height: 40px;
                .total-score {
                    width: 50%;
                    float: left;
                    height: 40px;
                    span:first-child {
                        font-size: 40px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 40px;
                        float: left;
                    }
                    span:last-child {
                        font-size: 14px;
                        color: #666666;
                        letter-spacing: 0;
                        float: left;
                        margin-left: 4px;
                        padding-top: 17px;
                    }
                }
                .star-total-count {
                    width: 50%;
                    font-size: 14px;
                    color: #999999;
                    letter-spacing: 0;
                    float: right;
                    text-align: right;
                    height: 40px;
                    padding-top: 17px;
                }
            }

            .score-cell {
                width: 100%;
                position: relative;
                height: 14px;
                margin-bottom: 4px;
                padding: 6px 0 0 96px;
                &.first {
                    margin-top: 14px;
                }
                &.last {
                    margin-bottom: 0;
                }
                .icon-star {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
                .score-progress {
                    width: 100%;
                    height: 4px;
                    background-color: #f2f2f2;
                    position: relative;
                    border-radius: 4px;
                    .percent {
                        position: absolute;
                        &.value-4 {
                            width: 25%;
                            height: 4px;
                            background-color: #dddddd;
                            left: 0;
                            border-radius: 4px 0 0 4px;
                        }
                        &.value-2 {
                            width: 50%;
                            height: 4px;
                            background-color: #dddddd;
                            left: 0;
                            border-radius: 4px 0 0 4px;
                        }
                        &.value-1 {
                            width: 100%;
                            height: 4px;
                            background-color: #dddddd;
                            left: 0;
                            border-radius: 4px 0 0 4px;
                        }
                    }
                }
            }
            .header {
                width: 100%;
                .border-btm(@baseBorder);
                padding-bottom: 14px;
                .comment-title {
                    width: 100%;
                    height: 14px;
                    .title {
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 14px;
                        float: left;
                    }
                    .time {
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0;
                        line-height: 14px;
                        float: right;
                    }
                }
                .comment-star {
                    width: 100%;
                    position: relative;
                    height: 14px;
                    margin-top: 6px;
                    .star {
                        position: relative;
                        .icon {
                            position: absolute;
                            left: 0;
                        }
                    }
                    .name {
                        font-size: 12px;
                        color: #999999;
                        letter-spacing: 0;
                        line-height: 14px;
                        float: right;
                    }
                }
            }
            .desc {
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                line-height: 18px;
                background: #F8F8F8;
                border: 1px solid #EEEEEE;
                border-radius: 4px;
                padding: 12px;
                margin-top: 14px;
            }
        }
    }
</style>

<script>
    import api from 'api'
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                comments: [{
                    title: '服务很周到',
                    name: '周海燕',
                    time: '2017-10-19',
                    score: 8,
                    desc: '真的是专业的一家维保公司，公司购买了一些新的消防设备，维护和维修很费人力，于是就决定找到这家维保公司，只要设备出现短路、损坏都可以免费修复。并且还有后期的一些系统检测以及维修。24小时在线客服，他们公司还承诺24小时内来到现场解决。这个值得推荐。'
                },{
                    title: '有时候不能当天到现场解决',
                    name: '方舟',
                    time: '2017-11-08',
                    score: 5,
                    desc: '有时候不能当天到现场解决，只能等到第二天，但是后来客服很有耐心的给我们讲明了原因。所以还是会选择这家维保公司'
                },{
                    title: '还行吧',
                    name: '田震',
                    time: '2017-11-19',
                    score: 5,
                    desc: '真的是专业的一家维保公司，公司购买了一些新的消防设备，维护和维修很费人力，于是就决定找到这家维保公司，只要设备出现短路、损坏都可以免费修复。并且还有后期的一些系统检测以及维修。24小时在线客服，他们公司还承诺24小时内来到现场解决。这个值得推荐。'
                }]
            }
        },
        computed: {
            fwInfo() {
                let item = {
                    groupId: '',
                    dwName: '',
                    dwCode: '',
                    dwAddress: '',
                    dwXZArea: '',
                    business: '',
                    zzInfo: '',
                    zzProve: [],
                    issuedDepartment: '',
                    zsStartTime: '',
                    zsEndTime: '',
                    dwManager: '',
                    dwManagerPhone: '',
                    dwPhone: '',
                    dwFax: '',
                    postalcode: '',
                    dwEmail: '',
                    score: ''
                }
                item = this.$route.query.fwDetail ? this.$route.query.fwDetail : item;
                return item;
            }
        },
        methods: {
            back(){
                this.$MKOPop();
            },
            scoreHeadColor(val) {
                val = parseInt(val);
                let colors = ['', '#FF8383', '#FF8383', '#FF9744', '#FF9744', '#34D986', '#34D986', '#52B0FE', '#52B0FE', '#8988FF', '#8988FF']
                return colors[val];
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


