import 'es6-promise/auto'
Object.assign = require('object-assign')
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import './filters'
import FastClick from 'fastclick'
import MKOMessagePlugin from './plugins/MKOMessagePlugin'
import MKOHistoryManager from './plugins/MKOHistoryManager'
import MKOAPPState from './plugins/MKOAPPState'
import store from './store'
import MkoUI from 'mko-ui'
var canExitApp = false;
FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
const config = {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
};
Vue.use(VeeValidate, config)
Vue.use(MintUI);
Vue.use(MkoUI);
Vue.use(MKOMessagePlugin)
Vue.use(MKOHistoryManager)
Vue.use(MKOAPPState)

var cordovaApp = {
  initialize: function (callback) {
    this.bindEvents()
    this.initialized = callback
  },
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  onDeviceReady: function () {
    cordovaApp.receivedEvent('deviceready')
    document.addEventListener('backbutton', function (e) {
      if (window.mkoBackButton && window.mkoBackButton.bInputData) {
        window.mkoBackButton.callback();
        return;
      }
      e.preventDefault();
      let route = window.mkoVue.$MKOPop();
      if (!route) {
        if (canExitApp) {
          window.mkoVue.$MKOShutDownApp();
        }
        MintUI.Toast({
          message: '再次返回退出程序',
          position: 'bottom',
          duration: 1500
        })
        setTimeout(function () {
          canExitApp = false;
        }, 1500);
        canExitApp = true;
      }
    }, false);

    window.onMKONotification = function (paramString) {
      let params = {};
      try {
        params = JSON.parse(paramString);
      } catch (e) {
        return;
      }
      window.mkoVue.$MKOJump({
        path: '/appNotification',
        query: {
          params: params
        }
      })
    }
  },
  receivedEvent: function (id) {
    this.initialized()
  }
};

cordovaApp.initialize(function () {
  console.log(window.device)
  window.mkoBackButton = {};
  window.mkoVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
})
