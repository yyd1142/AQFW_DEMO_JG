<template>
    <div class="qy-history-notice">
        <div class="placeholder-item"></div>
        <mko-header title="通知记录" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="item.title" :label="item.label" :val="item.val" main="left" @click="linkPath(item)" v-for="item in datas" is-link></mko-cell>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            datas: [{
                title: '电气设备配置提醒', label: '2018-01-01', val: '发送成功'
            },{
                title: '电气设备配置提醒', label: '2018-01-01', val: '发送成功'
            },{
                title: '电气设备配置提醒', label: '2018-01-01', val: '发送成功'
            },{
                title: '电气设备配置提醒', label: '2018-01-01', val: '发送成功'
            }]
        }
    },
    methods: {
        linkPath(item) {

        },
        back() {
            this.$MKOPop();
        }
    }
}
</script>

<style lang="less">
.qy-history-notice {
    padding-top: 10px;
}
</style>
