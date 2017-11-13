<template>
    <div class="fire-record-list-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="火灾记录" left-icon="icon-back" @handleLeftClick="back" ></mko-header>
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
    import api from 'api'
    import { NoData, ResError } from 'components';
    import { Indicator } from 'mint-ui';

    export default {
        data() {
            return {
                resError: false,
                noData: false,
                list: []
            }
        },
        activated(){
            this.getData();

        },
        methods: {
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let params = {
                    type: 1,
                    subType: 0
                };
                api.getQyRecord(params).then(res => {
                    Indicator.close();
                    if (res && res.code == 0) {
                        this.list = res.response;
                    }
                })
            },
            goDetail(id, data){
                let json = '';
                try {
                    json = JSON.stringify(data);
                } catch (err) {
                    this.$MKODialog({
                        msg: '数据出错！'
                    });
                    return;
                }
                sessionStorage(`FireRecordData_${id}`, json);
                this.$MKOpush('/fire_record_detail/' + id);
            },
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
    .fire-record-list-wrap {

    }
</style>
