<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="教育培训" left-icon="icon-back" @handleLeftClick="back" right-icon-text="往期成绩" @handleRightClick="historyRecord"></mko-header>
        <div class="page-wrap train-wrap">
            <ul class="notice-table-view">
                <mko-double-cell :title="item.examTitle" :label="`来源：${item.from}`" is-link
                                 v-for="item in trains" @click="goExamRuleView(item)">
                    <div style="color: #666666">{{item.createdDate | formatDate('YYYY-MM-DD')}}</div>
                </mko-double-cell>
            </ul>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script>
    import api from 'api'
    import { Indicator } from 'mint-ui'
    import { formatDate } from 'filters'
    import { NoData } from 'components'

    export default {
        data() {
            return {
                notData: false,
                examPageItem: {
                    title: '教育培训'
                },
                trains: []
            }
        },
        activated() {
            this.$nextTick(() => {
                this.getTrainList();
            })
        },
        methods: {
            getTrainList() {
                let params = {
                    m: 'examList'
                }
                api.getExamsList(params).then(result => {
                    if (result.code == 0) {
                        if (result.response.length == 0) {
                            this.notData = true;
                        } else {
                            this.trains = result.response;
                        }
                        Indicator.close()
                    }
                })
            },
            goExamRuleView(item) {
                this.examPageItem = item;
                this.examPageItem.title = item.examTitle;
                this.$MKOPush({
                    path: '/exam_rule',
                    query: {
                        examPageItem: this.examPageItem
                    }
                })
            },
            back() {
                this.$MKOPop()
            },
            historyRecord(examId){
                this.$MKOPush('/past_score');
            }
        },
        components: {
            NoData
        }
    }
</script>

<style lang="less" scoped>
    @import "../../config.less";

    .notice-table-view {
        width: 100%;
        margin: 10px auto 0;
        box-sizing: border-box;
        background-color: #fff;
    }

    .train-wrap {
        padding: 0 !important;
    }

    .page-wrap {
        box-sizing: border-box;
        padding: 0 10px;
    }

    .exam-wrap {
        background-color: #ffffff;
        height: 100vh;
        margin: 0;
        padding-top: 40px + @headerTop;
    }

    .exam-title {
        width: 100%;
        text-align: CENTER;
        font-size: 16px;
        color: @blueColor;
        margin-top: 14px;
    }

    .exam-main {
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        background-color: #ffffff;
        margin-bottom: 55px;
        .exam-rule {
            text-align: center;
            font-size: 12px;
            padding: 5px 0;
            line-height: 20px;
            color: #9D9D9D;
        }
        .rule-content {
            line-height: 20px;
            font-size: 14px;
            color: #333333;
            span {
                width: 100%;
                display: block;
                margin-top: 8px;
            }
        }
    }

    .footer-bar {
        width: 100%;
        height: 40px;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        z-index: 10;
        left: 0;
        right: 0;
        margin: auto;
        .test-btn {
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: CENTER;
            color: #ffffff;
            font-size: 18px;
        }
        .left {
            float: left;
            background-color: #5B5E60;
        }
        .right {
            float: right;
            background-color: @blueColor;
            a {
                color: #fff;
            }
        }
        .start-left {
            float: left;
            background-color: #2094E1;
            width: 60%;
            font-size: 12px;
        }
        .start-right {
            float: right;
            background-color: @blueColor;
            width: 40%;
        }
    }
</style>
