import api from 'api'
import { Indicator, Toast } from 'mint-ui'
import { formatDate } from 'filters'
import { NoData } from 'components'
import moment from 'moment'

var updateDatas = [];
var needUpdate = true;
var _userName = ''
var count = 20;
var loadMorecount = 20;
export default {
    data() {
        return {
            list: [],
            notices: [],
            noLoadMore: false,
            notData: false,
            page: 1,
            pageItem: {},
            needLoadMore: true
        }
    },
    activated() {
        if (new Date(sessionStorage.getItem(`KEEP_ALIVE_RESET_TIME_statistics`)) < new Date() || _userName != this.$store.getters.userName) {
            this.noticeList();
        }
    },
    methods: {
        linkPath(item) {
            this.$MKOPush({
                name: 'noticeReplyList',
                params: {
                    pid: item.id
                }
            })
        },
        noticeList() {
            let params = {
                userName: this.$store.getters.userName,
                groupId: this.$store.getters.groupId,
                page: 1,
                count: count
            }
            this.notices = []
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getStatisticsList(params).then(result => {
                _userName = this.$store.getters.userName
                if (!result) {
                    this.notData = true;
                    Indicator.close();
                    this.needLoadMore = false;
                    return false;
                }
                if (result.code == 0) {
                    this.$APPUpdateTime('statistics') //记录该页面本次请求接口的时间
                    if (result.response.datas === undefined || result.response.datas.length == 0) {
                        updateDatas = [];
                        this.notices = [];
                        this.notData = true;
                        this.needLoadMore = false;
                    } else {
                        updateDatas = result.response.datas;
                        this.pageItem = {
                            "page": result.response.page, "pageCount": result.response.pageCount, "count": result.response.count, "countNumber": result.response.countNumber
                        }
                        this.notices = result.response.datas;
                        this.notData = false;
                        this.needLoadMore = result.response.pageCount <= 1 ? false : true;
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
                count: count,
                groupId: this.$store.getters.groupId
            }
            Indicator.open({ spinnerType: 'fading-circle' });
            api.getStatisticsList(params).then(result => {
                if (result.code == 0) {
                    Indicator.close()
                    // count = this.page * loadMorecount;
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
                    this.noLoadMore = false;
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
        },
        isProcessCount(item) {
            let receipt = item.receipt;
            if (receipt.indexOf('2') <= 0) {
                return item.isReceiptCount;
            } else {
                return item.isReadCount;
            }
        },
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD');
        }
    },
    components: {
        NoData
    }
}
