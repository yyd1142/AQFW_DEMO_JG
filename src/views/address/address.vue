<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" fixed title="部门">
      <div class="address-search" slot="left" @click="openSearchBar" v-if="!isSearchBar">
        <i class="search-icon"></i>
      </div>
      <mt-button class="header-item" slot="left" icon="back" v-else>返回</mt-button>
      <div class="font-16" slot="right" @click="$MKOPush('/add_user')" v-if="$store.state.user.isAdmin">创建账号</div>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <div class="page-wrap address-wrap"  v-show="!resError">
      <mt-navbar class="navbar-wrap" v-model="addressClass" fixed>
        <mt-tab-item id="2">外部组织</mt-tab-item>
        <mt-tab-item id="1" @click="getData">内部人员</mt-tab-item>
      </mt-navbar>
      <div class="search-bar-wrap" v-if="isSearchBar">
        <div class="search-hidden-wrap" @click="isSearchBar = false;"></div>
        <search-bar v-model="searchValue" @onFocus="listenInput" @onCancelSearch="closeSearchBar" @onClearSearch="clearSearch"></search-bar>
      </div>

      <div class="address-list" ref="wrapper" :style="{ height: wrapperHeight - 50 + 'px'}" :class="isSearchBar ? 'has-searchbar-addresslist' : ''">
        <mt-tab-container v-model="addressClass">
          <mt-tab-container-item id="1">
            <div @click="goInfo('/address_detail/'+cell.id)"  v-for="cell in addressShowList">
              <!-- <mt-cell :title="cell.employeeName" :value="cell.phone"></mt-cell> -->
              <div class="address-cell">
                <div class="address-name">{{cell.employeeName}}</div>
                <span class="address-phone">{{cell.phone}}</span>
              </div>
            </div>
            <no-data  v-if="addressShowList.length <= 0"></no-data>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div  v-for="cell in lowerDws">
              <div class="address-cell" :class="cell.children ? 'first-cell' : null" @click="goJGinfo(cell)">
                <div class="address-name" :class="cell.children ? 'first' : null">{{cell.dwName}}</div>
                <span class="address-phone" :class="cell.children ? 'first' : null">
                  {{cell.qyScoreAverage || '暂无'}}
                  <span v-if="cell.qyScoreAverage">分</span>
                </span>
              </div>
              <div class="address-cell" v-for="item in cell.children" @click="goJGinfo(item)" v-if="cell.children">
                <div class="address-name">{{item.dwName}}</div>
                <span class="address-phone">
                  {{item.qyScoreAverage || '暂无'}}
                  <span v-if="item.qyScoreAverage">分</span>
                </span>
              </div>
              <div class="address-cell" v-if="cell.children && cell.children.length <= 0">
                <div class="address-name">暂无</div>
                <span class="address-phone">暂无</span>
              </div>
            </div>
            <no-data  v-if="lowerDws.length <= 0"></no-data>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <tabs :class="{'address-tabs':!fixedTabs}" actived="mail"></tabs>
  </div>
</template>


<script>
import api from 'api';
import { NoData, ResError, Tabs, SearchBar } from 'components';
import { Indicator } from 'mint-ui';

export default {
  data() {
    return {
      //提示
      resError: false,
      noData: false,
      //config
      addressClass: "2",
      searchValue: "",
      wrapperHeight: 0,
      fixedTabs: true,
      //数据
      addressList: [],
      addressShowList: [],
      lowerDws: [],
      isSearchBar: false
    };
  },
  watch: {
    searchValue: function () {
      this.searchData();
    },
    addressClass: function (val) {
      if (val === '1') this.getData();
      if (val === '2') this.getLowerDws();
    },
    isSearchBar: function (val) {
      if (!val) {
        window.mkoBackButton.bInputData = false;
      } else {
        window.mkoBackButton.bInputData = true;
      }
    }
  },
  activated() {
    this.onBackButtonEvent();
    this.$nextTick(() => {
      this.getData();
      this.getLowerDws();
      this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
    });
  },
  methods: {
    listenInput(val) {
      this.fixedTabs = !val;
      if (!val) {
        this.isSearchBar = false;
      }
    },
    getData() {
      this.noData = false;
      // Indicator.open({ spinnerType: 'fading-circle' });
      api.getAddressList({
        UUID: this.$store.getters.UUID,
        //          param: this.searchValue
      }).then(res => {
        // Indicator.close();
        if (!res) {
          if (!this.searchValue)
            this.resError = true;
          return;
        }
        let resp = res.response;
        if (!resp.length)
          this.noData = true;
        this.addressList = resp;
        this.addressShowList = JSON.parse(JSON.stringify(this.addressList));
      });
    },
    searchData() {
      let val = this.searchValue.toLowerCase();
      let reg = new RegExp(`.*${val}.*`);
      if (this.addressClass === '1') {
        let list = this.addressList;
        let show = this.addressShowList;
        show.length = 0;
        list.forEach(item => {
          if (item.employeeName.toLowerCase().search(reg) != -1 || item.phone.search(reg) != -1)
            show.push(item);
        });
      } else {
        let data = [];
        let lowerDws = JSON.parse(sessionStorage.getItem('subLowerDws')).response;
        lowerDws.forEach(item => {
          if (item.dwName.toLowerCase().search(new RegExp(`.*${this.searchValue}.*`)) != -1)
            data.push(item);
        });
        this.lowerDws = data;
      }
    },
    goInfo(path) {
      this.$MKOPush(path);
    },
    goJGinfo(item) {
      this.$MKOPush({
        name: 'jgDetail',
        params: {
          pid: item.groupId
        },
        query: {
          jgDetail: item
        }
      })
    },
    getLowerDws() {
      this.noData = false;
      api.lowerDw({
        groupId: this.$store.getters.groupId
      }).then(res => {
        if (!res) return false;
        if (res.code == 0) {
          if (res.response.length <= 0) {
            this.lowerDws = [];
            this.noData = true;
          } else {
            sessionStorage.setItem('subLowerDws', JSON.stringify(res));
            let datas = res.response;
            let ids = [];
            if (this.$store.getters.userInfo.dwId == 1) {
              datas.forEach((item) => {
                item.children = datas.filter(subItem => {
                  return subItem.parentId == item.id;
                });
              })
              this.lowerDws = datas.filter(item => {
                return item.parentId == 1;
              });
            } else {
              this.lowerDws = [{
                id: this.$store.getters.userInfo.id,
                parentId: this.$store.getters.userInfo.dwId,
                dwName: this.$store.getters.userInfo.dwName,
                groupId: this.$store.getters.userInfo.groupId,
                qyScoreAverage: this.$store.getters.userInfo.qyScoreAverage,
                children: datas
              }]
            }
            sessionStorage.setItem('lowerDws', JSON.stringify(this.lowerDws))
            this.noData = false;
            if (this.lowerDws.length <= 0)
              this.noData = true
          }
        } else {
          this.noData = true;
        }
      })
    },
    openSearchBar() {
      this.isSearchBar = !this.isSearchBar;
      this.onBackButtonEvent();
    },
    closeSearchBar() {
      this.isSearchBar = false;
      this.lowerDws = JSON.parse(sessionStorage.getItem('lowerDws'));
    },
    clearSearch() {
      this.$nextTick(() => {
        this.lowerDws = JSON.parse(sessionStorage.getItem('lowerDws'));
      })
    },
    onBackButtonEvent() {
      if (this.isSearchBar) {
        let that = this;
        window.mkoBackButton = {};
        window.mkoBackButton.bInputData = true;
        window.mkoBackButton.callback = function () {
          that.isSearchBar = false;
          window.mkoBackButton.bInputData = false;
        }
      }
    }
  },
  components: {
    NoData, ResError, Tabs, SearchBar
  }
};

