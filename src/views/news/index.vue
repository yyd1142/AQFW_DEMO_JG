<template>
    <div class="news-index">
        <div class="placeholder-item"></div>
        <mko-header title="资讯科普" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap" id="pageWrapper">
            <mko-nav-bar>
                <mko-tab-item :label="item" :activied="tabI == i" @handleTabClick="tab" v-for="(item,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <ul class="page-infinite-list">
                <li v-for="item in newsDatas" class="page-infinite-listitem" @click="goNewsInfo(item)">
                    <div class="padding">
                    <img v-lazy="domain + item.fileId"/>
                    <div class="news-title" v-text="titleFilters(item.title)"></div>
                    <div class="news-date">{{item.author}}<span style="margin-left: 10px;">{{item.createDate | formatDate('YYYY-MM-DD')}}</span></div>
                    </div>
                </li>
            </ul>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="newsDatas.length != 0"></mko-load-more>
            <no-data v-if="newsDatas.length == 0"></no-data>
        </div>
    </div>
</template>

<script>
var isloadTop = false;
var page = 1;
var count = 15;
var needUpdate = [
    {},
    { isupdate: true, datas: [], type: 1, noLoadMore: false, page: 1 },
    { isupdate: true, datas: [], type: 2, noLoadMore: false, page: 1 },
    { isupdate: true, datas: [], type: 3, noLoadMore: false, page: 1 },
    { isupdate: true, datas: [], type: 4, noLoadMore: false, page: 1 }];
import api from 'api'
import { Toast, Indicator } from 'mint-ui'
import apiconf from 'apiconf'
import { NoData } from 'components'
export default {
    data() {
        return {
            domain: `${apiconf.resourcesDomain}/`,
            tabI: 0,
            tabItems: ['新闻通知', '安全知识', '法律法规', '经典案例'],
            newsDatas: [],
            newsType: 1,
            noLoadMore: false,
            resError: false
        }
    },
    activated() {
        if (needUpdate[this.newsType].datas.length <= 0) {
            this.newsList(1, this.newsType);
        } else {
            this.newsDatas = needUpdate[this.newsType].datas
        }
    },
    deactivated() {
        
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
                this.noLoadMore = needUpdate[type].noLoadMore;
                return false;
            }
            let params = {
                informationType: type,
                page: needUpdate[type].page,
                count: count
            };
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getNewsList(params).then(result => {
                if (!result) {
                    Indicator.close()
                    if (localStorage.getItem('newsDatas')) {
                        this.newsDatas = JSON.parse(localStorage.getItem('newsDatas'))[type].datas;
                    }
                    return false;
                }
                if (result.code == 0) {
                    Indicator.close()
                    if (isloadTop) {
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
                            noLoadMore: false
                        };
                        this.noLoadMore = false;
                        this.newsDatas = result.response.datas;
                    } else {
                        needUpdate[type] = {
                            isupdate: false,
                            type: type,
                            datas: [],
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            noLoadMore: true
                        };
                        this.newsDatas = []
                        this.noLoadMore = true;
                    }
                    localStorage.setItem('newsDatas', JSON.stringify(needUpdate));
                } else {
                    Indicator.close()
                    this.resError = true;
                }
            })
        },
        // 分页
        loadBottom() {
            if (needUpdate[this.newsType].page == needUpdate[this.newsType].pageCount) {
                Toast({
                    message: '暂无更多数据',
                    position: 'middle',
                    duration: 1500
                });
                needUpdate[this.newsType].noLoadMore = true
                this.noLoadMore = true;
                return false;
            }
            needUpdate[this.newsType].page = needUpdate[this.newsType].page + 1
            let params = {
                informationType: this.newsType,
                page: needUpdate[this.newsType].page,
                count: count
            };
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getNewsList(params).then(result => {
                if (result.code == 0) {
                    Indicator.close()
                    if (result.response.datas.length == 0) {
                        Toast({
                            message: '暂无更多数据',
                            position: 'middle',
                            duration: 1500
                        });
                        needUpdate[this.newsType].noLoadMore = true;
                        this.noLoadMore = true;
                    } else {
                        Toast({
                            message: '加载完成',
                            position: 'middle',
                            duration: 1500
                        });
                        this.newsDatas = this.newsDatas.concat(result.response.datas);
                        this.noLoadMore = false;
                        needUpdate[this.newsType] = {
                            isupdate: false,
                            type: this.newsType,
                            datas: this.newsDatas,
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            noLoadMore: false
                        }
                    }
                } else {
                    Indicator.close()
                    this.resError = true;
                }
            })
        }
    },
    components: {
        NoData
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
