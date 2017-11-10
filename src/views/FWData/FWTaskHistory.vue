<template>
    <div class="fw-task-history">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="任务执行记录" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
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
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                taskHistoryDatas: [{
                    id: 1,
                    qy_name: '深圳大观信息',
                    time: '2017-10-19 16:33',
                    type: '维修',
                    zr_name: '德德',
                    zx_name: '周大宝,黄罗洞,朱德德'
                },{
                    id: 2,
                    qy_name: '猫空大厦B座',
                    time: '2017-11-22 13:30',
                    type: '维修',
                    zr_name: '托尼',
                    zx_name: '周大宝,黄罗洞,朱德德'
                },{
                    id: 3,
                    qy_name: '猫空大厦B座',
                    time: '2017-09-04 16:50',
                    type: '维修',
                    zr_name: '徐志摩',
                    zx_name: '黄罗洞,朱德德'
                },{
                    id: 4,
                    qy_name: '猫空大厦B座',
                    time: '2017-08-19 12:48',
                    type: '保养',
                    zr_name: '曾维勇',
                    zx_name: '周大宝,朱德德'
                },{
                    id: 5,
                    qy_name: '深圳大观信息',
                    time: '2017-07-19 17:29',
                    type: '保养',
                    zr_name: '周庆桑',
                    zx_name: '周大宝,黄罗洞'

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


