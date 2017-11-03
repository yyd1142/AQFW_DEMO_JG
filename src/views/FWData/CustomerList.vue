<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="签约客户" fixed>
      <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <no-data  v-if="noData"></no-data>
    <div class="page-wrap customer-list-wrap" v-show="!resError">
      <!--<mt-search placeholder="搜索"></mt-search>-->
      <div class="data-wrap" v-show="!noData">
        <div @click="go(`/customer_info/${item.qyGroupId}/${item.fwGroupId}`)"></div>
        <mt-cell :title="item.dwName" is-link
                  v-for="item in customList"></mt-cell>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .customer-list-wrap {
    .data-wrap {
      margin-bottom: 14px;
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
  import {Indicator} from 'mint-ui';
  export default{
    data() {
      return {
        //提示
        resError: false,
        noData: false,
        //数据
        customList: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(){
        this.noData = false;
        Indicator.open({spinnerType: 'fading-circle'});
        let parmas = {
          groupId: this.$route.params.id
        };
        api.getCustomList(parmas).then(res => {
          Indicator.close();
          if (!res) {
            this.resError = true;
            return;
          }
          this.customList = res.response.datas;
          if (!this.customList.length)
            this.noData = true;
        });
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
      ResError
    }
  }
</script>


