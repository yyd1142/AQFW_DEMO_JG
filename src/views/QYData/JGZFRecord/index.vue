<template>
    <div class="jgzf-record-list-wrap">
        <mko-header title="监督执法记录" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t.text" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>

            <mko-double-cell :title="item.details['文号']"
                             :label="item.details['消防管辖单位']"
                             :val="item.desc" is-link
                             @click="goDetail(item.id,item.details)"
                             v-for="item in list"></mko-double-cell>
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
                tabI: 0,
                tabItems: [
                    {text: '监督检查', value: 1},
                    {text: '责令改正', value: 2},
                    {text: '重大隐患', value: 3},
                    {text: '行政处罚', value: 4}
                ],
                list: []
            }
        },
        watch: {
            tabI(){
                this.getData();
            }
        },
        activated(){
            this.getData();
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let sub = this.tabItems[this.tabI] ? this.tabItems[this.tabI].value : 1;
                let params = {
                    type: 2,
                    subType: sub,
                };
                api.getQyRecord(params).then(res => {
                    Indicator.close();
                    if (res && res.code == 0) {
                        this.list = res.response;
                        let key = {
                            1: '检查形式',
                            2: '类别',
                            3: '检查日期',
                            4: '填发日期'
                        };
                        this.list.forEach(item => {

                            item.desc = item.details[key[sub]];

                        })
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
                sessionStorage.setItem(`JgzfRecordData_${id}`, json);
                this.$MKOPush('/jgzf_record_detail/' + id);
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
    .jgzf-record-list-wrap {
        .mkotabs {
            margin-bottom: 8px;
        }
    }
</style>
