<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="通知公告" left-icon="icon-back" @handleLeftClick="back" right-icon-text="统计" @handleRightClick="$MKOPush('/statisticsNotice')"></mko-header>
        <div class="page-wrap notice-list-wrap" id="pageWrapper">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="notice-table-view">
                    <mko-double-cell :title="`${item.status == 0?notReadIcon:''}${item.title || '标题为空'}`"
                                     :label="item.createTime | formatDate" is-link
                                     @click="linkPath(item)" v-for="item in notices">
                    </mko-double-cell>
                </ul>

            </mt-loadmore>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script src="./js/notice.js">

</script>

<style lang="less">
    @import "../../config.less";

    .notice-list-wrap {
        .not-read-item {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: @blueColor;
            display: inline-block;
            margin-right: 6px;
        }
        .not-notice-data {
            margin-top: 40px;
        }
    }

    .notice-table-view {
        width: 100%;
        margin: 10px auto 0 auto;
        background-color: #fff;
        .not-read-item {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: @blueColor;
            display: inline-block;
            margin-right: 6px;
        }
        .notice-table-cell {
            /*width: 100%;*/
            height: 50px;
            background-color: #fff;
            .border-btm(@baseBorder);
            padding: 6px 14px 0 0;
            margin-left: 14px;
            box-sizing: border-box;
            position: relative;
            .not-read-item {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: @blueColor;
                display: inline-block;
                margin-right: 6px;
            }
            .title {
                width: 100%;
                font-size: 14px;
                color: #232323;
                padding-right: 120px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .from {
                width: 100%;
                font-size: 12px;
                color: #A0A0A0;
                margin-top: 2px;
            }
            .time {
                width: auto;
                position: absolute;
                right: 14px;
                color: #606060;
                font-size: 12px;
                top: 6px;
            }
        }
    }
</style>
