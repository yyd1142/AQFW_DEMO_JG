<template>
    <div class="FWSafePersons">
        <div class="placeholder-item"></div>
        <mko-header title="消防安全人员" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <ul class="table-view">
                <li class="table-cell" v-for="item in personDatas" @click="goInfo(item)">
                    <div class="info person">
                        <i class="header-image icon-header-image"></i>
                        <div class="name">{{item.name}}<i class="icon icon-link-arrow"></i></div>
                        <div class="phone">{{item.phone}}</div>
                    </div>
                    <div class="info type">
                        <div class="info-cell">
                            <span class="gradients">职</span>{{item.type}}
                        </div>
                        <div class="info-cell">
                            <span class="gradients">编</span>{{item.number}}
                        </div>
                        <div class="info-cell">
                            <span class="gradients">资</span>{{item.zz}}
                        </div>
                    </div>
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
            padding: 14px;
            box-sizing: border-box;
            .table-cell {
                background: #FFFFFF;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
                min-height: 132px;
                margin-bottom: 10px;
                .info {
                    width: 100%;
                    position: relative;
                    &.person {
                        padding: 10px 0 0 54px;
                    }
                    &.type {
                        padding: 20px 0 10px 14px;
                    }
                    .header-image{
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        border-radius: 2px;
                    }
                    .name {
                        width: 100%;
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: 0;
                        position: relative;
                        .icon {
                            position: absolute;
                            top:0;
                            bottom: 0;
                            margin: auto;
                            margin-left: 6px;
                        }
                    }
                    .phone {
                        width: 100%;
                        font-size: 14px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 14px;
                        margin-top: 6px;
                    }
                    .info-cell {
                        width: 100%;
                        font-size: 14px;
                        color: #666666;
                        letter-spacing: 0;
                        padding-left: 24px;
                        margin-top: 8px;
                        &:first-child {
                            margin-top: 0;
                        }
                        .gradients {
                            background: -prefix-linear-gradient(left top, #8988FF, #88B1FF);
                            background: linear-gradient(to bottom right, #8988FF, #88B1FF);
                            width: 14px;
                            height: 14px;
                            position: absolute;
                            font-size: 12px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                            left: 14px;
                            text-align: center;
                            line-height: 14px;
                        }
                    }
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
                    type: '消防安全检测人员',
                    name: '罗庆丰',
                    phone: '13000339821',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '0012031',
                    office: '消防安全管理人',
                    role: '维修/保养/检测',
                    credentialType: '身份证',
                    credentialsNumber: '430111198703211532',
                    bornDate: '1987-03-21',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 2,
                    type: '消防安全检测人员',
                    name: '张斯敏',
                    phone: '13101996322',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '0012142',
                    office: '消防安全管理人',
                    role: '维修/保养/检测',
                    credentialType: '身份证',
                    credentialsNumber: '430123199202103212',
                    bornDate: '1992-02-10',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 3,
                    type: '消防安全检测人员',
                    name: '刘江',
                    phone: '13151967544',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '0012121',
                    office: '消防安全管理人',
                    role: '维修/保养/检测',
                    credentialType: '身份证',
                    credentialsNumber: '433432197812130432',
                    bornDate: '1978-12-13',
                    gender: '男',
                    zzBook: '',
                    jobTime: '2015-01-11/至今'
                },{
                    id: 4,
                    type: '消防安全检测人员',
                    name: '王建平',
                    phone: '13601510709',
                    zz: '持有高级技能以上等级职业资格证书',
                    number: '0013243',
                    office: '消防安全管理人',
                    role: '维修/保养/检测',
                    credentialType: '身份证',
                    credentialsNumber: '420112198904254302',
                    bornDate: '1989-04-25',
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


