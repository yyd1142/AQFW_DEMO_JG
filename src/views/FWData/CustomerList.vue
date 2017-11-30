<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="签约客户" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap customer-list-wrap" v-show="!resError">
            <search-bar v-model="searchValue" hint-text="搜索公司名称" ref="search-bar"></search-bar>
            <mko-cell :title="item.name" main="left" @click="goInfo(item)"
                      v-for="item in (searchValue ? searchDatas : customerDatas)" is-link></mko-cell>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .customer-list-wrap {
        .mko-basic-cell {
            .cell {
                .title {
                    flex: 0 0 260px;
                    -webkit-flex: 0 0 260px;
                    width: 260px;
                }
            }
        }
    }
</style>

<script>
    import api from 'api'
    import {NoData, ResError, SearchBar} from 'components'
    import {Indicator} from 'mint-ui';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                searchValue: '',
                searchDatas: [],
                //数据
                customerDatas: [{
                    id: 1,
                    name: '无锡市第四人民医院',
                    legalPerson: '罗庆丰',
                    phone: '13000339821',
                    contractSignTime: '2010-10-11',
                    contractStartTime: '2010-10-11',
                    contractEndTime: '2020-10-11',
                    attachment: [{
                        fileName: '建筑工程设计合同',
                        url: 'http://resources.aqfwy.com/e21db97b2ab44f608505d96a3c47f27e02000000'
                    }, {
                        fileName: '设备维保服务合同',
                        url: 'http://resources.aqfwy.com/44f8ab192e7349e68bd5c1180cc7632b05000000'
                    }],
                    devices: [{
                        id: 1,
                        name: '灭火器',
                        type: [1, 2]
                    }, {
                        id: 1,
                        name: '消防栓（消防炮）灭火系统',
                        type: [1, 2]
                    }]

                }, {
                    id: 2,
                    name: '无锡百丽宫影院有限公司',
                    legalPerson: '张庆帅',
                    phone: '051088150621',
                    contractSignTime: '2004-11-30',
                    contractStartTime: '2004-11-30',
                    contractEndTime: '2040-11-30',
                    attachment: [{
                        fileName: '设备维保服务合同',
                        url: 'http://resources.aqfwy.com/cafdbd3419c24ed5820d2a3b054b94e000000000'
                    }],
                    devices: [{
                        id: 1,
                        name: '灭火器',
                        type: [1, 2]
                    }, {
                        id: 1,
                        name: '消防栓（消防炮）灭火系统',
                        type: [1, 2]
                    }]

                }, {
                    id: 3,
                    name: '无锡三阳百盛广场有限公司',
                    legalPerson: '张斯敏',
                    phone: '13101996322',
                    contractSignTime: '2009-09-11',
                    contractStartTime: '2009-09-11',
                    contractEndTime: '2021-09-12',
                    attachment: [{
                        fileName: '技术处服务器及储存设备维保服务合同',
                        url: 'http://resources.aqfwy.com/addca85c6f8d446ea0dab1f7b823d10c01000000'
                    }, {
                        fileName: '设备维保服务合同',
                        url: 'http://resources.aqfwy.com/378336c34aab476296999dfb0e9e2e0f02000000'
                    }],
                    devices: [{
                        id: 1,
                        name: '灭火器',
                        type: [1, 2]
                    }, {
                        id: 1,
                        name: '消防栓（消防炮）灭火系统',
                        type: [1, 2]
                    }]

                },
                    {
                        id: 4,
                        name: '海澜集团有限公司',
                        legalPerson: '王建平',
                        phone: '13601510709',
                        contractSignTime: '2009-09-11',
                        contractStartTime: '2009-09-11',
                        contractEndTime: '2021-09-12',
                        attachment: [{
                            fileName: '技术处服务器及储存设备维保服务合同',
                            url: 'http://resources.aqfwy.com/addca85c6f8d446ea0dab1f7b823d10c01000000'
                        }, {
                            fileName: '设备维保服务合同',
                            url: 'http://resources.aqfwy.com/378336c34aab476296999dfb0e9e2e0f02000000'
                        }],
                        devices: [{
                            id: 1,
                            name: '灭火器',
                            type: [1, 2]
                        }, {
                            id: 1,
                            name: '消防栓（消防炮）灭火系统',
                            type: [1, 2]
                        }]

                    }]
            }
        },
        watch: {
            searchValue: function () {
                this.searchData();
            }
        },
        methods: {
            goInfo(item){
                this.$MKOPush({
                    name: 'CustomerInfo',
                    params: {
                        id: item.id
                    },
                    query: {
                        name: item.name,
                        customerDetail: item
                    }
                });
            },
            back(){
                this.$MKOPop();
                Indicator.close();
            },
            searchData() {
                let search = this.searchValue;
                if (search) {
                    this.searchDatas = this.customerDatas.filter(item => {
                        return item.name.indexOf(search) > -1;
                    })
                }
            }
        },
        components: {
            NoData,
            ResError,
            SearchBar
        }
    }
</script>


