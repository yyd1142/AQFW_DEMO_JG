<template>
    <div class="main">
        <div class="placeholder-item"></div>
        <mko-header :title="person.name || '暂无'" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap address-detail-wrap">
            <div class="card-wrap">
                <div class="avatar-wrap">
                    <div class="default"></div>
                    <!--<img class="avatar" src="./logo.png">-->
                </div>
                <div class="name no-overflow">{{person.name || '暂无'}}</div>
                <div class="phone no-overflow">{{person.phone || '暂无'}}</div>
                <div class="btn-wrap">
                    <a :href="'sms:' + person.phone" class="fl">
                        <div class="btn msg"></div>
                        <span class="text">消息</span>
                    </a>
                    <a :href="'tel:' + person.phone" class="fr">
                        <div class="btn"></div>
                        <span class="text">呼叫</span>
                    </a>
                </div>
            </div>
            <div class="info-wrap">
                <div class="cell">
                    <div class="cell-icon">
                        <i class="dw-icon"></i>
                    </div>
                    <div class="item" v-text="person.dwName || '暂无单位信息'"></div>
                </div>
                <div class="cell">
                    <div class="cell-icon">
                        <i class="position-icon"></i>
                    </div>
                    <div class="item">{{person.role | JgRoleType}}</div>
                </div>
            </div>
            <div class="xiaji-bumen-wrap">
                <div class="title">
                    <span class="xiajijiandu">管辖社会单位</span>
                    <span class="anquanpingfen">安全评分</span>
                </div>
                <ul class="xiaji-table-view">
                    <li class="xiaji-table-cell" v-for="item in units">
                        <span class="key">{{item.dwName}}</span>
                        <span class="value">
                            {{item.dwSafeScore || '暂无'}}<span v-if="item.dwSafeScore">分</span>
                        </span>
                    </li>
                    <li class="xiaji-table-cell" v-if="units.length <= 0">
                        <span class="key">暂无</span>
                        <span class="value">暂无</span>
                    </li>
                </ul>
            </div>
        </div>
        <res-error v-if="resError"></res-error>
    </div>
</template>
<script>
import api from 'api'
import { ResError } from 'components'
import { JgRoleType } from 'filters'

export default {
    data() {
        return {
            units: [],
            personItem: {},
            resError: false,
            noData: false,
            person: {}
        }
    },
    activated() {
        this.getPersonDetail();
        this.getPersonItem();
    },
    methods: {
        back() {
            this.$MKOPop();
        },
        getPersonDetail() {
            api.getPersonInfo({
                userName: this.$route.query.person.userName
            }).then(res => {
                if (res.code === 0) {
                    this.person = res.response;
                }
            });
        },
        getPersonItem() {
            api.getPersonItem({
                page: 1,
                count: 50,
                groupId: this.$route.query.person.groupId,
                type: 1,
                dwSupervisor: this.$route.query.person.userName
            }).then(res => {
                if (!res) {
                    this.resError = true;
                    return false;
                }
                if (res.code == 0) {
                    if (res.response.datas.length <= 0) {
                        this.noData = true;
                        this.units = [];
                    } else {
                        this.noData = false;
                        this.units = res.response.datas;
                    }
                    this.resError = false;
                } else {
                    this.resError = true;
                }
            })
        }
    },
    components: {
        ResError
    }
}
</script>
<style lang="less" scoped>
@import "../../../config.less";

