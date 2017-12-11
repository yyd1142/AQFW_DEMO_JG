<template>
    <div class="notice-statistics">
        <div class="placeholder-item"></div>
        <mko-header title="统计情况" left-icon="icon-back" @handleLeftClick="back" right-icon-text="刷新" @handleRightClick="refresh"></mko-header>
        <div class="page-wrap" id="pageWrapper">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <mko-double-cell 
                    :class="index == notices.length - 1 ? 'no-border' : ''"
                    v-for="item, index in notices" 
                    @click="linkPath(item)"
                    :title="item.title || '标题为空'"
                    :label="`${item.releaseDW || '未知'} ${item.releaseCount || 0}家已接收 ${isProcessCount(item)}家已处理`"
                    :val="formatDate(item.createTime)" is-link> 
                </mko-double-cell>
            </mt-loadmore>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script src="./js/statistics.js">
</script>

<style lang="less">
@import "../../config.less";
.notice-statistics {
    .page-wrap {
        padding-top: 10px;
        .mint-loadmore>.mint-loadmore-content>.mko-double-cell {
            &.no-border {
                .border-btm(#eeeeee);
                &::after {
                    bottom: -1px;
                }
                .cell {
                    &:after {
                        display: none;
                        content: none;
                    }
                }
            }
        }
    }
  .not-notice-data {
    margin-top: 40px;
  }
}
</style>
