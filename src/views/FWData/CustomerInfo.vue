<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="华润新鸿基" fixed>
      <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <no-data  v-if="noData"></no-data>
    <div class="page-wrap customer-info-wrap" v-show="!noData||!resError">
      <div class="data-wrap">
        <mt-cell title="业务范围" :value="customInfo.serviceScope"></mt-cell>
        <mt-cell title="联系人" :value="customInfo.linkman"></mt-cell>
        <mt-cell title="联系电话" :value="customInfo.linkphone"></mt-cell>
        <mt-cell title="合同签订日期" :value="calcDate(customInfo.createTime)"></mt-cell>
        <mt-cell title="合同起止日期"
                 :value="`${calcDate(customInfo.qyStartDate)} - ${calcDate(customInfo.qyEndDate)}`"></mt-cell>
      </div>
      <div class="data-wrap file" v-show="customInfo.contractFile">
        <mt-cell title="服务合同文件" to="/customer_info" is-link></mt-cell>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .customer-info-wrap {
    .data-wrap {
      margin-bottom: 14px;
      .mint-cell {
        min-height: 44px;
        .mint-cell-wrapper {
          padding: @cellPadding;
          font-size: 14px;
          letter-spacing: 0;
          color: #232323;
          .mint-cell-value {
            color: #606060;
          }
        }
      }
      &.file {
        .mint-cell {
          min-height: 30px;
        }
      }
    }
  }
</style>

<script>
  import api from 'api'
  import NoData from 'components/NoData/NoData.vue';
  import ResError from 'components/ResError/ResError.vue';
  import {Indicator} from 'mint-ui';
  export default{
    data() {
      return {
        //数据
        customInfo: {},
        //提示
        resError: false,
        noData: false,
      }
    },
    created() {
      Indicator.open({spinnerType: 'fading-circle'});
      this.getData();
    },
    methods: {
      getData(){
        let parmas = {
          qyGroupId: this.$route.params.qyId,
          fwGroupId: this.$route.params.fwId
        };
        api.getCustomInfo(parmas).then(res => {
          Indicator.close();
          if (!res) {
            this.resError = true;
            return;
          }
          this.customInfo = res.response;
          if (!this.customInfo)
            this.noData = true;
        });
      },
      calcDate(val){
        if (!val)
          return '';

        let date = val.split(" ")[0].split('-');
        return `${date[0]}年${date[1]}月${date[2]}日`
      },
      back(){
        this.$MKOPop();
        Indicator.close();
      }
    },
    components: {
      NoData,
      ResError
    }
  }
</script>


