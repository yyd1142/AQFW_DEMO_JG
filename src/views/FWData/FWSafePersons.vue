<template>
    <div class="FWSafePersons">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="消防安全人员" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <ul class="table-view">
                <li class="table-cell" v-for="item in personDatas" @click="goInfo(item)">
                    <div class="title">
                        <span class="number">{{item.type}}</span>
                        <span class="score">编号：{{item.number}}</span>
                    </div>
                    <div class="name">
                        <span class="item">{{item.name}}</span>
                        <span class="item right">{{item.phone}}</span>
                    </div>
                    <div class="zz">资质：{{item.zz}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .FWSafePersons {
        .table-view {
            width: 100%;
            .table-cell {
                width: 100%;
                background-color: #ffffff;
                height: 88px;
                .border-btm(@borderColor);
                .title {
                    width: 100%;
                    .number {
                        font-size: 14px;
                    }
                    .score {
                        font-size: 14px;
                    }
                }
                .name {
                    width: 100%;
                    .item {
                        font-size: 14px;
                        &.right {
                            text-align: right;
                        }
                    }
                }
                .zz {
                    width: 100%;
                }
            }
        }
    }
</style>

<script>
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                personDatas: [{
                    id: 1,
                    type: '消防监测人员',
                    name: '方文山',
                    phone: '13566785393',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '13324',
                    office: '消防安全管理人',
                    role: '巡查/检查/维修',
                    credentialType: '身份证',
                    credentialsNumber: '4442224324234334435353',
                    bornDate: '1992-10-10',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 2,
                    type: '消防监测人员',
                    name: '徐志摩',
                    phone: '13566785393',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '3452',
                    office: '消防安全管理人',
                    role: '巡查/检查/维修',
                    credentialType: '身份证',
                    credentialsNumber: '4442224324234334435353',
                    bornDate: '1992-10-10',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 3,
                    type: '消防监测人员',
                    name: '猪刚鬣',
                    phone: '13566785393',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '35344',
                    office: '消防安全管理人',
                    role: '巡查/检查/维修',
                    credentialType: '身份证',
                    credentialsNumber: '4442224324234334435353',
                    bornDate: '1992-10-10',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 4,
                    type: '消防监测人员',
                    name: '王德福',
                    phone: '13566785393',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '90909',
                    office: '消防安全管理人',
                    role: '巡查/检查/维修',
                    credentialType: '身份证',
                    credentialsNumber: '4442224324234334435353',
                    bornDate: '1992-10-10',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                }]
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            },
            goInfo(item) {
                this.$MKOPush({
                    name: 'FWSafePersonDetail',
                    params: {
                        id: item.id
                    },
                    query: {
                        personDetail: item
                    }
                })
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


