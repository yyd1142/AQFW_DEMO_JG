<template>
  <div class="qy-notice-model">
        <div class="placeholder-item"></div>
        <mko-header title="通知模板" left-icon="icon-back" @handleLeftClick="back" right-icon-text="通知记录" @handleRightClick="history"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="`${item.title}:${item.content}`" main="left" @click="linkPath(item)" v-for="item in datas" is-link></mko-cell>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            datas: [{
                title: '电气设备配置提醒',
                content: '安全评分过低，请尽快完成电气监测配置，谢谢！'
            },{
                title: '电气设备配置提醒',
                content: '安全评分过低，请尽快完成电气监测配置，谢谢！'
            },{
                title: '电气设备配置提醒',
                content: '安全评分过低，请尽快完成电气监测配置，谢谢！'
            }]
        }
    },
    methods: {
        back() {
            this.$MKOPop();
        },
        linkPath(item) {
            this.$MKOPush({
                path: '/add_notice',
                query: {
                    title: item.title,
                    content: item.content
                }
            })
        },
        history() {
            this.$MKOPush({
                path: '/notice',
                query: {
                    isHistory: true
                }
            })
        }
    }
}
</script>

<style lang="less">
.qy-notice-model {
    padding-top: 10px;
}
</style>
