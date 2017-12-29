<template>
    <div class="news-index">
        <div class="placeholder-item"></div>
        <mko-header title="资讯科普" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap" id="pageWrapper">
            <mko-nav-bar>
                <mko-tab-item :label="item" :activied="tabI == i" @handleTabClick="tab" v-for="(item,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="page-infinite-list">
                    <li v-for="item in newsDatas" class="page-infinite-listitem" @click="goNewsInfo(item)">
                        <div class="padding">
                        <img v-lazy="domain + item.fileId"/>
                        <div class="news-title" v-text="titleFilters(item.title)"></div>
                        <div class="news-date">{{item.author}}<span style="margin-left: 10px;">{{item.createDate | formatDate('YYYY-MM-DD')}}</span></div>
                        </div>
                    </li>
                    <li class="not-data-home"  v-if="newsDatas.length == 0">暂无内容</li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
var isloadTop = false;
var page = 1;
var needUpdate = [
    {},
    { isupdate: true, datas: [], type: 1, bottomAllLoaded: false, page: 1 },
    { isupdate: true, datas: [], type: 2, bottomAllLoaded: false, page: 1 },
    { isupdate: true, datas: [], type: 3, bottomAllLoaded: false, page: 1 },
    { isupdate: true, datas: [], type: 4, bottomAllLoaded: false, page: 1 }];
import api from 'api'
import { Toast } from 'mint-ui'
import apiconf from 'apiconf'
export default {
    data() {
        return {
            domain: `${apiconf.resourcesDomain}/`,
            tabI: 0,
            tabItems: ['新闻通知', '安全知识', '法律法规', '经典案例'],
            newsDatas: [],
            bottomStatus: '',
            newsType: 1,
            bottomAllLoaded: false,
            autoFill: false,
            resError: false
        }
    },
    activated() {
        window.addEventListener('scroll', this.handleScroll);
        if (needUpdate[this.newsType].datas.length <= 0) {
            this.newsList(1, this.newsType);
        } else {
            this.newsDatas = needUpdate[this.newsType].datas
        }
    },
    deactivated() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        back() {
            this.$MKOPop()
        },
        tab(text) {
            for (let i in this.tabItems) {
                if (text == this.tabItems[i]) {
                    this.tabI = parseInt(i);
                    this.newsList(1, this.tabI + 1);
                    return;
                }
            }
        },
        goNewsInfo(item) {
            if (this.bottomStatus == 'drop' || this.bottomStatus == 'loading') {
                return false;
            }
            this.$MKOPush({
                name: "newsInfo",
                params: {
                    pid: item.id
                },
                query: {
                    type: item.informationType
                }
            })
        },
        titleFilters(val) {
            let strLength = val.length;
            if (strLength >= 20) {
                val = `${val.substring(0, 20)}...`
            }
            return val;
        },
        newsList(page, type) {
            if (!needUpdate[type].isupdate && needUpdate[type].type == type) {
                this.newsDatas = needUpdate[type].datas;
                return false;
            }
            let params = {
                informationType: type,
                page: needUpdate[type].page,
                count: 15
            };
            api.getNewsList(params).then(result => {
                if (!result) {
                    if (localStorage.getItem('newsDatas')) {
                        this.newsDatas = JSON.parse(localStorage.getItem('newsDatas'))[type].datas;
                    }
                    return false;
                }
                if (result.code == 0) {
                    if (isloadTop) {
                        this.$refs.loadmore.onTopLoaded();
                        Toast({
                            message: '刷新成功',
                            position: 'middle',
                            duration: 1500
                        });
                    }
                    if (result.response.datas.length > 0) {
                        needUpdate[type] = {
                            isupdate: false, type: type,
                            datas: result.response.datas,
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            bottomAllLoaded: false
                        };
                        this.bottomAllLoaded = true;
                        this.newsDatas = result.response.datas;
                    } else {
                        needUpdate[type] = {
                            isupdate: false,
                            type: type,
                            datas: [],
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            bottomAllLoaded: true
                        };
                        this.newsDatas = []
                        this.bottomAllLoaded = true;
                    }
                    localStorage.setItem('newsDatas', JSON.stringify(needUpdate));
                } else {
                    this.resError = true;
                }
            })
        },
        // 分页
        loadBottom() {
            setTimeout(() => {
                if (needUpdate[this.newsType].page == needUpdate[this.newsType].pageCount) {
                    Toast({
                        message: '暂无更多数据',
                        position: 'middle',
                        duration: 1500
                    });
                    needUpdate[this.newsType].bottomAllLoaded = true
                    this.bottomAllLoaded = true;
                    this.$refs.loadmore.onBottomLoaded();
                    return false;
                }
                needUpdate[this.newsType].page = needUpdate[this.newsType].page + 1
                let params = {
                    informationType: this.newsType,
                    page: needUpdate[this.newsType].page,
                    count: 15
                };
                api.getNewsList(params).then(result => {
                    this.$refs.loadmore.onBottomLoaded();
                    if (result.code == 0) {
                        if (result.response.datas.length == 0) {
                            Toast({
                                message: '暂无更多数据',
                                position: 'middle',
                                duration: 1500
                            });
                            needUpdate[this.newsType].bottomAllLoaded = true;
                            this.bottomAllLoaded = true;
                        } else {
                            Toast({
                                message: '加载完成',
                                position: 'middle',
                                duration: 1500
                            });
                            this.newsDatas = this.newsDatas.concat(result.response.datas);
                            this.bottomAllLoaded = true;
                            needUpdate[this.newsType] = {
                                isupdate: false,
                                type: this.newsType,
                                datas: this.newsDatas,
                                page: result.response.page,
                                pageCount: result.response.pageCount,
                                bottomAllLoaded: false
                            }
                        }
                    } else {
                        this.resError = true;
                    }
                })
            }, 1500);
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        handleScroll() {
            this.$nextTick(() => {
                let totalHeight = document.getElementById('pageWrapper') ? document.getElementById('pageWrapper').offsetHeight : 0;
                let scrollTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                let clientHeight = 0;
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                } else {
                    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }
                let scrollBottom = totalHeight - scrollTop - clientHeight;
                this.bottomAllLoaded = scrollBottom <= 0 ? false : true;
            })
        }
    }
}
</script>

