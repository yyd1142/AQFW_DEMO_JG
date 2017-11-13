/**
 * Created by enjoyzhou on 17-2-16.
 */
import {httpGet, httpPost, httpPath, readFile} from './requestService'
import Conf from '../apiconf'

export default {
    getJSON: httpGet('/repositories'),
    postJSON: httpPost('/api/home'),
    getXCTaskPosition: httpGet('/XCTaskPosition', Conf.taskDomain),
    getXCTaskDeviceByPosition: httpGet('/deviceListByPosition', Conf.taskDomain),
    getXCTaskDeviceCheckRulesByUnitId: httpGet('/deviceCheckRules', Conf.taskDomain),
    //登陆
    login: httpGet('/auth?m=login', Conf.loginDomain, true),
    //个人资料
    getUserData: httpGet('/jg/user/info', Conf.personDomain),
    getPersonInfo: httpGet('/jg/user/info', Conf.personDomain),
    getUserInfo: httpGet('/person?m=info'),
    postPerson: httpPost('/jg/user/add', Conf.personDomain), //添加或编辑 人员
    getVersion: readFile('/version.json'),
    resetPasswrod: httpGet('/person'), //修改密码
    //通讯录
    getUuid: httpGet('/uuid', Conf.directoriesDomain),
    getAddressList: httpGet('/list', Conf.directoriesDomain),
    getAddressInfo: httpGet('/info', Conf.directoriesDomain),
    //消息
    getMsgList: httpGet('/message?m=list', Conf.msgDomain),
    getMsgInfo: httpGet('/message?m=info', Conf.msgDomain),
    hasNewMessage: httpGet('/message', Conf.msgDomain), // 判断首页小红点提示，是否有新消息
    updateMessageStatus: httpGet('/message', Conf.msgDomain),
    //新闻
    getNewsList: httpGet('/information/list', Conf.newsDomain),
    getNewsDetail: httpGet('/information/info', Conf.newsDomain),
    //通知公告
    getNoticesList: httpGet('/dwNotice', Conf.noticeDomain),
    getStatisticsList: httpGet('/messages/message/list', Conf.loginDomain),
    getNoticesDetail: httpGet('/dwNotice', Conf.noticeDomain),
    noticeIsRead: httpGet('/dwNotice', Conf.noticeDomain),
    noticeReply: httpPost('/dwNotice?m=reply', Conf.noticeDomain),
    getReplyInfo: httpGet('/dwNotice', Conf.noticeDomain),
    getNoticeReplyList: httpGet('/dwNotice', Conf.noticeDomain),
    //风险管理
    getYhkList: httpGet('/yhk?m=list', Conf.yhkDomain),
    getYhkInfo: httpGet('/yhk?m=info', Conf.yhkDomain),
    addYhk: httpPost('/yhk?m=addByZF', Conf.domain),
    updateYhk: httpPost('/yhk?m=update', Conf.yhkDomain),
    //消防文件
    getXFSafetyFilesList: httpGet('/dwInfo/xfSafetyFile?m=info'),
    //考试
    getExamsList: httpGet('/exam', Conf.examDomain),
    startExam: httpGet('/exam', Conf.examDomain),
    examResult: httpPost('/exam?m=examResult', Conf.examDomain),
    getPastScoreList: httpGet('/exam', Conf.examDomain),
    examScoreDetail: httpGet('/exam', Conf.examDomain),
    //安全评分
    getScoreList: httpGet('/dwScore?m=list', Conf.scoreDomain),
    getAllScoreList: httpGet('/dwScore?m=qydwScoreList', Conf.scoreDomain),
    getHistoryScoreList: httpGet('/dwScore', Conf.scoreDomain),
    getHistoryScoreDetail: httpGet('/dwScore', Conf.scoreDomain),
    //社会单位
    getQyList: httpGet('/jg/user/jurisdiction', Conf.qyDomain),
    getQyInfo: httpGet('/dwInfo?m=info', Conf._domain),
    getZRUnitList: httpGet('/dwInfo?m=info', Conf.msgDomain),
    getZRUnitInfo: httpGet('/dwInfo/ZRDW?m=info'),
    getQyType: httpGet('/dwlx?m=dwlxList', Conf.platformDomain),  //获得所有企业类型
    addDWByZF: httpPost('/v2/dwInfo', Conf._platformDomain), //添加 社会单位
    //服务单位
    getFwList: httpGet('/fw/list', Conf.fwDomain),
    getFwInfo: httpGet('/fw/info', Conf.fwDomain),
    getCustomList: httpGet('/fw/signing', Conf.fwDomain),
    getCustomInfo: httpGet('/jg/qy/info', Conf.fwDomain),
    //监管单位列表
    getJGList: httpGet('/dwInfo?m=jgBuMenList', Conf.domain),
    //建筑信息
    getJZList: httpGet('/jzInfo?m=list'),
    getJZDetail: httpGet('/jzInfo'),
    //图片资源
    getResourcesInfo: httpPath('/info/', Conf.resourcesDomain), //获取资源信息 列表
    lowerDw: httpGet('/jg/lowerDw', Conf.fwDomain),
    jgPersons: httpGet('/jg/user/list', Conf.fwDomain),
    getPersonItem: httpGet('/jg/user/jurisdiction', Conf.fwDomain),
    getJGScoreTypes: httpGet('/dwScore', Conf.scoreDomain), //社会单位 分数等级模块
    getAppState: httpGet('/'), //获取APP状态
    getAllLabels: httpGet('/label', Conf._platformDomain), //根据类型获取标签
        // PATH 形式访问
        getByPath: function (path) {
        return httpGet(path, Conf.resourcesDomain)
    }
}
