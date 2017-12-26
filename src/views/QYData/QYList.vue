<template>
    <div class="qy-list-wrap" :class="{'search-bar-is-focus':searchBarIsFocus||search}">
        <div class="placeholder-item"></div>
        <mko-header title="社会单位" left-icon="icon-back" @handleLeftClick="$MKOPop()" right-icon-text="筛选" @handleRightClick="selecteEvent"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!resError" id="pageWrapper">
            <mko-search-bar v-model="search" hint-text="搜索单位名称" ref="search-bar" fill
                            @onFocus="searchBarHandleFn($event,true)" @onBlur="searchBarHandleFn($event,false)"></mko-search-bar>
            <mko-nav-bar border-bottom>
                <mko-tab-item :label="item.text" :activied="listType == item.type"
                              @handleTabClick="ctrlListType(item.type)" v-for="item in headerBtn"></mko-tab-item>
            </mko-nav-bar>
            <div ref="wrapper">
                <mt-loadmore ref="loadmore" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :auto-fill="autoFill" :bottom-all-loaded="bottomAllLoaded">
                    <ul class="list">
                        <li class="item" @click="go(item.groupId,item.dwName,item.dwSafeScore)" v-for="(item,n) in dwList">
                            <div class="padding">
                                <div class="score" :class="scoreColorStyle(item.dwSafeScore)">
                                    {{parseInt(item.dwSafeScore) || '暂无'}}
                                </div>
                                <div class="info">
                                    <div class="title no-overflow">{{item.dwName}}</div>
                                    <ul class="dw-attribute">
                                        <li class="attr-item" v-for="attr, index in item.dwAttributes" v-if="index <= 2">
                                            <div class="main" :class="scoreColorStyle(item.dwSafeScore)">
                                                <span>{{attributesFilter(attr.attributeName)}}</span></div>
                                        </li>
                                        <li class="attr-item" v-if="item.dwAttributes.length > 3">
                                            <div class="main ellipsis" :class="scoreColorStyle(item.dwSafeScore)">
                                                <i class="icon-ellipsis"></i></div>
                                        </li>
                                        <li class="attr-item" v-if="!item.dwAttributes || (item.dwAttributes && item.dwAttributes.length <= 0)">
                                            <div class="disabled"><span>暂无标签</span></div>
                                        </li>
                                    </ul>
                                </div>
                                <i class="icon icon-link-arrow"></i>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
            <!--筛选-->
            <div class="popup-wrap">
                <mt-popup v-model="popupShow" position="right">
                    <div class="body-wrap">
                        <div class="main-wrap">
                            <p class="title">服务评分</p>
                            <div class="radio-wrap small-radio-wrap">
                                <mt-button class="radio" :class="{'checked':formData.dwSafeScore==item.value}"
                                           @click.native="formData.dwSafeScore=item.value" v-for="item in options.score"
                                           size="large">
                                    <span class="sign has-gutter"
                                          v-show="formData.dwSafeScore==item.value"></span>{{item.label}}
                                </mt-button>
                            </div>
                        </div>
                        <div class="main-wrap">
                            <p class="title">单位类型</p>
                            <div class="radio-wrap">
                                <mt-button class="radio" :class="{'checked':formData.dwType==item.dwTypeID}"
                                           @click.native="formData.dwType=item.dwTypeID" v-for="item in options.dwType"
                                           size="large">
                                    <span class="sign has-gutter"
                                          v-show="formData.dwType==item.dwTypeID"></span>{{item.dwTypeName}}
                                </mt-button>
                            </div>
                        </div>
                        <!--<div class="main-wrap"  v-if="formData.dwType">-->
                        <!--<p class="title">单位子类型</p>-->
                        <!--<div class="radio-wrap">-->
                        <!--<mt-button class="radio" :class="{'checked':formData.dwChildType==item.dwTypeID}"-->
                        <!--@click.native="formData.dwChildType=item.dwTypeID"  v-for="item in options.dwChildType"-->
                        <!--size="large">-->
                        <!--<span class="sign has-gutter" v-show="formData.dwChildType==item.dwTypeID"></span>{{item.dwTypeName}}-->
                        <!--</mt-button>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="footer-wrap">
                        <mt-button class="reset" @click="resetData">重置</mt-button>
                        <mt-button class="confirm" @click="filterList">完成</mt-button>
                    </div>
                </mt-popup>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "api";
    import { NoData, ResError, SearchBar } from "components";
    import { calcScoreStyle } from "filters";
    import { Indicator, Toast } from "mint-ui";
    var qy_datas = [{}, {datas: [], pageItem: {}}, {datas: [], pageItem: {}}];
    var count = 20;
    let scroll_top = [0, 0];
    let group_id = "";
    export default {
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                //控制
                listType: 1,
                popupShow: false,
                headerBtn: [
                    {
                        text: "主管单位",
                        type: 1
                    },
                    {
                        text: "辖区单位",
                        type: 2
                    }
                ],
                //loadMore
                wrapperHeight: 0,
                autoFill: false,
                topStatus: "",
                bottomStatus: "",
                bottomAllLoaded: false,
                //        page: 1,
                //数据
                dwList: [],
                dwListSum: 0,
                options: {
                    dwType: [],
                    dwChildType: [],
                    score: [
                        {value: 0, label: "全部"},
                        {value: 1, label: "90-100分"},
                        {value: 2, label: "80-90分"},
                        {value: 3, label: "70-80分"},
                        {value: 4, label: "60-70分"},
                        {value: 5, label: "60分以下"}
                    ]
                },
                formData: {
                    dwType: "",
                    dwChildType: "",
                    dwSafeScore: 0
                },
                //搜索
                search: "",
                searchBarShow: false,
                searchReset: false,
                tabI: 0,
                searchBarIsFocus: false,
            };
        },
        watch: {
            popupShow: function (val) {
                this.onPopupShow(val);
                if (val) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "auto";
                }
            },
            search: function () {
                this.searchData();
            }
            //      'formData.dwType': function (val) {
            //        if (!val) {
            //          this.options.dwChildType = [];
            //          return;
            //        }
            //        this.getTypeData(val);
            //      }
        },
        mounted() {
        },
        activated() {
            window.addEventListener("scroll", this.handleScroll);
            this.formData = {
                dwType: "",
                dwChildType: "",
                dwSafeScore: 0
            };
            this.$refs["search-bar"].cancel();
            this.searchBarShow = false;
            scrollTo(0, scroll_top[this.listType - 1]);
            window.onscroll = this.getScrollTop;
            //            this.listType = 1;
            this.getData();
            this.getTypeData();
        },
        deactivated() {
            document.body.style.overflow = "auto";
            window.mkoBackButton.bInputData = false;
            window.mkoBackButton.callback = null;
            window.onscroll = null;
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            searchBarHandleFn(type, bool){
                this.searchBarIsFocus = bool;
            },
            getTypeData(type) {
                let params = {
                    dwParentTypeID: type || ""
                };
                api.getQyType(params).then(res => {
                    if (!res) return;
                    let list = null;
                    if (type) {
                        this.options.dwChildType = res.response;
                        list = this.options.dwChildType;
                    } else {
                        this.options.dwType = res.response;
                        list = this.options.dwType;
                    }
                    list.unshift({
                        dwTypeID: "",
                        dwTypeName: "全部"
                    });
                });
            },
            getAttribute(data) {
            },
            getData() {
                this.noData = false;
                this.resError = false;
                let params = {
                    type: this.listType,
                    page: 1,
                    count: count
                };
                if (this.search) params['search'] = this.search;
                if (this.formData.dwType != "") {
                    params["dwTypeID"] = this.formData.dwType;
                }
                if (this.formData.dwSafeScore != 0) {
                    params["dwSafeScore"] = this.formData.dwSafeScore;
                }
                api.getQyList(params).then(res => {
                    this.$refs.loadmore.onTopLoaded();
                    if (!res) {
                        Indicator.close();
                        if (!this.formData.dwType) this.resError = true;
                        return;
                    }
                    if (res.code == 0) {
                        this.dwList.length = 0;
                        this.dwListSum = res.response.countNumber;
                        if (
                            res.response.datas === undefined ||
                            res.response.datas.length === 0
                        ) {
                            this.noData = true;
                        } else {
                            qy_datas[this.listType] = {
                                datas: res.response.datas,
                                pageItem: {
                                    page: res.response.page,
                                    pageCount: res.response.pageCount
                                }
                            };
                            this.dwList = res.response.datas;
                            this.noData = false;
                        }
                        group_id = this.$store.getters.groupId;
                    }
                    Indicator.close();
                });
            },
            loadBottom() {
                setTimeout(() => {
                    if (qy_datas[this.listType].pageItem.page == qy_datas[this.listType].pageItem.pageCount) {
                        Toast({
                            message: "暂无更多数据",
                            position: "middle",
                            duration: 1500
                        });
                        this.$refs.loadmore.onBottomLoaded();
                        return false;
                    }
                    qy_datas[this.listType].pageItem.page =
                        qy_datas[this.listType].pageItem.page + 1;
                    let params = {
                        type: this.listType,
                        page: qy_datas[this.listType].pageItem.page,
                        count: count,
                        search: this.search
                    };
                    if (this.formData.dwType != "") {
                        params["dwTypeID"] = this.formData.dwType;
                    }
                    if (this.formData.dwSafeScore != 0) {
                        params["dwSafeScore"] = this.formData.dwSafeScore;
                    }
                    api.getQyList(params).then(res => {
                        this.bottomAllLoaded = true;
                        this.$refs.loadmore.onBottomLoaded();
                        if (!res) {
                            Indicator.close();
                            if (!this.formData.dwType) this.resError = true;
                            return;
                        }
                        if (res.code == 0) {
                            if (
                                res.response.datas === undefined ||
                                res.response.datas.length === 0
                            ) {
                                Toast({
                                    message: "暂无更多数据",
                                    position: "middle",
                                    duration: 1500
                                });
                                this.noData = true;
                            } else {
                                Toast({
                                    message: "加载完成",
                                    position: "middle",
                                    duration: 1500
                                });
                                this.dwList = this.dwList.concat(res.response.datas);
                                this.noData = false;
                                qy_datas[this.listType] = {
                                    datas: this.dwList,
                                    pageItem: {
                                        page: res.response.page,
                                        pageCount: res.response.pageCount
                                    }
                                };
                            }
                        }
                        Indicator.close();
                    });
                }, 1500);
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            ctrlListType(type) {
                this.listType = type;
                this.bottomAllLoaded = false;
                Indicator.open({spinnerType: "fading-circle"});
                scrollTo(0, 0);
                this.getData();
            },
            searchData() {
                this.bottomAllLoaded = false;
                this.getData();
            },
            filterList() {
                this.bottomAllLoaded = false;
                this.popupShow = false;
                document.body.style.overflow = "auto";
                this.getData();
            },
            resetData() {
                this.bottomAllLoaded = false;
                let data = this.formData;
                for (let key in data) {
                    data[key] = "";
                }
                data.score = "全部";
                this.filterList();
            },
            calcScoreStyle,
            go(id, name, score) {
                if (
                    this.bottomStatus == "drop" ||
                    this.bottomStatus == "loading" ||
                    this.topStatus == "drop" ||
                    this.topStatus == "loading"
                ) {
                    return false;
                }
                this.$MKOPush(`qy_info/${id}?name=${name}&score=${score}`);
            },
            selecteEvent() {
                this.popupShow = true;
                document.body.style.overflow = "hidden";
            },
            onPopupShow(bool) {
                let self = this;
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = bool;
                if (window.mkoBackButton.bInputData)
                    window.mkoBackButton.callback = function () {
                        self.popupShow = false;
                    };
            },
            getScrollTop() {
                scroll_top[this.listType - 1] =
                    document.documentElement.scrollTop || document.body.scrollTop;
            },
            handleScroll() {
                this.$nextTick(() => {
                    let totalHeight = document.getElementById("pageWrapper").offsetHeight;
                    let scrollTop =
                        document.documentElement && document.documentElement.scrollTop
                            ? document.documentElement.scrollTop
                            : document.body.scrollTop;
                    let clientHeight = 0;
                    if (
                        document.body.clientHeight &&
                        document.documentElement.clientHeight
                    ) {
                        clientHeight =
                            document.body.clientHeight < document.documentElement.clientHeight
                                ? document.body.clientHeight
                                : document.documentElement.clientHeight;
                    } else {
                        clientHeight =
                            document.body.clientHeight > document.documentElement.clientHeight
                                ? document.body.clientHeight
                                : document.documentElement.clientHeight;
                    }
                    let scrollBottom = totalHeight - scrollTop - clientHeight;
                    this.bottomAllLoaded = scrollBottom <= 0 ? false : true;
                });
            },
            scoreColorStyle(score) {
                let val = parseFloat(score);
                if (!val) return "gradients90";
                if (val >= 90) {
                    return "gradients90";
                } else if (val >= 80) {
                    return "gradients80";
                } else if (val >= 70) {
                    return "gradients70";
                } else if (val >= 60) {
                    return "gradients60";
                } else {
                    return "gradients50";
                }
            },
            attributesFilter(item) {
                if (item.length >= 15) {
                    return `${item.substring(0, 4)}...`;
                } else {
                    return item;
                }
            }
        },
        components: {
            NoData,
            ResError,
            SearchBar
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .header-wrap {
        .icon-search {
            position: absolute;
            right: 14px;
            top: 11px;
            color: #fff;
        }
    }

    .qy-list-wrap {
        .page-wrap{
            padding-bottom: 0;
        }

        &.search-bar-is-focus {
            .mko-header {
                display: none;
            }
            .page-wrap {
                margin-top: 0 + @headerTop;
            }
        }

        .header-btn-wrap {
            position: fixed;
            top: 5px + @headerTop;
            left: 50%;
            transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            z-index: 100;
            width: 204px;
            font-size: 0;
            .header-btn {
                display: inline-block;
                width: 102px;
                height: 29px;
                padding: 5px 21px 4px 22px;
                border: 1px solid #fff;
                font-size: 14px;
                color: #fff;
                letter-spacing: 0;
                background: @mainBlue;
                &.active {
                    background: #fff;
                    color: @mainBlue;
                }
                &:first-child {
                    border-top-left-radius: @radiusM;
                    border-bottom-left-radius: @radiusM;
                }
                &:last-child {
                    border-left: 0;
                    border-top-right-radius: @radiusM;
                    border-bottom-right-radius: @radiusM;
                }
            }
        }
        .search-wrap {
        }
        .selected {
            width: 100%;
            height: 40px;
            color: @blueColor;
            background-color: #fff;
            margin-bottom: 14px;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            .selected-icon {
                position: relative;
                bottom: 5px;
                right: 5px;
                padding: 7px;
                font-size: 0;
                background: url("/static/icons/resource.png") -836px 0 no-repeat;
                background-size: 892px auto;
            }
            .count {
                font-size: 12px;
            }
        }
        .list {
            box-sizing: border-box;
            width: 100%;
            .border-btm(#eeeeee);
            &::after {
                bottom: -1px;
            }
            .item {
                position: relative;
                box-sizing: border-box;
                height: 60px;
                overflow: hidden;
                width: 100%;
                padding: 0 0 0 62px;
                background: #fff;
                &:last-child > .padding::after {
                    display: none;
                    content: none;
                }
                &:active {
                    /*opacity: 0.8;*/
                    background-color: rgba(255, 255, 255, 0.5);
                }
                .padding {
                    width: 100%;
                    padding: 0 14px 0 0;
                    .border-btm(#Eeeeee);
                    height: 60px;
                    box-sizing: border-box;
                    position: relative;
                    .score {
                        width: 34px;
                        height: 34px;
                        line-height: 38px;
                        font-size: 20px;
                        color: #ffffff;
                        letter-spacing: 0;
                        text-align: center;
                        position: absolute;
                        left: -48px;
                        margin: auto;
                        top: 0;
                        bottom: 0;
                        border-radius: 2px;
                        &.score-null {
                            font-size: 20px;
                        }
                    }
                    .info {
                        width: 100%;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        height: 34px;
                        .title {
                            font-size: 14px;
                            color: #333333;
                            letter-spacing: 0;
                            line-height: 14px;
                            padding-right: 28px;
                        }
                        .desc {
                            height: 17px;
                            line-height: 17px;
                            font-size: 12px;
                            color: #606060;
                        }
                    }
                    .icon {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        right: 14px;
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
                padding: 34px 0 100px 7px;
                max-height: 700px;
                bottom: 100px;
                &:after {
                    display: table;
                    content: "";
                }
                .main-wrap {
                    margin-bottom: 10px;
                    font-size: 12px;
                    &:after {
                        content: "";
                        display: block;
                        clear: both;
                    }
                    & + .main-wrap {
                        margin-top: 20px;
                        padding-top: 20px;
                        .border-top(#D8D8D8);
                        .radio-wrap {
                            padding-right: 7px;
                            /*max-height: 160px;*/
                            /*overflow: scroll;*/
                        }
                    }
                    .radio-wrap {
                        &.small-radio-wrap {
                            .radio {
                                float: left;
                                width: 84px;
                                height: 30px;
                                margin-right: 8px;
                                font-size: 13px;
                            }
                        }
                        .radio {
                            padding: 0 4px;
                            margin-bottom: 6px;
                            height: 30px;
                            border-radius: @radiusS;
                            background: #f0f2f5;
                            color: @textBase;
                            &.checked {
                                background: #fff;
                                border: 1px solid @textBlue;
                                color: @textBlue;
                            }
                            .mint-button-text {
                                font-size: 12px;
                                .sign {
                                    display: inline-block;
                                    position: relative;
                                    top: 1px;
                                    padding: 9px 12px 0 0;
                                    background: url(/static/icons/resource.png) -44px -61px
                                    no-repeat;
                                    background-size: 356px auto;
                                    &.has-gutter {
                                        right: 5px;
                                    }
                                }
                            }
                        }
                    }
                    .title {
                        margin: 0 0 10px;
                    }
                }
            }
            .footer-wrap {
                position: absolute;
                bottom: 0;
                width: 100%;
                .mint-button {
                    float: left;
                    width: 50%;
                    height: 39px;
                    border-radius: 0;
                    &.reset {
                        border: 1px solid #edeef1;
                        background: #fff;
                        color: @textBlue;
                    }
                    &.confirm {
                        background: #0398ff;
                        color: #fff;
                    }
                }
            }
        }
        .dw-attribute {
            display: inline-flex;
            padding: 6px 16px 0 0;
            position: relative;
            .attr-item {
                display: inline-block;
                margin-right: 4px;
                .main {
                    height: 14px;
                    border-radius: 2px;
                    display: table;
                    box-sizing: border-box;
                    position: relative;
                    span {
                        font-size: 11px;
                        color: #ffffff;
                        width: 100%;
                        text-align: center;
                        height: 14px;
                        line-height: 15px;
                        padding: 0 2px;
                        display: table-cell;
                        vertical-align: middle;
                    }
                    &.ellipsis {
                        width: 16px;
                        height: 14px;
                        position: relative;
                        .icon-ellipsis {
                            position: absolute;
                            left: 0;
                            right: 0;
                            margin: auto;
                            top: 0;
                            bottom: 0;
                        }
                    }
                }
                .disabled {
                    display: table;
                    height: 14px;
                    span {
                        color: #888;
                        padding-left: 0;
                        text-align: left;
                        display: table-cell;
                        vertical-align: middle;
                        font-size: 12px;
                        height: 14px;
                        line-height: 14px;
                    }
                }
            }
        }
    }
</style>



