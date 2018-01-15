<template>
    <div class="hidden-danger-info">
        <div class="placeholder-item"></div>
        <mko-header title="风险详情" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap hd-info-wrap" v-show="!resError">
            <task-summary :task-info="taskInfo"></task-summary>
            <mko-cell title="联系上报人" :val="yhkInfo.phone" phone></mko-cell>
            <mko-cell title="风险位置" :val="yhkInfo.yhPosition"></mko-cell>
            <ul class="device-table-view">
                <li class="device-table-cell device-table-border">
                    <div class="padding">
                        <div class="device-item border-bottom"> <span class="title">处置需求</span></div>
                    </div>
                    <div class="desc-wrap" :style="{ paddingBottom: photos.length <= 0 ? '14px' : 0 }">
                        <div class="text">
                            <div class="desc">{{yhkInfo.changedDesc || '暂无处置需求'}}</div>
                        </div>
                        <photo-box :read-only="true" :photo-list="photos" v-if="photos.length > 0"></photo-box>
                    </div>
                </li>
            </ul>
            <task-build-title title="处置记录详情" v-if="yhkInfo.situation && yhkInfo.situation.length > 0"></task-build-title>
            <time-line :datas="yhkInfo.situation" v-if="yhkInfo.situation && yhkInfo.situation.length > 0"></time-line>
            <!-- <mko-button class="bottom-btn" type="danger" size="large" no-radius @click="routerLink()">更新风险状态</mko-button> -->
        </div>
    </div>
</template>

