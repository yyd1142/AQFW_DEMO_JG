import api from 'api';
import { Indicator, Toast } from 'mint-ui';
import { formatDate } from 'filters'
import { Tabs, ResError, ScoreBannerNewJg } from 'components'

export default {
    data() {
        return {
            //安全评分模块
            jgName: '',
            scoreDatas: [],
            score: 0,
            //新闻模块
            actions: [
                [
                    {class: 'icon-index-qy-data', text: '社会单位', url: '/qy_list'},
                    {class: 'icon-index-fw-data', text: '服务单位', url: '/fw_list'},
                    {class: 'icon-index-data-count', text: '数据统计', url: '/data_count'},
                    {
                        class: 'icon-index-hidden-danger', text: '风险管理',
                        url: `/hidden_danger/${this.$store.getters.groupId}?is_jg=1`,
                        new: 0, desc: '个风险未处置', type: 'danger'
                    },
                ],
                [
                    {class: 'icon-index-notice', text: '通知公告', url: '/notice', new: 0, desc: '条消息未读'},
                    {class: 'icon-index-train', text: '教育培训', url: '/train'},
                ],
                [
                    {class: 'icon-index-news-info', text: '资讯科普', url: '/newsList'},
                    {class: '', text: '', url: ''},
                ],
            ],
            hasMessageDataClass: '',
            resError: false,
            viewWidth: 0
        }
    },
    watch: {},
    activated() {
        this.resError = false;
        this.hasNewMessage();
        this.getBannerData();
        this.$nextTick(() => {
            this.viewWidth = document.body.clientWidth;
        })
    },
    deactivated() {
    },
    methods: {
        //Banner数据
        getBannerData() {
            let data = {};
            try {
                data = JSON.parse(localStorage['USER_DATA']);
            } catch (err) {
            }
            this.jgName = data.dwJC || data.dwName || '';
            this.score = data.qyScoreAverage || 0;
            this.score = Math.round(this.score);
            let params = {
                m: 'qydwScore',
                groupId: this.$store.getters.groupId,
                type: data.type
            };
            api.getJGScoreTypes(params).then(res => {
                if (!res) {
                    this.resError = true;
                    return;
                }
                if (res.code == 0)
                    this.scoreDatas = res.response;
            })
        },
        routerLink(item) {
            // if (item.url == '/fw_list') {
            //     Toast({
            //         message: '功能未开放',
            //         duration: 1000
            //     });
            //     return;
            // }
            this.$nextTick(() => {
                this.$MKOPush(item.url);
            })
        },
        hasNewMessage() {
            api.hasNewMessage({
                m: 'prompt',
                type: 2
            }).then(result => {
                if (result.code == 0) {
                    let data = result.response;
                    this.hasMessageDataClass = data.message > 0 ? true : false;
                    this.actions[0][3].new = data.dwYHK || 0;
                    this.actions[1][0].new = data.notice || 0;
                } else {
                    this.resError = true;
                }
            })
        },
    },
    components: {
        Tabs,
        ResError,
        ScoreBannerNewJg
    }
}


