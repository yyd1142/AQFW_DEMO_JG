<template>
    <div class="notice-index">
        <div class="placeholder-item"></div>
        <mko-header title="通知公告" left-icon="icon-back" @handleLeftClick="back" right-icon-text="统计" @handleRightClick="$MKOPush('/statisticsNotice')"></mko-header>
        <div class="page-wrap notice-list-wrap" id="pageWrapper">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="autoFill">
                <mko-double-cell :class="index == notices.length - 1 ? 'no-border' : ''" :title="`${item.status == 0 ? notReadIcon:''}${item.title || '标题为空'}`" :label="item.createTime | formatDate" is-link @click="linkPath(item)" v-for="item, index in notices"></mko-double-cell>
            </mt-loadmore>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
    </div>
</template>

<script src="./js/notice.js">
</script>

<style lang="less">
@import "../../config.less";
.notice-index {
  .notice-list-wrap {
    padding-top: 10px;
    .mint-loadmore > .mint-loadmore-content > .mko-double-cell {
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
}
</style>
