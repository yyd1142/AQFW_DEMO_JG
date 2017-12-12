<template>
    <div style="margin-bottom: 64px;">
        <div class="placeholder-item" :style="{backgroundColor:calcHeadColor(score,headColors)}"></div>
        <mko-header title="安全服务云" :background-color="calcHeadColor(score,headColors)">
            <div class="header-right" slot="custom">
                <span class="more-message-count" v-if="hasMessageDataClass"></span>
                <i class="icon-message" @click="routerLink({url:'/message'})"></i>
            </div>
        </mko-header>
            <div class="page-wrap home-wrap" ref="wrapper" id="pageWrapper" v-if="!resError">
                <mt-loadmore class="home-load-view" 
                    :bottom-method="loadBottom" 
                    @bottom-status-change="handleBottomChange" 
                    :bottom-all-loaded="bottomAllLoaded" 
                    ref="loadmore"
                    :auto-fill="autoFill">
                    <!--安全得分-->
                    <score-banner-jg :title="jgName" :score="score" :datas="scoreDatas"></score-banner-jg>
                    <!--管功能区-->
                    <ul class="actions-table-view">
                        <li class="actions-table-cell" v-for="item in actions" @click="routerLink(item)">
                            <i :class="item.class"></i>
                            <span v-text="item.text"></span>
                        </li>
                    </ul>
                    <!--新闻-->
                    <mko-light-nav-bar :tabs="newsTabs" v-model="activeTab"></mko-light-nav-bar>
                    <div class="page-loadmore-wrapper">
                        <ul class="page-infinite-list">
                            <li v-for="item in newsDatas" class="page-infinite-listitem" @click="goNewsInfo(item)">
                                <div class="padding">
                                    <img v-lazy="domain + item.fileId"/>
                                    <div class="news-title" v-text="titleFilters(item.title)"></div>
                                    <div class="news-date">{{item.createDate | formatDate('YYYY-MM-DD')}}</div>
                                </div>
                            </li>
                            <li class="not-data" v-if="newsDatas.length == 0">暂无内容</li>
                        </ul>
                    </div>
                </mt-loadmore>
            </div>
        <tabs actived="home"></tabs>
        <res-error v-if="resError"></res-error>
    </div>
</template>

<script src="./home.js"></script>
<style lang="less" src="./home.less" scoped></style>
