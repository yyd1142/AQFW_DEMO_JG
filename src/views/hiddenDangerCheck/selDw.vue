<template>
    <div class="hdc-sel-dw-wrap" :class="{'search-bar-is-focus':searchBarIsFocus||searchValue}">
        <div class="placeholder-item"></div>
        <mko-header title="风险单位" left-icon="icon-back" @handleLeftClick="changePage"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!resError">
            <mko-search-bar v-model="searchValue" hint-text="搜索单位名称" ref="search-bar" fill
                            @onFocus="searchBarHandleFn($event,true)" @onBlur="searchBarHandleFn($event,false)">
            </mko-search-bar>
            <div class="list-wrap" ref="wrapper">
                <mko-cell :title="item.dwName" main="left" @click="selData(item)" v-for="item in dwList"></mko-cell>
            </div>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="dwList.length"></mko-load-more>
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
                //数据
                page: 1,
                dwList: [],
                noLoadMore: false,
                //搜索
                searchBarIsFocus: false,
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
            });
        },
        activated(){

        },
        destroyed() {
            this.searchValue = '';
        },
        methods: {
            searchBarHandleFn(type, bool){
                this.searchBarIsFocus = bool;
            },
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
                            this.noLoadMore = true;
                            if (req_page != 1)
                                Toast({message: '暂无更多数据', position: 'middle', duration: 1500});
                        } else {
                            if (this.page == 1) this.dwList = [];
                            this.noLoadMore = false;
                        }
                    }
                    Indicator.close();
                });
            },
            loadTop(){
                req_page = 1;
                this.noLoadMore = false;
                setTimeout(this.getData, 1000);
            },
            loadBottom() {
                req_page++;
                this.getData();
            },
            selData(val){
                let obj = {
                    groupId: val.groupId,
                    dwName: val.dwName
                };
                this.$emit('sel', obj);
                this.changePage();
            },
            changePage(){
                this.$MKOPop();
//        this.$emit('changePage', 'main');
                Indicator.close();
            }
        },
        components: {
            NoData,
            ResError,
            SearchBar
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    @searchBarHeight: 44px;

    .hdc-sel-dw-wrap {
        &.search-bar-is-focus {
            .mko-header {
                display: none;
            }
            .mko-search-wrap {
                top: @headerTop;
            }
            .mko-light-nav-bar-wrap {
                top: @headerTop + @searchBarHeight;
            }
            .list-wrap {
                margin-top: 0;
            }
        }
        .mko-search-wrap {
            position: fixed;
            width: 100%;
            top: @headerHeight + @headerTop - 1;
            z-index: 1;
        }
        .list-wrap {
            margin-top: @searchBarHeight - 1;
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
