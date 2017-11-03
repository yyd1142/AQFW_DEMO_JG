<template>
    <div id="reply">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="回复列表">
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
            <mt-button class="header-item" slot="right" @click="refresh">刷新</mt-button>
        </mt-header>
        <div id="replyPage" class="page-wrap">
            <div class="device-selecetd" @click="popupShow = true">
                <i class="selected-icon"></i>
                <div v-if="!isSelected" class="selected-text">筛选</div>
                <div class="selected-text" v-else>
                    <span class="system-text">{{replyText}}</span>
                </div>
            </div>
            <div ref="wrapper">
                <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                    <ul class="reply-table-view">
                        <li class="reply-table-cell" v-for="item in replyDatas" @click="linkPath(item)">
                            <div class="title">
                                <span class="name">{{item.dwName}}</span>
                                <span class="status">{{replyStatus(item)}}</span>
                            </div>
                            <div class="main">
                                <span class="name">{{item.replyName || '暂无'}}</span>
                                <span class="time">{{item.checkTime || '暂无'}}</span>
                                <span class="fujian">{{item.attachment == null ? '暂无附件' : ''}}</span>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
            <div class="popup-wrap">
                <mt-popup v-model="popupShow" position="right">
                    <div class="body-wrap">
                        <div class="radio-wrap">
                            <p class="title">回复状态</p>
                            <div @click="chooseReplyStatus(item)"  v-for="item in options.isReply" class="button-wrap">
                                <mt-button class="radio jzyh-radio" :class="{'checked' : formData.isReply == item.value}">
                                    <span class="sign"  v-show="formData.isReply == item.value"></span>{{item.label}}
                                </mt-button>
                            </div>
                        </div>
                    </div>
                    <div class="footer-wrap">
                        <mt-button class="reset" @click="resetData"> 重置 </mt-button>
                        <mt-button class="confirm" @click="confirm">确定</mt-button>
                    </div>
                </mt-popup>
            </div>
        </div>
        <no-data class="not-data-wrap"  v-if="notData"></no-data>
    </div>
</template>

<script>
import api from 'api'
import { NoData } from 'components'
import { Toast, Indicator } from 'mint-ui'
var count = 10
var updateDatas = []
export default {
    data() {
        return {
            isSelected: false,
            notData: false,
            popupShow: false,
            replyDatas: [],
            options: {
                isReply: [
                    { label: '已接收', value: 'isRead' },
                    { label: '未处理', value: 0 },
                    { label: '已处理', value: 1 }]
            },
            formData: {
                isReply: 'isRead'
            },
            replyText: '',
            autoFill: false,
            allLoaded: true,
            topStatus: '',
            bottomStatus: '',
            page: 1,
            pageItem: {},
            scrollBottom: 0
        }
    },
    activated() {
        window.addEventListener('scroll', this.handleScroll);
        this.getNoticeReplyList();
    },
    deactivated() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            this.$nextTick(() => {
                let totalHeight = document.getElementById('replyPage').offsetHeight + 40;
                let scrollTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                let clientHeight = 0;
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                } else {
                    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }
                let scrollBottom = totalHeight - scrollTop - clientHeight;
                this.allLoaded = scrollBottom <= 0 ? false : true;
            })
        },
        back() {
            this.$MKOPop()
        },
        resetData() {
            this.isSelected = false;
            this.popupShow = false;
            this.formData.isReply = 'isRead';
        },
        confirm() {
            let text = '未知';
            this.isSelected = true;
            this.popupShow = false;
            if (this.formData.isReply === 'isRead') {
                text = '已接收';
            } else {
                let replyTexts = ['未处理', '已处理'];
                text = replyTexts[this.formData.isReply];
            }
            this.replyText = text;
            this.getNoticeReplyList();
        },
        chooseReplyStatus(item) {
            this.formData.isReply = item.value
        },
        getNoticeReplyList() {
            let params = {
                m: 'replyList',
                noticeId: this.$route.params.pid,
                page: 1,
                count: count
            }
            if (this.formData.isReply != 'isRead') {
                params['isReply'] = this.formData.isReply;
            }
            api.getNoticeReplyList(params).then(result => {
                this.$refs.loadmore.onTopLoaded();
                Indicator.close();
                if (!result) return false;
                if (result.code == 0) {
                    this.$APPUpdateTime('reply')
                    if (result.response.datas.length < 0) {
                        this.notData = true;
                    } else {
                        this.notData = false;
                    }
                    this.pageItem = {
                        page: result.response.page,
                        pageCount: result.response.pageCount,
                        count: result.response.count,
                        countNumber: result.response.countNumber
                    }
                    this.replyDatas = result.response.datas;
                    updateDatas = this.replyDatas;
                }
            })
        },
        replyStatus(item) {
            if (item.isReply == 1) {
                return '已处理'
            } else {
                return '未处理'
            }
        },
        linkPath(item) {
            if (this.bottomStatus == 'drop' || this.bottomStatus == 'loading' || this.topStatus == 'drop' || this.topStatus == 'loading') {
                return false;
            }
            this.$MKOPush({
                path: '/noticeReplyDetail',
                query: {
                    replyItem: item
                }
            })
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        // 分页
        loadBottom() {
            setTimeout(() => {
                if (this.pageItem.pageCount == this.pageItem.page) {   //总页数少于1页，不支持分页功能
                    Toast({
                        message: '暂无更多数据',
                        position: 'middle',
                        duration: 1500
                    });
                    this.allLoaded = true;
                    this.$refs.loadmore.onBottomLoaded();
                    return;
                }
                this.pageItem.page = this.pageItem.page + 1
                let params = {
                    m: 'replyList',
                    noticeId: this.$route.params.pid,
                    page: this.pageItem.page,
                    count: count
                }
                if (this.formData.isReply != 'isRead') {
                    params['isReply'] = this.formData.isReply;
                }
                api.getNoticeReplyList(params).then(result => {
                    this.$refs.loadmore.onBottomLoaded();
                    this.allLoaded = true;
                    if (result.code == 0) {
                        if (result.response.datas.length <= 0) {
                            Toast({
                                message: '暂无更多数据',
                                position: 'middle',
                                duration: 1500
                            });
                        } else {
                            Toast({
                                message: '加载完成',
                                position: 'middle',
                                duration: 1500
                            });
                            this.replyDatas = this.replyDatas.concat(result.response.datas);
                            updateDatas = this.replyDatas;
                        }
                    }
                })
            }, 1500);
        },
        handleTopChange(status) {
            this.topStatus = status;
        },
        refresh() {
            Indicator.open({ spinnerType: 'fading-circle' });
            setTimeout(() => {
                this.allLoaded = true;
                this.replyDatas = [];
                this.isSelected = false;
                this.formData.isReply = 'isRead'
                this.getNoticeReplyList()
                Toast({
                    message: '刷新完成',
                    position: 'middle',
                    duration: 1500
                });
            }, 1500)
        }
    },
    components: {
        NoData
    }
}
</script>

