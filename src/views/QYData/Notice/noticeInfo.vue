<template>
    <div class="notice-info">
        <div class="placeholder-item"></div>
        <mko-header title="通知公告" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap message-detail-wrap">
            <div class="main-msg">
                <div class="message-title">
                    <h3>{{noticeItem.title || '暂无标题'}}</h3>
                </div>
                <div class="time-wrap" :style="{ marginBottom: contentFiles.length <= 0 ? '20px' : '4px' }">
                    {{noticeItem.releaseDw || '未知'}} {{noticeItem.createTime | formatDate}}
                </div>
                <div class="attachment-list" :class="index == contentFiles.length - 1 ? 'last-child' : ''" v-for="item, index in contentFiles" v-if="contentFiles.length > 0" @click="downloadFile(item.resouceId)">
                    <div class="title-table">下载附件：<span>{{`${item.title}.${item.type}`}}</span></div>
                </div>
                <div id="contentMsg" class="content-msg" v-html="noticeItem.content"></div>
            </div>
            <!--回复内容-->
            <div class="reply-main" v-if="noticeItem.isReply == 1">
                <div class="reply-title">回复内容：</div>
                <ul class="reply-table-view">
                    <li class="reply-table-cell">{{replyItem.name || '未知用户'}}: {{replyItem.conment}}</li>
                </ul>
                <div v-if="hasData">
                    <!--<div class="fujian-title">附件：</div>-->
                    <photo-box max="8" :photo-list="files" :read-only="true"></photo-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "api";