<script>
import api from "api";
import apiconf from "apiconf";
import { NoData, ResError, PhotoBox, TaskSummary, TimeLine, TaskBuildTitle } from "components";
import { Indicator } from "mint-ui";
import { formatDate } from "filters";
import moment from "moment";
var _id = "";
export default {
  data() {
    return {
      //提示
      resError: false,
      noData: false,
      hiddenDanger: true,
      //数据
      yhkInfo: {
          situation: []
      },
      photos: []
    };
  },
  computed: {
    taskInfo() {
      let taskInfo = [
        {
          key: "上报人",
          value: this.yhkInfo.employeeName
        },
        {
          key: "上报日期",
          value: moment(this.yhkInfo.createDate).format("YYYY-MM-DD")
        },
        {
          key: "处置期限",
          value: this.yhkInfo.limitedTime ? moment(this.yhkInfo.limitedTime).format("YYYY-MM-DD") : '暂无'
        },
        {
          key: "风险描述",
          value: this.yhkInfo.yhDesc || '无描述'
        }
      ];
      return taskInfo;
    }
  },
  activated() {
    this.getData();
    setTimeout(() => {
      this.hiddenDanger = true;
    }, 200);
  },
  deactivated() {
    this.hiddenDanger = false;
  },
  methods: {
    getData() {
      api.getYhkInfo({
          id: this.$route.params.pid
        }).then(res => {
          _id = this.$route.params.pid;
          if (!res) {
            this.resError = true;
            return;
          }
          this.yhkInfo = res.response;
          if(this.yhkInfo.situation && this.yhkInfo.situation.length > 0) {
            this.yhkInfo.situation.map(item => {
                item.description = `${item.userName} ${this.filtersStatus(item.yhStatus)}`;
                item.content = item.yhExplain || '暂无描述';
                item.createTime = item.updateDate;
                return item;
            })
          }
          if (!this.yhkInfo) {
            this.noData = true;
          } else {
            this.photos = [];
            this.fetchImages(this.yhkInfo.yhFilesID);
          }
        });
    },
    getPhoto(fileListId) {
      if (!fileListId) return;
      let that = this;
      api.getResourcesInfo(fileListId).then(res => {
        if (!res) return;
        let list = res.response;
        list.forEach(item => {
          getFileInfo(item.resouceId);
        });
      });
      let getFileInfo = function(fileId) {
        let path = `${apiconf.resourcesDomain}/${fileId}`;
        that.photoList.push(path);
      };
    },
    routerLink() {
      this.$MKOPush(
        `/edit_hidden_danger?yhkId=${this.$route.params.pid}&yhStatus=${this
          .yhkInfo.yhStatus}`
      );
    },
    fetchImages(resourceId) {
      if (resourceId && resourceId.length > 0) {
        api.getByPath(`/info/${resourceId}`)({}).then(res => {
          if (res.code != 0) return;
          if (res.response && res.response.length > 0) {
            for (let image of res.response) {
              this.photos.push(`${apiconf.resourcesDomain}/${image.resouceId}`);
            }
          }
        });
      }
    },
    filtersStatus(val) {
      if (!val) return "";
      let type = ["未处置", "已处置", "处置中"];
      return type[val - 1];
    },
    back() {
      this.$MKOPop();
    }
  },
  components: {
    NoData,
    ResError,
    PhotoBox,
    TaskSummary,
    TimeLine,
    TaskBuildTitle
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../config.less";
.hidden-danger-info {
    margin-bottom: 64px;
  .hd-info-wrap {
    padding-bottom: 0;
    .bottom-btn {
      position: fixed;
      bottom: 0;
    }
  }
  .device-table-view {
    width: 100%;
    .border-btm(#eeeeee);
    &::after {
      bottom: -1px;
    }
    .device-table-cell {
      width: 100%;
      background-color: #f8f8f8;
      &:last-child > .padding > .border-bottom::after {
        content: none;
        display: none;
      }
      .padding {
        width: 100%;
        padding: 0 0 0 14px;
        background-color: #fff;
        .device-item {
          width: 100%;
          height: 44px;
          line-height: 44px;
          position: relative;
          .dingding-icon {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            position: absolute;
            left: -36px;
            top: 0;
            bottom: 0;
            margin: AUTO;
            span {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto;
              left: 0;
              right: 0;
            }
          }
          .yellow-icon {
            background: rgba(255, 170, 68, 0.2);
            span {
              background: #ffaa44;
            }
          }
          .green-icon {
            background: rgba(85, 204, 51, 0.2);
            span {
              background: #55cc33;
            }
          }
          .red-icon {
            background: rgba(255, 102, 102, 0.2);
            span {
              background: #ff6666;
            }
          }
          .title {
            font-size: 16px;
            color: #333333;
            letter-spacing: 0px;
            width: 100%;
            padding-right: 60px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            float: left;
            height: 44px;
            line-height: 44px;
          }
          .value {
            font-size: 14px;
            color: #666666;
            letter-spacing: 0px;
            position: absolute;
            padding-right: 14px;
            top: 0;
            bottom: 0;
            right: 0;
            &.yellow-font {
              color: #ffaa44;
            }
          }
          .icon {
            position: absolute;
            right: 14px;
            bottom: 16px;
            z-index: 20;
          }
          .cancel-btn {
            font-size: 14px;
            color: @mainBlue;
            letter-spacing: 0px;
            position: absolute;
            z-index: 22;
            right: 14px;
            width: 40px;
            text-align: right;
          }
          .device-status {
            font-size: 14px;
            color: #666666;
            letter-spacing: 0px;
            position: ABSOLUTE;
            right: 14px;
            &.red-font {
              color: #ff6666;
            }
          }
        }
      }
      .desc-wrap {
        width: 100%;
        &.jiantou {
          position: relative;
          &::before {
            content: "";
            width: 14px;
            height: 14px;
            background-color: #f8f8f8;
            position: absolute;
            right: 22px;
            top: -7px;
            transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            /* IE 9 */
            -moz-transform: rotate(45deg);
            /* Firefox */
            -webkit-transform: rotate(45deg);
            /* Safari 和 Chrome */
            -o-transform: rotate(45deg);
          }
        }
        .text {
          width: 100%;
          padding: 14px 14px 0 14px;
          position: relative;
          height: 94px;
          textarea {
            width: 100%;
            height: 80px;
            background: #f2f2f2;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            padding: 8px;
            box-sizing: border-box;
          }
          .word-number {
            font-size: 12px;
            color: #999999;
            letter-spacing: 0px;
            position: absolute;
            bottom: 6px;
            right: 24px;
            .red-font {
              color: #ff4949;
            }
          }
          .desc {
            opacity: 0.72;
            background: #f2f2f2;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            height: 80px;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0px;
            line-height: 18px;
            padding: 8px;
          }
        }
        .photo-wrap {
          background: none;
          .border-btm(#eeeeee);
        }
      }
    }
  }
}
</style>
