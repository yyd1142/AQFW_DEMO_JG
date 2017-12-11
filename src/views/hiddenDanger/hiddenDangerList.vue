<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="风险管理" left-icon="icon-back" @handleLeftClick="back">
            <div class="yhk-add-icon" slot="custom" @click="linkPath('/hidden_danger_check')" v-if="$route.query['is_jg']">
                <i class="icon-add"></i>
            </div>
        </mko-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap hidden-danger-page-wrap" v-show="!resError" id="pageWrapper">

            <mko-nav-bar>
                <mko-tab-item :label="item.text" :activied="item.actived" @handleTabClick="tab(item, index)"
                              v-for="(item, index) in tabs"></mko-tab-item>
            </mko-nav-bar>

            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="notice-table-view">

                    <mko-double-cell :title="item.yhDesc || '暂无风险描述'" is-link
                                     :label="`上报人：${item.employeeName || '暂无'}（${item.sbDWName || '暂无上报单位'}）`"
                                     v-for="item in hiddenDangers" @click="linkPath('/hidden_danger_info/' + item.id)">
                        <div style="color: #666666">{{item.createDate | formatDate('YYYY-MM-DD HH:mm')}}</div>
                    </mko-double-cell>

                </ul>
            </mt-loadmore>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script src="./hiddenDanger.js"></script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../config.less";

    .hidden-danger-page-wrap {
        padding-bottom: 0;
        margin-top: @headerTop + @headerHeight;
    }

    .notice-table-view {
        width: 100%;
        margin: 10px auto 0;
    }

    .yhk-add-icon {
        position: absolute;
        right: 14px;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 20px;
    }
</style>
