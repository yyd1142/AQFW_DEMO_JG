<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" fixed title="建筑信息">
      <div slot="left" @click="back">
        <mt-button class="header-item" icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="page-wrap build-list-wrap"  v-if="!isLoading&&!notData">
      <ul class="com-list">
        <li class="com-list-cell" @click="linkPath(item.jzID)"  v-for="(item, index) in datas">
          <span class="com-list-item" v-text="item.jzName"></span>
          <i class="com-list-sign"></i>
        </li>
      </ul>
    </div>
    <no-data  v-if="notData"></no-data>
  </div>
</template>

<script>
  import api from 'api'
  import {NoData} from 'components'
  import {Indicator, Toast} from 'mint-ui'
  var needUpdate = true;
  var isTOPLoad = false;
  var updateDatas = {};
  var _groupId = '';
  export default {
    data() {
      return {
        isLoading: false,
        notData: false,
        datas: [],
        autoFill: false,
        topAllLoaded: false,
        topStatus: '',
        wrapperHeight: 0
      }
    },
    activated() {
      this.$nextTick(() => {
        if (_groupId != this.$route.params.id) {
          this.jzList();
        }
      })
    },
    methods: {
      linkPath(id) {
        this.$MKOPush(`/build_info/${id}`);
      },
      jzList() {
        this.isLoading = true;
        Indicator.open({spinnerType: 'fading-circle'});
        let params = {
          groupId: this.$route.params.id
        };
        api.getJZList(params).then(result => {
          _groupId = this.$route.params.id
          if (result.code === 0) {
            if (isTOPLoad) {
              Toast({
                message: '刷新成功',
                position: 'middle',
                duration: 1500
              });
            }
            if (result.response.length <= 0) {
              updateDatas = [];
              this.notData = true;
            } else {
              updateDatas = result.response;
              this.datas = result.response;
              this.notData = false;
            }
            needUpdate = false;
          }
          Indicator.close();
          this.isLoading = false;
        });
      },
      back(){
        this.$MKOPop();
      }
    },
    components: {
      NoData
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .build-list-wrap {
    .list {

    }
  }
</style>
