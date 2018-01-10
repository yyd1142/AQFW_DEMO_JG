<template>
    <div id="reply" class="notice-reply-index">
        <div class="placeholder-item"></div>
        <mko-header title="回复列表" left-icon="icon-back" @handleLeftClick="back" right-icon-text="刷新" @handleRightClick="refresh"></mko-header>
        <div id="replyPage" class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :label="item.text" :activied="item.actived" @handleTabClick="tab(item, index)" v-for="(item, index) in tabs"></mko-tab-item>
            </mko-nav-bar>
            <div ref="wrapper">
              <mko-double-cell 
                  :class="index == replyDatas.length - 1 ? 'no-border' : ''"
                  :title="item.dwName" 
                  :label="`${item.replyName || '暂无'}`" 
                  :val="replyStatus(item)"
                  @click="linkPath(item)" 
                  v-for="item, index in replyDatas" is-link>
              </mko-double-cell>
              <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="!notData"></mko-load-more>
            </div>
        </div>
        <no-data class="not-data-wrap"  v-if="notData"></no-data>
    </div>
</template>

<script>
import api from "api";
import { NoData } from "components";
import { Toast, Indicator } from "mint-ui";
var count = 10;
var updateDatas = [];
export default {
  data() {
    return {
      tabs: [
        { text: "已接收", actived: "actived", value: "isRead" },
        { text: "未处理", actived: "", value: 0 },
        { text: "已处理", actived: "", value: 1 }
      ],
      isSelected: false,
      notData: false,
      popupShow: false,
      replyDatas: [],
      options: {
        isReply: [
          { label: "已接收", value: "isRead" },
          { label: "未处理", value: 0 },
          { label: "已处理", value: 1 }
        ]
      },
      formData: {
        isReply: "isRead"
      },
      replyText: "",
      page: 1,
      pageItem: {},
      scrollBottom: 0
    };
  },
  activated() {
    this.getNoticeReplyList();
  },
  deactivated() {
    
  },
  methods: {
    back() {
      this.$MKOPop();
    },
    resetData() {
      this.isSelected = false;
      this.popupShow = false;
      this.formData.isReply = "isRead";
    },
    confirm() {
      let text = "未知";
      this.isSelected = true;
      this.popupShow = false;
      if (this.formData.isReply === "isRead") {
        text = "已接收";
      } else {
        let replyTexts = ["未处理", "已处理"];
        text = replyTexts[this.formData.isReply];
      }
      this.replyText = text;
      this.getNoticeReplyList();
    },
    chooseReplyStatus(item) {
      this.formData.isReply = item.value;
    },
    getNoticeReplyList() {
      let params = {
        m: "replyList",
        noticeId: this.$route.params.pid,
        page: 1,
        count: count
      };
      if (this.formData.isReply != "isRead") {
        params["isReply"] = this.formData.isReply;
      }
      api.getNoticeReplyList(params).then(result => {
        Indicator.close();
        if (!result) return false;
        if (result.code == 0) {
          this.$APPUpdateTime("reply");
          if (result.response.datas.length < 0) {
            this.notData = true;
            this.noLoadMore = true;
          } else {
            this.notData = false;
            this.noLoadMore = false;
          }
          this.pageItem = {
            page: result.response.page,
            pageCount: result.response.pageCount,
            count: result.response.count,
            countNumber: result.response.countNumber
          };
          this.replyDatas = result.response.datas;
          updateDatas = this.replyDatas;
        }
      });
    },
    replyStatus(item) {
      if (item.isReply == 1) {
        return "已处理";
      } else {
        return "未处理";
      }
    },
    linkPath(item) {
      this.$MKOPush({
        path: "/noticeReplyDetail",
        query: {
          replyItem: item
        }
      });
    },
    // 分页
    loadBottom() {
      if (this.pageItem.pageCount == this.pageItem.page) {
        //总页数少于1页，不支持分页功能
        Toast({
          message: "暂无更多数据",
          position: "middle",
          duration: 1500
        });
        this.noLoadMore = true;
        return;
      }
      this.pageItem.page = this.pageItem.page + 1;
      let params = {
        m: "replyList",
        noticeId: this.$route.params.pid,
        page: this.pageItem.page,
        count: count
      };
      if (this.formData.isReply != "isRead") {
        params["isReply"] = this.formData.isReply;
      }
      Indicator.open({ spinnerType: 'fading-circle' });
      api.getNoticeReplyList(params).then(result => {
        if (result.code == 0) {
          Indicator.close()
          if (result.response.datas.length <= 0) {
            Toast({
              message: "暂无更多数据",
              position: "middle",
              duration: 1500
            });
            this.noLoadMore = true;
          } else {
            Toast({
              message: "加载完成",
              position: "middle",
              duration: 1500
            });
            this.replyDatas = this.replyDatas.concat(result.response.datas);
            updateDatas = this.replyDatas;
            this.noLoadMore = false;
          }
        } else {
          Indicator.close()
        }
      });
    },
    refresh() {
      Indicator.open({ spinnerType: "fading-circle" });
      setTimeout(() => {
        this.noLoadMore = true;
        this.replyDatas = [];
        this.isSelected = false;
        this.formData.isReply = "isRead";
        this.tabs = [
          { text: "已接收", actived: "actived", value: "isRead" },
          { text: "未处理", actived: "", value: 0 },
          { text: "已处理", actived: "", value: 1 }
        ];
        this.getNoticeReplyList();
        Toast({
          message: "刷新完成",
          position: "middle",
          duration: 1500
        });
      }, 1500);
    },
    tab(item, index) {
      for (let i in this.tabs) {
        if (i == index) {
          this.tabs[i].actived = "actived";
        } else {
          this.tabs[i].actived = "";
        }
      }
      this.formData.isReply = item.value;
      this.getNoticeReplyList();
    }
  },
  components: {
    NoData
  }
};
</script>

<style lang="less">
@import "../../config.less";

.notice-reply-index {
  .page-wrap {
    .mint-loadmore > .mint-loadmore-content > .no-border {
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
</style>

