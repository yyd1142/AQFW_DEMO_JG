<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="消防责任单位" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap qy-info-wrap" v-if="!notData">
            <mko-cell :title="item.name" :val="item.datas.length" v-if="item.datas.length != 0" v-for="(item, index) in dwList" is-link @click="goDwInfo(index)"></mko-cell>
        </div>
        <no-data text="暂无数据，请去网页端添加" v-if="notData"></no-data>
    </div>
</template>

<script>
    import api from 'api'
    import {NoData} from 'components'
    import {IDType} from 'filters'
    import {Indicator, Toast} from 'mint-ui'
    var _id = '';
    export default {
        data() {
            return {
                notData: false,
                dwList: [],
            }
        },
        activated() {
            if (_id != this.$route.params.id)
                this.getDwList();
        },
        methods: {
            getDwList() {
                Indicator.open({spinnerType: 'fading-circle'});
                this.notData = false;

                let id = this.$route.params.id;
                let dwList = [
                    {name: '', datas: []},
                    {name: '设计单位', datas: []},
                    {name: '施工单位', datas: []},
                    {name: '维保单位', datas: []},
                    {name: '检测单位', datas: []},
                    {name: '运维单位', datas: []}
                ];
                let params = {
                    groupId: id
                };
                api.getZRUnitList(params).then(res => {
                    if (res && res.response) {
                        if (res.response[1].length == 0)
                            this.notData = true;

                        res.response[1].forEach(item => {
                            dwList[item.dwType].datas.push(item);
                        });
                        this.dwList = dwList;

                        let strIfy = '';
                        try {
                            strIfy = JSON.stringify(dwList);
                        } catch (err) {
                        }
                        sessionStorage.setItem('unitDatas' + id, strIfy);

                        _id = id;
                    }
                    Indicator.close();
                });
            },
            goDwInfo(type) {
                this.$MKOPush(`/unit_list/${this.$route.params.id}?dwType=${type}`);
            },
            back() {
                this.$MKOPop();
            }
        },
        components: {
            NoData
        }
    }
</script>
