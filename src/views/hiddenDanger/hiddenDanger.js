import api from 'api';
import { NoData, ResError } from 'components';
import { Indicator, Toast } from 'mint-ui';
import { formatDate } from 'filters';

var needUpdate = [
  {},
  { isupdate: true, datas: [], type: 1, noLoadMore: false, page: 1 },
  { isupdate: true, datas: [], type: 2, noLoadMore: false, page: 1 },
  { isupdate: true, datas: [], type: 3, noLoadMore: false, page: 1 }];

export default {
  data() {
    return {
      notData: false,
      resError: false,
      hiddenDangers: [],
      tabs: [{ actived: 'actived', text: '未处置', type: 1 }, { actived: '', text: '处置中', type: 3 }, { actived: '', text: '已处置', type: 2 }],
      hiddenDangersType: 1,
      hiddenDangersDatas: [],
      noLoadMore: false,
      needLoadMore: true
    }
  },
  activated() {
    this.$nextTick(() => {
      this.getData(1, this.hiddenDangersType);
    });
  },
  deactivated() {

  },
  methods: {
    getData(page, type, isloadTop) {
      Indicator.open({ spinnerType: 'fading-circle' });
      api.getYhkList({
        m: this.$store.getters.userInfo.type === 1 ? 'gjList' : 'xtList',
        groupId: this.$route.params.id,
        status: type,
        page: 1,
        count: 10
      }).then(res => {
        Indicator.close();
        if (!res) {
          this.resError = true;
          this.needLoadMore = false;
          return;
        }
        if (res.code === 0) {
          if (res.response && res.response.datas.length >= 0) {
            needUpdate[type] = { isupdate: false, type: type, datas: res.response.datas, noLoadMore: false, page: res.response.page, pageCount: res.response.pageCount, count: res.response.count, countNumber: res.response.countNumber };
            this.hiddenDangers = res.response.datas;
            this.notData = false;
            this.noLoadMore = false;
            this.needLoadMore = res.response.pageCount <= 1 ? false : true;
          } else {
            needUpdate[type] = { isupdate: false, type: type, datas: [], noLoadMore: true, page: 1 };
            this.hiddenDangers = [];
            this.notData = true;
            this.noLoadMore = true;
            this.needLoadMore = false;
          }
        } else {

        }
      })
    },
    tab(item, index) {
      this.tabs.forEach((item) => {
        if (this.tabs.indexOf(item) == index) {
          item.actived = 'actived'
        } else {
          item.actived = ''
        }
      });
      this.hiddenDangersType = item.type;
      this.noLoadMore = needUpdate[item.type].noLoadMore;
      if (needUpdate[item.type].datas.length <= 0) {
        this.getData(1, this.hiddenDangersType);
      } else {
        this.needLoadMore = needUpdate[item.type].pageCount <= 1 ? false : true;
        this.hiddenDangers = needUpdate[item.type].datas;
      }
    },
    // 分页
    loadBottom() {
      if (needUpdate[this.hiddenDangersType].page == needUpdate[this.hiddenDangersType].pageCount) {
        Toast({
          message: '暂无更多数据',
          position: 'middle',
          duration: 1500
        });
        this.noLoadMore = true;
        return;
      }
      Indicator.open({ spinnerType: 'fading-circle' });
      let page = needUpdate[this.hiddenDangersType].page;
      page = page + 1;
      api.getYhkList({
        m: this.$store.getters.userInfo.type === 1 ? 'gjList' : 'xtList',
        groupId: this.$route.params.id,
        status: this.hiddenDangersType,
        page: page,
        count: 10
      }).then(result => {
        if (result.code == 0) {
          Indicator.close();
          if (result.response.datas === undefined || result.response.datas.length == 0) {
            Toast({
              message: '暂无更多数据',
              position: 'middle',
              duration: 1500
            });
          } else {
            Toast({
              message: '加载完成',
              position: 'middle',
              duration: 1500
            });
            this.hiddenDangers = this.hiddenDangers.concat(result.response.datas);
            needUpdate[this.hiddenDangersType] = {
              isupdate: false,
              type: this.hiddenDangersType,
              datas: this.hiddenDangers,
              noLoadMore: false,
              page: result.response.page,
              pageCount: result.response.pageCount,
              count: result.response.count,
              countNumber: result.response.countNumber
            };
          }
        } else {
          Indicator.close();
        }
      })
    },
    back() {
      this.$MKOPop()
    },
    linkPath(path) {
      this.$MKOPush(path)
    }
  },
  components: {
    NoData,
    ResError
  }
}


