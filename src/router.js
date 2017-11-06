import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 1000,
    template: '<div class="page-progress-bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
}); //进度条配置

//登陆
const login = resolve => require(['views/login/login.vue'], resolve);
//首页
const enter = resolve => require(['views/enter/enter.vue'], resolve);
const home = resolve => require(['views/home/home.vue'], resolve);
//新闻
const newsInfo = resolve => require(['views/news/newsInfo.vue'], resolve);
//消息
const message = resolve => require(['./views/message/message.vue'], resolve);
const messageDetail = resolve => require(['views/message/info.vue'], resolve);
//通知公告
const noticeList = resolve => require(['views/notice/noticeList.vue'], resolve);
const noticeDetail = resolve => require(['views/notice/info.vue'], resolve);
//通讯录
const mailList = resolve => require(['views/address/address.vue'], resolve);
const addressDetail = resolve => require(['views/address/addressDetail.vue'], resolve);
const addUser = resolve => require(['views/address/addUser.vue'], resolve);
const addUserSucc = resolve => require(['views/address/addUserSucc.vue'], resolve);
//个人信息
const my = resolve => require(['views/person/person.vue'], resolve);
const personData = resolve => require(['views/person/personData.vue'], resolve);
//设置
const config = resolve => require(['views/config/config.vue'], resolve);
const configPwd = resolve => require(['views/config/configPwd.vue'], resolve);
//社会单位信息
const QYList = resolve => require(['views/QYData/QYList.vue'], resolve);
const QYInfo = resolve => require(['views/QYData/QYInfo.vue'], resolve);
const buildList = resolve => require(['views/QYData/buildList.vue'], resolve);
const buildInfo = resolve => require(['views/QYData/buildInfo.vue'], resolve);
const XFZRUnitList = resolve => require(['views/QYData/XFZRUnitList.vue'], resolve);
const unitList = resolve => require(['views/QYData/unitList.vue'], resolve);
const unitInfo = resolve => require(['views/QYData/unitInfo.vue'], resolve);
//安全活动
const safeActivityList = resolve => require(['views/safeActivity/safeActivityList.vue'], resolve);
const safeActivityInfo = resolve => require(['views/safeActivity/safeActivityInfo.vue'], resolve);
//服务单位信息
const FWList = resolve => require(['views/FWData/FWList.vue'], resolve);
const FWInfo = resolve => require(['views/FWData/FWInfo.vue'], resolve);
const CustomerList = resolve => require(['views/FWData/CustomerList.vue'], resolve);
const CustomerInfo = resolve => require(['views/FWData/CustomerInfo.vue'], resolve);
//安全得分
const score = resolve => require(['./views/score/score.vue'], resolve);
const scoreList = resolve => require(['./views/score/scoreList.vue'], resolve);
//数据统计
const DataCountList = resolve => require(['views/DataCount/DataCountList.vue'], resolve);
const CountScore = resolve => require(['views/DataCount/CountScore.vue'], resolve);
const CountTasks = resolve => require(['views/DataCount/CountTasks.vue'], resolve);
const AdminCountInfo = resolve => require(['views/DataCount/AdminCountInfo.vue'], resolve);
//考试
const trainList = resolve => require(['views/train/train.vue'], resolve);
const pastScore = resolve => require(['views/train/pastScore.vue'], resolve);
const exam = resolve => require(['views/train/exam.vue'], resolve);
const scoreInfo = resolve => require(['./views/train/info.vue'], resolve)
const simulationExam = resolve => require(['./views/train/simulationExam.vue'], resolve)
const examRule = resolve => require(['./views/train/examRule.vue'], resolve)
const examResult = resolve => require(['./views/train/examResult.vue'], resolve)
//风险管理
const hiddenDangerList = resolve => require(['views/hiddenDanger/hiddenDangerList.vue'], resolve);
const hiddenDangerDetail = resolve => require(['views/hiddenDanger/info.vue'], resolve);
const hiddenDangerCheck = resolve => require(['views/hiddenDangerCheck/main.vue'], resolve);
const jgDetail = resolve => require(['views/address/jgDetail/jgDetail.vue'], resolve);
const personDetail = resolve => require(['views/address/jgDetail/personDetail.vue'], resolve);
const statisticsNotice = resolve => require(['./views/notice/statistics.vue'], resolve)
const appNotification = resolve => require(['./views/enter/appNotification.vue'], resolve)
const noticeReplyList = resolve => require(['./views/notice/reply.vue'], resolve)
const noticeReplyDetail = resolve => require(['./views/notice/replyDetail.vue'], resolve)
const FireRecord = resolve => require(['./views/QYData/Record/FireRecord.vue'], resolve)
const JGZFRecord = resolve => require(['./views/QYData/Record/JGZFRecord.vue'], resolve)
const QYComment = resolve => require(['./views/QYData/QYComment.vue'], resolve)
Vue.use(Router)

