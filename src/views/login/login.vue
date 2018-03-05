<template>
  <div>
    <div class="logo-wrap">
      <i class="logo-icon"></i>
      <span>安 全 服 务 云</span>
    </div>
    <form class="form form-login" ref="wrapper" :style="{ height: wrapperHeight - 32 + 'px'}">
      <div class="form-group" :class="{'has-error': errors.has('用户名')}">
        <i class="icon-account-user"></i>
        <div class="xiajiantou-btn" @click="userTableShow = userTableShow ? false : true;" v-if="userLocalStorages.length > 0">
          <i class="icon-xiajiantou"></i>
        </div>
        <input type="text" name="用户名" class="form-control" placeholder="用户名" v-model="account.username" v-validate data-vv-rules="required" />
        <p class="help-block">{{errors.first('用户名')}}</p>
      </div>
      <div class="user-table-hidden" @click="userTableShow = false;" v-if="userTableShow"></div>
      <div class="user-table-wrap" v-if="userLocalStorages.length > 0 && userTableShow">
        <ul class="user-table-view">
          <li class="user-table-cell" v-for="item in userLocalStorages" @click="selectedUser(item)">
            <span v-text="item.username"></span>
          </li>
        </ul>
      </div>
      <div class="form-group" :class="{'has-error': errors.has('password')}">
        <i class="icon-account-password"></i>
        <input type="password" class="form-control" name="password" placeholder="6-16位密码，数字或符号" v-model="account.password" v-validate data-vv-rules="required" />
        <p class="help-block">{{errors.first('密码')}}</p>
      </div>
      <div class="remenber-password" @click="remenberPassword">
        <i class="remenber-password-icon" :class="remenberClass"></i>
        <span>记住密码</span>
      </div>
      <div class="form-group">
        <mko-button class="login-btn" size="large" @click="login">登录</mko-button>
      </div>
    </form>
    <!--<div class="forget-password">忘记密码</div>-->
    <div class="version">
      <span>{{version}}</span>
    </div>
  </div>
</template>

<script>
import api from 'api'
import md5 from 'blueimp-md5'
import { Indicator, Toast } from 'mint-ui';
import { mapGetters } from 'vuex'
import * as types from '../../store/mutation-types'

var userData = {};
export default {
  data() {
    return {
      account: {
        username: '',
        password: '',
        token: ''
      },
      version: '',
      wrapperHeight: '',
      remenberClass: 'false',
      needRemenberPasswrod: false,
      userTableShow: false,
      userLocalStorages: []
    }
  },
  watch: {
    remenberClass(val) {
      this.needRemenberPasswrod = val == 'true' ? true : false;
    }
  },
  mounted() {
    this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
    this.$nextTick(() => {
      api.getVersion().then(result => {
        if (!result) return false;
        this.version = result.version;
        this.$getAppVersion((appVersion) => {
          if (!appVersion || appVersion.length == 0)
            return;
          this.version += '-' + appVersion;
        })
      })
      Indicator.close();
    })
  },
  activated() {
    if (localStorage.getItem('userLocalStorages')) {
      this.userLocalStorages = JSON.parse(localStorage.getItem('userLocalStorages'))
    } else {
      this.userLocalStorages = [];
    }
  },
  methods: {
    login() {
      if(this.$route.query.appState && this.$route.query.appState == 1) {
        Toast({
            message: `系统维护中，预计维护完成时间${this.$route.query.time}`,
            position: 'middle',
            duration: 2000
          });
        return false;
      }
      this.$validator.validateAll();
      if (this.errors.any()) return
      Indicator.open({ spinnerType: 'fading-circle' });
      api.login({
        userName: this.account.username,
        password: md5(this.account.password),
        platform: 'mobile'
      }).then(result => {
        if (!result) {
          Indicator.close();
          return false;
        }
        if (result.code != 0) {
          Indicator.close();
          Toast({
            message: result.msg,
            position: 'middle',
            duration: 1500
          });
          return;
        }
        this.token = result.response.token;
        window.localStorage.setItem('jg_token', this.token);
        this.getUserData();
      })
    },
    getUserData() {
      let self = this;
      api.getPersonInfo({
        userName: this.account.username,
      }).then(result => {
        Indicator.close();
        if (!result) return false
        userData = result.response;
        if (userData == null) {
          Toast({
            message: `找不到用户[${this.account.username}]`,
            position: 'middle',
            duration: 1000
          });
          return false;
        }
        userData['token'] = this.token;
        this.$store.dispatch('saveUserData', userData);
        Toast({
          message: '登录成功',
          position: 'middle',
          duration: 1000
        });
        self.setUserLocalStorages()
        setTimeout(() => {
          self.$MKOJump('/enter/home');
        }, 1000)
      })
    },
    remenberPassword() {
      this.remenberClass = this.remenberClass == 'false' ? 'true' : 'false';
    },
    selectedUser(item) {
      this.account = item;
      this.userTableShow = false;
    },
    setUserLocalStorages() {
      if (!this.needRemenberPasswrod) return false;
      let needPushData = true;
      if (localStorage.getItem('userLocalStorages')) {
        let userLocalStorage = JSON.parse(localStorage.getItem('userLocalStorages'));
        userLocalStorage.forEach((item) => {
          if (item.username == this.account.username) {
            needPushData = false;
            item.password = this.account.password;
          }
        })
        if (needPushData) {
          localStorage.setItem('userLocalStorages', JSON.stringify([this.account].concat(userLocalStorage)));
        } else {
          localStorage.setItem('userLocalStorages', JSON.stringify(userLocalStorage));
        }
      } else {
        localStorage.setItem('userLocalStorages', JSON.stringify([this.account]));
      }
    }
  }
}

</script>

<style lang="less" rel="stylesheet/less" src="./login.less" scoped></style>
