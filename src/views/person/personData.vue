<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" fixed title="个人资料">
      <mt-button class="header-item" slot="left" icon="back" @click="back"></mt-button>
      <mt-button class="header-item edit" :class="{'disabled-btn':!isValidate}" slot="right" @click="saveInfo"
                 v-if="isEdit">保存
      </mt-button>
      <mt-button class="header-item edit" slot="right" @click="editInfo">{{isEdit ? '取消' : '编辑'}}</mt-button>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <div class="page-wrap person-data-wrap" v-show="!resError">
      <div ref="wrapper">
        <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange" :auto-fill="autoFill">
          <div :style="{ height: wrapperHeight + 'px'}">
            <div class="com-data-wrap" :class="{'is-edit':isEdit}">
              <div class="disabled">
                <mt-cell title="头像">
                  <div class="avatar-wrap">
                    <div class="default"></div>
                    <!--<img class="avatar" src="./logo.png">-->
                  </div>
                </mt-cell>
              </div>
              <mt-cell title="姓名" :value="personData.name">
                <span class="sign" v-if="isEdit">*</span>
                <input class="ipt" type="text" :placeholder="holderText" v-model="formData.name" v-if="isEdit">
              </mt-cell>
              <mt-cell title="电话" :value="personData.phone">
                <a class="phone" :href="'tel:' + personData.phone"
                   v-if="!isEdit&&personData.phone">{{personData.phone}}</a>
                <span class="sign" v-if="isEdit">*</span>
                <input class="ipt" type="text" :placeholder="holderText" v-model="formData.phone" v-if="isEdit">
              </mt-cell>
              <div @click="popupPickerShow('gender')">
                <span></span>
                <mt-cell title="性别" :value="isEdit?genderFilter(formData.gender):genderFilter(personData.gender)"
                         :is-link="isEdit"></mt-cell>
              </div>
              <div @click="datePickerShow">
                <span></span>
                <mt-cell title="生日"
                         :value="isEdit?formatDate(bornDate,'YYYY-MM-DD'):formatDate(personData.bornDate,'YYYY-MM-DD') || '暂无'"
                         :is-link="isEdit"></mt-cell>

              </div>
              <mt-cell title="身份证号" :value="personData.idNumber||'暂无'">
                <input class="ipt" type="text" :placeholder="holderText" v-model="formData.idNumber" v-if="isEdit">
              </mt-cell>
              <mt-cell title="职位" :value="personData.position||'暂无'">
                <input class="ipt" type="text" :placeholder="holderText" v-model="formData.position" v-if="isEdit">
              </mt-cell>
            </div>
            <div class="com-data-wrap" :class="{'is-edit':isEdit}">
              <mt-cell title="单位名称" :value="personData.dwName" class="disabled"></mt-cell>
              <mt-cell title="单位类型" :value="personData.type|JgDwType" class="disabled"></mt-cell>
              <mt-cell title="消防角色" :value="personData.role|JgRoleType" class="disabled"></mt-cell>
            </div>
          </div>
        </mt-loadmore>
      </div>
      <!--弹出框-->
      <mt-popup v-model="selPopupShow" position="bottom">
        <div class="p-header">
          <div class="btn fl" @click="selPopupClose">取消</div>
          <div class="btn fr" @click="selPickerVal">确定</div>
        </div>
        <div class="p-body">
          <mt-picker :slots="genderList" @change="onGenderChange" v-if="pickerShow=='gender'"></mt-picker>
        </div>
      </mt-popup>
      <!--日期选择-->
      <mt-datetime-picker ref="bornDatePicker" type="date" :startDate="startDate" :end-date="new Date()"
                          year-format="{value} 年"
                          month-format="{value} 月" date-format="{value} 日" v-model="datePickerVal"
                          @confirm="selDate()"></mt-datetime-picker>
    </div>
  </div>
</template>


