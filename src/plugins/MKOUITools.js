/**
 * Created by queue on 2017/8/15.
 */
import {DialogBox} from 'components';

class MKOUITools {
  constructor() {
  }
}

MKOUITools.installed = false;


MKOUITools.install = function (Vue, options) {

  Vue.prototype.$MKODialog = function (op) {
    return new Promise(function (resolve, reject) {
      const tpl = `<dialog-box :title="title" :msg="message" :cancel-btn="cancelBtn" :cancel-text="cancelText" :confirm-test="confirmText" @confirm="confirm" @close="close" v-if="show"></dialog-box>`;
      let div = document.getElementById('MKODialog');
      if (div) {
        div.innerHTML = '';
        div.innerHTML = tpl;
      } else {
        div = document.createElement('div');
        div.id = 'MKODialog';
        div.innerHTML = tpl;
        document.body.appendChild(div);
      }

      window.MKODialogShow = new Vue({
        el: div,
        data: {
          show: true,
          title: op.title,
          message: op.msg,
          cancelBtn: op.cancelBtn,
          cancelText: op.cancelText,
          confirmText: op.confirmText
        },
        created(){
        },
        methods: {
          confirm(){
            this.show = false;
            resolve('confirm')
          },
          close(){
            this.show = false;
            resolve('cancel')
          }
        },
        components: {
          DialogBox
        }
      });
    });
  };
};

export default MKOUITools;
