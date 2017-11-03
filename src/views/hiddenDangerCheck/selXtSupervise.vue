<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="协同单位" fixed>
      <mt-button class="header-item" slot="left" icon="back" @click="changePage"></mt-button>
    </mt-header>
    <res-error v-if="resError"></res-error>
    <no-data v-if="noData"></no-data>
    <div class="page-wrap hdc-sel-wrap" v-show="!resError">
      <div class="data-wrap">
        <div @click="selData(item)" v-for="item in xtList">
          <mt-cell :title="item.jgName">
            <span class="sign-checked" v-show="item.sel" slot="icon"></span>
          </mt-cell>
        </div>
      </div>
      <div class="footer-wrap">
        <mt-button class="btn" size="large" :disabled="!formValid" @click="confirmData">确定</mt-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
</style>

<script>
  import {Indicator} from 'mint-ui';
  import api from 'api'
  import NoData from 'components/NoData/NoData.vue';
  import ResError from 'components/ResError/ResError.vue';
  export default{
    data() {
      return {
        //提示
        resError: false,
        noData: false,
        //数据
        xtList: [],
        formValid: false,
        formData: {
          xtId: [],
          xtName: []
        }
      }
    },
    props: ['dwId', 'selFormData'],
    watch: {
      formData: {
        handler: function (val) {
          this.formValidFn(val);
        },
        deep: true
      },
    },
    created() {
//      this.getData();
    },
    methods: {
      getData(){
        Indicator.open({spinnerType: 'fading-circle'});
        let params = {
          groupId: this.dwId
        };
        api.getJGList(params).then(res => {
          Indicator.close();
          if (!res) {
            this.resError = true;
            return;
          }
          let data = res.response;

          let list = this.xtList;
          list.length = 0;
          data.forEach((item, index) => {
            if (item) {
              if (item.groupId == this.$store.getters.groupId)
                return;
              list.push({
                jgId: item.groupId,
                jgName: item.dwName,
                sel: false
              })
            }
          });
          if (!list.length) {
            this.noData = true;
            return;
          }
        });
      },
      checkSelItem(){
        let list = {};
        this.formData = JSON.parse(JSON.stringify(this.selFormData));
        this.formData.xtId.forEach(item => {
          list[item] = 1;
        });
        this.xtList.forEach(item => {
          if (list[item.jgId]) {
            item.sel = true
          } else {
            item.sel = false
          }
        });
      },
      formValidFn(form){
        if (form.xtId.length != 0 && form.xtName.length != 0) {
          return this.formValid = true;
        }
        this.formValid = false;
      },
      selData(val){
        val.sel = !val.sel;
        let xtId = this.formData.xtId;
        let xtName = this.formData.xtName;
        if (val.sel) {
          xtId.push(val.jgId);
          xtName.push(val.jgName);
        } else {
          for (let i = 0; i < xtId.length; i++) {
            if (xtId[i] === val.jgId) {
              xtId.splice(i, 1);
              xtName.splice(i, 1);
            }
          }
        }
      },
      confirmData(){
        this.$emit('sel', this.formData);
        this.changePage();
      },
      changePage(){
//        this.$emit('changePage', 'main');
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


