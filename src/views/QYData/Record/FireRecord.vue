<template>
    <div class="fire-record">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="火灾记录">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap"></div>
    </div>
</template>
<script>
    import {NoData, ResError} from 'components';
    export default {
        data() {
            return {
                resError: false,
                noData: false
            }
        },
        methods: {
            back(){
                this.$MKOPop();
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>
<style lang="less">
    .fire-record {

    }
</style>
