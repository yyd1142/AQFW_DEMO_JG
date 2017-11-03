import moment from 'moment';

class MKOAPPState {
    constructor() {
    }
}

MKOAPPState.installed = false;

MKOAPPState.install = function (Vue, options) {
    if (MKOAPPState.installed) {
        warn('MKOAPPState already installed!');
        return;
    }
    Vue.prototype.$APPUpdateTime = function (name) {
        name = name === undefined ? 'default' : name;
        var t = new Date()
        var t_s = t.getTime()
        var nt = new Date()
        nt.setTime(t_s + 1000 * 60)   //设置keep-alive状态保持为1分钟
        console.log(`下次${name}_keepalive更新时间为：${moment(nt).format("YYYY-MM-DD HH:mm:ss")}`)
        sessionStorage.setItem(`KEEP_ALIVE_RESET_TIME_${name}`, nt)
    }
    //外部推送消息点击跳转APP页面
    Vue.prototype.$APPLinkPath = function (data, type) {
        // types = ['safeActivity', 'task', 'notice', 'exam', 'hiddenDanger']
        window.mkoVue.$MKOJump(data.path)
    }
    MKOAPPState.installed = true;
}


// auto install
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(MKOAPPState)
}

export default MKOAPPState;