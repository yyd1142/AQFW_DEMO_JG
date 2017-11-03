<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="风险上报" fixed>
      <mt-button class="header-item" slot="left" icon="back" @click="back"></mt-button>
    </mt-header>
    <div class="page-wrap hdc-main-wrap" v-show="onPage==='main'">
      <div class="info-wrap">
        <div class="cell">
          <div class="title">风险单位</div>
          <div class="value" :class="{'cell-btn':!formData.groupId}" @click="changePage('selDw')">
            {{formData.dwName || '选择'}}
            <i class="icon iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="cell">
          <div class="title">风险位置</div>
          <span class="value" :class="{'cell-btn':!formData.yhPosition}" v-show="formData.groupId"
                @click="changePage('selPosition')">{{formData.yhPosition || '选择'}}
            <i class="icon iconfont icon-youjiantou"></i>
          </span>
        </div>

        <div class="cell-input" v-show="formData.yhPosition">
          <span class="title">详细地址</span>
          <input class="input" type="text" v-model="formData.yhPositionDetail"/>
        </div>

        <div class="cell">
          <div class="title">协同部门</div>
          <span class="value" v-show="formData.groupId" :class="{'cell-btn':!formData.xtSupervise}"
                @click="onXtPage">{{formData.xtDWName || '选择'}}
            <i class="icon iconfont icon-youjiantou"></i>
          </span>
        </div>
        <div class="cell">
          <div class="title">处置期限</div>
          <span class="value" :class="{'cell-btn':!formData.limitedTime}" @click="ctrlDatePicker">
            {{formatDate(formData.limitedTime) || '选择'}}
            <i class="icon iconfont icon-youjiantou"></i>
          </span>
        </div>
      </div>
      <div class="content-wrap">
        <div class="desc">
          <textarea v-model="formData.yhDesc" placeholder="请输入风险描述" @input="onInputData"></textarea>
        </div>
        <photo-box :photo-list="photoList" :max='8' @addPhotoEvent="sheetShow=true"
                   @removePhotoEvent="removePhoto()"></photo-box>
      </div>
      <div class="footer-wrap">
        <mt-button class="btn" size="large" @click="postHideDanger">提交</mt-button>
      </div>
    </div>
    <!--选择页面-->
    <sel-xt :selFormData="xtFormData" :dwId="formData.groupId" @sel="selXt" @changePage="onPage='main'"
            v-show="onPage==='selXt'" ref="selXtPage"></sel-xt>
    <sel-dw @sel="selDw" @changePage="onPage='main'"  v-if="onPage==='selDw'"></sel-dw>
    <sel-position :dwId="formData.groupId" @sel="selPosition" @changePage="onPage='main'" 
                  v-if="onPage==='selPosition'"></sel-position>
    <!--<sel-level @changePage="onPage='main'" v-show="onPage==='selLevel'"></sel-level>-->
    <!--日期选择器-->
    <mt-datetime-picker ref="picker" type="date" :startDate="startDate" v-model="pickerVal"
                        @confirm="getLimitedTime"></mt-datetime-picker>
    <!--添加图片-->
    <mt-actionsheet :actions="actions" v-model="sheetShow"></mt-actionsheet>
  </div>
</template>


