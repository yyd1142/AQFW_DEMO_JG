/**
 * Created by queue on 2017/8/9.
 */
export default {
    //社会端人员个人资质 提交数据时直接提交中文
    jobTitleList: ['高级注册消防工程师', '一级注册消防工程师', '二级注册消防工程师', '建（构）筑物消防高级技师', '建（构）筑物消防技师', '高级建（构）筑物消防员', '中级建（构）筑物消防员', '初级建（构）筑物消防员', '灭火救援高级技师', '灭火救援技师', '高级灭火救援员', '中级灭火救援员', '初级灭火救援员', '中控高级技师', '中控技师', '高级中控员', '中级中控员', '初级中控员'],
    //安全评分补充说明
    scoreDesc: {
        jzhz: {
            title: '建筑火灾风险评分',
            desc: `(一) 建筑属性 <br> 考核建筑的火灾风险系数。录入全部建筑信息后，大数据分析平台将根据您录入的建筑信息情况测算出该建筑的火灾风险系数，风险越低得分越高。`,
        },
        xfsssb: {
            title: '消防设施管理评分',
            desc: `(一) 消防设施完好率 <br> 该项分数评估的是贵单位的消防设施设备使用状态，在已添加的设施设备中“正常“设备比例越高则分数越高。所以如出现设备“故障”或“维修中”应尽快处理修复。`,
        },
        xfaqgl: {
            title: '消防安全管理评分',
            desc: `
        (一) 基本信息完善率 <br>
        考核单位的基本信息是否完善，基本信息包括人员信息、单位信息、建筑信息和消防设施设备信息，信息填写越完整则分数越高。
        <br><br>
        (二) 消控中心在岗率 <br>
        考核消控中心值班情况，按照消防法规定消控中心应保证每天3班值班，且保持24小时都有人在岗，值班班次越多则分数越高。
        <br><br>
        (三) 人员履职率 <br>
        考核消防安全巡查执行情况，根据各社会单位自定的巡查要求，如有分派的巡查工作没有做就会扣分，因此执行越到位则分数越高。
        <br><br>
        (四) 检查项目达标率 <br>
        考核社会单位的消防设施设备检测、保养和维修情况，如在过程中出现问题越少就分数越高。
        <br><br>
        (五) 安全管理执行率 <br>
        考核社会单位日常的消防安全管理工作情况，主要考察以下6项指标：1、是否将消防工作落实到人；2、是否建立消防安全制度；3、是否定期开展消防工作例会；4、是否制定灭火和应急预案；5、是否演练灭火和应急苏三预案；6、是否设置消防队。以上6项指标执行越多则分数越高。
        <br><br>
        (六) 学习培训覆盖率 <br>
        考核社会单位的消防安全学习培训情况，主要考察是否定期组织职工进行消防培训和消防工作人员岗前消防安全培训，以及是否及时回复消防监督部门的通知公告，学习培训越多则分数越高。
        <br><br>
        (七) 第三方服务签约率 <br>
        考核社会单位的消防责任单位签约情况，主要考察是否签约维保机构、检测机构以及保险机构，签约越多则分数越高。
        <br><br>
        (八) 物联网设备接入率 <br>
        考核社会单位的物联网设备接入情况，接入越多则分数越高。`
        },
    },
    //企业人员部门分类
    qyDepartmentList: [
        {text: '消防', value: 1},
        {text: '安监', value: 2},
        {text: '其他', value: 0},
    ],
    qyRoleList: {
        1: {
            type: 1,
            text: '消防',
            role: [
                {text: '消防安全责任人', value: 1},
//            {text: '消防安全管理人', value: 2},
                {text: '消防控制室操作人员', value: 3},
                {text: '专兼职消防管理人员', value: 4},
                {text: '保安', value: 5},
                {text: '消防引导员', value: 6},
                {text: '消防安全监测人员', value: 7},
                {text: '专职（志愿）消防队员', value: 8},
                {text: '建设工程消防设施施工、监理、检测、维保等执业人员', value: 9},
            ]
        },
        2: {
            type: 2,
            text: '安监',
            role: [
                {text: '易燃易爆危险化学品从业人员', value: 10},
                {text: '设备维修工', value: 11},
                {text: '安全员', value: 12},
                {text: '特种设备作业人员', value: 13},
                {text: '职业健康监护人员', value: 14},
                {text: '安全负责人', value: 15},
                {text: '安全管理员', value: 16},
            ]
        },
        0: {
            type: 0,
            text: '其他',
            role: [
                {text: '建筑工程设计人员', value: 17},
                {text: '其他重点岗位人员', value: 18},
                {text: '社会单位员工', value: 19},
            ]
        }
    },
    allQyRoleList: {
        1: '消防安全责任人',
        2: '消防安全管理人',
        3: '消防控制室操作人员',
        4: '专兼职消防管理人员',
        5: '保安',
        6: '消防引导员',
        7: '消防安全监测人员',
        8: '专职（志愿）消防队员',
        9: '建设工程消防设施施工、监理、检测、维保等执业人员',
        10: '易燃易爆危险化学品从业人员',
        11: '设备维修工',
        12: '安全员',
        13: '特种设备作业人员',
        14: '职业健康监护人员',
        15: '安全负责人',
        16: '安全管理员',
        17: '建筑工程设计人员',
        18: '其他重点岗位人员',
        19: '社会单位员工'
    }
}
