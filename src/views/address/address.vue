<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="部门" :left-icon="isSearchBar ? '' : 'icon-search-l'"
                    :left-icon-text="isSearchBar ? '返回' : null"
                    @handleLeftClick="openSearchBar"
                    :right-icon="$store.state.user.isAdmin ? 'icon-add': null"
                    @handleRightClick="$MKOPush('/add_user')">

        </mko-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap address-wrap" v-show="!resError">

            <mko-light-nav-bar :tabs="tabs" v-model="activeTab"></mko-light-nav-bar>


            <div class="search-bar-wrap" v-if="isSearchBar">
                <div class="search-hidden-wrap" @click="isSearchBar = false;"></div>
                <search-bar v-model="searchValue" @onFocus="listenInput" @onCancelSearch="closeSearchBar" @onClearSearch="clearSearch"></search-bar>
            </div>

            <div class="address-list" ref="wrapper" :style="{ height: wrapperHeight - 50 + 'px'}" :class="isSearchBar ? 'has-searchbar-addresslist' : ''">

                <div v-show="activeTab==1">
                    <mko-cell :title="cell.employeeName" :val="cell.phone" is-link
                              @click="goInfo('/address_detail/'+cell.id)" v-for="cell in addressShowList"></mko-cell>
                    <no-data v-if="addressShowList.length <= 0"></no-data>
                </div>

                <div v-show="activeTab==2">
                    <div class="data-wrap" v-for="cell in lowerDws">
                        <mko-cell :title="cell.dwName" :val="cell.qyScoreAverage?`${cell.qyScoreAverage}分`:'暂无'"
                                  main="left" is-link @click="goJGinfo(cell)"></mko-cell>
                        <mko-cell :title="item.dwName" :val="item.qyScoreAverage?`${item.qyScoreAverage}分`:'暂无'"
                                  main="left" is-link @click="goJGinfo(item)" v-for="item in cell.children" v-if="cell.children"></mko-cell>
                        <mko-cell title="暂无" val="暂无" v-if="cell.children && cell.children.length <= 0"></mko-cell>
                        <!---->
                        <!--<div class="address-cell" :class="cell.children ? 'first-cell' : null" @click="goJGinfo(cell)">-->
                        <!--<div class="address-name" :class="cell.children ? 'first' : null">{{cell.dwName}}</div>-->
                        <!--<span class="address-phone" :class="cell.children ? 'first' : null">-->
                        <!--{{cell.qyScoreAverage || '暂无'}}-->
                        <!--<span v-if="cell.qyScoreAverage">分</span>-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--<div class="address-cell" v-for="item in cell.children" @click="goJGinfo(item)" v-if="cell.children">-->
                        <!--<div class="address-name">{{item.dwName}}</div>-->
                        <!--<span class="address-phone">-->
                        <!--{{item.qyScoreAverage || '暂无'}}-->
                        <!--<span v-if="item.qyScoreAverage">分</span>-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--<div class="address-cell" v-if="cell.children && cell.children.length <= 0">-->
                        <!--<div class="address-name">暂无</div>-->
                        <!--<span class="address-phone">暂无</span>-->
                        <!--</div>-->
                        <!---->
                    </div>
                    <no-data v-if="lowerDws.length <= 0"></no-data>
                </div>
            </div>
        </div>
        <tabs :class="{'address-tabs':!fixedTabs}" actived="mail"></tabs>
    </div>
</template>


