<template>
    <div class="fire-record-detail-wrap">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="火灾记录">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap">
            <mko-double-cell :title="item.details['起火场所']"
                             :label="item.details['起火时间']"
                             :val="item.details['火灾等级']" is-link
                             @click="goDetail(item.id,item.details)"
                             v-for="(item,i) in list"></mko-double-cell>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
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
        methods: {},
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../config.less";

    .fire-record-detail-wrap {

    }
</style>
