<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="服务单位" fixed>
      <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <res-error  v-if="resError"></res-error>
    <no-data  v-if="noData"></no-data>
    <div class="page-wrap fw-list-wrap" v-show="!resError && !noData">
      <div class="selecetd" @click="popupShow = true">
        <i class="selected-icon"></i>筛选
      </div>
      <div ref="wrapper">
        <mt-loadmore
          ref="loadmore"
          :top-method="loadTop"
          @top-status-change="handleTopChange"
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="bottomAllLoaded"
          :auto-fill="autoFill">
          <ul class="list" :style="{ height: wrapperHeight + 'px'}">
            <li class="item" @click="go(item.groupId)"  v-for="(item,i) in fwList">
              <div class="info">
                <div class="title">{{item.dwName}}</div>
                <div class="desc">资质：{{item.zzInfoValue}}</div>
              </div>
              <div class="score">
                <star type="square" :score="item.score||5"></star>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
      <div class="popup-wrap">
        <mt-popup v-model="popupShow" position="right">
          <div class="body-wrap">
            <div class="radio-wrap">
              <p class="title">资质等级</p>
              <mt-button class="radio" :class="{'checked':formData.level===item.value}"
                         @click.native="formData.level=item.value"  v-for="item in options.level" size="large">
                <span class="sign" v-show="formData.level===item.value"></span>{{item.text}}
              </mt-button>
            </div>
            <div class="radio-wrap">
              <p class="title">服务评分</p>
              <mt-button class="radio" :class="{'checked':formData.score==item.value}"
                         @click.native="formData.score=item.value"
                          v-for="item in options.score" size="large">
                <span class="sign has-gutter" v-show="formData.score==item.value"></span>{{item.text}}
              </mt-button>
            </div>
          </div>
          <div class="footer-wrap">
            <mt-button class="reset" @click="resetData">重置</mt-button>
            <mt-button class="confirm" @click="filterList">筛选</mt-button>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .fw-list-wrap {
    .selecetd {
      width: 100%;
      height: 40px;
      color: @blueColor;
      background-color: #fff;
      margin-bottom: 14px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      .selected-icon {
        position: relative;
        bottom: 5px;
        right: 5px;
        padding: 7px;
        font-size: 0;
        background: url('/static/icons/resource.png') -836px 0 no-repeat;
        background-size: 892px auto;
      }
    }
    .list {
      .item {
        position: relative;
        display: block;
        box-sizing: border-box;
        height: 50px;
        padding: 6px 14px 5px;
        .border-btm(#E0E0E0);
        background: #fff;
        .score {
          position: absolute;
          top: 6px;
          right: 8px;
        }
        .info {
          letter-spacing: 0;
          .title {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #232323;
          }
          .desc {
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #B7B7B7;
          }
        }
      }
    }
    .popup-wrap {
      position: relative;
      .mint-popup-right {
        width: 284px;
        height: 100%;
      }
      .body-wrap {
        overflow: scroll;
        padding: 34px 7px 100px;
        max-height: 700px;
        bottom: 100px;
        &:after {
          display: table;
          content: "";
        }
        .radio-wrap {
          margin-bottom: 10px;
          font-size: 12px;
          .radio {
            padding: 0 4px;
            margin-bottom: 6px;
            height: 30px;
            border-radius: @radiusS;
            background: #f0f2f5;
            color: @textBase;
            &.checked {
              background: #fff;
              border: 1px solid @textBlue;
              color: @textBlue;
            }
            .mint-button-text {
              font-size: 12px;
              .sign {
                display: inline-block;
                position: relative;
                top: 1px;
                padding: 9px 12px 0 0;
                background: url(/static/icons/resource.png) -44px -61px no-repeat;
                background-size: 356px auto;
                &.has-gutter {
                  right: 5px;
                }
              }
            }
          }
          .title {
            margin: 0 0 10px;
          }
          & + .radio-wrap {
            margin-top: 20px;
            padding-top: 20px;
            .border-top(#D8D8D8);
          }
        }
      }
      .footer-wrap {
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        .mint-button {
          flex: 1;
          -webkit-flex: 1;
          width: 50%;
          height: 39px;
          border-radius: 0;
          opacity: 0.73;
          &.reset {
            border: 1px solid #EDEEF1;
            background: #fff;
            color: @textBlue;
          }
          &.confirm {
            background: #0398FF;
            color: #fff;
          }
        }
      }

    }
  }
</style>

<script>
  let sim = [
    {
      dwName: '无锡蓝天电子有限公司',
      zzInfoValue: '一级资质',
      score: 5
    },
    {
      dwName: '无锡市世达建设有限公司',
      zzInfoValue: '一级资质',
      score: 4.5
    },
    {
      dwName: '无锡市丰顺机电工程有限公司',
      zzInfoValue: '二级资质',
      score: 4.5
    },
    {
      dwName: '无锡市首信消防技术服务有限公司',
      zzInfoValue: '一级资质',
      score: 4
    },
    {
      dwName: '无锡太和天成消防工程有限公司',
      zzInfoValue: '二级资质',
      score: 4
    },
    {
      dwName: '无锡市合众消防科技有限公司',
      zzInfoValue: '一级资质',
      score: 3.5
    },
    {
      dwName: '无锡市工业设备安装有限公司',
      zzInfoValue: '二级资质',
      score: 3.5
    },
  ];
  import {Indicator, Toast} from 'mint-ui';
  import api from 'api'
  import {NoData, ResError} from 'components';
  import Star from 'components/Star/Star.vue'
  export default{
    data() {
      return {
        //提示
        resError: false,
        noData: false,
        //列表
        wrapperHeight: 0,
        autoFill: false,
        topStatus: '',
        bottomAllLoaded: false,
        bottomStatus: '',
        page: 1,
        fwList: [],
        //筛选
        popupShow: false,
        options: {
          level: [
            {text: '全部', value: ''},
            {text: '一级资质', value: 1},
            {text: '二级资质', value: 2},
            {text: '三级资质', value: 3},
          ],
          score: [
            {text: '全部', value: ''},
            {text: '五星', value: '五星'},
            {text: '四星', value: '四星'},
            {text: '三星', value: '三星'},
            {text: '二星', value: '二星'},
            {text: '一星', value: '一星'}
          ]
        },
        formData: {
          level: '',
          score: ''
        }
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
//      ctrlPopupShow(e){
//        e.preventDefault();
//        this.popupShow = true;
//      },
      getData(){
        this.noData = false;
        Indicator.open({spinnerType: 'fading-circle'});
        let parmas = {
          page: this.page,
          zzInfo: this.formData.level
        };
        api.getFwList(parmas).then(res => {
          this.$refs.loadmore.onTopLoaded();
          this.$refs.loadmore.onBottomLoaded();
          if (!res) {
            Indicator.close();
            if (this.page === 1)
              this.resError = true;
            return;
          }
          if (res.response.datas.length === 0) {
            this.bottomAllLoaded = true;
            if (this.page === 1)
              this.noData = true;
          } else {
            res.response.datas.forEach(item => {
              this.fwList.push(item);
            });
          }
//          this.fwList = this.fwList.concat(sim);
          Indicator.close();
        });
      },
      loadTop(){
        this.page = 1;
        this.fwList.length = 0;
        setTimeout(this.getData, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadBottom() {
        this.page++;
        this.getData();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      filterList(){
        this.popupShow = false;
        this.page = 1;
        this.fwList.length = 0;
        this.getData();
      },
      resetData(){
        let data = this.formData;
        for (let key in data) {
          data[key] = "";
        }
      },
      go(id){
        console.log(this.bottomStatus);
        if (this.bottomStatus != 'loading' && this.topStatus != 'loading')
          this.$MKOPush('/fw_info/' + id);
      },
      back(){
        this.$MKOPop();
        Indicator.close();
      }
    },
    components: {
      NoData,
      ResError,
      Star
    }
  }
</script>