<script>
    import api from 'api';
    import { NoData, ResError, Tabs, SearchBar } from 'components';
    import { Indicator } from 'mint-ui';

    export default {
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //config
                addressClass: "2",
                searchValue: "",
                wrapperHeight: 0,
                fixedTabs: true,
                //数据
                addressList: [],
                addressShowList: [],
                lowerDws: [],
                isSearchBar: false,
                tabs: [
                    {id: 2, text: '外部人员'},
                    {id: 1, text: '内部人员'}
                ],
                activeTab: 2,
            };
        },
        watch: {
            searchValue: function () {
                this.searchData();
            },
            activeTab: function (val) {
                if (val == 1) this.getData();
                if (val == 2) this.getLowerDws();
            },
            isSearchBar: function (val) {
                if (!val) {
                    window.mkoBackButton.bInputData = false;
                } else {
                    window.mkoBackButton.bInputData = true;
                }
            }
        },
        activated() {
            this.onBackButtonEvent();
            this.$nextTick(() => {
                this.getData();
                this.getLowerDws();
                this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
            });
        },
        methods: {
            listenInput(val) {
                this.fixedTabs = !val;
                if (!val) {
                    this.isSearchBar = false;
                }
            },
            getData() {
                this.noData = false;
                // Indicator.open({ spinnerType: 'fading-circle' });
                api.getAddressList({
                    UUID: this.$store.getters.UUID,
                    //          param: this.searchValue
                }).then(res => {
                    // Indicator.close();
                    if (!res) {
                        if (!this.searchValue)
                            this.resError = true;
                        return;
                    }
                    let resp = res.response;
                    if (!resp.length)
                        this.noData = true;
                    this.addressList = resp;
                    this.addressShowList = JSON.parse(JSON.stringify(this.addressList));
                });
            },
            searchData() {
                let val = this.searchValue.toLowerCase();
                let reg = new RegExp(`.*${val}.*`);
                if (this.addressClass === '1') {
                    let list = this.addressList;
                    let show = this.addressShowList;
                    show.length = 0;
                    list.forEach(item => {
                        if (item.employeeName.toLowerCase().search(reg) != -1 || item.phone.search(reg) != -1)
                            show.push(item);
                    });
                } else {
                    let data = [];
                    let lowerDws = JSON.parse(sessionStorage.getItem('subLowerDws')).response;
                    lowerDws.forEach(item => {
                        if (item.dwName.toLowerCase().search(new RegExp(`.*${this.searchValue}.*`)) != -1)
                            data.push(item);
                    });
                    this.lowerDws = data;
                }
            },
            goInfo(path) {
                this.$MKOPush(path);
            },
            goJGinfo(item) {
                this.$MKOPush({
                    name: 'jgDetail',
                    params: {
                        pid: item.groupId
                    },
                    query: {
                        jgDetail: item
                    }
                })
            },
            getLowerDws() {
                this.noData = false;
                api.lowerDw({
                    groupId: this.$store.getters.groupId
                }).then(res => {
                    if (!res) return false;
                    if (res.code == 0) {
                        if (res.response.length <= 0) {
                            this.lowerDws = [];
                            this.noData = true;
                        } else {
                            sessionStorage.setItem('subLowerDws', JSON.stringify(res));
                            let datas = res.response;
                            let ids = [];
                            if (this.$store.getters.userInfo.dwId == 1) {
                                datas.forEach((item) => {
                                    item.children = datas.filter(subItem => {
                                        return subItem.parentId == item.id;
                                    });
                                })
                                this.lowerDws = datas.filter(item => {
                                    return item.parentId == 1;
                                });
                            } else {
                                this.lowerDws = [{
                                    id: this.$store.getters.userInfo.id,
                                    parentId: this.$store.getters.userInfo.dwId,
                                    dwName: this.$store.getters.userInfo.dwName,
                                    groupId: this.$store.getters.userInfo.groupId,
                                    qyScoreAverage: this.$store.getters.userInfo.qyScoreAverage,
                                    children: datas
                                }]
                            }
                            sessionStorage.setItem('lowerDws', JSON.stringify(this.lowerDws))
                            this.noData = false;
                            if (this.lowerDws.length <= 0)
                                this.noData = true
                        }
                    } else {
                        this.noData = true;
                    }
                })
            },
            openSearchBar() {
                this.isSearchBar = !this.isSearchBar;
                this.onBackButtonEvent();
            },
            closeSearchBar() {
                this.isSearchBar = false;
                this.lowerDws = JSON.parse(sessionStorage.getItem('lowerDws'));
            },
            clearSearch() {
                this.$nextTick(() => {
                    this.lowerDws = JSON.parse(sessionStorage.getItem('lowerDws'));
                })
            },
            onBackButtonEvent() {
                if (this.isSearchBar) {
                    let that = this;
                    window.mkoBackButton = {};
                    window.mkoBackButton.bInputData = true;
                    window.mkoBackButton.callback = function () {
                        that.isSearchBar = false;
                        window.mkoBackButton.bInputData = false;
                    }
                }
            }
        },
        components: {
            NoData, ResError, Tabs, SearchBar
        }
    };

</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .address-tabs {
        .home-tabs-wrap {
            position: static !important;
            z-index: 3;
        }
    }

    .address-wrap {
        padding-bottom: 0;
        .search-bar-wrap {
            position: fixed;
            z-index: 20;
            margin: auto;
            height: 100%;
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            .search-hidden-wrap {
                position: fixed;
                z-index: 20;
                margin: auto;
                height: 100%;
                width: 100%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
            }
            .search-wrap {
                position: fixed;
                height: 44px;
                padding: 8px;
                background: #C9C9CE;
                z-index: 22;
                width: 100%;
                top: @headerHeight + @headerTop + 36px;
            }
        }

        .address-list {
            margin-top: 10px;
            &.has-searchbar-addresslist {
                margin: 40px 0 0 0;
            }
            .data-wrap {
                margin-bottom: 10px;
            }
        }
    }

</style>
