<template>
    <div class="jgzf-record-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header :title="title" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="key" :val="item" v-for="(item,key) in data" non-text="无" @click="showAllContent(item, key)"></mko-cell>
        </div>
    </div>
</template>

<script>
    import api from 'api'
    import { NoData, ResError } from 'components';
    import { Indicator } from 'mint-ui';
    export default {
        data () {
            return {
                title: '',
                data: {},
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.getData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getData(){
                let id = this.$route.params.id;
                let data = JSON.parse(sessionStorage.getItem(`JgzfRecordData_${id}`));
                this.title = data.typeName;
                delete data.typeName;
                this.data = data;
            },
            back(){
                this.$MKOPop();
            },
            showAllContent(item, key) {
                if(key === '违法行为' || key === '隐患详情' || key === '违法事实') {
                    this.$MKODialog({ msg: item });
                }
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../config.less";

    .jgzf-record-detail-wrap {
        .mko-basic-cell {
            .title {
                flex: 0 0 120px;
                -webkit-flex: 0 0 120px;
                width: 120px;
            }
            .value {
                flex: auto;
                -webkit-flex: auto;
                width: auto;
            }
        }
    }
</style>
