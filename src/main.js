import 'es6-promise/auto'
Object.assign = require('object-assign')
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import messages from './language/zh_CN'
import './filters'
import FastClick from 'fastclick'
import MKOMessagePlugin from './plugins/MKOMessagePlugin'
import MKOHistoryManager from './plugins/MKOHistoryManager'
import MKOAPPState from './plugins/MKOAPPState'
import MKOUITools from './plugins/MKOUITools'
import store from './store'
import MkoUI from 'mko-ui'
var canExitApp = false;
FastClick.attach(document.body)

Vue.config.productionTip = false

Validator.updateDictionary({
  zh_CN: {
    messages
  }
});

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};

Vue.use(VeeValidate, config);
Vue.use(MintUI);
Vue.use(MkoUI);
Vue.use(MKOMessagePlugin)
Vue.use(MKOHistoryManager)
Vue.use(MKOAPPState)
Vue.use(MKOUITools);

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
