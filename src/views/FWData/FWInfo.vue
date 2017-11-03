<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" :title="fwInfo.dwName" fixed>
      <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <no-data  v-if="noData"></no-data>
    <div class="page-wrap fw-info-wrap" v-show="!noData&&!resError">
      <div class="info-wrap">
        <div class="info">
          <div class="title">{{fwInfo.dwName}}</div>
          <div class="desc">资质：{{fwInfo.zzInfoValue}}</div>
        </div>
        <div class="score">
          <star type="square" score="4.5"></star>
        </div>
      </div>
      <div class="score-wrap">
        <div class="title">388份评分</div>
        <div class="item"  v-for="(n,index) in [80,60,30,6,10]">
          <star type="normal" :score="5-index"></star>
          <mt-progress :value="n" :bar-height="2"></mt-progress>
        </div>
      </div>
      <div class="data-wrap">
        <div @click="go('/customer_list/'+fwInfo.groupId)">
          <mt-cell title="签约客户 " is-link></mt-cell>
        </div>
        <!--<mt-cell title="管理员"></mt-cell>-->
        <!--<mt-cell title="管理人联系电话"></mt-cell>-->
      </div>
      <!--<div class="data-wrap">-->
      <!--<mt-cell title="账号"></mt-cell>-->
      <!--<mt-cell title="单位编码"></mt-cell>-->
      <!--<mt-cell title="单位名称"></mt-cell>-->
      <!--<mt-cell title="组织机构代码"></mt-cell>-->
      <!--<mt-cell title="单位地址"></mt-cell>-->
      <!--<mt-cell title="行政区域"></mt-cell>-->
      <!--<mt-cell title="业务范围"></mt-cell>-->
      <!--<mt-cell title="资质信息"></mt-cell>-->
      <!--<mt-cell title="资质证书"></mt-cell>-->
      <!--<mt-cell title="发证部门"></mt-cell>-->
      <!--</div>-->
      <!--<div class="data-wrap">-->
      <!--<mt-cell title="单位电话"></mt-cell>-->
      <!--<mt-cell title="单位传真"></mt-cell>-->
      <!--<mt-cell title="邮政编码"></mt-cell>-->
      <!--<mt-cell title="邮箱"></mt-cell>-->
      <!--</div>-->
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .fw-info-wrap {
    > div {
      background: #fff;
    }
    .info-wrap {
      position: relative;
      display: block;
      box-sizing: border-box;
      height: 50px;
      padding: 6px 14px;
      .border-btm(#E0E0E0);
      .score {
        position: absolute;
        top: 6px;
        right: 8px;
      }
      .info {
        letter-spacing: 0;
        .title {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #232323;
        }
        .desc {
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          color: #B7B7B7;
        }
      }
    }
    .score-wrap {
      height: 144px;
      padding: 10px 14px;
      margin-bottom: 10px;
      .title {
        margin-bottom: 6px;
        font-size: 10px;
        letter-spacing: 0;
        color: #606060;
      }
      .item {
        display: flex;
        margin-bottom: 3px;
        .star {
          flex: 0 0 95px;
          -webkit-flex: 0 0 95px;
        }
        .mt-progress {
          flex: 1;
          -webkit-flex: 1;
          height: 18px;
          margin-left: 17px;
          .mt-progress-content {
            position: relative;
            bottom: 1px;
            .mt-progress-progress {
              background: #FC6842;
            }
          }
        }
      }
    }
    .data-wrap {
      margin-bottom: 10px;
      .mint-cell {
        min-height: 44px;
        .mint-cell-wrapper {
          padding: @cellPadding;
          font-size: 14px;
          letter-spacing: 0;
          color: #232323;
        }
      }
    }
  }
</style>

<script>
  import api from 'api'
  import NoData from 'components/NoData/NoData.vue';
  import ResError from 'components/ResError/ResError.vue';
  import Star from 'components/Star/Star.vue'
  import {Indicator} from 'mint-ui';
  export default{
    data() {
      return {
        //提示
        resError: false,
        noData: false,
        //数据
        fwInfo: {}
      }
    },
    created() {
      Indicator.open({spinnerType: 'fading-circle'});
      this.getData();
    },
    methods: {
      getData(){
        let params = {
          groupId: this.$route.params.id
        };
        api.getFwInfo(params).then(res => {
          Indicator.close();
          if (!res) {
            this.resError = true;
            return;
          }
          this.fwInfo = res.response || '';
          if (!this.fwInfo)
            this.noData = true;
        })
      },
      go(path){
        this.$MKOPush(path);
      },
      back(){
        this.$MKOPop();
        Indicator.close();
      }
    },
    components: {
      NoData,
      ResError,
      Star
    }
  }
</script>


