/**
 * Created by enjoyzhou on 17-2-16.
 */
import { httpGet, httpPost, httpPath, readFile } from './requestService'
import Conf from '../apiconf'

export default {
    getJSON: httpGet('/repositories'),
    postJSON: httpPost('/api/home'),
    getXCTaskPosition: httpGet('/XCTaskPosition', Conf.taskDomain),
    getXCTaskDeviceByPosition: httpGet('/deviceListByPosition', Conf.taskDomain),
    getXCTaskDeviceCheckRulesByUnitId: httpGet('/deviceCheckRules', Conf.taskDomain),
    //登陆
    login: httpGet('/auth?m=login', Conf.loginDomain, true),
    //监管端单位信息
    getJGDwInfo: httpGet('/jg/info', Conf.jgApiDomain), //获取本监管单位信息
    //个人资料
    getUserData: httpGet('/jg/user/info', Conf.jgApiDomain),
    getPersonInfo: httpGet('/jg/user/info', Conf.jgApiDomain),
    getUserInfo: httpGet('/person?m=info'),
    postPerson: httpPost('/jg/user/add', Conf.jgApiDomain), //添加或编辑 人员
    getVersion: readFile('/version.json'),
    resetPasswrod: httpGet('/person'), //修改密码
    //通讯录
    getUuid: httpGet('/uuid', Conf.directoriesDomain),
    getAddressList: httpGet('/list', Conf.directoriesDomain),
    getAddressInfo: httpGet('/detail', Conf.directoriesDomain),
    //消息
    getMsgList: httpGet('/message?m=list', Conf.qyApiDomain),
    getMsgInfo: httpGet('/message?m=info', Conf.qyApiDomain),
    hasNewMessage: httpGet('/message', Conf.qyApiDomain), // 判断首页小红点提示，是否有新消息
    updateMessageStatus: httpGet('/message', Conf.qyApiDomain),
    //新闻
    getNewsList: httpGet('/information/list', Conf.newsDomain),
    getNewsDetail: httpGet('/information/info', Conf.newsDomain),
    //通知公告
    getNoticesList: httpGet('/dwNotice', Conf.domain),
    getStatisticsList: httpGet('/messages/message/list', Conf.loginDomain),
    getNoticesDetail: httpGet('/dwNotice', Conf.domain),
    noticeIsRead: httpGet('/dwNotice', Conf.domain),
    noticeReply: httpPost('/dwNotice?m=reply', Conf.domain),
    getReplyInfo: httpGet('/dwNotice', Conf.domain),
    getNoticeReplyList: httpGet('/dwNotice', Conf.domain),
    //风险管理
    getYhkList: httpGet('/yhk?m=list', Conf.qyApiDomain),
    getYhkInfo: httpGet('/yhk?m=info', Conf.qyApiDomain),
    addYhk: httpPost('/yhk?m=addByZF', Conf.domain),
    updateYhk: httpPost('/yhk?m=update', Conf.qyApiDomain),
    //消防文件
    getXFSafetyFilesList: httpGet('/dwInfo/xfSafetyFile?m=info'),
    //考试
    getExamsList: httpGet('/exam', Conf.qyApiDomain),
    startExam: httpGet('/exam', Conf.qyApiDomain),
    examResult: httpPost('/exam?m=examResult', Conf.qyApiDomain),
    getPastScoreList: httpGet('/exam', Conf.qyApiDomain),
    examScoreDetail: httpGet('/exam', Conf.qyApiDomain),
    //安全评分
    getScoreList: httpGet('/dwScore?m=list', Conf.scoreDomain),
    getAllScoreList: httpGet('/dwScore?m=qydwScoreList', Conf.scoreDomain),
    getHistoryScoreList: httpGet('/dwScore', Conf.scoreDomain),
    getHistoryScoreDetail: httpGet('/dwScore', Conf.scoreDomain),
    //社会单位
    getQyList: httpGet('/jg/user/jurisdiction', Conf.jgApiDomain),
    getQyInfo: httpGet('/dwInfo?m=info', Conf.domain),
    getZRUnitList: httpGet('/dwInfo?m=info', Conf.qyApiDomain),
    getZRUnitInfo: httpGet('/dwInfo/ZRDW?m=info'),
    getQyType: httpGet('/dwlx?m=dwlxList', Conf.platformDomain),  //获得所有企业类型
    addDWByZF: httpPost('/v2/dwInfo?m=addDWByZF', Conf.platformDomain), //添加 社会单位
    getQyRecord: httpGet('/dwInfo?m=enforceLowList', Conf.domain), //获取执法记录或火灾记录
    getQyRecordCount: httpGet('/dwInfo', Conf.domain),
    //服务单位
    getFwList: httpGet('/fw/list', Conf.jgApiDomain),
    getFwInfo: httpGet('/fw/info', Conf.jgApiDomain),
    getCustomList: httpGet('/fw/signing', Conf.jgApiDomain),
    getCustomInfo: httpGet('/jg/qy/info', Conf.jgApiDomain),
    //监管单位列表
    getJGList: httpGet('/dwInfo?m=jgBuMenList', Conf.domain),
    //建筑信息
    getJZList: httpGet('/jzInfo?m=list'),
    getJZDetail: httpGet('/jzInfo'),
    //图片资源
    getResourcesInfo: httpPath('/info/', Conf.resourcesDomain), //获取资源信息 列表
    lowerDw: httpGet('/jg/lowerDw', Conf.jgApiDomain),
    jgPersons: httpGet('/jg/user/list', Conf.jgApiDomain),
    getPersonItem: httpGet('/jg/user/jurisdiction', Conf.jgApiDomain),
    getJGScoreTypes: httpGet('/dwScore', Conf.scoreDomain), //社会单位 分数等级模块
    getAppState: httpGet('/'), //获取APP状态

    getAllLabels: httpGet('/label', Conf.platformDomain), //根据类型获取标签
    // PATH 形式访问
    getByPath: function (path) {
        return httpGet(path, Conf.resourcesDomain)
    }
}
