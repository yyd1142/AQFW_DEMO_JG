<template>
    <div class="main address-jg-person-detail-wrap">
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

            <div>
                <mko-cell :title="person.dwName||'暂无单位信息'" main="left">
                    <span slot="icon" class="cell-icon dw-icon"></span>
                </mko-cell>
                <mko-cell :title="person.role | JgRoleType" main="left">
                    <span slot="icon" class="cell-icon position-icon"></span>
                </mko-cell>
            </div>

            <div>
                <task-build-title title="管辖社会单位" value="安全评分"></task-build-title>
                <mko-cell :title="item.dwName" main="left" v-for="item in units">
                    {{item.dwSafeScore || '暂无'}}<span v-if="item.dwSafeScore">分</span>
                </mko-cell>
                <mko-cell title="暂无" val="暂无" v-if="units.length <= 0"></mko-cell>
            </div>

        </div>
        <res-error v-if="resError"></res-error>
    </div>
</template>
<script>
import api from 'api'
import { ResError,TaskBuildTitle } from 'components'
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
        ResError,TaskBuildTitle
    }
}
</script>
<style lang="less">
@import "../../../config.less";

.main {

    .address-detail-wrap {

        min-height: 400px;

        .cell-icon {
            position: relative;
            top: 18px;
            padding: 22px 22px 0 0;
            &.dw-icon {
                background: url(/static/icons/resource.png) -568px -126px no-repeat;
                background-size: @bg-size;
            }
            &.position-icon {
                background: url(/static/icons/resource.png) -590px -126px no-repeat;
                background-size: @bg-size;
            }
        }

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
                    &:active{
                        opacity: 0.5;
                    }
                }
                .text {
                    margin-top: 2px;
                    line-height: 17px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>