<script>
  import api from 'api';
  import {ResError} from 'components';
  import {Toast, MessageBox} from 'mint-ui'
  import {formatDate, JgDwType, genderFilter} from 'filters';
  import moment from 'moment'
  let history_gender = 0;
  let valid_key = ['name', 'phone'];

  export default {
    data() {
      return {
        //提示
        resError: false,
        //loadMore
        wrapperHeight: 0,
        autoFill: false,
        topStatus: '',
        //数据
        personData: {},
        //编辑
        holderText: '请完善信息',
        startDate: new Date(1960, 0, 1),
        selPopupShow: false,
        pickerShow: '',
        isEdit: false,
        isValidate: true,
        datePickerVal: new Date(),
        bornDate: '',
        formData: {
          name: '',
          phone: ''
        },
        genderList: [{flex: 1, values: ['男', '女']}], //1,2
      }
    },
    watch: {
      selPopupShow: function (val) {
        if (!val) {
          this.pickerShow = '';
          document.body.style.overflow = 'auto'
        } else {
          document.body.style.overflow = 'hidden'
        }
      },
      formData: {
        handler() {
          this.validForm();
        },
        deep: true
      }
    },
    mounted() {
      this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
    },
    activated(){
      this.$nextTick(() => {
        this.getLocalData();
        this.onInputData();
      });
    },
    deactivated() {
      window.mkoBackButton.bInputData = false;
      document.body.style.overflow = 'auto';
      this.selPopupShow = false;
      this.$refs.bornDatePicker.close();
      this.isEdit = false;
      this.isValidate = false;
    },
    methods: {
      formatDate,
      genderFilter,
      getLocalData() {
        let local = localStorage['USER_DATA'];
        if (local && local.length > 0) {
          try {
            this.personData = JSON.parse(local);
          } catch (err) {
          }
          let data = this.personData;
          this.bornDate = data.bornDate;
          for (let key in data) {
            this.formData[key] = data[key]
          }
        } else {
          this.UpdateData();
        }
      },
      UpdateData() {
        api.getPersonInfo({
          userName: this.$store.getters.userName
        }).then(res => {
          this.$refs.loadmore.onTopLoaded();
          if (!res)
            return;
          try {
            window.localStorage.setItem('USER_DATA', JSON.stringify(res.response));
          } catch (err) {
          }
          this.personData = res.response;
          let data = this.personData;
          for (let key in data) {
            this.formData[key] = data[key]
          }
        });
      },
      loadTop() {
        let timer = setTimeout(() => {
          this.UpdateData();
          clearTimeout(timer);
        }, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      //编辑按钮
      editInfo(){
        let form = this.formData;
        if (!this.isEdit) {
          this.bornDate = form.bornDate;
          this.validForm();
          this.isEdit = true;
          return false;
        }

        for (let key in form) {
          form[key] = this.personData[key];
        }
        this.bornDate = form.bornDate;
        this.isEdit = false;
      },
      validForm(){
        for (let key of valid_key) {
          if (!this.formData[key] && this.formData[key] !== 0) {
            this.isValidate = false;
            return false;
          }
        }
        this.isValidate = true;
      },
      saveInfo(){
        if (!this.isValidate)
          return false;

        let form = {};
        for (let key in this.formData) {
          form[key] = this.formData[key]
        }
        form.bornDate = moment(form.bornDate).format("YYYY-MM-DD");
        api.postPerson(form).then(res => {
          if (res && res.code == 0) {
            for (let key in form) {
              this.personData[key] = form[key];
            }
            try {
              sessionStorage.setItem('USER_DATA', JSON.stringify(this.personData));
            } catch (err) {
            }
            Toast({message: '修改成功！', duration: 1000});
          } else {
            Toast({message: '修改失败！', duration: 1000});
          }
        });
        this.isEdit = false;
      },
      //弹出框
      selPopupClose(){
        this.selPopupShow = false;
      },
      popupPickerShow(picker){
        if (this.isEdit) {
          let that = this;
          let fns = {
            'gender': function () {
              if (that.formData.gender)
                that.genderList[0].defaultIndex = that.formData.gender - 1;
            },
          };
          if (fns[picker])
            fns[picker]();
          this.selPopupShow = true;
          this.pickerShow = picker;
        }
      },
      selPickerVal(){
        let that = this;
        let form = this.formData;
        let Fns = {
          'gender': function () {
            form.gender = history_gender;
            form.genderValue = that.genderList[0].values[history_gender - 1];
          },
        };
        if (Fns[this.pickerShow])
          Fns[this.pickerShow]();
        this.selPopupShow = false;
      },
      //时间
      datePickerShow(){
        if (this.isEdit) {
          this.datePickerVal = this.formData.bornDate ? new Date(this.formData.bornDate) : new Date();
          this.$refs.bornDatePicker.open();
        }
      },
      selDate(){
        this.bornDate = this.formData.bornDate = this.datePickerVal;
      },
      //当前选项
      onGenderChange(picker, vals){
        let list = this.genderList[0].values;
        for (let i = 0; i < list.length; i++) {
          if (list[i] == vals[0])
            history_gender = i + 1;
        }
      },
      back() {
        if (this.isEdit) {
          MessageBox({
            title: '真的要返回吗',
            message: '编辑信息还未保存',
            showCancelButton: true,
          }).then(action => {
            if (action === 'confirm') {
              this.$MKOPop();
            }
          });
          return;
        }
        this.$MKOPop();
      },
      onInputData() {
        window.mkoBackButton = {};
        window.mkoBackButton.bInputData = true;
        window.mkoBackButton.callback = this.back;
      }
    },
    components: {
      ResError
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .header-item.edit {
    margin-left: 10px;
  }

  .person-data-wrap {
    padding-bottom: 0;
    .avatar-wrap {
      margin: 10px 0;
      width: 60px;
      height: 60px;
      .default {
        height: 100%;
        background: url(/static/icons/resource.png) -654px 0 no-repeat;
        background-size: 892px auto;
      }
      .avatar {
        width: 100%;
      }
    }
  }
</style>
