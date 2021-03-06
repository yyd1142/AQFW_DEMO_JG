import api from 'api';
import { Indicator, Toast } from 'mint-ui';
import { formatDate, calcScoreText, calcHeadColor, calcBannerCircle, calcBannerBg } from 'filters'
import { Tabs, ResError, ScoreBannerJg } from 'components'
import apiconf from 'apiconf'

var page = 1;
var needUpdate = [
    {},
    {isupdate: true, datas: [], type: 1, bottomAllLoaded: false, page: 1},
    {isupdate: true, datas: [], type: 2, bottomAllLoaded: false, page: 1},
    {isupdate: true, datas: [], type: 3, bottomAllLoaded: false, page: 1},
    {isupdate: true, datas: [], type: 4, bottomAllLoaded: false, page: 1}];

export default {
    data() {
        return {
            domain: `${apiconf.resourcesDomain}/`,
            //安全评分模块
            headColors: ['#B484F7S', '#77A0F1', '#97D72E', '#D6CB2F', '#FFA466'],
            jgName: '',
            scoreDatas: [],
            score: 0,
            //新闻模块
            selected: '1',
            swipeable: true,
            actionClass: 'action-item',
            actions: [
                {class: 'qy-icon', text: '社会单位', url: '/qy_list'},
                {class: 'fw-icon', text: '服务单位', url: '/fw_list'},
                {class: 'datacount-icon', text: '数据统计', url: '/data_count'},
                {class: 'notice-icon', text: '通知公告', url: '/notice'},
                {class: 'peixun-icon', text: '教育培训', url: '/train'},
                {class: 'yinhuan-icon', text: '风险管理', url: `/hidden_danger/${this.$store.getters.groupId}?is_jg=1`},
            ],
            newsTabs: [
                {text: '新闻通知', selected: 'news-table-actived', type: 1},
                {text: '安全知识', selected: false, type: 2},
                {text: '法律法规', selected: false, type: 3},
                {text: '经典案例', selected: false, type: 4}
            ],
            newsType: 1,
            newsDatas: [],
            autoFill: false,
            bottomAllLoaded: false,
            bottomStatus: '',
            // topAllLoaded: false,
            // topStatus: '',
            wrapperHeight: 0,
            hasMessageDataClass: '',
            resError: false
        }
    },
    activated() {
        this.resError = false;
        this.hasNewMessage();
        this.getBannerData();
        this.newsList(1, this.newsType);
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        //Banner数据
        getBannerData() {
            let data = {};
            try {
                data = JSON.parse(localStorage['USER_DATA']);
            } catch (err) {
            }
            this.jgName = JSON.parse(localStorage['USER_DATA']).dwName || '';
            this.score = JSON.parse(localStorage['USER_DATA']).qyScoreAverage || 0;
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
        calcHeadColor,
        //tab
        tab(item, index) {
            this.newsTabs.forEach((obj) => {
                if (index == this.newsTabs.indexOf(obj)) {
                    obj.selected = 'news-table-actived';
                } else {
                    obj.selected = false;
                }
            })
            this.newsType = item.type;
            this.bottomAllLoaded = needUpdate[this.newsType].bottomAllLoaded;
            if (needUpdate[this.newsType].datas.length <= 0) {
                this.newsList(1, this.newsType);
            } else {
                this.newsDatas = needUpdate[this.newsType].datas
            }
        },
        safeScore() {
        },
        //新闻列表
        newsList(page, type, isloadTop) {
            if (!needUpdate[type].isupdate && needUpdate[type].type == type) {
                this.newsDatas = needUpdate[type].datas
                setTimeout(() => {
                    // Indicator.close()
                }, 1500);
                return false;
            }
            let params = {
                informationType: type,
                page: needUpdate[type].page,
                count: 5
            };
            api.getNewsList(params).then(result => {
                this.$refs.loadmore.onBottomLoaded();
                this.$refs.loadmore.onTopLoaded();
                if (!result) {
                    this.resError = true;
                    // Indicator.close();
                    return;
                }
                if (result.code == 0) {
                    if (isloadTop) {
                        Toast({
                            message: '刷新成功',
                            position: 'middle',
                            duration: 1500
                        });
                    }
                    if (result.response.datas.length > 0) {
                        needUpdate[type] = {
                            isupdate: false, type: type,
                            datas: result.response.datas,
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            bottomAllLoaded: false
                        };
                        this.bottomAllLoaded = false;
                        this.newsDatas = result.response.datas;
                    } else {
                        needUpdate[type] = {
                            isupdate: false,
                            type: type,
                            datas: [],
                            page: result.response.page,
                            pageCount: result.response.pageCount,
                            bottomAllLoaded: true
                        };
                        this.newsDatas = []
                        this.bottomAllLoaded = true;
                    }
                }
            })
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        // 分页
        loadBottom() {
            setTimeout(() => {
                if (needUpdate[this.newsType].page == needUpdate[this.newsType].pageCount) {
                    Toast({
                        message: '暂无更多数据',
                        position: 'middle',
                        duration: 1500
                    });
                    needUpdate[this.newsType].bottomAllLoaded = true
                    this.bottomAllLoaded = needUpdate[this.newsType].bottomAllLoaded;
                    this.$refs.loadmore.onBottomLoaded();
                    return false;
                }
                needUpdate[this.newsType].page = needUpdate[this.newsType].page + 1
                let params = {
                    informationType: this.newsType,
                    page: needUpdate[this.newsType].page,
                    count: 5
                };
                api.getNewsList(params).then(result => {
                    this.$refs.loadmore.onBottomLoaded();
                    if (!result) {
                        this.resError = true;
                        return;
                    }
                    if (result.code == 0) {
                        if (result.response.datas.length == 0) {
                            Toast({
                                message: '暂无更多数据',
                                position: 'middle',
                                duration: 1500
                            });
                            needUpdate[this.newsType].bottomAllLoaded = true;
                            this.bottomAllLoaded = needUpdate[this.newsType].bottomAllLoaded;
                        } else {
                            Toast({
                                message: '加载完成',
                                position: 'middle',
                                duration: 1500
                            });
                            this.newsDatas = this.newsDatas.concat(result.response.datas);
                            this.bottomAllLoaded = false;
                            needUpdate[this.newsType] = {
                                isupdate: false,
                                type: this.newsType,
                                datas: this.newsDatas,
                                page: result.response.page,
                                pageCount: result.response.pageCount,
                                bottomAllLoaded: false
                            }
                        }
                    } else {

                    }
                })
            }, 1500);
        },
        routerLink(item) {
            // if (item.url == '/count_score') {
            //   Toast({
            //     message: '功能未开放',
            //     duration: 1000
            //   });
            //   return;
            // }
            this.$nextTick(() => {
                this.$MKOPush(item.url);
            })
        },
        goNewsInfo(item) {
            if (this.bottomStatus == 'drop' || this.bottomStatus == 'loading') {
                return false;
            }
            this.$MKOPush({
                name: "newsInfo",
                params: {
                    pid: item.id
                },
                query: {
                    type: item.informationType
                }
            })
        },
        hasNewMessage() {
            api.hasNewMessage({
                m: 'prompt',
                type: 2
            }).then(result => {
                if (result.code == 0) {
                    let data = result.response;
                    this.actions[3].class = data.notice > 0 ? 'has-notice-icon' : 'notice-icon'
                    this.hasMessageDataClass = data.message > 0 ? true : false
                } else {
                    this.resError = true;
                }
            })
        },
        titleFilters(val) {
            let strLength = val.length;
            if (strLength >= 20) {
                val = `${val.substring(0, 20)}...`
            }
            return val;
        }
    },
    components: {
        Tabs,
        ResError,
        ScoreBannerJg
    }
}


