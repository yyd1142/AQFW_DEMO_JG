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
                    <span class="value">{{totalScoreCount}}</span>
                </div>
                <div class="score-item">
                    <span class="title">平均服务得分</span>
                    <span class="value">{{averageScore}}</span>
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
                    count: 3,
                    score: 87.3,
                    scoreValue: [{
                        id: 1,
                        taskId: '5f224',
                        score: 89,
                        dwName: '华润新鸿基地产（无锡）有限公司',
                        fzName: ['唐勇'],
                        zxName: ['唐勇', '周康', '徐志康', '叶赏']
                    },{
                        id: 2,
                        taskId: 'sf233',
                        score: 82,
                        dwName: '鸿伟达科技有限公司',
                        fzName: ['张庆帅'],
                        zxName: ['周庆桑', '刘天健', '曾维勇']
                    },{
                        id: 3,
                        taskId: 'w2436',
                        score: 91,
                        dwName: '金马房地产（江苏）有限公司',
                        fzName: ['冯地'],
                        zxName: ['刘晓彤', '冯娜娜', '叶腾飞']
                    }]
                },{
                    id: 2,
                    time: '2017年10月',
                    count: 3,
                    score: 81.3,
                    scoreValue: [{
                        id: 1,
                        taskId: '77d22',
                        score: 78,
                        dwName: '华润新鸿基地产（无锡）有限公司',
                        fzName: ['唐勇'],
                        zxName: ['唐勇', '周康', '徐志康', '叶赏']
                    },{
                        id: 2,
                        taskId: 'wx255',
                        score: 79,
                        dwName: '鸿伟达科技有限公司',
                        fzName: ['张庆帅'],
                        zxName: ['周庆桑', '刘天健', '曾维勇']
                    },{
                        id: 3,
                        taskId: 'fu881',
                        score: 87,
                        dwName: '金马房地产（江苏）有限公司',
                        fzName: ['冯地'],
                        zxName: ['刘晓彤', '冯娜娜', '叶腾飞']
                    }]
                },{
                    id: 3,
                    time: '2017年09月',
                    count: 2,
                    score: 78,
                    scoreValue: [{
                        id: 1,
                        taskId: '8s23',
                        score: 75.5,
                        dwName: '华润新鸿基地产（无锡）有限公司',
                        fzName: ['唐勇'],
                        zxName: ['唐勇', '周康', '徐志康', '叶赏']
                    },{
                        id: 3,
                        taskId: 'fd242',
                        score: 80.5,
                        dwName: '金马房地产（江苏）有限公司',
                        fzName: ['冯地'],
                        zxName: ['刘晓彤', '冯娜娜', '叶腾飞']
                    }]
                },{
                    id: 4,
                    time: '2017年08月',
                    count: 2,
                    score: 82,
                    scoreValue: [{
                        id: 1,
                        taskId: '78df',
                        score: 84,
                        dwName: '华润新鸿基地产（无锡）有限公司',
                        fzName: ['唐勇'],
                        zxName: ['唐勇', '周康', '徐志康', '叶赏']
                    },{
                        id: 3,
                        taskId: 'f923',
                        score: 80,
                        dwName: '金马房地产（江苏）有限公司',
                        fzName: ['冯地'],
                        zxName: ['刘晓彤', '冯娜娜', '叶腾飞']
                    }]
                }]
            }
        },
        computed: {
            totalScoreCount() {
                let arr = [];
                let total = 0;
                for(let item of this.scoreDatas) {
                    arr.push(item.scoreValue.length);
                }
                total = eval(arr.join('+'));
                return total;
            },
            averageScore() {
                let arr = [];
                let averageScore = 0;
                for(let item of this.scoreDatas) {
                    arr.push(item.score);
                }
                averageScore = eval(arr.join('+')) / this.scoreDatas.length;
                return averageScore.toFixed(1);
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
                        time: item.time,
                        scoreValue: item.scoreValue
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


