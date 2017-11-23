<template>
    <div class="fw-task-history">
        <div class="placeholder-item"></div>
        <mko-header title="任务执行记录" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <mko-double-cell :title="item.time" :val="item.type" :label="item.qy_name" is-link v-for="item in taskHistoryDatas" @click="goInfo(item)"></mko-double-cell>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-task-history {

    }
</style>

<script>
    import { NoData, ResError } from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                taskHistoryDatas: [{
                    id: 1,
                    qy_name: '无锡市第四人民医院',
                    time: '2017-11-22 16:33',
                    type: '维修',
                    zr_name: '罗庆丰',
                    zx_name: '罗庆丰,张斯敏'
                },{
                    id: 2,
                    qy_name: '无锡三阳百盛广场有限公司',
                    time: '2017-11-03 13:30',
                    type: '维修',
                    zr_name: '刘江',
                    zx_name: '刘江'
                },{
                    id: 3,
                    qy_name: '无锡三阳百盛广场有限公司',
                    time: '2017-10-23 16:50',
                    type: '保养',
                    zr_name: '罗庆丰',
                    zx_name: '罗庆丰,张斯敏'
                },{
                    id: 4,
                    qy_name: '海澜集团有限公司',
                    time: '2017-09-19 12:48',
                    type: '维修',
                    zr_name: '王建平',
                    zx_name: '王建平'
                },{
                    id: 5,
                    qy_name: '海澜集团有限公司',
                    time: '2017-08-25 17:29',
                    type: '保养',
                    zr_name: '王建平',
                    zx_name: '王建平,刘江'

                }]
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            },
            goInfo(item) {
                this.$MKOPush({
                    name: 'FWTaskHistoryDetail',
                    params: {
                        id: item.id
                    },
                    query: {
                        groupId: this.$route.params.id,
                        details: item
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


