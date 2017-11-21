<template>
    <div style="margin-bottom: 64px;">
        <div class="placeholder-item" :style="{backgroundColor:calcHeadColor(score,headColors)}"></div>
        <mko-header title="安全服务云" :background-color="calcHeadColor(score,headColors)">
            <div class="header-right" slot="custom">
                <span class="more-message-count" v-if="hasMessageDataClass"></span>
                <i class="icon-message" @click="routerLink({url:'/message'})"></i>
            </div>
        </mko-header>
        <mt-loadmore class="home-load-view"
                     :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     :bottom-all-loaded="bottomAllLoaded" ref="loadmore"
                     :auto-fill="autoFill">
            <div class="page-wrap home-wrap" ref="wrapper" :style="{ height: wrapperHeight + 'px', marginTop: 0 }"
                 v-if="!resError">
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
                <ul class="news-table-view">
                    <li class="news-table-cell" :class="item.selected" v-text="item.text" @click="tab(item, index)"
                        v-for="(item, index) in newsTabs"></li>
                </ul>
                <div class="page-loadmore-wrapper">
                    <ul class="page-infinite-list">
                        <li v-for="item in newsDatas" class="page-infinite-listitem" @click="goNewsInfo(item)">
                            <img v-lazy="domain + item.fileId"/>
                            <div class="news-title" v-text="titleFilters(item.title)"></div>
                            <div class="news-date">{{item.createDate | formatDate('YYYY-MM-DD')}}</div>
                        </li>
                        <li class="not-data" v-if="newsDatas.length == 0">暂无内容</li>
                    </ul>
                    <!--<div slot="bottom" class="mint-loadmore-bottom">
                      <span class="loading-item">
                        <mt-spinner type="snake"></mt-spinner>加载中
                      </span>
                  </div>-->
                </div>
            </div>
        </mt-loadmore>
        <tabs actived="home"></tabs>
        <res-error v-if="resError"></res-error>
    </div>
</template>

<script src="./home.js"></script>
<style lang="less" src="./home.less" scoped></style>