</script>

<style lang="less" rel="stylesheet/less">
@import "../../config.less";

.address-tabs {
  .home-tabs-wrap {
    position: static !important;
    z-index: 3;
  }
}

.address-wrap {
  padding-bottom: 0;
  .search-bar-wrap {
    position: fixed;
    z-index: 20;
    margin: auto;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .search-hidden-wrap {
      position: fixed;
      z-index: 20;
      margin: auto;
      height: 100%;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .search-wrap {
      position: fixed;
      height: 44px;
      padding: 8px;
      background: #C9C9CE;
      z-index: 22;
      width: 100%;
      top: 80px + @headerTop;
      box-shadow: 0px 2px 6px 0px rgba(213, 213, 213, 0.50);
    }
  }

  .navbar-wrap {
    top: 40px + @headerTop;
    z-index: 10;
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(213, 213, 213, 0.50);
    .mint-tab-item {
      padding: 10px 0;
      height: 20px;
      font-size: 14px;
      &.is-selected {
        position: relative;
        border-bottom: 0;
        color: @textBlue;
        .mint-tab-item-label:after {
          content: "";
          position: absolute;
          width: 54px;
          bottom: 7px;
          left: 50%;
          transform: translate(-50%, 0);
          -webkit-transform: translate(-50%, 0);
          border-bottom: 2px solid @textBlue;
        }
      }
      .mint-tab-item-label {
        line-height: 20px;
      }
    }
  }
  .address-list {
    margin-top: 40px;
    &.has-searchbar-addresslist {
      margin: 80px 0 0 0;
    }
    .address-cell {
      width: 100%;
      height: 44px;
      display: table;
      .border-btm(#E0E0E0);
      background: #ffffff;
      &.first-cell {}
      .address-name,
      .address-phone {
        width: 50%;
        vertical-align: middle;
        display: table-cell;
        line-height: 44px;
        letter-spacing: 0px;
        font-size: 14px;
      }
      .address-name {
        text-align: left;
        padding-left: 14px;
        color: #72787D;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.first {
          color: #232323;
          font-weight: bold;
        }
      }
      .address-phone {
        text-align: right;
        padding-right: 14px;
        color: #A8AEB2;
        &.first {
          color: #72787D;
          font-weight: bold;
        }
      }
    }
    .mint-indexsection {
      .mint-indexsection-index {
        padding: 4px 0 3px 14px;
        height: 17px;
        line-height: 17px;
        font-size: 12px;
      }
      .mint-cell {
        .mint-cell-wrapper {
          padding: 0 14px;
          font-size: 14px;
          .mint-cell-title {}
          .mint-cell-value {
            color: #232323;
          }
        }
      }
    }
    .mint-indexlist-nav {
      display: none;
    }
    .mint-cell-allow-right {
      display: none;
    }
  }
}

.mint-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}

.mint-swipe-item {
  line-height: 200px;
}

.address-search {
  width: 18px;
  height: 40px;
  position: absolute;
  top: @headerTop;
  left: 14px;
  .search-icon {
    width: 18px;
    height: 18px;
    background: url('/static/icons/search.png') 0 0 no-repeat;
    background-size: cover;
    display: block;
    margin: 11px 0 0 0;
  }
}
</style>
