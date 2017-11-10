<template>
    <div class="fw-task-history-detail">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" title="执行记录详情" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <div class="data-wrap">
                <div class="qy-name">
                    <span class="name" v-text="$route.query.details.qy_name"></span>
                    <span class="type" v-text="$route.query.details.type"></span>
                </div>
                <div class="zr-name" v-text="$route.query.details.zr_name"></div>
                <div class="zx-name" v-text="$route.query.details.zx_name"></div>
                <div class="time" v-text="$route.query.details.time"></div>
            </div>
            <div class="xuncha-type">
                <div class="left">
                    <div class="title">巡查设备列表</div>
                </div>
                <div class="end-time">结果</div>
            </div>
            <ul class="device-table-view">
                <li class="device-table-cell" :class="!item.value ? 'device-table-border' : null" v-for="(item, index) in deviceDatas">
                    <div class="padding">
                        <div class="device-item" :class="item.value ? 'border-bottom' : null">
                            <div class="dingding-icon" :class="!item.value ? 'yellow-icon' : 'green-icon'">
                                <span></span>
                            </div>
                            <span class="title" v-text="item.name"></span>
                            <span class="value" :class="!item.value ? 'red-font' : null">{{item.value ? '正常' : '故障'}}</span>
                        </div>
                    </div>
                    <div class="desc-wrap jiantou" v-if="!item.value">
                        <div class="text">
                            <div class="desc">{{item.description || '暂无描述'}}</div>
                        </div>
                        <photo-box max="8" :read-only="true" :photo-list="item.images && item.images.length > 0 ? item.images : []" @onPopup="setBackButton()" v-if="item.images && item.images.length > 0"></photo-box>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-task-history-detail {
        .data-wrap {
            width: 100%;
            background-color: #ffffff;
            padding: 14px;
            .qy-name {
                width: 100%;
                height: 14px;
                line-height: 14px;
                .name {
                    font-size: 14px;
                }
                .type {
                    font-size: 12px;
                    float: right;
                }
            }
            .zr-name {
                font-size: 14px;
            }
            .zx-name {
                font-size: 14px;
            }
            .time {
                width: 100%;
                font-size: 14px;
            }
        }
        .xuncha-type {
            width: 100%;
            height: 44px;
            padding: 0 14px;
            .left {
                width: 200px;
                float: left;
                .title,
                .all-checked {
                    display: inline;
                    font-size: 12px;
                    letter-spacing: 0px;
                    line-height: 44px;
                    height: 44px;
                }
                .title {
                    margin-right: 14px;
                    color: #999999;
                }
                .all-checked {
                    color: #3399FF;
                }
            }
            .end-time {
                float: right;
                font-size: 12px;
                color: #999999;
                letter-spacing: 0px;
                line-height: 44px;
                height: 44px;
                &.red {
                    color: #FF6666;
                }
            }
        }
        .device-table-view {
            width: 100%;
            .device-table-cell {
                width: 100%;
                background-color: #f8f8f8;
                .padding {
                    width: 100%;
                    padding: 0 0 0 50px;
                    background-color: #fff;
                    .device-item {
                        width: 100%;
                        height: 44px;
                        line-height: 44px;
                        position: relative;
                        .dingding-icon {
                            width: 22px;
                            height: 22px;
                            border-radius: 50%;
                            position: absolute;
                            left: -36px;
                            top: 0;
                            bottom: 0;
                            margin: AUTO;
                            span {
                                width: 14px;
                                height: 14px;
                                border-radius: 50%;
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                margin: auto;
                                left: 0;
                                right: 0;
                            }
                        }
                        .yellow-icon {
                            background: rgba(255, 170, 68, 0.2);
                            span {
                                background: #FFAA44;
                            }
                        }
                        .green-icon {
                            background: rgba(85, 204, 51, 0.2);
                            span {
                                background: #55CC33;
                            }
                        }
                        .red-icon {
                            background: rgba(255, 102, 102, 0.2);
                            span {
                                background: #FF6666;
                            }
                        }
                        .title {
                            font-size: 16px;
                            color: #333333;
                            letter-spacing: 0px;
                            width: 100%;
                            padding-right: 60px;
                            box-sizing: border-box;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            float: left;
                            height: 44px;
                            line-height: 44px;
                        }
                        .value {
                            font-size: 14px;
                            color: #666666;
                            letter-spacing: 0px;
                            position: absolute;
                            padding-right: 14px;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            &.yellow-font {
                                color: #FFAA44;
                            }
                        }
                        .icon {
                            position: absolute;
                            right: 14px;
                            bottom: 16px;
                            z-index: 20;
                        }
                        .cancel-btn {
                            font-size: 14px;
                            color: #3399FF;
                            letter-spacing: 0px;
                            position: absolute;
                            z-index: 22;
                            right: 14px;
                            width: 40px;
                            text-align: right;
                        }
                        .device-status {
                            font-size: 14px;
                            color: #666666;
                            letter-spacing: 0px;
                            position: ABSOLUTE;
                            right: 14px;
                            &.red-font {
                                color: #FF6666;
                            }
                        }
                    }
                }
                .desc-wrap {
                    width: 100%;
                    &.jiantou {
                        position: relative;
                        &::before {
                            content: "";
                            width: 14px;
                            height: 14px;
                            background-color: #f8f8f8;
                            position: absolute;
                            right: 22px;
                            top: -7px;
                            transform: rotate(45deg);
                            -ms-transform: rotate(45deg);
                            /* IE 9 */
                            -moz-transform: rotate(45deg);
                            /* Firefox */
                            -webkit-transform: rotate(45deg);
                            /* Safari 和 Chrome */
                            -o-transform: rotate(45deg);
                        }
                    }
                    .text {
                        width: 100%;
                        padding: 14px 14px 0 14px;
                        position: relative;
                        height: 94px;
                        margin-bottom: 14px;
                        textarea {
                            width: 100%;
                            height: 80px;
                            background: #F2F2F2;
                            border: 1px solid #EEEEEE;
                            border-radius: 4px;
                            padding: 8px;
                            box-sizing: border-box;
                        }
                        .word-number {
                            font-size: 12px;
                            color: #999999;
                            letter-spacing: 0px;
                            position: absolute;
                            bottom: 6px;
                            right: 24px;
                            .red-font {
                                color: #ff4949;
                            }
                        }
                        .desc {
                            opacity: 0.72;
                            background: #f2f2f2;
                            border: 1px solid #CCCCCC;
                            border-radius: 4px;
                            height: 80px;
                            font-size: 14px;
                            color: #666666;
                            letter-spacing: 0px;
                            line-height: 18px;
                            padding: 8px
                        }
                    }
                    .photo-wrap {
                        background: none;
                        .border-btm(@borderGray);
                    }
                }
            }
        }
    }
</style>

<script>
    import {NoData, ResError, PhotoBox} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                deviceDatas: [{
                    name: '灭火器', status: 1, id: 1, value: true, description: '', images: []
                },{
                    name: '灭火器', status: 1, id: 2, value: true, description: '', images: []
                },{
                    name: '灭火器', status: 1, id: 3, value: true, description: '灭火器已损坏', images: ['http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000', 'http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000']
                },{
                    name: '消防电梯', status: 1, id: 4, value: true, description: '', images: []
                },{
                    name: '消防电梯', status: 0, id: 5, value: false, description: '消防电梯故障', images: ['http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000', 'http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000']
                },{
                    name: '消防电梯', status: 0, id: 6, value: false, description: '消防电梯故障', images: ['http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000', 'http://61.177.139.223:20680/fbb30c1015af46238809c6932e7bc6c008000000']
                }]
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            },
            setBackButton() {
                let self = this
                window.mkoBackButton = {}
                window.mkoBackButton.bInputData = true
                window.mkoBackButton.callback = function() {
                    window.mkoBackButton.bInputData = false;
                    self.$MKOPop();
                }
            }
        },
        components: {
            NoData,
            ResError,
            PhotoBox
        }
    }
</script>


