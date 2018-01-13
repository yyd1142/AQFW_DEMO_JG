<template>
    <div class="qy-history-notice">
        <div class="placeholder-item"></div>
        <mko-header title="通知记录" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell :title="item.title" :label="item.createTime | formatDate('YYYY-MM-DD')" val="发送成功" main="left" @click="linkPath(item)" v-for="item in datas" is-link></mko-cell>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="datas.length != 0"></mko-load-more>
        </div>
    </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import api from 'api'
const count = 20;
export default {
    data() {
        return {
            datas: [],
            noLoadMore: false,
            pageItem: {
                page: '', 
                pageCount: '', 
                count: '', 
                countNumber: ''
            }
        }
    },
    activated() {
        this.getStatisticsList()
    },
    methods: {
        getStatisticsList() {
            let params = {
                userName: this.$store.getters.userName,
                groupId: this.$store.getters.groupId,
                page: 1,
                count: count
            }
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getStatisticsList(params).then(result => {
                if(!result) {
                    Indicator.close();
                    this.datas = [];
                    return false;
                }
                if(result && result.code == 0) {
                    this.datas = result.response.datas;
                    if(result.response.datas.length > 0) {
                        this.noLoadMore = false;
                    } else {
                        this.noLoadMore = true;
                    }
                    this.pageItem = {
                        page: result.response.page, 
                        pageCount: result.response.pageCount, 
                        count: result.response.count, 
                        countNumber: result.response.countNumber
                    }
                } else {
                    this.datas = [];
                    this.noLoadMore = true;
                }
                Indicator.close();
            });
        },
        linkPath(item) {
            this.$MKOPush({
                name: 'NoticeInfo',
                params: {
                    pid: item.id
                }
            })
        },
        back() {
            this.$MKOPop();
        },
        loadBottom() {
            if (this.pageItem.pageCount == this.pageItem.page) {   //总页数少于1页，不支持分页功能
                Toast({
                    message: '暂无更多数据',
                    position: 'middle',
                    duration: 1500
                });
                this.noLoadMore = true;
                return;
            }
            this.pageItem.page = this.pageItem.page + 1;
            let params = {
                userName: this.$store.getters.userName,
                groupId: this.$store.getters.groupId,
                page: this.pageItem.page,
                count: count
            }
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getStatisticsList(params).then(result => {
                if (result.code == 0) {
                    Indicator.close()
                    if (result.response.datas.length <= 0) {
                        Toast({
                            message: '暂无更多数据',
                            position: 'middle',
                            duration: 1500
                        });
                        this.noLoadMore = true;
                    } else {
                        Toast({
                            message: '加载完成',
                            position: 'middle',
                            duration: 1500
                        });
                        this.datas = this.datas.concat(result.response.datas);
                        this.noLoadMore = false;
                    }
                } else {
                    Indicator.close()
                }
            })
        }
    }
}
</script>

<style lang="less">
.qy-history-notice {
    padding-top: 10px;
}
</style>