<style lang="less" scoped>
@import "../../config.less";

#reply {
    .button-wrap {
        width: 100%;
        display: inline-block;
    }
    .device-selecetd {
        width: 100%;
        color: @blueColor;
        background-color: #fff;
        margin-bottom: 14px;
        display: table;
        position: fixed;
        top: 40px + @headerTop;
        z-index: 20;
        .selected-icon {
            background: url('/static/icons/resource.png') 0 0 no-repeat;
            background-size: 892px auto;
        }
        .selected-text {
            font-size: 14px;
            line-height: 40px;
            height: 40px;
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }
    }
    .reply-table-view {
        width: 100%;
        background-color: #ffffff;
        margin-top: 54px + @headerTop;
        box-shadow: 0 0 0 0.5px @borderColor;
        .reply-table-cell {
            width: 100%;
            padding: 0 14px;
            box-sizing: border-box;
            .border-btm(#E0E0E0);
            .title {
                width: 100%;
                height: 40px;
                display: table;
                padding: 0;
                position: relative;
                span {
                    display: table-cell;
                    line-height: 40px;
                    vertical-align: middle;
                }
                .name {
                    width: 80%;
                    height: 40px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    position: absolute;
                }
                .status {
                    width: 20%;
                    height: 40px;
                    text-align: right;
                    font-size: 14px;
                }
            }
            .main {
                width: 100%;
                height: 30px;
                display: table;
                font-size: 12px;
                position: relative;
                span {
                    display: table-cell;
                    line-height: 30px;
                    vertical-align: middle;
                }
                .name {
                    width: 70px
                }
                .time {
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 0 70px;
                    margin: auto;
                    box-sizing: border-box;
                }
                .fujian {
                    width: 70px;
                    text-align: right;
                }
            }
        }
    }
    .popup-wrap {
        position: relative;
        .mint-popup-right {
            width: 284px;
            height: 100%;
        }
        .body-wrap {
            overflow: scroll;
            padding: 34px 7px 100px;
            height: 100%;
            bottom: 100px;
            &:after {
                display: table;
                content: "";
            }
            .radio-wrap {
                margin-bottom: 10px;
                font-size: 12px;
                .radio {
                    padding: 0 4px;
                    margin-bottom: 6px; // height: 30px;
                    border-radius: @radiusS;
                    background: #f0f2f5;
                    color: @textBase;
                    width: 100%;
                    font-size: 16px;
                    &.checked {
                        background: #fff;
                        border: 1px solid @textBlue;
                        color: @textBlue;
                    }
                    .mint-button-text {
                        font-size: 12px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        .sign {
                            display: inline-block;
                            position: relative;
                            top: 1px;
                            padding: 9px 12px 0 0;
                            background: url(/static/icons/resource.png) -44px -61px no-repeat;
                            background-size: 356px auto;
                            &.has-gutter {
                                right: 5px;
                            }
                        }
                    }
                }
                .title {
                    margin: 0 0 10px;
                }
                &.floor-radio-wrap {
                    .radio {
                        min-width: 50px; // height: 30px;
                        margin-right: 4px;
                        font-size: 13px;
                    }
                }
                &+.radio-wrap {
                    margin-top: 20px;
                    padding-top: 20px;
                    .border-top(#D8D8D8);
                }
            }
        }
        .footer-wrap {
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            .mint-button {
                float: left;
                width: 50%;
                height: 39px;
                border-radius: 0;
                opacity: 0.73;
                &.reset {
                    border: 1px solid #EDEEF1;
                    background: #fff;
                    color: @textBlue;
                }
                &.confirm {
                    background: #0398FF;
                    color: #fff;
                }
            }
        }
    }
}
</style>

