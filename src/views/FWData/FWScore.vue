<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="服务评分" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">

        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

</style>

<script>
    import api from 'api'
    import NoData from 'components'
    import ResError from 'components'
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
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


