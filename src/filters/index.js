import Vue from 'vue'
import moment from 'moment'
import Conf from 'config'

// 日期格式化
Vue.filter('formatDate', (value, format) => {
    if (!value) {
        return "";
    }
    format = format || "YYYY-MM-DD HH:mm";
    let res = moment(value).format(format);
    return res == 'Invalid date' ? '' : res;
});

//性别
Vue.filter('genderFilter', (value) => {
    const gender = ['未知', '男', '女'];
    return gender[value];
});

//教育培训选项颜色
Vue.filter('errorsExamFilter', (value) => {
    if (value == 'checked') {
        return 'checked'
    } else if (value == false) {
        return 'false'
    } else {
        return 'true'
    }
});

//社会单位消防角色
Vue.filter('QyRoleType', (value) => {
    const role = ['消防安全责任人', '消防安全管理人', '消防控制室管理人员', '专兼职消防管理人员', '保安', '消防引导员'];
    return role[value - 1]
});

Vue.filter('allQyRoleType', (value) => {
    const role = Conf.allQyRoleList;
    return role[value] || ''
});

//监管单位角色权限
Vue.filter('JgRoleType', (value) => {
    const type = ['管理员', '监管员', '文书'];
    return type[value - 1]
});

//监管人员所属单位类型
Vue.filter('JgDwType', (value) => {
    const type = ['消防部门', '协同部门']
    return type[value - 1]
});

//证件类型
Vue.filter('IDType', (value) => {
    const type = ['身份证', '港澳侨胞证', '护照']
    return type[value - 1]
});

//单位经济所有制
export const dwJJSYZ = (val) => {
    const type = ['未知', '国有企业', '集体企业', '民营企业', '个体工商户', '中外合资企业', '外商独资企业', '股份制企业', '事业机关', '国家机关', '其它']
    return type[val * 1]
};

//百分比
Vue.filter('rateFr', (value, total, d) => {
    let rate = (score / total) * 100;
    d = d ? d : 0;
    return `${rate.toFixed(d)}%`
});

//小数点后一位
Vue.filter('scoreFilter', (value) => {
    if (!value)
        return 0;
    if (value % 1 === 0) {
        return parseInt(value)
    } else {
        value = parseFloat(value).toFixed(1);
        return value
    }
});

//分数
export const calcScoreStyle = function (val) {
    val = parseFloat(val);
    if (!val)
        return '#4EB4F1';
    if (val >= 90) {
        return '#4EB4F1'
    } else if (val >= 80) {
        return '#57D4E7'
    } else if (val >= 70) {
        return '#9CED63'
    } else if (val >= 60) {
        return '#F4DA37'
    } else {
        return '#F87F42'
    }
};

export const calcScoreText = function (val) {
    let text = ['极低', '较低', '中等', '良好', '优秀'];
    if (!val || !parseFloat(val))
        return '';
    if (val >= 90) {
        return text[4]
    } else if (val >= 80) {
        return text[3]
    } else if (val >= 70) {
        return text[2]
    } else if (val >= 60) {
        return text[1]
    } else {
        return text[0]
    }
};

export const calcHeadColor = function (val, color) {
    if (!color)
        color = ['#A282F5', '#799BF7', '#93D82E', '#D4CD2C', '#FFA766'];
    // color = ['#B484F7', '#9692F4', '#97D72E', '#D6CB2F', '#FFA466'];
    if (!val || !parseFloat(val))
        return color[0];
    val = parseFloat(val);
    if (val >= 90) {
        return color[0]
    } else if (val >= 80) {
        return color[1]
    } else if (val >= 70) {
        return color[2]
    } else if (val >= 60) {
        return color[3]
    } else if (val > 0) {
        return color[4]
    } else {
        return '#ab89f0'
    }
};

export const calcBannerCircle = function (val) {
    if (!val)
        return 'null';
    let c = Math.floor(val / 10);
    if (c < 2)
        return '1';
    c += '0';
    return c;
};

export const calcBannerBg = function (val) {
    if (!val || !parseFloat(val))
        return '90';
    let c = Math.floor(val / 10);
    if (c < 6)
        c = '';
    c += '0';
    return c;
};

export const formatDate = Vue.filter('formatDate')
export const genderFilter = Vue.filter('genderFilter')
const errorsExamFilter = Vue.filter('errorsExamFilter')
const QyRoleType = Vue.filter('QyRoleType')
export const allQyRoleType = Vue.filter('allQyRoleType')
export const JgRoleType = Vue.filter('JgRoleType')
const JgDwType = Vue.filter('JgDwType')
const IDType = Vue.filter('IDType')
const scoreFilter = Vue.filter('scoreFilter')

export default {
    formatDate,
    genderFilter,
    errorsExamFilter,
    QyRoleType,
    JgRoleType,
    JgDwType,
    IDType,
    dwJJSYZ,
    calcScoreText,
    calcScoreStyle,
    calcHeadColor,
    calcBannerCircle,
    calcBannerBg,
    scoreFilter
}
