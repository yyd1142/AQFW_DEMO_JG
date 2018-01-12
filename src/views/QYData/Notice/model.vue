<template>
  <div class="qy-notice-model">
        <div class="placeholder-item"></div>
        <mko-header title="通知模板" left-icon="icon-back" @handleLeftClick="back" right-icon-text="通知记录" @handleRightClick="history"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="`${item.title}:${item.content}`" main="left" @click="linkPath(item)" v-for="item in datas" is-link></mko-cell>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="!noData"></mko-load-more>
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
export default {
    data() {
        return {
            datas: [],
            noData: false,
            noLoadMore: false,
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
            this.$MKOPush({
                path: '/add_notice',
                query: {
                    title: item.title,
                    content: item.content,
                    groupId: this.$route.query.groupId,
                    dwName: this.$route.query.dwName
                }
            })
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
