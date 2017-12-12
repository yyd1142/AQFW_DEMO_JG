<template>
    <div class="train-list">
        <div class="placeholder-item"></div>
        <mko-header title="教育培训" left-icon="icon-back" @handleLeftClick="back" right-icon-text="往期成绩" @handleRightClick="historyRecord"></mko-header>
        <div class="page-wrap train-wrap">
            <mko-double-cell :title="item.examTitle" :label="`来源：${item.from}`" is-link v-for="item in trains" @click="goExamRuleView(item)">
                <div style="color: #666666">{{item.createdDate | formatDate('YYYY-MM-DD')}}</div>
            </mko-double-cell>
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

<style lang="less">
    @import "../../config.less";
    .train-list {
        .train-wrap {
            padding-top: 10px;
        }
    }
</style>
