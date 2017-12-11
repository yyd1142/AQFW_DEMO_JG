<template>
    <div class="notice-relpy-info">
        <div class="placeholder-item"></div>
        <mko-header title="回复详情" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap reply-detail-wrap">
            <div class="main">
                <mko-cell :title="replyItem.dwName" :val="replyStatus(replyItem)" main="left"></mko-cell>
                <mko-cell title="回复人" :val="replyItem.replyName || '暂无'"></mko-cell>
                <mko-cell title="阅读时长" :val="replyItem.checkTime || '暂无'"></mko-cell>
                <mko-cell title="回执内容" :val="replyItem.conment || '暂无'" @click="showAllConment(replyItem.conment)"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      notData: false,
      replyItem: {}
    };
  },
  activated() {
    this.$nextTick(() => {
      this.replyItem = this.$route.query.replyItem;
    });
  },
  methods: {
    back() {
      this.$MKOPop();
    },
    replyStatus(item) {
      if (item.isReply == 1) {
        return "已处理";
      } else {
        return "未处理";
      }
    },
    showAllConment(text) {
      if (text) {
        this.$MKODialog({ msg: text });
      }
    }
  }
};
</script>

<style lang="less">
@import "../../config.less";
.notice-relpy-info {
  .reply-detail-wrap {
    .main {
      width: 100%;
      padding-top: 10px;
      .reply-content {
        width: 100%;
        padding: 0 14px;
        min-height: 100px;
        .content {
          color: #666666;
        }
      }
    }
  }
}
</style>