<style lang="less">
@import "../../config.less";
.news-index {
    .page-wrap {
            .page-infinite-list {
                width: 100%;
                list-style: none;
                box-sizing: border-box;
                .border-top(#eeeeee);
                &::before {
                    z-index: 10;
                }
                .page-infinite-listitem {
                    width: 100%;
                    margin: 0;
                    background-color: #fff;
                    min-height: 88px;
                    position: relative;
                    box-sizing: border-box;
                    padding: 0 0 0 14px;
                    &:active {
                        background-color: #f9f9f9;
                    }
                    &:last-child {
                        .border-btm(#eeeeee);
                        &::after {
                            bottom: -1px;
                        }
                        .padding::after {
                            display: none;
                            content: none;
                        }
                    }
                    .padding {
                        box-sizing: border-box;
                        position: relative;
                        .border-btm(#eeeeee);
                        min-height: 88px;
                        img {
                            width: 75px;
                            position: absolute;
                            height: 60px;
                            top: 14px;
                            right: 14px;
                            bottom: 14px;
                            border-radius: 2px;
                        }
                        .news-title {
                            width: 100%;
                            display: block;
                            font-size: 16px;
                            margin-left: 0;
                            padding: 12px 103px 0 0;
                            color: #333333;
                            line-height: 20px;
                            text-align: justify;
                        }
                        .news-date {
                            width: 100%;
                            position: ABSOLUTE;
                            font-size: 12px;
                            color: #999999;
                            bottom: 14px;
                            left: 0;
                        }
                    }
                }
        }
    }
}
</style>