<script>
  import {Indicator, Toast, MessageBox} from 'mint-ui';
  import moment from 'moment'
  import api from 'api'
  import apiconf from 'apiconf'
  import PhotoBox from 'components/photoBox/photoBox.vue';
  import selDw from './selDw.vue';
  import selPosition from './selPosition.vue';
  import selXt from './selXtSupervise.vue';
  //  import selLevel from './selLevel.vue';
  import * as types from '../../store/mutation-types'
  var isClick = false;
  export default {
    data() {
      return {
        //控制
        sheetShow: false,
        actions: [],
        onPage: this.$route.query.page || 'main',
        //数据
        photoList: [],
        formValid: false,
        formData: {
          //          yhType: 1,
          //          userName: this.$store.getters.userName,
          //          sbGroupId: this.$store.getters.groupId,
          groupId: '',
          dwName: '',
          yhPosition: '',
          yhPositionDetail: '',
          limitedTime: '',
          yhDesc: '',
          xtSupervise: '',
          xtDWName: '',
          yhFilesID: ''
        },
        xtFormData: {
          xtId: [],
          xtName: []
        },
        //日期选择
        pickerVal: '',
        startDate: new Date()
      }
    },
    watch: {
      onPage: function (page) {
        window.mkoBackButton.bInputData = page == 'main';
      },
      $route() {
        this.onPage = this.$route.query.page || 'main';
      }
    },
    mounted() {
      //      this.formData.userName = this.$store.getters.userName;
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '从相册中选择',
        method: this.choosePhoto
      }];
    },
    activated() {
      this.onInputData();
    },
    deactivated() {
      window.mkoBackButton.bInputData = false;
    },
    methods: {
      //选择
      selDw(val) {
        this.formData.yhPosition = '';
        this.formData.yhPositionDetail = '';
        this.formData.xtSupervise = '';
        this.formData.xtDWName = '';
        this.formData.groupId = val.groupId;
        this.formData.dwName = val.dwName;
      },
      selPosition(val) {
        this.formData.yhPosition = val.build + '' + val.floor;
      },
      deactivated() {
        window.mkoBackButton.bInputData = false;
        try {
          MessageBox.close();
        }
        catch (err) {
          alert(err);
        }
      },
      selXt(form) {
        this.xtFormData = JSON.parse(JSON.stringify(form));
        this.formData.xtSupervise = form.xtId.join(',');
        this.formData.xtDWName = form.xtName.join(',');
      },
      changePage(page) {
        this.$MKOPush(`/hidden_danger_check?page=${page}`);
        //        this.onPage = page;

      },
      onXtPage() {
        this.changePage('selXt');
        let xtPage = this.$refs.selXtPage;
        if (xtPage.xtList.length === 0) {
          xtPage.getData();
        } else {
          xtPage.checkSelItem();
        }
      },
      ctrlDatePicker() {
        this.$refs.picker.open();
      },
      getLimitedTime() {
        this.formData.limitedTime = moment(this.pickerVal).format("YYYY-MM-DD");
      },
      //照片
      takePhoto() {
        this.$takePhoto((photo) => {
          this.photoList.push(photo.url);
        });
      },
      choosePhoto() {
        this.$choosePhoto((photos) => {
          for (let photo of photos) {
            this.photoList.push(photo.url);
          }
        });
      },
      removePhoto(index) {
        this.photoList.splice(index, 1);
      },
      //filters
      formatDate(date) {
        if (!date) {
          return ''
        }
        date = moment(date).format('YYYY-MM-DD');
        return date;
      },
      //表单
      formValidFn() {
        let data = this.formData;
        let NonValid = {
          yhFilesID: 1,
          xtSupervise: 1,
          xtDWName: 1
        };
        for (let key in data) {
          if (!NonValid[key] && data[key] === "") {
            this.formValid = false;
            return;
          }
        }
        this.formValid = true;
      },
      postHideDanger() {
        for (let i in this.formData) {
          if (this.formData[i] == '') {
            switch (i) {
              case 'yhFilesID':
                break;
              case 'xtSupervise':
                break;
              case 'xtDWName':
                break;
              default:
                return false;
            }
          }
        }
        if (this.photoList.length == 0) {
          Toast({
            message: '请拍照上传',
            duration: 1000
          });
          return false;
        }
        if (isClick) {
          return false;
        }
        isClick = true;
        Indicator.open({spinnerType: 'fading-circle'});
        let self = this;
        //        let form = this.formData;
        let form = {
          "yhType": 1,
          "userName": this.$store.getters.userName,
          "sbGroupId": this.$store.getters.groupId,
          "groupId": this.formData.groupId,
          "yhPosition": `${this.formData.yhPosition},${this.formData.yhPositionDetail}`,
          "limitedTime": this.formData.limitedTime,
          "yhDesc": this.formData.yhDesc,
          "xtSupervise": this.formData.xtSupervise,
          "xtDWName": this.formData.xtDWName
        };
        let doUploadSuccess = function (resourceId) {
          if (resourceId != '') {
            form['yhFilesID'] = resourceId;
          }
          api.addYhk(form).then(res => {
            Indicator.close();
            isClick = false;
            if (res) {
              MessageBox({
                title: '提交成功'
              }).then(res => {
                if (res === 'confirm') {
                  window.mkoBackButton.bInputData = false;
                  self.$destroy();
                  self.$MKOJump('/enter/home');
                }
              });
            } else {
              Toast({
                message: '提交数据失败',
                duration: 1000
              });
            }
          });
        };
        let doDumpYHKData = function () {
          if (self.photoList.length <= 0) {
            doUploadSuccess('');
            return;
          }
          let uploadURL = `${apiconf.resourcesDomain}/uploads`;
          self.$uploadImages(self.photoList, uploadURL, function (result) {
            if (result.error && result.error.length > 0) {
              Toast({
                message: '图片上传失败',
                duration: 1000
              });
              return false;
            }
            if (result.resourceId && result.resourceId.length > 0) {
              doUploadSuccess(result.resourceId);
            }
          });
        };
        this.$getMobileNetworkType(function (result) {
          if (result == "unknown") {
            MessageBox.alert('当前网络不可用，请确保网络正常...');
            return;
          } else if (result == "3G/4G") {
            let opts = {
              title: '提示',
              message: '当前3G/4G网络，提交数据会消耗流量，建议WIFI环境下上传。',
              showCancelButton: true,
              confirmButtonText: '立即提交',
              cancelButtonText: '稍后提交'
            }
            MessageBox(opts).then(action => {
              if (action != 'confirm')
                return;
              doDumpYHKData();
            });
          } else if (result == "wifi") {
            doDumpYHKData();
          }
        });
      },
      back() {
        MessageBox({
          title: '真的要返回吗',
          message: '此页面信息将被清空',
          showCancelButton: true,
        }).then(action => {
          if (action === 'confirm') {
            window.mkoBackButton.bInputData = false;
            this.$destroy();
            this.$MKOPop();
          }
        });
      },
      onInputData() {
        let that = this;
        window.mkoBackButton = {};
        window.mkoBackButton.bInputData = true;
        window.mkoBackButton.callback = function () {
          MessageBox({
            title: '真的要返回吗',
            message: '此页面信息将被清空',
            showCancelButton: true,
          }).then(action => {
            if (action === 'confirm') {
              window.mkoBackButton.bInputData = false;
              that.$destroy();
              that.$MKOPop();
            }
          });
        }
      }
    },
    components: {
      selDw,
      selPosition,
      selXt,
      //      selLevel,
      PhotoBox
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .hdc-main-wrap {
    .info-wrap {
      margin-bottom: 14px;
      .cell {
        padding: 0 14px;
        height: 44px;
        line-height: 43px;
        font-size: 14px;
        background: #fff;
        .border-top(@borderGray);
        .title {
          float: left;
        }
        .value {
          max-width: 70%;
          float: right;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon {
            font-size: 13px;
            margin-left: 5px;
            color: #E3E6E7;
          }
          &.cell-btn {
            height: 44px;
            line-height: 44px;
            color: @textBlue;
            .icon {
              color: @textBlue;
            }
          }
        }
      }
      .cell-input {
        position: relative;
        width: 100vw;
        height: 44px;
        background-color: #ffffff;
        line-height: 43px;
        padding: 0 0 0 14px;
        .border-top(@borderGray);
        .title {
          width: 30vw;
          font-size: 14px;
          float: left;
          color: #050505;
        }
        .input {
          width: 70vw - 14px;
          border-style: none;
          height: 40px;
          float: right;
          font-size: 14px;
          TEXT-ALIGN: RIGHT;
          PADDING-RIGHT: 14PX;
        }
      }
    }
    .content-wrap {
      margin-top: 14px;
      padding: 11px 0 16px;
      background: @bgWhite;
      .desc {
        margin-bottom: 14px;
        padding: 0 14px;
        textarea {
          width: 100%;
          height: 104px;
          font-size: 14px;
          display: block;
          box-sizing: border-box;
          border: 1px solid rgba(216, 216, 216, 0.48);
          border-radius: 3px;
          outline: none;
        }
        .mint-field {
          background-image: none;
          .mint-cell-wrapper {
            background-image: none;
            .mint-cell-value {
              textarea {
                min-height: 100px;
              }
            }
          }
        }
      }
    }
    .footer-wrap {
      position: fixed;
      width: 100%;
      bottom: 0;
      .btn {
        background: @redColor;
        color: @bgWhite;
        &.is-disabled {
          background: lighten(@redColor, 10%);
          opacity: 1;
        }
      }
    }
  }
</style>
