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
//社会单位-历史记录模块
const FireRecord = resolve => require(['./views/QYData/FireRecord/FireRecordList.vue'], resolve)
const FireRecordDetail = resolve => require(['./views/QYData/FireRecord/FireRecordDetail.vue'], resolve)
const JGZFRecord = resolve => require(['./views/QYData/JGZFRecord/Index.vue'], resolve)
const JGZFRecordDetail = resolve => require(['./views/QYData/JGZFRecord/RecordDetail.vue'], resolve)

//安全活动
const safeActivityList = resolve => require(['views/safeActivity/safeActivityList.vue'], resolve);
const safeActivityInfo = resolve => require(['views/safeActivity/safeActivityInfo.vue'], resolve);
//服务单位信息
const FWList = resolve => require(['views/FWData/FWList.vue'], resolve);
const FWInfo = resolve => require(['views/FWData/FWInfo.vue'], resolve);
const FWScore = resolve => require(['views/FWData/FWScore.vue'], resolve);
const FWSafePersons = resolve => require(['views/FWData/FWSafePersons.vue'], resolve);
const FWSafePersonDetail = resolve => require(['views/FWData/FWSafePersonDetail.vue'], resolve);
const FWTaskHistory = resolve => require(['views/FWData/FWTaskHistory.vue'], resolve);
const FWTaskHistoryDetail = resolve => require(['views/FWData/FWTaskHistoryDetail.vue'], resolve);
const CustomerList = resolve => require(['views/FWData/CustomerList.vue'], resolve);
const CustomerInfo = resolve => require(['views/FWData/CustomerInfo.vue'], resolve);
const FWScoreDetail = resolve => require(['views/FWData/ScoreDetail.vue'], resolve);
//安全得分
const score = resolve => require(['./views/score/score.vue'], resolve);
const scoreList = resolve => require(['./views/score/scoreList.vue'], resolve);
//数据统计
const DataCountIndex = resolve => require(['./views/DataCount/index.vue'], resolve);
const ProduceCount = resolve => require(['./views/DataCount/ProduceCount.vue'], resolve);
const QYCount = resolve => require(['./views/DataCount/QYCount.vue'], resolve);
const QYCountList = resolve => require(['./views/DataCount/QYCountList.vue'], resolve);
const QYCountDetail = resolve => require(['./views/DataCount/QYCountDetail.vue'], resolve);
const TaskCount = resolve => require(['./views/DataCount/TaskCount.vue'], resolve);
const UserCount = resolve => require(['./views/DataCount/UserCount.vue'], resolve);
//数据统计-安全评分
const ScoreCountIndex = resolve => require(['./views/DataCount/Score/index.vue'], resolve);
const ScoreCountDetail = resolve => require(['./views/DataCount/Score/ScoreDetail.vue'], resolve);
const ScoreCountRank = resolve => require(['./views/DataCount/Score/ScoreRank.vue'], resolve);
const ScoreCountRankVerAdmin = resolve => require(['./views/DataCount/Score/ScoreRankVerAdmin.vue'], resolve);
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
const QYComment = resolve => require(['./views/QYData/QYComment.vue'], resolve)
const QYAttributes = resolve => require(['./views/QYData/QYAttributes.vue'], resolve)
const PhotoViewer = resolve => require(['./components/PhotoViewer/index.vue'], resolve)
Vue.use(Router)

const routers = {
    // mode: 'history',
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // },
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
            component: QYInfo,
            name: 'QYInfo'
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
        //社会单位-历史记录模块
        {
            path: '/fire_record/:id',
            name: 'FireRecord',
            component: FireRecord
        },
        {
            path: '/fire_record_detail/:id',
            name: 'FireRecordDetail',
            component: FireRecordDetail
        },
        {
            path: '/jgzf_record/:id',
            name: 'JGZFRecord',
            component: JGZFRecord
        },
        {
            path: '/jgzf_record_detail/:id',
            name: 'JGZFRecordDetail',
            component: JGZFRecordDetail
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
            component: FWList,
            name: 'FWList'
        },
        {
            path: '/fw_info/:id',
            component: FWInfo,
            name: 'FWInfo'
        },
        {
            path: '/fw_score/:id',
            component: FWScore
        },
        {
            path: '/fw_score_detail/:id',
            component: FWScoreDetail,
            name: 'FWScoreDetail'
        },
        {
            path: '/fw_task_history/:id',
            component: FWTaskHistory,
            name: 'FWTaskHistory'
        },
        {
            path: '/fw_task_history_detail/:id',
            component: FWTaskHistoryDetail,
            name: 'FWTaskHistoryDetail'
        },
        {
            path: '/fw_safe_persons/:id',
            component: FWSafePersons,
            name: 'FWSafePersons'
        },
        {
            path: '/fw_safe_persons/:id',
            component: FWSafePersonDetail,
            name: 'FWSafePersonDetail'
        },
        {
            path: '/customer_list/:id',
            component: CustomerList,
            name: 'CustomerList'
        },
        {
            path: '/customer_info/:id',
            component: CustomerInfo,
            name: 'CustomerInfo'
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
            path: '/data_count',
            component: DataCountIndex
        },
        {
            path: '/produce_count',
            component: ProduceCount,
            name: 'ProduceCount'
        },
        {
            path: '/qy_count',
            component: QYCount,
            name: 'QYCount'
        },
        {
            path: '/qy_count_list',
            component: QYCountList
        },
        {
            path: '/qy_count_detail/:id',
            component: QYCountDetail
        },
        {
            path: '/task_count',
            component:TaskCount,
            name: 'TaskCount'
        },
        {
            path: '/user_count',
            component: UserCount,
            name: 'UserCount'
        },
        //数据统计-安全评分
        {
            path: '/score_count',
            component: ScoreCountIndex
        },
        {
            path: '/score_count_detail',
            component: ScoreCountDetail
        },
        {
            path: '/score_count_rank',
            component: ScoreCountRank
        },
        {
            path: '/score_count_rank_admin',
            component: ScoreCountRankVerAdmin
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
            path: '/qy_comment/:id',
            name: 'QYComment',
            component: QYComment
        },
        {
            path: '/qy_attributes/:id',
            name: 'QYAttributes',
            component: QYAttributes
        },
        {
            path: '/photo_viewer',
            name: 'PhotoViewer',
            component: PhotoViewer
        }
    ]
};

const router = new Router(routers);

router.beforeEach((to, from, next) => {
    if (to.name == 'home' || to.name == 'score' || to.name == 'jgDetail' || to.name == 'login' || to.name == 'scoreDetail' || to.name == 'QYInfo' || to.name == 'QYComment' || to.name == 'FWInfo' || to.name == 'FWList' || to.name == 'CustomerList' || to.name == 'QYCount' || to.name == 'TaskCount' || to.name == 'UserCount' || to.name == 'ProduceCount') {
        NProgress.remove();
    } else {
        NProgress.start();
    }
    next();
})
router.afterEach(transition => {
    NProgress.done();
    window.scrollTo(0, 0);
});

export default router;
