<template>
    <div>
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="统计情况">
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
            <mt-button class="header-item" slot="right" @click="refresh">刷新</mt-button>
        </mt-header>
        <div class="page-wrap" id="pageWrapper">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <ul class="notice-table-view">
                    <li class="notice-table-cell" v-for="item in notices" @click="linkPath(item)">
                        <div class="title">
                            <i class="not-read-item" v-if="item.status == 0"></i>{{item.title || '标题为空'}}
                        </div>
                        <div class="from">
                            <span class="dw">{{item.releaseDW || '未知'}}</span>
                            <span class="release">接收单位：{{item.releaseCount}}家</span>
                            <span class="process">已处理：{{isProcessCount(item)}}家</span>
                        </div>
                        <div class="time">{{item.createTime | formatDate}}</div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script src="./js/statistics.js">

</script>

<style lang="less" scoped>
@import "../../config.less";
.notice-table-view {
    width: 100%;
    margin: 0 auto;
    .notice-table-cell {
        width: 100%;
        height: 50px;
        background-color: #fff;
        .border-btm(@borderColor);
        padding: 6px 14px 0 14px;
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
            display: table;
            span {
                display: table-cell;
            }
            .dw {
                text-align: left;
            }
            .release {
                text-align: center;
            }
            .process {
                text-align: right;
            }
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

.not-notice-data {
    margin-top: 40px;
}
</style>