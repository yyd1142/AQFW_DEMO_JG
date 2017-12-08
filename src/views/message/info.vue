<template>
    <div class="message-info">
        <div class="placeholder-item"></div>
        <mko-header title="消息详情" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap message-detail-wrap" v-if="messagesInfoShow">
            <div class="main-msg">
                <div class="content-msg" v-html="messageInfo.content"></div>
            </div>
            <mko-button size="large" @click="goInfo" v-if="extentData.name != ''">{{extentDataName(extentData.name)}}</mko-button>
        </div>
    </div>
</template>

<script>
import api from "api";
import { formatDate } from "filters";
var _id = "";

export default {
  data() {
    return {
      messageInfo: {},
      extentData: {
        name: ""
      },
      messagesInfoShow: true,
      messageType: ""
    };
  },
  activated() {
    if (_id != this.$route.params.pid) {
      this.updateMessageStatus();
      this.getData();
    }
    setTimeout(() => {
      this.messagesInfoShow = true;
    }, 200);
  },
  deactivated() {
    this.messagesInfoShow = false;
  },
  methods: {
    getData() {
      api
        .getMsgInfo({
          id: this.$route.params.pid
        })
        .then(res => {
          _id = this.$route.params.pid;
          if (res.code === 0) {
            this.messageInfo = res.response;
            if (
              res.response.extentData != null &&
              res.response.extentData.indexOf("}") > 0
            ) {
              this.extentData = JSON.parse(res.response.extentData);
            } else {
              this.extentData = {
                name: ""
              };
            }
          }
        });
    },
    updateMessageStatus() {
      if (this.$route.query.status == 0) {
        sessionStorage.setItem(
          "MESSAGEDETAIL_READ_STATUS",
          JSON.stringify({
            id: this.$route.params.pid,
            status: 1
          })
        );
      }
    },
    back() {
      this.$MKOPop();
    },
    linkPath(routeOption) {
      this.$MKOPush(routeOption);
    },
    extentDataName(val) {
      if (this.extentData.name == "") return false;
      if (this.extentData.name == "yhk") {
        this.messageType = 1;
        return "查看风险";
      } else if (this.extentData.name == "notice") {
        this.messageType = 2;
        return "查看通知公告";
      } else {
        this.messageType = 0;
      }
    },
    goInfo() {
      if (this.messageType == 1) {
        this.linkPath({
          path: `/hidden_danger_info/${this.extentData.id}`
        });
      } else if (this.messageType == 2) {
        this.linkPath({
          path: `/notice/${this.extentData.noticeId}`,
          query: {
            from: "notification"
          }
        });
      } else {
      }
    }
  }
};
</script>

<style lang="less">
@import "../../config.less";
.message-info {
  .message-detail-wrap {
    padding-bottom: 0;
    background-color: #ffffff;
    height: 100vh;
    padding-top: 40px + @headerTop;
    margin-top: 0;
    .msg-btn {
      background-color: @blueColor;
      text-align: CENTER;
      font-size: 16px;
      color: #fff;
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 10;
      display: table;
      span {
        line-height: 44px;
        height: 44px;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }

  .message-title {
    width: 100%;
    margin: 0 auto;
    h3 {
      font-size: 18px;
      color: #232323;
      margin: 0;
      padding: 0;
    }
    .date {
      font-size: 14px;
      color: #b5b5b5;
      float: right;
      margin: -14px 0 0 0;
    }
  }

  .main-msg {
    width: 100%;
    padding: 14px 14px 0 14px;
    box-sizing: border-box;
    margin: 0 auto 14px auto;
  }

  .content-msg {
    display: block;
    color: #333333;
    font-size: 16px;
    line-height: 24px;
  }
  .footer-btn {
    position: fixed;
    z-index: 15;
    bottom: 0;
  }
}
</style>
