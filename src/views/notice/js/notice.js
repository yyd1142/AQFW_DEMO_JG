import api from 'api'
import { Indicator, Toast } from 'mint-ui'
import { formatDate } from 'filters'
import { NoData } from 'components'

var updateDatas = [];
var needUpdate = true;
var _userName = ''
var count = 10;
var loadMorecount = 10;
export default {
    data() {
        return {
            list: [],
            notices: [],
            noLoadMore: false,
            notData: false,
            page: 1,
            pageItem: {},
            notReadIcon:`<i class="not-read-item"></i>`,

        }
    },
    activated() {
        if (new Date(sessionStorage.getItem(`KEEP_ALIVE_RESET_TIME_notice`)) < new Date() || _userName != this.$store.getters.userName) {
            this.noticeList();
            // this.notices=[
            //     {title:'时间',createTime:new Date(), status:1}
            // ]
        }
        if (sessionStorage.getItem('NOTICEDETAIL_READ_STATUS')) {
            let noticeItem = JSON.parse(sessionStorage.getItem('NOTICEDETAIL_READ_STATUS'))
            this.notices.forEach((item) => {
                item.status = item.id == noticeItem.id ? noticeItem.status : item.status;
            })
        }
    },
    deactivated() {
        
    },
    methods: {
        linkPath(item) {
            this.$MKOPush({
                path: `/notice/${item.id}`,
                query: {
                    status: item.status
                }
            })
        },
        noticeList() {
            let params = {
                m: 'list',
                userName: this.$store.getters.userName,
                page: 1,
                count: count
            }
            this.notices = []
            api.getNoticesList(params).then(result => {
                _userName = this.$store.getters.userName
                if (!result) {
                    this.notData = true;
                    Indicator.close()
                    return false;
                }
                if (result.code == 0) {
                    this.$APPUpdateTime('notice') //记录该页面本次请求接口的时间
                    if (result.response.datas === undefined || result.response.datas.length == 0) {
                        updateDatas = [];
                        this.notices = [];
                        this.notData = true;
                        this.noLoadMore = true;
                    } else {
                        updateDatas = result.response.datas;
                        this.pageItem = {
                            "page": result.response.page, "pageCount": result.response.pageCount, "count": result.response.count, "countNumber": result.response.countNumber
                        }
                        this.notices = result.response.datas;
                        this.notData = false;
                        this.noLoadMore = false;
                    }
                } else {
                    this.notData = true;
                }
                needUpdate = false;
                Indicator.close()
            })
        },
        // 分页
        loadBottom() {
            if (this.pageItem.pageCount == this.pageItem.page) {   //总页数少于1页，不支持分页功能
                Toast({
                    message: '暂无更多数据',
                    position: 'middle',
                    duration: 1500
                });
                this.noLoadMore = true;
                return;
            }
            this.pageItem.page = this.pageItem.page + 1
            let params = {
                userName: this.$store.getters.userName,
                page: this.pageItem.page,
                count: count
            }
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getNoticesList(params).then(result => {
                if (result.code == 0) {
                    Indicator.close()
                    if (result.response.datas.length <= 0) {
                        Toast({
                            message: '暂无更多数据',
                            position: 'middle',
                            duration: 1500
                        });
                        this.noLoadMore = true;
                    } else {
                        Toast({
                            message: '加载完成',
                            position: 'middle',
                            duration: 1500
                        });
                        if (!needUpdate) {
                            updateDatas = updateDatas.concat(result.response.datas);
                            this.notices = updateDatas;
                        } else {
                            this.notices = this.notices.concat(result.response.datas);
                        }
                        this.noLoadMore = false;
                    }
                } else {
                    Indicator.close()
                }
            })
        },
        loadTop() {
            setTimeout(() => {
                count = 10;
                this.page = 1;
                this.noticeList();
            }, 1500)
        },
        back() {
            this.$MKOPop()
        },
        refresh() {
            Indicator.open({ spinnerType: 'fading-circle' });
            setTimeout(() => {
                sessionStorage.removeItem('NOTICEDETAIL_READ_STATUS')
                this.noLoadMore = false
                this.notices = [];
                this.noticeList()
                Toast({
                    message: '刷新完成',
                    position: 'middle',
                    duration: 1500
                });
            }, 1500)
        }
    },
    components: {
        NoData
    }
}