import { formatDate } from "filters";
import { Toast } from "mint-ui";
import { PhotoBox } from "components";
import apiconf from "apiconf";
var _id = "";
var isClick = false;
export default {
  data() {
    return {
      //回执
      receipt: [],
      receiptType: 0,
      receiptText: "",
      replyContent: "",
      //数据
      noticeItem: {
        isRead: 0,
        isReply: 0
      },
      needUpdate: false,
      contentFiles: [], //内容自带附件
      files: [], //回复的附件
      hasData: false,
      photos: [],
      actions: [],
      sheetShow: false,
      replyItem: {},
      needUploadPhoto: false,
      checkTime: ""
    };
  },
  activated() {
    this.$nextTick(() => {
      api.getReceiveNoticesDetail(this.$route.params.pid).then(result => {
        if (result.code == 0) {
          this.noticeItem = result.response;
          this.contentFiles = [];
          if (result.response.attachment) {
            api.getResourcesInfo(result.response.attachment).then(result => {
              if (!result) return false;
              if (result.code == 0) {
                this.contentFiles = result.response;
              }
            });
          }
          if (result.response.receipt.indexOf("3") >= 0) {
            this.needUploadPhoto = true; //需要上传附件
          }
          this.fetchReceipt();
          this.receiptType = 0;
          this.changeReceiptType();
          this.getReplyInfo();
        }
      });
      this.updateNoticeStatus();
    });
  },
  deactivated() {
    try {
      window.MKODialogShow = false
    } catch (err) {
      alert(err);
    }
    this.replyContent = "";
    this.replyItem = {};
    this.needUploadPhoto = false;
  },
  methods: {
    updateNoticeStatus() {
      if (this.$route.query.status == 0) {
        sessionStorage.setItem(
          "NOTICEDETAIL_READ_STATUS",
          JSON.stringify({
            id: this.$route.params.pid,
            status: 1
          })
        );
      }
    },
    //获取回执需求
    fetchReceipt() {
      this.receipt = [];
      let str = this.noticeItem.receipt + "";
      if (str.length != 1) {
        this.receipt = this.noticeItem.receipt.split(",").map(item => {
          return parseInt(item);
        });
      } else {
        this.receipt.push(parseInt(str));
      }
    },
    changeReceiptType() {
      let typeLength = 3;
      for (let i = 1; i <= typeLength; i++) {
        for (let item of this.receipt) {
          if (i > this.receiptType && i == item) {
            this.receiptType = i;
            return;
          }
        }
      }
      this.receiptTextFr(this.receiptType);
      this.receiptType = 100;
    },
    receiptTextFr(val) {
      let str = ["阅读该通知", "回复该通知", "上传附件"];
      if (val - 1 < 0) {
        this.receiptText = str[0];
      } else {
        this.receiptText = str[val - 1];
      }
      this.receiptText = this.receiptText || "处理该通知";
    },
    //getData
    getReplyInfo() {
      if (this.noticeItem.isReply == 1) {
        let params = {
          m: "replyInfo",
          id: this.$route.params.pid
        };
        api.getReplyInfo(params).then(result => {
          if (result.code == 0) {
            this.replyItem = result.response;
            this.getResourcesInfo(result.response.attachment);
          }
        });
      } else {
        this.hasData = false;
        this.files = [];
      }
    },
    getResourcesInfo(params) {
      if (params == "" || params == null) {
        this.hasData = false;
        return false;
      }
      api.getResourcesInfo(params).then(result => {
        if (!result) return false;
        if (result.code == 0) {
          this.hasData = true;
          if (result.response.length <= 0) {
            this.files = [];
          } else {
            let photos = [];
            result.response.forEach(item => {
              photos.push(`${apiconf.resourcesDomain}/${item.resouceId}`);
            });
            this.files = photos;
          }
        } else {
          this.hasData = false;
        }
      });
    },
    //反馈动作
    downloadFile(fileId) {
      this.$MKOJumpOutsideURL(`${apiconf.resourcesDomain}/${fileId}`);
    },
    checkNotice(item) {
      if (item.isRead != 1) {
        this.$MKODialog({
            title: '确定已全部阅读？',
            cancelBtn: true,
            cancelText: '取消'
        }).then(msg => {
            if (msg == 'confirm') {
                let params = {
                  m: "isRead",
                  id: item.id,
                  isRead: true
                };
                api.noticeIsRead(params).then(result => {
                  if (result.code == 0) {
                    this.noticeItem.readEndTime = result.response.readEndTime;
                    this.noticeItem.readStartTime = result.response.readStartTime;
                    if (this.receipt.length == 1 && this.receipt[0] == 1) {
                      this.doReply(1);
                    }
                    this.needUpdate = true;
                    this.noticeItem.isRead = 1;
                  }
                });
            }
        })
      }
    },
    replyNotice(item) {
      if (item.isReply != 1) {
        if (this.replyContent == "") {
          this.$MKODialog({ msg: '请输入回复内容'})
          return false;
        }
        if (this.needUploadPhoto && this.photos.length <= 0) {
          this.$MKODialog({ msg: '请上传图片'})
          return false;
        }
        this.$MKODialog({
            title: '确认回复吗？',
            cancelBtn: true,
            cancelText: '取消'
        }).then(msg => {
            if (msg == 'confirm') {
              if (this.needUploadPhoto) {
                this.uploadPhoto();
              } else {
                this.doReply();
              }
            }
        })
      }
    },
    doReply(onlyRead) {
      let self = this;
      let params = {
        id: self.$route.params.pid,
        userName: self.$store.getters.userName,
        checkTime: self.getCheckTime()
      };
      if (self.replyContent != "") {
        params["conment"] = self.replyContent;
      }
      api.noticeReply(params).then(result => {
        if (!result) return false;
        if (result.code == 0) {
          if (!onlyRead) {
            this.$MKODialog({ msg: '回复成功'})
            this.noticeItem.isReply = 1;
          }
          this.resetData();
          this.getReplyInfo();
        } else {
          Toast({
            message: "回复失败",
            duration: 1000
          });
        }
      });
    },
    //附件
    // 拍照
    takePhoto() {
      this.$takePhoto(photo => {
        this.photos.push(photo.url);
      });
    },
    // 选照片
    choosePhoto() {
      this.$choosePhoto(photos => {
        for (let photo of photos) {
          this.photos.push(photo.url);
        }
      });
    },
    removePhoto(index) {
      this.photos.splice(index, 1);
    },
    uploadPhoto() {
      let self = this;
      let doUploadSuccess = function(resourceId) {
        let params = {
          id: self.$route.params.pid,
          userName: self.$store.getters.userName,
          attachment: resourceId,
          checkTime: self.getCheckTime()
        };
        if (self.replyContent != "") {
          params["conment"] = self.replyContent;
        }
        api.noticeReply(params).then(result => {
          if (!result) return false;
          if (result.code == 0) {
            self.$MKODialog({
              title: '上传成功',
              cancelBtn: true,
              cancelText: '取消'
            }).then(msg => {
                if (msg == 'confirm') {
                  self.resetData();
                  self.noticeItem.isReply = 1;
                  self.getReplyInfo();
                  self.changeReceiptType();
                }
            })
          } else {
            Toast({
              message: "上传失败",
              duration: 1000
            });
          }
        });
      };
      // doUploadSuccess('628f4c6004ad43a291635e3380fc5b8301000000');
      let doUploadPhotos = function() {
        if (self.photos.length <= 0) {
          this.$MKODialog({ msg: "请上传图片" });
          return;
        }
        if (isClick) {
          return false;
        }
        isClick = true;
        let uploadURL = `${apiconf.resourcesDomain}/uploads`;
        self.$uploadImages(self.photos, uploadURL, function(result) {
          if (result.error && result.error.length > 0) {
            Toast({
              message: "图片上传失败",
              duration: 1000
            });
            return false;
          }
          if (result.resourceId && result.resourceId.length > 0) {
            doUploadSuccess(result.resourceId);
          }
        });
      };
      this.$getMobileNetworkType(function(result) {
        if (result == "unknown") {
          this.$MKODialog({ msg: '当前网络不可用，请确保网络正常...'})
          return;
        } else if (result == "3G/4G") {
          this.$MKODialog({
            title: '提示',
            msg: '当前3G/4G网络，提交数据会消耗流量，建议WIFI环境下上传。',
            cancelBtn: true,
            cancelText: '稍后提交',
            confirmText: '立即提交'
          }).then(msg => {
              if (msg == 'confirm') {
                doUploadPhotos();
              }
          })
        } else if (result == "wifi") {
          doUploadPhotos();
        }
      });
    },
    //基本操作
    resetData() {
      isClick = false;
      this.photos = [];
    },
    back() {
      this.$MKOPop();
    },
    getCheckTime() {
      let _start = new Date(this.noticeItem.readStartTime);
      let _end = new Date(this.noticeItem.readEndTime);
      let _cha = _end.getTime() - _start.getTime();

      //计算出相差天数
      let days = Math.floor(_cha / (24 * 3600 * 1000));

      //计算出小时数
      let leave1 = _cha % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));

      //计算相差秒数
      let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000);
      return (
        (days ? days + "天" : "") +
        (hours ? hours + "时" : "") +
        (minutes ? minutes + "钟" : "") +
        seconds +
        "秒"
      );
    }
  },
  components: {
    PhotoBox
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../../config.less";
.notice-info {
  .message-detail-wrap {
    /*padding-bottom: 0;*/
    background-color: #ffffff;
    height: 100vh;
    padding-top: 40px+ @headerTop;
    margin-top: 0;
    .message-title {
      width: 100%;
      margin: 20px auto;
      h3 {
        font-size: 22px;
        color: #333;
        margin: 0;
        padding: 0 14px 0 14px;
        text-align: left;
        font-weight: bold;
        line-height: 30px;
      }
    }
    .main-msg {
      width: 100%;
      margin: 0 auto;
      .banner {
        width: 100%;
        margin: 0 auto 12px auto;
        padding: 0 14px;
        height: 250px;
        img {
          width: 100%;
          display: block;
          height: 250px;
        }
      }
    }

    .time-wrap {
      width: 100%;
      height: 12px;
      color: #999999;
      font-size: 12px;
      margin: 0 0 4px 0;
      padding: 0 14px;
    }

    .content-msg {
      display: block;
      color: #333333;
      font-size: 14px;
      width: 100%;
      white-space: normal;
      padding: 0 14px;
      p {
        font-size: 16px !important;
        line-height: 24px !important;
        text-align: justify;
        padding: 0 !important;
      }
    }
    .content-file {
      padding-bottom: 40px;
      .file {
        overflow-wrap: break-word;
        text-decoration: underline;
      }
    }

    .fujian-title {
      width: 100%;
      font-size: 16px;
      color: #333333;
    }
    .fujian-table-view {
      width: 100%;
      margin: 10px auto;
    }
    .fujian-table-cell {
      width: 100%;
      font-size: 14px;
      color: #444444;
      img {
        width: 25vw;
      }
    }
    .reply-main {
      width: 100%; // padding: 10px;
      background-color: #fafafa;
      border-radius: 3px;
      .reply-title {
        width: 100%;
        font-size: 16px;
        color: #333333;
        padding: 0 10px;
      }
      .reply-table-view {
        width: 100%;
        margin: 10px auto;
      }
      .reply-table-cell {
        width: 100%;
        font-size: 13px;
        color: #888;
        padding: 0 10px;
      }
      .photo-wrap {
        background: #fafafa;
      }
    }
    .footer {
      width: 100%;
      height: 40px;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 10;
      opacity: 1;
      &.btn {
        border-radius: 0;
        font-size: 14px;
      }
      &.reply {
        display: flex;
        display: -webkit-flex;
        background: @bgGray;
        .ipt {
          box-sizing: border-box;
          flex: 1;
          -webkit-flex: 1;
          height: 30px;
          margin: 5px 3px 0;
          border: 1px solid @borderGray;
        }
        .btn {
          flex: 0 0 80px;
          -webkit-flex: 0 0 80px;
          border-radius: 0;
          font-size: 14px;
          height: 30px;
          margin: 5px 3px 0 0;
        }
      }
    }
    .footer-btn {
      position: fixed;
      z-index: 15;
      bottom: 0;
    }
    .is-disabled {
      background-color: @disabled-bg;
    }
    .attachment-list {
      width: 100%;
      margin-bottom: 4px;
      padding: 0 14px;
      &.last-child {
        margin-bottom: 20px;
      }
      .title-table {
        color: @mainBlue;
        font-size: 12px;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
