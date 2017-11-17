<template>
    <div class="score-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="评分明细"
                    right-icon-text="单位排名" @handleRightClick="goRank"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <div class="list-wrap">
                <mko-cell class="title-cell" title="子项信息" val="得分率"></mko-cell>
                <mko-double-cell :title="item.title"
                                 :label="`得分${item.score} , 满分${item.total}`"
                                 :val="item.rate"
                                 v-for="item in list[tabI]"></mko-double-cell>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['消防安全管理', '消防设备管理', '建筑火灾风险'],
                list: [
                    [
                        {title: '学习培训覆盖率', score: 8, total: 8, rate: '100%'},
                        {title: '基本信息完善率', score: 20, total: 20, rate: '100%'},
                        {title: '第三方服务签约率', score: 3, total: 3, rate: '100%'},
                        {title: '人员履职率', score: 8.6, total: 10, rate: '86%'},
                        {title: '安全管理执行率', score: 8.2, total: 10, rate: '82%'},
                        {title: '消控中心在岗率', score: 1.5, total: 2, rate: '75%'},
                        {title: '检查项目达标率', score: 3.6, total: 5, rate: '72%'},
                        {title: '物联网设备接入率', score: 0.8, total: 2, rate: '40%'},
                    ],
                    [
                        {title: '消防设施完好率', score: 13.6, total: 20, rate: '68%'},
                    ],
                    [
                        {title: '建筑属性', score: 20, total: 20, rate: '100%'},
                    ]
                ]
            }
        },
        watch: {},
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
            tabFn(i){
                this.tabI = i;
            },
            goRank(){
                this.$MKOPush('/score_count_rank');
            },
            back(){
                this.$MKOPop();
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../config.less";

    .score-count-detail-wrap {
        .mkotabs {
            height: 58px;
            padding: 14px 14px;
        }
        .list-wrap {
            margin-top: 10px;
            .title-cell {
                height: 50px;
                .cell {
                    height: 50px;
                }
            }
        }
    }
</style>