.main {

    .address-detail-wrap {

        min-height: 400px;
        .card-wrap {
            position: relative;
            height: 282px;
            text-align: center;
            background-color: #ffffff;
            >div {
                position: absolute;
                left: 50%;
                transform: translate(-50%, 0);
                -webkit-transform: translate(-50%, 0);
            }
            .avatar-wrap {
                top: 32px;
                width: 86px;
                height: 84px;
                border-radius: 50%;
                .default {
                    height: 100%;
                    background: url('/static/icons/resource.png') -568px 0 no-repeat;
                    background-size: @bg-size;
                }
                .avatar {
                    width: 100%;
                }
            }
            .name {
                top: 124px;
                max-width: 300px;
                font-size: 26px;
                height: 37px;
                line-height: 37px;
            }
            .phone {
                top: 161px;
                max-width: 300px;
                font-size: 16px;
                height: 22px;
                line-height: 22px;
            }
            .btn-wrap {
                top: 201px;
                width: 112px;
                .btn {
                    width: 40px;
                    height: 40px;
                    background: url(/static/icons/resource.png) -608px -86px no-repeat;
                    background-size: @bg-size;
                    &.msg {
                        background: url(/static/icons/resource.png) -568px -86px no-repeat;
                        background-size: @bg-size;
                    }
                }
                .text {
                    margin-top: 2px;
                    line-height: 17px;
                    font-size: 12px;
                }
            }
        }
        .info-wrap {
            .border-top(#E0E0E0);
            .cell {
                width: 100%;
                height: 44px;
                background: #ffffff;
                .border-btm(#E0E0E0);
                display: table;
                .cell-icon {
                    width: 30px;
                    height: 44px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    .dw-icon,
                    .position-icon {
                        width: 22px;
                        display: block;
                        margin: 10px 0 0 14px;
                        height: 22px;
                    }
                    .dw-icon {
                        background: url(/static/icons/resource.png) -568px -126px no-repeat;
                        background-size: @bg-size;
                    }
                    .position-icon {
                        background: url(/static/icons/resource.png) -590px -126px no-repeat;
                        background-size: @bg-size;
                    }
                }
                .item {
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    vertical-align: middle;
                    display: table-cell;
                    font-size: 14px;
                    color: #52627F;
                    letter-spacing: 0px;
                    text-align: right;
                    padding-right: 14px;
                }
            }
            .mint-cell {
                min-height: 45px;
                .mint-cell-wrapper {
                    padding: @cellPadding;
                    .sign {
                        position: relative;
                        top: 22px;
                        padding: 22px 22px 0 0;
                        background: url(/static/icons/resource.png) -568px -126px no-repeat;
                        background-size: @bg-size;
                        margin-right: 30px;
                        &.sign-p {
                            background: url(/static/icons/resource.png) -590px -126px no-repeat;
                            background-size: @bg-size;
                        }
                    }
                    .mint-cell-text {
                        margin-left: 30px;
                        line-height: 24px;
                    }
                }
            }
        }
    }
}

.xiaji-bumen-wrap {
    width: 100%;
    margin: 10px 0;
    &.xiaji-main {
        margin: -1px 0 10px 0;
    }
    .title {
        width: 100%;
        height: 44px;
        display: table;
        background-color: #ffffff;
        .border-btm(#E0E0E0);
        .xiajijiandu {
            width: 50%;
            line-height: 44px;
            vertical-align: middle;
            display: table-cell;
            font-size: 14px;
            color: #232323;
            padding-left: 14px;
        }
        .anquanpingfen {
            width: 50%;
            line-height: 44px;
            vertical-align: middle;
            display: table-cell;
            font-size: 14px;
            color: #72787D;
            text-align: right;
            padding-right: 14px;
        }
    }
    .xiaji-table-view {
        width: 100%;
        background-color: #Ffffff;
        box-sizing: border-box;
        padding-left: 14px;
        .xiaji-table-cell {
            width: 100%;
            height: 44px;
            .border-btm(#E0E0E0);
            display: table;
            .key {
                height: 44px;
                display: table-cell;
                line-height: 44px;
                vertical-align: middle;
                width: 80%;
                font-size: 14px;
                color: #72787D;
                letter-spacing: 0px;
            }
            .value {
                height: 44px;
                display: table-cell;
                line-height: 44px;
                vertical-align: middle;
                width: 20%;
                text-align: right;
                padding-right: 14px;
                font-size: 14px;
                color: #A8AEB2;
                letter-spacing: 0px;
            }
            .person-name,
            .person-phone,
            .person-role {
                display: table-cell;
                vertical-align: middle;
                height: 44px;
                line-height: 44px;
                width: 100% / 3;
            }
            .person-name {
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .person-phone {
                text-align: center;
            }
            .person-role {
                text-align: right;
                padding: 0 10px 0 0;
            }
        }
        .not-data {
            width: 100%;
            text-align: center;
        }
    }
}
</style>


