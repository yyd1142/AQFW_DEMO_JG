<template>
  <div class="qy-notice-model">
        <div class="placeholder-item"></div>
        <mko-header title="通知模板" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="`${item.title}`" main="left" @click="linkPath(item)" v-for="item in datas" is-link></mko-cell>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="needLoadMore"></mko-load-more>
        </div>
        <no-data v-if="noData"></no-data>
  </div>
</template>

<script>
import api from 'api'
import { Indicator, Toast } from 'mint-ui'
import { NoData } from 'components'
var count = 20;
var page = 1;
String.prototype.stripHTML = function() {
    let reTag = /<(?:.|\s)*?>/g;
    return this.replace(reTag,"");
}
export default {
    data() {
        return {
            datas: [],
            noData: false,
            noLoadMore: false,
            needLoadMore: true,
            pageItem: {
                page: 0,
                pageCount: 0
            }
        }
    },
    activated() {
        this.getNoticeModel()
    },
    detivated() {
        this.datas = [];
        page = 1;
    },  
    methods: {
        back() {
            this.$MKOPop();
        },
        linkPath(item) {
            sessionStorage.setItem('chooseModelDatas', JSON.stringify({
                title: item.title,
                content: item.content
            }))
            this.back();
        },
        history() {
            this.$MKOPush({
                path: '/notice',
                query: {
                    isHistory: true
                }
            })
        },
        getNoticeModel() {
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getNoticeModel({
                m: 'templateList',
                page: 1,
                count: count
            }, {}, 'TEST').then(result => {
                if(!result) {
                    Indicator.close();
                    return false;
                }
                if(result && result.code == 0) {
                    Indicator.close();
                    if(result.response && result.response.datas.length > 0) {
                        result.response.datas.map(item => {
                            if(item.content.indexOf('</p>') >= 0) {
                                item.content = item.content.stripHTML();
                            }
                            return item;
                        })
                        this.datas = result.response.datas;
                        this.noData = false;
                        this.noLoadMore = false;
                    } else {
                        this.datas = [];
                        this.noData = true;
                        this.noLoadMore = true;
                    }
                    this.pageItem = {
                        page: result.response.page,
                        pageCount: result.response.pageCount
                    }
                    if(result.response.pageCount <= 1) {
                        this.needLoadMore = false;
                    } else {
                        this.needLoadMore = true;
                    }
                } else {
                    Indicator.close();
                    this.datas = [];
                    this.noData = true;
                    this.noLoadMore = true;
                    Toast({message: `code: ${result.code}`, duration: 1500});
                }
            })
        },
        loadBottom() {
            if (this.pageItem.page == this.pageItem.pageCount) {
                Toast({
                message: '暂无更多数据',
                position: 'middle',
                duration: 1500
                });
                this.noLoadMore = true;
                return;
            }
            Indicator.open({ spinnerType: 'fading-circle' });
            page = page + 1;
            api.getNoticeModel({
                m: 'templateList',
                page: page,
                count: count
            }).then(result => {
                if(!result) {
                    Indicator.close();
                    return false;
                }
                if(result && result.code == 0) {
                    Indicator.close();
                    if(result.response && result.response.datas.length > 0) {
                        this.datas = this.datas.concat(result.response.datas);
                        this.noData = false;
                        this.noLoadMore = false;
                        Toast({ message: '加载完成', position: 'middle', duration: 1500 });
                    } else {
                        Toast({ message: '暂无更多数据', position: 'middle', duration: 1500 });
                        this.noLoadMore = true;
                    }
                    this.pageItem = {
                        page: result.response.page,
                        pageCount: result.response.pageCount
                    }
                } else {
                    Indicator.close();
                    this.datas = [];
                    this.noData = true;
                    Toast({message: `code: ${result.code}`, duration: 1500});
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
.qy-notice-model {
    padding-top: 10px;
    .page-wrap {
        .mko-basic-cell {
            .cell {
                .title {
                    p {
                        display: inline;
                    }
                }
            }
        }
    }
}
</style>
