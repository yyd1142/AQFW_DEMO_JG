<template>
    <div class="fw-task-history-detail">
        <div class="placeholder-item"></div>
        <mko-header title="执行记录详情" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <task-summary :task-info="taskInfo"></task-summary>
            <div class="xuncha-type">
                <div class="title">设备列表</div>
            </div>
            <ul class="device-table-view">
                <li class="device-table-cell" v-for="(item, index) in deviceDatas">
                    <div class="padding">
                        <div class="device-item" :style="{ borderBottom: !item.value ? 'none' : null }">
                            <div class="dingding-icon" :class="!item.value ? 'yellow-icon' : 'green-icon'">
                                <span></span>
                            </div>
                            <span class="title" v-text="item.name"></span>
                            <span class="value" :class="!item.value ? 'yellow-font' : null">{{item.value ? '正常' : '故障'}}</span>
                        </div>
                    </div>
                    <div class="desc-wrap jiantou" v-if="!item.value">
                        <div class="text">
                            <div class="desc">{{item.description || '暂无描述'}}</div>
                        </div>
                        <photo-box max="8" :read-only="true" :photo-list="item.images" v-if="item.images && item.images.length > 0"></photo-box>
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
            height: 50px;
            padding: 0 14px;
            display: table;
            background-color: #ffffff;
            .title {
                display: table-cell;
                vertical-align: middle;
                line-height: 50px;
                font-size: 16px;
                color: #333333;
                letter-spacing: 0;
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
                        border-bottom: 1px solid #eeeeee;
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
                                width: 10px;
                                height: 10px;
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
                            border: 1px solid #eee;
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
                    }
                }
            }
        }
    }
</style>

<script>
    import {NoData, ResError, PhotoBox, TaskSummary} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                deviceDatas: [{
                    name: '灭火器', status: 1, id: 1, value: true, description: '', images: []
                },{
                    name: '灭火器', status: 1, id: 3, value: true, description: '灭火器已损坏', images: ['http://resources.aqfwy.com/c8c2e66d29fb4e3eb7172a626b74d12a05000000', 'http://resources.aqfwy.com/b13e14c3ea654a84bfd538abf9442e1908000000']
                },{
                    name: '消防电梯', status: 1, id: 4, value: true, description: '', images: []
                },{
                    name: '消防电梯', status: 0, id: 5, value: false, description: '消防电梯故障', images: ['http://resources.aqfwy.com/a8f1e481805f448abf3e22a6e9533cc604000000', 'http://resources.aqfwy.com/22ec7ceae8af4c17b504c6c9b251f88900000000']
                }]
            }
        },
        computed: {
            details() {
                let item = {
                    id: '',
                    qy_name: '',
                    time: '',
                    type: '',
                    zr_name: '',
                    zx_name: ''
                }
                item = this.$route.query.details ? this.$route.query.details : item;
                return item;
            },
            taskInfo() {
                let taskInfo = [{
                    key: '责任单位', value: this.details.qy_name || '暂无'
                }, {
                    key: '任务类型', value: this.details.type
                }, {
                    key: '负责人员', value: this.details.zr_name || '暂无'
                }, {
                    key: '执行人员', value: this.details.zx_name || '暂无'
                }, {
                    key: '执行日期', value: this.details.time || '暂无'
                }]
                return taskInfo;
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
            PhotoBox,
            TaskSummary
        }
    }
</script>