const routers = {
    // mode: 'history',
    routes: [
        //登陆
        {
            path: '/login',
            name: 'login',
            component: login
        },
        //首页
        {
            path: '/',
            redirect: '/enter',
            component: login
        },
        {
            path: '/enter',
            component: enter,
            title: '首页-TAB',
            redirect: '/enter/home',
            children: [
                {
                    path: 'home',
                    component: home,
                    title: '首页',
                    name: 'home'
                },
                {
                    path: 'mail_list',
                    component: mailList,
                    title: '通讯录',
                    name: 'mailList'
                },
                {
                    path: 'my',
                    component: my,
                    title: '我的',
                    name: 'my'
                },
            ]
        },
        //新闻
        {
            path: '/news_info/:pid',
            component: newsInfo,
            name: "newsInfo"
        },
        //消息
        {
            path: '/message',
            component: message,
            title: '消息'
        },
        {
            path: '/message/:pid',
            component: messageDetail,
            title: '消息详情'
        },
        //通知公告
        {
            path: '/notice',
            component: noticeList
        },
        {
            path: '/notice/:pid',
            component: noticeDetail
        },
        //通讯录
        {
            path: '/address_detail/:pid',
            component: addressDetail
        },
        {
            path: '/add_user',
            component: addUser
        },
        {
            path: '/add_user_succ',
            component: addUserSucc
        },
        //个人信息
        {
            path: '/person_data',
            component: personData
        },
        //设置
        {
            path: '/config',
            component: config,
        },
        {
            path: '/config/pwd',
            component: configPwd
        },
        //社会单位信息
        {
            path: '/qy_list',
            component: QYList
        },
        {
            path: '/qy_info/:id',
            component: QYInfo
        },
        {
            path: '/build_list/:id',
            component: buildList
        },
        {
            path: '/build_info/:id',
            component: buildInfo
        },
        {
            path: '/xfzr_list/:id',
            component: XFZRUnitList
        },
        {
            path: '/unit_list/:id',
            component: unitList
        },
        {
            path: '/unit_info/:id',
            component: unitInfo
        },
        //安全活动
        {
            path: '/safe_activity_list/:id',
            component: safeActivityList
        },
        {
            path: '/safe_activity_info/:id',
            component: safeActivityInfo
        },
        //服务单位信息
        {
            path: '/fw_list',
            component: FWList
        },
        {
            path: '/fw_info/:id',
            component: FWInfo
        },
        {
            path: '/customer_list/:id',
            component: CustomerList
        },
        {
            path: '/customer_info/:qyId/:fwId',
            component: CustomerInfo
        },
        //安全得分
        {
            path: '/score/:id',
            component: score,
            name: 'scoreDetail'
        },
        {
            path: '/score_list',
            component: scoreList
        },
        //数据统计
        {
            path: '/data_count_list',
            component: DataCountList
        },
        {
            path: '/count_score',
            component: CountScore
        },
        {
            path: '/count_tasks',
            component: CountTasks
        },
        {
            path: '/admin_count_info',
            component: AdminCountInfo
        },
        //考试
        {
            path: '/train',
            component: trainList,
            name: 'trainList'
        },
        {
            path: '/exam/:pid',
            component: exam,
            name: 'exam'
        },
        {
            path: '/simulation_exam/:pid',
            component: simulationExam
        },
        {
            path: '/exam_rule',
            component: examRule
        },
        {
            path: '/exam_result',
            component: examResult
        },
        {
            path: '/past_score',
            component: pastScore,
            name: 'pastScore'
        },
        {
            path: '/score_info/:pid',
            component: scoreInfo,
            name: 'scoreInfo'
        },
        //风险管理
        {
            path: '/hidden_danger/:id',
            component: hiddenDangerList
        },
        {
            path: '/hidden_danger_info/:pid',
            component: hiddenDangerDetail
        },
        {
            path: '/hidden_danger_check',
            component: hiddenDangerCheck
        },
        {
            path: '/jgDetail/:pid',
            component: jgDetail,
            name: 'jgDetail'
        },
        {
            path: '/personDetail',
            component: personDetail,
            name: 'personDetail'
        },
        {
            path: '/statisticsNotice',
            name: 'statisticsNotice',
            component: statisticsNotice
        },
        {
            path: '/appNotification',
            name: 'appNotification',
            component: appNotification
        },
        {
            path: '/noticeReplyList/:pid',
            name: 'noticeReplyList',
            component: noticeReplyList
        },
        {
            path: '/noticeReplyDetail',
            name: 'noticeReplyDetail',
            component: noticeReplyDetail
        },
        {
            path: '/fire_record/:id',
            name: 'FireRecord',
            component: FireRecord
        },
        {
            path: '/jgzf_record/:id',
            name: 'JGZFRecord',
            component: JGZFRecord
        },
        {
            path: '/qy_comment/:id',
            name: 'QYComment',
            component: QYComment
        }
    ]
};

const router = new Router(routers);

router.beforeEach((to, from, next) => {
    if (to.name == 'home' || to.name == 'score' || to.name == 'jgDetail' || to.name == 'login' || to.name == 'scoreDetail') {
        NProgress.remove();
    } else {
        NProgress.start();
    }
    next();
})
router.afterEach(transition => {
    NProgress.done();
});

export default router;
