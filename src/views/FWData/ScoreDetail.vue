<template>
    <div class="fw-score-detail">
        <div class="placeholder-item"></div>
        <mko-header :title="fwInfo.dwName" :background-color="scoreHeadColor(fwInfo.score)" left-icon="icon-back"
                    @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <div class="score-wrap">
                <div class="total-score-wrap">
                    <div class="total-score">
                        <span>{{(fwInfo.score / 2).toFixed(1)}}</span>
                        <span>满星5星</span>
                    </div>
                    <div class="star-total-count">{{fwInfo.starCount}}次评星</div>
                </div>
                <div class="score-cell" :class="index == 0 ? 'first' : null" v-for="item, index in totalStarInfo.totalStars">
                    <i class="icon-star" :class="`icon-star-${item.star}`"></i>
                    <div class="score-progress"><span class="percent" :style="{ width: `${item.totalCount != 0 ? ((item.totalCount / fwInfo.starCount) * 100) : 0}%` }"></span></div>
                    <div class="comment-count">{{item.totalCount}}次</div>
                </div>
            </div>
            <div class="score-wrap comment-wrap" v-for="item in totalStarInfo.comments">
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
                <div class="padding">
                    <div class="desc">{{item.desc}}</div>
                </div>
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
            &.comment-wrap {
                padding: 14px 0 14px 14px;
                .header {
                    padding-right: 14px;
                }
            }
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
                padding: 6px 30px 0 96px;
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
                        height: 4px;
                        background-color: #dddddd;
                        left: 0;
                        border-radius: 4px 0 0 4px;
                        &.value-4 {
                            width: 25%;
                        }
                        &.value-2 {
                            width: 50%;
                        }
                        &.value-1 {
                            width: 100%;
                        }
                    }
                }
                .comment-count {
                    color: #dddddd;
                    position: absolute;
                    right: 0;
                    font-size: 12px;
                    height: 14px;
                    line-height: 14px;
                    top: 0;
                    margin: auto;
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
            .padding {
                width: 100%;
                padding-right: 14px;
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
                noData: false
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
                    score: '',
                    starCount: ''
                }
                item = this.$route.query.fwDetail ? this.$route.query.fwDetail : item;
                return item;
            },
            totalStarInfo() {
                let totalStarInfo = {}
                if (this.$route.params.id === 'QYWX050040') {
                    totalStarInfo = {
                        totalStars: [{
                            star: 10, totalCount: 1
                        }, {
                            star: 8, totalCount: 0
                        }, {
                            star: 6, totalCount: 2
                        }, {
                            star: 4, totalCount: 2
                        }, {
                            star: 2, totalCount: 0
                        }],
                        comments: [{
                            title: '服务很周到',
                            name: '孙立',
                            time: '2017-10-19',
                            score: 10,
                            desc: '真的是专业的一家维保公司，公司购买了一些新的消防设备，维护和维修很费人力，于是就决定找到这家维保公司，只要设备出现短路、损坏都可以免费修复。并且还有后期的一些系统检测以及维修。24小时在线客服，他们公司还承诺24小时内来到现场解决。这个值得推荐。'
                        }, {
                            title: '有时候不能当天到现场解决',
                            name: '包芳芳',
                            time: '2017-11-08',
                            score: 6,
                            desc: '有时候不能当天到现场解决，只能等到第二天，但是后来客服很有耐心的给我们讲明了原因。所以还是会选择这家维保公司'
                        }, {
                            title: '很好',
                            name: '林曼娜',
                            time: '2017-11-19',
                            score: 4,
                            desc: '灭火器有的已经超过使用年限了，多亏工作人员帮我们找出来，不然消防检查可能就没法通过了。'
                        },{
                            title: '服务很周到',
                            name: '余颖德',
                            time: '2017-10-19',
                            score: 6,
                            desc: '这一次的维保大叔人很好，跟我们耐心的解释了很多消防方面的问题，这次消火栓箱水压不足的问题我们之前都不知道，还好发现了。'
                        }, {
                            title: '不错',
                            name: '周庆赏',
                            time: '2017-11-08',
                            score: 4,
                            desc: '上门维修的的工作人员很负责，全面检查了公司的消防设备，工作很有效率。'
                        }]
                    }
                } else if (this.$route.params.id === 'QYWX053218') {
                    totalStarInfo = {
                        totalStars: [{
                            star: 10, totalCount: 2
                        }, {
                            star: 8, totalCount: 2
                        }, {
                            star: 6, totalCount: 1
                        }, {
                            star: 4, totalCount: 1
                        }, {
                            star: 2, totalCount: 0
                        }],
                        comments: [{
                            title: '服务很周到',
                            name: '刘天建',
                            time: '2017-10-19',
                            score: 10,
                            desc: '真的是专业的一家维保公司，公司购买了一些新的消防设备，维护和维修很费人力，于是就决定找到这家维保公司，只要设备出现短路、损坏都可以免费修复。并且还有后期的一些系统检测以及维修。24小时在线客服，他们公司还承诺24小时内来到现场解决。这个值得推荐。'
                        }, {
                            title: '有时候不能当天到现场解决',
                            name: '叶腾飞',
                            time: '2017-11-08',
                            score: 10,
                            desc: '反应及时！上门很快！态度很好！全五星~'
                        }, {
                            title: '还行吧',
                            name: '杨志巧',
                            time: '2017-11-19',
                            score: 8,
                            desc: '这一次的维保大叔人很好，跟我们耐心的解释了很多消防方面的问题，这次消火栓箱水压不足的问题我们之前都不知道，还好发现了。'
                        },{
                            title: '服务很周到',
                            name: '刘宇星',
                            time: '2017-10-19',
                            score: 8,
                            desc: '有时候不能当天到现场解决，只能等到第二天，但是后来客服很有耐心的给我们讲明了原因。所以还是会选择这家维保公司'
                        }, {
                            title: '有时候不能当天到现场解决',
                            name: '宋居田',
                            time: '2017-11-08',
                            score: 6,
                            desc: '这一次的维保大叔人很好，跟我们耐心的解释了很多消防方面的问题，这次消火栓箱水压不足的问题我们之前都不知道，还好发现了。'
                        },{
                            title: '服务很周到',
                            name: '曲丽娟',
                            time: '2017-10-19',
                            score: 4,
                            desc: '灭火器有的已经超过使用年限了，多亏工作人员帮我们找出来，不然消防检查可能就没法通过了。'
                        }]
                    }
                } else if (this.$route.params.id === 'QYWX051220') {
                    totalStarInfo = {
                        totalStars: [{
                            star: 10, totalCount: 4
                        }, {
                            star: 8, totalCount: 0
                        }, {
                            star: 6, totalCount: 0
                        }, {
                            star: 4, totalCount: 0
                        }, {
                            star: 2, totalCount: 0
                        }],
                        comments: [{
                            title: '服务很周到',
                            name: '陈伟权',
                            time: '2017-10-19',
                            score: 10,
                            desc: '反应及时！上门很快！态度很好！全五星~'
                        }, {
                            title: '有时候不能当天到现场解决',
                            name: '张伟',
                            time: '2017-11-08',
                            score: 10,
                            desc: '态度很好！五星~'
                        }, {
                            title: '还行吧',
                            name: '王欣',
                            time: '2017-11-19',
                            score: 10,
                            desc: '真的是专业的一家维保公司，公司购买了一些新的消防设备，维护和维修很费人力，于是就决定找到这家维保公司，只要设备出现短路、损坏都可以免费修复。并且还有后期的一些系统检测以及维修。24小时在线客服，他们公司还承诺24小时内来到现场解决。这个值得推荐。'
                        }, {
                            title: '还行吧',
                            name: '吴佳怡',
                            time: '2017-11-19',
                            score: 10,
                            desc: '这一次的维保大叔人很好，跟我们耐心的解释了很多消防方面的问题，这次消火栓箱水压不足的问题我们之前都不知道，还好发现了。'
                        }]
                    }
                }
                return totalStarInfo;
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


