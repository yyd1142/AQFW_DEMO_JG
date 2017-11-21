<template>
    <div class="fw-score-detail">
        <div class="placeholder-item"></div>
        <mko-header :title="$route.query.time + '评分记录'" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <ul class="table-view">
                <li class="table-cell" v-for="item in scoreValue">
                    <div class="title">
                        <span class="number">任务编号：{{item.taskId}}</span>
                        <span class="score">客户评分：{{item.score}}分</span>
                    </div>
                    <div class="qy-name">{{item.dwName}}</div>
                    <div class="zr-name">{{fzNameFilter(item.fzName)}}</div>
                    <div class="zx-name">{{fzNameFilter(item.zxName)}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-score-detail {
        .table-view {
            width: 100%;
            .table-cell {
                width: 100%;
                background-color: #ffffff;
                height: 88px;
                .border-btm(@borderColor);
                .title {
                    width: 100%;
                    .number {
                        font-size: 14px;
                    }
                    .score {
                        font-size: 14px;
                    }
                }
                .qy-name {
                    width: 100%;
                }
                .zr-name {
                    font-size: 14px;
                }
                .zx-name {
                    font-size: 14px;
                }
            }
        }
    }
</style>

<script>
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            },
            fzNameFilter(name) {
                return name.join(',');
            }
        },
        computed: {
            scoreValue() {
                let item = [];
                item = this.$route.query.scoreValue ? this.$route.query.scoreValue : item;
                return item;
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


