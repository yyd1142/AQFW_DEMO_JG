<template>
    <div class="qy-attributes">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="单位属性">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap">
            <div class="data-wrap">
                <mko-cell title="行业" val="国家机关"></mko-cell>
                <mko-cell title="已连接设备" val="电气监测"></mko-cell>
            </div>
        </div>
    </div>
</template>
<script>
    import {NoData, ResError} from 'components'
    export default {
        data() {
            return {
                resError: false,
                noData: false
            }
        },
        methods: {
            back(){
                if (this.isEdit) {
                    this.isEdit = false;
                    this.text = '编辑';
                    this.labelsDatas = JSON.parse(sessionStorage.getItem('labelsDatas'));
                } else {
                    this.$MKOPop();
                }
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>
<style lang="less">
    .qy-attributes {
        .data-wrap {
            margin-top: 10px;
        }
    }
</style>
