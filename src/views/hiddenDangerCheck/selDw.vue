<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="风险单位" left-icon="icon-back" @handleLeftClick="changePage" right-icon="icon-search"
                    @handleRightClick="showSearchBar = !showSearchBar"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap hdc-sel-wrap" v-show="!resError">
            <search-bar v-model="searchValue" v-show="showSearchBar"></search-bar>
            <div v-show="!noData">
                <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange"
                             @bottom-status-change="handleBottomChange" :bottom-method="loadBottom"
                             :bottom-all-loaded="bottomAllLoaded" :auto-fill="autoFill">
                    <div class="data-wrap" ref="wrapper" :style="{minHeight:wrapperHeight+'px'}">

                        <mko-cell :title="item.dwName" main="left" @click="selData(item)" v-for="item in dwList"></mko-cell>

                    </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
    import { Indicator, Toast } from 'mint-ui';
    import api from 'api'
    import { NoData, ResError, SearchBar } from 'components';
    let req_count = 20;
    let req_page = 1;
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //loadMore
                wrapperHeight: 0,
                autoFill: false,
                topStatus: '',
                bottomStatus: '',
                bottomAllLoaded: false,
                //数据
                page: 1,
                dwList: [],
                //搜索
                showSearchBar: false,
                searchValue: '',
            }
        },
        watch: {
            searchValue: function () {
                this.getData();
            }
        },
        created() {
        },
        mounted(){
            this.$nextTick(() => {
                req_page = 1;
                this.getData();
                this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
            });
        },
        activated(){
            //
        },
        destroyed() {
            this.searchValue = '';
        },
        methods: {
            getData(){
                this.noData = false;
                Indicator.open({spinnerType: 'fading-circle'});
                let params = {
                    type: 1,
                    page: req_page,
                    count: req_count,
                    userName: this.$store.getters.userName,
                    search: this.searchValue
                };
                api.getQyList(params).then(res => {
                    this.$refs.loadmore.onTopLoaded();
                    this.$refs.loadmore.onBottomLoaded();
                    if (!res) {
                        this.resError = true;
                        Indicator.close();
                        return;
                    }
                    if (res.response && res.response.datas) {
                        let length = res.response.datas.length;
                        if (req_page == 1) {
                            this.dwList.length = 0;
                            if (length == 0)
                                this.noData = true;
                        }
                        res.response.datas.forEach(item => {
                            this.dwList.push(item);
                        });
                        if (length < req_count) {
                            this.bottomAllLoaded = true;
                            if (req_page != 1)
                                Toast({message: '暂无更多数据', position: 'middle', duration: 1500});
                        }
                    }
                    Indicator.close();
                });
            },
            loadTop(){
                req_page = 1;
                this.bottomAllLoaded = false;
                setTimeout(this.getData, 1000);
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadBottom() {
                req_page++;
                this.getData();
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            selData(val){
                if (this.topStatus != 'drop' && this.topStatus != 'loading' && this.bottomStatus != 'drop' && this.bottomStatus != 'loading') {
                    let obj = {
                        groupId: val.groupId,
                        dwName: val.dwName
                    };
                    this.$emit('sel', obj);
                    this.changePage();
                }
            },
            changePage(){
                this.$MKOPop();
//        this.$emit('changePage', 'main');
                Indicator.close();
            }
        },
        components: {
            NoData,
            ResError, SearchBar
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .hdc-sel-wrap {
        padding: 0;
        .search-wrap {
            height: auto;
            .mint-searchbar {
                z-index: 0;
            }
        }
        .data-wrap {
            .mko-basic-cell {
                .value.main-left {
                    flex: 0;
                    -webkit-flex: 0;
                    width: 0;
                }
            }
        }
        .footer-wrap {
            position: fixed;
            width: 100%;
            bottom: 0;
            .btn {
                background: @mainBlue;
                color: @bgWhite;
                &.is-disabled {
                    background: lighten(@mainBlue, 10%);
                    opacity: 1;
                }
            }
        }
    }
</style>
