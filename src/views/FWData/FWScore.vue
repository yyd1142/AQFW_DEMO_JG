<template>
    <div class="fw-score">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="服务评分" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <div class="score-wrap">
                <div class="score-item">
                    <span class="title">评分总次数</span>
                    <span class="value">125</span>
                </div>
                <div class="score-item">
                    <span class="title">平均服务得分</span>
                    <span class="value">83</span>
                </div>
            </div>
            <div class="score-title">
                <div class="item">时间</div>
                <div class="item">评分次数</div>
                <div class="item">平均得分</div>
            </div>
            <ul class="table-view">
                <li class="table-cell" v-for="item in scoreDatas" @click="goInfo(item)">
                    <div class="item">{{item.time}}</div>
                    <div class="item">{{item.count}}</div>
                    <div class="item last">{{item.score}}</div>
                    <i class="icon icon-link-arrow"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-score {
        .score-wrap {
            width: 100%;
            height: 88px;
            background-color: #ffffff;
            .score-item {
                width: 50%;
                height: 88px;
                float: left;
                text-align: center;
                line-height: 88px;
                .title {
                    font-size: 14px;
                }
                .value {
                    font-size: 12px;
                }
            }
        }
        .score-title {
            width: 100%;
            display: flex;
            background-color: #d9d9d9;
            margin-top: 14px;
            .item {
                font-size: 14px;
                flex: 1;
                text-align: center;
            }
        }
        .table-view {
            width: 100%;
            .table-cell {
                width: 100%;
                display: flex;
                position: relative;
                background-color: #ffffff;
                height: 44px;
                line-height: 44px;
                box-sizing: border-box;
                .border-btm(@borderColor);
                .item {
                    flex: 1;
                    text-align: center;
                    &.last {

                    }
                }
                .icon {
                    position: absolute;
                    margin: auto;
                    top: 0;
                    bottom: 0;
                    right: 14px;
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
                noData: false,
                scoreDatas: [{
                    id: 1,
                    time: '2017年11月',
                    count: 13,
                    score: 90
                },{
                    id: 2,
                    time: '2017年10月',
                    count: 9,
                    score: 84
                },{
                    id: 3,
                    time: '2017年09月',
                    count: 10,
                    score: 74
                },{
                    id: 4,
                    time: '2017年08月',
                    count: 12,
                    score: 65
                }]
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            },
            goInfo(item) {
                this.$MKOPush({
                    name: 'FWScoreDetail',
                    params: {
                        id: item.id
                    },
                    query: {
                        time: item.time
                    }
                })
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


