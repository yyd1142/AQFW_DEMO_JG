<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="newsTitles[$route.query.type]" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap message-detail-wrap" v-if="newsInfoShow">
            <div class="main-msg">
                <div class="message-title">
                    <h3>{{newsItem.title}}</h3>
                </div>
                <div class="time-wrap" :style="{ marginBottom: attachments.length <= 0 ? '20px' : '4px' }">{{newsItem.author}} {{newsItem.createDate | formatDate("YYYY-MM-DD HH:mm")}}</div>
                <div class="attachment-list" :class="index == attachments.length - 1 ? 'last-child' : ''" v-for="item, index in attachments" v-if="attachments.length > 0" @click="downloadFile(domain + item.resouceId)">
                    <div class="title-table">下载附件：<span>{{titleFilter(item.title) + '.' + item.type}}</span></div>
                </div>
                <div class="banner" v-if="images.length > 0">
                    <mt-swipe :auto="2500">
                        <mt-swipe-item  v-for="item in images" >
                            <img v-lazy="domain + item.resouceId">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div id="contentMsg" class="content-msg" v-html="newsItem.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import api from 'api'
import { formatDate } from 'filters'
import apiconf from 'apiconf'

var _id = '';
export default {
    data() {
        return {
            newsInfoShow: true,
            hasData: false,
            newsItem: {},
            images: [],
            attachments: [],
            domain: `${apiconf.resourcesDomain}/`,
            newsTitles: ['', '新闻通知', '安全知识', '法律法规', '经典案例']
        }
    },
    activated() {
        if (_id != this.$route.params.pid) {
            this.newsInfo()
        }
        setTimeout(() => {
            this.newsInfoShow = true;
        }, 300)
    },
    deactivated() {
        this.newsInfoShow = false
    },
    methods: {
        newsInfo() {
            let params = {
                id: this.$route.params.pid
            }
            api.getNewsDetail(params).then(result => {
                _id = this.$route.params.pid;
                if (result.code == 0) {
                    this.getResourcesInfo(result.response.fileId);
                    this.getAttachments(result.response.attachment);
                    result.response.content = result.response.content.replace(/<img/g, "<img class='news-img'")
                    result.response.content = result.response.content.replace(/<p/g, "<p class='news-content'")
                    this.newsItem = result.response;
                }
            })
        },
        getResourcesInfo(params) {
            api.getResourcesInfo(params).then(result => {
                if (!result) return false;
                if (result.code == 0) {
                    this.images = result.response;
                }
            })
        },
        getAttachments(params) {
            if (params == '' || params == null) return false;
            api.getResourcesInfo(params).then(result => {
                if (!result) return false;
                if (result.code == 0) {
                    this.attachments = result.response;
                }
            })
        },
        back() {
            this.$MKOPop()
        },
        downloadFile(path) {
            this.$MKOJumpOutsideURL(path)
        },
        titleFilter(val) {
            let strLength = val.length;
            if (strLength >= 25) {
                return `${val.substring(0, 20)}...${val.substring(strLength - 4)}`;
            } else {
                return val;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../config.less";
.message-detail-wrap {
    padding-bottom: 0;
    background-color: #ffffff;
    height: 100vh;
    padding-top: 44px + @headerTop;
    margin-top: 0;
}

.message-title {
    width: 100%;
    margin: 20px auto;
    h3 {
        font-size: 22px;
        color: #333;
        margin: 0;
        padding: 0 14px 0 14px;
        text-align: left;
        font-weight: bold;
        line-height: 30px;
    }
}

.main-msg {
    width: 100%;
    margin: 0 auto;
    .banner {
        width: 100%;
        margin: 0 auto 12px auto;
        padding: 0 14px;
        height: 250px;
        img {
            width: 100%;
            display: block;
            height: 250px;
        }
    }
}

.content-msg {
    display: block;
    color: #333333;
    font-size: 14px;
    margin-top: 8px;
    width: 100vw;
    white-space: normal;
    padding: 0 14px 50px 14px;
}

.time-wrap {
    width: 100%;
    height: 12px;
    color: #999999;
    font-size: 12px;
    margin: 0 0 4px 0;
    padding: 0 14px;
}

.attachment-list {
    width: 100%;
    margin-bottom: 4px;
    padding: 0 14px;
    &.last-child{
        margin-bottom: 20px;
    }
    .title-table {
        color: #3399ff;
        font-size: 12px;
        span {
            font-size: 12px;
        }
    }
}
</style>