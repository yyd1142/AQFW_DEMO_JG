<template>
    <div class="time-line-main">
        <ul class="record-wrap">
            <li class="record-cell" v-for="item in datas">
                <div class="dingding icon-device-succ">
                    <span></span>
                </div>
                <div class="headImage icon-head-image-small"></div>
                <div class="padding">
                    <div class="description" v-text="item.description"></div>
                    <div class="content" v-text="item.content" v-if="item.content"></div>
                    <div class="time">{{item.createTime | formatDate('YYYY-MM-DD HH:mm')}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["status", "datas"]
};
</script>

<style lang="less">
@import "../../config.less";
.time-line-main {
  .record-wrap {
    width: 100%;
    background-color: #ffffff;
    .record-cell {
      position: relative;
      padding: 0 0 0 96px;
      box-sizing: border-box;
      &:after {
        content: "";
        position: absolute;
        background: #eeeeee;
        width: 2px;
        left: 22px;
        height: 100%;
        top: 30px;
        z-index: 1;
      }
      &:last-child:after {
        content: none;
      }
      &:last-child > .padding:after {
        content: none;
      }
      .dingding {
        position: absolute;
        left: 12px;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
      }
      .headImage {
        position: absolute;
        left: 46px;
        margin: auto;
        top: 0;
        bottom: 0;
      }
      .padding {
        width: 100%;
        padding: 0 14px 14px 0;
        position: relative;
        .border-btm(@borderGray);
        .description {
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          width: 100%;
          padding-top: 14px;
        }
        .content {
          width: 100%;
          color: #666666;
          font-size: 12px;
          line-height: 14px;
          margin-top: 6px;
        }
      }
      .time {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 12px;
        width: 100%;
        padding-top: 6px;
      }
    }
  }
}
</style>
