<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="数据统计" fixed>
      <router-link to="/data_count_list" slot="left">
        <mt-button class="header-item" icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!--<div class="scroll" id="scroll">-->
    <div class="page-wrap data-count-info-wrap" ref="wrap">
      <div class="section part1">
        <div class="folder" :class="{fixed:fixed.part1}" @click="ctrlShow(1)">
          <p class="left">1注册企业总数</p>
          <p class="right">4512</p>
          <i class="arrow" :class="{on:show.part1.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part1.show">
          <div id="p1_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p1_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p1_chart3" style="margin: 0 auto; width:90%; height:350px"></div>
        </div>
      </div>

      <div class="section part2">
        <div class="folder" :class="{fixed:fixed.part2}" @click="ctrlShow(2)">
          <p class="left">2新增企业数</p>
          <p class="right">652</p>
          <i class="arrow" :class="{on:show.part2.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part2.show">
          <div id="p2_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p2_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p2_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>

      <div class="section part3">
        <div class="folder" :class="{fixed:fixed.part3}" @click="ctrlShow(3)">
          <p class="left">3活跃企业总数</p>
          <p class="right">2698</p>
          <i class="arrow" :class="{on:show.part3.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part3.show">
          <div id="p3_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p3_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p3_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>

      <div class="section part4">
        <div class="folder" :class="{fixed:fixed.part4}" @click="ctrlShow(4)">
          <p class="left">4注册用户总数</p>
          <p class="right">19654</p>
          <i class="arrow" :class="{on:show.part4.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part4.show">
          <div id="p4_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p4_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p4_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>

      <div class="section part5">
        <div class="folder" :class="{fixed:fixed.part5}" @click="ctrlShow(5)">
          <p class="left">5新增用户总数</p>
          <p class="right">1024</p>
          <i class="arrow" :class="{on:show.part5.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part5.show">
          <div id="p5_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p5_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p5_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>

      <div class="section part6">
        <div class="folder" :class="{fixed:fixed.part6}" @click="ctrlShow(6)">
          <p class="left">6活跃用户总数</p>
          <p class="right">19593</p>
          <i class="arrow" :class="{on:show.part6.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part6.show">
          <div id="p6_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p6_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p6_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>

      <div class="section part7">
        <div class="folder" :class="{fixed:fixed.part7}" @click="ctrlShow(7)">
          <p class="left">7专项整治任务总数</p>
          <p class="right">3656</p>
          <i class="arrow" :class="{on:show.part7.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part7.show">
          <div id="p7_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p7_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p7_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>
      <div class="section part7">
        <div class="folder" :class="{fixed:fixed.part8}" @click="ctrlShow(8)">
          <p class="left">8生成数据总量</p>
          <p class="right">3256584<span>条</span></p>
          <i class="arrow" :class="{on:show.part8.show}"></i>
        </div>
        <div class="sub-folder" v-show="show.part8.show">
          <div id="p8_chart1" style="margin: 0 auto; width:90%; height:350px"></div>
          <div id="p8_chart2" style="margin: 0 auto; width:100%; height:350px"></div>
          <div id="p8_chart3" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>
    </div>
    <!--</div>-->
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../../config.less";

  .scroll {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .page-wrap {
      height: auto;
      min-height: 110%;
      margin-top: 0;
      /*padding-bottom: 0;*/
    }
  }

  .ti {
    height: 300px;
  }

  .data-count-info-wrap {
    position: relative;
    width: 100%;
    p, ul {
      margin: 0;
      padding: 0;
    }
    .section {
      position: relative;
      width: 100%;
      background: #fff;
    }

    .arrow {
      position: absolute;
      top: 19px;
      right: 12px;
      padding: 5px 9px;
      background: url(/static/icons/resource.png) -111px -206px no-repeat;
      background-size: 892px auto;
      &.on {
        background-position: -111px -196px;
      }
    }
    .folder {
      position: relative;
      display: block;
      width: 100%;
      height: 48px;
      border-bottom: #ccc 1px solid;
      &.fixed {
        position: fixed;
        top: @headerHeight;
        z-index: 1;
        background: #fff;
        & + .sub-folder {
          margin-top: 48px;
        }
      }
    }

    .folder p {
      line-height: 48px;
      padding: 0;
      display: block;
    }

    .folder .left {
      text-align: left;
      float: left;
      width: 60%;
      margin-left: 12px;
    }
    .folder .right {
      text-align: right;
      float: right;
      width: 20%;
      margin-right: 37px;
    }

    .sub-folder {
      position: relative;
      border-bottom: #ccc 1px solid;
      padding-top: 30px;
      width: 100%;
      /*display: none;*/
    }

  }
</style>

<script>
  import BScroll from 'better-scroll'
  import echarts from 'echarts';
  let theme = 'macarons';

  export default{
    data() {
      return {
        show: {
          part1: {show: false, first: true},
          part2: {show: false, first: true},
          part3: {show: false, first: true},
          part4: {show: false, first: true},
          part5: {show: false, first: true},
          part6: {show: false, first: true},
          part7: {show: false, first: true},
          part8: {show: false, first: true}
        },
        fixed: {
          part1: false,
          part2: false,
          part3: false,
          part4: false,
          part5: false,
          part6: false,
          part7: false,
          part8: false
        }
      }
    },
    watch: {
      show: {
        handler: function () {
          this.calcPos();
        },
        deep: true
      }
    },
    created(){
//      const LENGTH = 8;
//      for (let i = 0; i < LENGTH; i++) {
//        this.show['part' + (i + 1)] = {
//          show: false,
//          first: true
//        };
//      }
    },
    mounted() {
      window.onscroll = this.calcPos;
//      this.$nextTick(() => {
//        this.initScroll();
//      });
    },
    methods: {
      initScroll() {
        this.wrapScroll = new BScroll(document.getElementById('scroll'), {
          probeType: 2,
          bounce: false,
          startX: 0,
          startY: 0
        });
        this.wrapScroll.on('scroll', this.calcScrollPos);
      },
      ctrlShow(part){
        this.show['part' + part].show = !this.show['part' + part].show;
//        this.$nextTick(() => {
//          this.wrapScroll.refresh()
//        });
        if (this.show['part' + part].show && this.show['part' + part].first) {
          switch (part) {
            case 1:
              this.DrawChart1(echarts);
              this.DrawChart2(echarts);
              this.DrawChart3(echarts);
              break;
            case 2:
              this.DrawChart4(echarts);
              this.DrawChart5(echarts);
              this.DrawChart6(echarts);
              break;
            case 3:
              this.DrawChart7(echarts);
              this.DrawChart8(echarts);
              this.DrawChart9(echarts);
              break;
            case 4:
              this.DrawChart10(echarts);
              this.DrawChart11(echarts);
              this.DrawChart12(echarts);
              break;
            case 5:
              this.DrawChart13(echarts);
              this.DrawChart14(echarts);
              this.DrawChart15(echarts);
              break;
            case 6:
              this.DrawChart16(echarts);
              this.DrawChart17(echarts);
              this.DrawChart18(echarts);
              break;
            case 7:
              this.DrawChart19(echarts);
              this.DrawChart20(echarts);
              this.DrawChart21(echarts);
              break;
            case 8:
              this.DrawChart22(echarts);
              this.DrawChart23(echarts);
              this.DrawChart24(echarts);
              break;
          }
        }
        this.show['part' + part].first = false;
      },
      calcScrollPos(){
        let scrollTop = -1 * this.$refs.wrap.style.transform.split(', ')[1].split('px')[0];
//        console.log(scrollTop);
//        console.log(this.wrapScroll);
        let SubList = this.$refs.wrap.querySelectorAll(".sub-folder");
        let SubHeadList = this.$refs.wrap.querySelectorAll(".folder");
        let SubHeight = [];
        let h = 0;
        for (let item of SubList) {
          h += item.offsetHeight + 48;
          SubHeight.push(h);
        }
        for (let key in this.fixed) {
          this.fixed[key] = false;
        }
        for (let item of SubHeadList) {
          item.style.transform = `translate(0px,0px)`;
        }
        for (let i = 0; i < SubHeight.length; i++) {
          if ((i == 0 || scrollTop >= SubHeight[i - 1]) && scrollTop <= SubHeight[i]) {
            if (this.show['part' + (i + 1)].show) {
              SubHeadList[i].style.transform = `translate(0px,${scrollTop - SubHeight[i - 1]}px)`;
              this.fixed['part' + (i + 1)] = true;
            }
          }
        }
      },
      calcPos(){
        if (this.$route.path !== '/data_count_info')
          return;
        let SubList = this.$refs.wrap.querySelectorAll(".sub-folder");
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
//        let scrollTop = document.body.scrollTop;
        let SubHeight = [];
        let h = 0;
        for (let item of SubList) {
          h += item.offsetHeight + 48;
          SubHeight.push(h);
        }
        for (let key in this.fixed) {
          this.fixed[key] = false;
        }
        for (let i = 0; i < SubHeight.length; i++) {
          if ((i == 0 || scrollTop >= SubHeight[i - 1]) && scrollTop <= SubHeight[i]) {
            if (this.show['part' + (i + 1)].show) {
              this.fixed['part' + (i + 1)] = true;
            }
          }
        }
      },
      DrawChart1(ec)
      {
        let myChart = ec.init(document.getElementById('p1_chart1'), theme);
        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '注册企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },


          series: [
            {
              name: '注册企业数',
              type: 'pie',
              radius: [20, 120],

              roseType: 'area',
              x: '50%',
              max: 50,
              sort: 'ascending',
              data: [
                {value: 769, name: '江阴市'},
                {value: 423, name: '宜兴市'},
                {value: 379, name: '新吴区'},
                {value: 366, name: '锡山区'},
                {value: 355, name: '梁溪区'},
                {value: 321, name: '滨湖区'},
                {value: 279, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart2(ec)
      {

        var myChart = ec.init(document.getElementById('p1_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '注册企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '注册企业数',
            type: 'pictorialBar',
            barCategoryGap: '-100%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },

            data: [1238, 782, 431, 263, 179],

          }]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart3(ec)
      {

        var myChart = ec.init(document.getElementById('p1_chart3'), theme);

        myChart.setOption({
          title: {
            text: '行业类型排名',
            subtext: '注册企业数',
            x: 'center'
          },
          tooltip: {},
          legend: {},
          xAxis: {},
          yAxis: {
            data: [
              "经信",
              "教育",
              "交通",
              "建设",
              "环保",
              "公建",
              "公安",
              "房管",
              "城管",
              "安监"]
          },
          series: [{
            name: '注册企业数',
            type: 'bar',
            data: [41, 41, 49, 49, 53, 53, 94, 102, 167, 1861]
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      //Part 2
      DrawChart4(ec)
      {

        var myChart = ec.init(document.getElementById('p2_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '新增企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          calculable: true,
          series: [
            {
              name: '新增企业数',
              type: 'pie',
              radius: [30, 110],

              roseType: 'area',
              x: '50%',
              max: 40,
              sort: 'ascending',
              data: [
                {value: 173, name: '江阴市'},
                {value: 95, name: '宜兴市'},
                {value: 85, name: '新吴区'},
                {value: 83, name: '锡山区'},
                {value: 80, name: '梁溪区'},
                {value: 72, name: '滨湖区'},
                {value: 63, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart5(ec)
      {

        var myChart = ec.init(document.getElementById('p2_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '新增企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '新增企业数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [1238, 782, 431, 263, 179],

          }]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart6(ec)
      {

        var myChart = ec.init(document.getElementById('p2_chart3'), theme);

        myChart.setOption({
          title: {
            text: '行业类型排名',
            subtext: '新增企业数',
            x: 'center'
          },
          tooltip: {},
          legend: {},
          xAxis: {},
          yAxis: {
            data: ["经信", "教育", "交通", "建设", "环保", "公建", "公安", "房管", "城管", "安监"]
          },
          series: [{
            name: '注册企业数',
            type: 'bar',
            data: [9, 9, 11, 11, 12, 12, 21, 23, 38, 420]
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,


      // Part 3
      DrawChart7(ec)
      {

        var myChart = ec.init(document.getElementById('p3_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '活跃企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          calculable: true,
          series: [
            {
              name: '活跃企业数',
              type: 'pie',
              radius: [30, 110],

              roseType: 'area',
              x: '50%',
              max: 40,
              sort: 'ascending',
              data: [
                {value: 731, name: '江阴市'},
                {value: 409, name: '宜兴市'},
                {value: 370, name: '新吴区'},
                {value: 338, name: '锡山区'},
                {value: 308, name: '梁溪区'},
                {value: 287, name: '滨湖区'},
                {value: 255, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart8(ec)
      {

        var myChart = ec.init(document.getElementById('p3_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '活跃企业数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '活跃企业数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [1238, 782, 431, 263, 179],
            z: 10
          }]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart9(ec)
      {

        var myChart = ec.init(document.getElementById('p3_chart3'), theme);

        myChart.setOption({
          title: {
            text: '行业类型排名',
            subtext: '活跃企业数',
            x: 'center'
          },
          tooltip: {},
          legend: {},
          xAxis: {},
          yAxis: {
            data: ["经信", "教育", "交通", "建设", "环保", "公建", "公安", "房管", "城管", "安监"]
          },
          series: [{
            name: '活跃企业数',
            type: 'bar',
            sort: 'ascending',
            data: [39, 39, 47, 47, 51, 51, 85, 88, 152, 1752,]
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,


      // Part 4
      DrawChart10(ec)
      {

        var myChart = ec.init(document.getElementById('p4_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '注册用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          calculable: true,
          series: [
            {
              name: '注册用户数',
              type: 'pie',
              radius: [30, 110],

              roseType: 'area',
              x: '50%',
              max: 40,
              sort: 'ascending',
              data: [

                {value: 5226, name: '江阴市'},
                {value: 2875, name: '宜兴市'},
                {value: 2576, name: '新吴区'},
                {value: 2487, name: '锡山区'},
                {value: 2413, name: '梁溪区'},
                {value: 2182, name: '滨湖区'},
                {value: 1896, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart11(ec)
      {

        var myChart = ec.init(document.getElementById('p4_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型占比',
            subtext: '注册用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '注册用户数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 17145, name: '社会单位用户'},
                {value: 2154, name: '监督部门用户'},
                {value: 355, name: '服务单位用户'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart12(ec)
      {

        var myChart = ec.init(document.getElementById('p4_chart3'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '注册用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '注册用户数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },

            data: [438, 277, 153, 93, 63],
            z: 10
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      // Part 5
      DrawChart13(ec)
      {

        var myChart = ec.init(document.getElementById('p5_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '新增用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          calculable: true,
          series: [
            {
              name: '新增用户数',
              type: 'pie',
              radius: [30, 110],

              roseType: 'area',
              x: '50%',
              max: 40,
              sort: 'ascending',
              data: [

                {value: 272, name: '江阴市'},
                {value: 150, name: '宜兴市'},
                {value: 134, name: '新吴区'},
                {value: 130, name: '锡山区'},
                {value: 126, name: '梁溪区'},
                {value: 114, name: '滨湖区'},
                {value: 99, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart14(ec)
      {

        var myChart = ec.init(document.getElementById('p5_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型占比',
            subtext: '新增用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '新增用户数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 893, name: '社会单位用户'},
                {value: 112, name: '监督部门用户'},
                {value: 18, name: '服务单位用户'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart15(ec)
      {

        var myChart = ec.init(document.getElementById('p5_chart3'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '新增用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '新增用户数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [8413, 5311, 2930, 1785, 1215],
            z: 10
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,


      // Part 6
      DrawChart16(ec)
      {

        var myChart = ec.init(document.getElementById('p6_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '活跃用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          calculable: true,
          series: [
            {
              name: '活跃用户数',
              type: 'pie',
              radius: [30, 110],

              roseType: 'area',
              x: '50%',
              max: 40,
              sort: 'ascending',
              data: [

                {value: 5218, name: '江阴市'},
                {value: 2867, name: '宜兴市'},
                {value: 2570, name: '新吴区'},
                {value: 2477, name: '锡山区'},
                {value: 2403, name: '梁溪区'},
                {value: 2172, name: '滨湖区'},
                {value: 1887, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart17(ec)
      {

        var myChart = ec.init(document.getElementById('p6_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型占比',
            subtext: '活跃用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '活跃用户数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 17089, name: '社会单位用户'},
                {value: 2154, name: '监督部门用户'},
                {value: 350, name: '服务单位用户'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart18(ec)
      {

        var myChart = ec.init(document.getElementById('p6_chart3'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '活跃用户数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '活跃用户数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [8365, 5311, 2928, 1779, 1210],
            z: 10
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      //Part 7
      DrawChart19(ec)
      {

        var myChart = ec.init(document.getElementById('p7_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '任务数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },


          series: [
            {
              name: '任务数',
              type: 'pie',
              radius: [20, 120],

              roseType: 'area',
              x: '50%',
              max: 50,
              sort: 'ascending',
              data: [
                {value: 972, name: '江阴市'},
                {value: 535, name: '宜兴市'},
                {value: 479, name: '新吴区'},
                {value: 463, name: '锡山区'},
                {value: 449, name: '梁溪区'},
                {value: 406, name: '滨湖区'},
                {value: 353, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart20(ec)
      {

        var myChart = ec.init(document.getElementById('p7_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '任务数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '任务数',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },
            data: [1565, 988, 545, 332, 226],

          }]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,


      DrawChart21(ec)
      {

        var myChart = ec.init(document.getElementById('p7_chart3'), theme);

        myChart.setOption({
          title: {
            text: '行业类型排名',
            subtext: '数据量',
            x: 'center'
          },
          tooltip: {},
          legend: {},
          xAxis: {},
          yAxis: {
            data: [
              "经信",
              "教育",
              "交通",
              "建设",
              "环保",
              "公建",
              "公安",
              "房管",
              "城管",
              "安监"]
          },
          series: [{
            name: '数据量',
            type: 'bar',
            data: [51, 51, 62, 62, 67, 67, 118, 129, 216, 2348]
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      //Part 8
      DrawChart22(ec)
      {

        var myChart = ec.init(document.getElementById('p8_chart1'), theme);

        myChart.setOption({
          title: {
            text: '区域占比',
            subtext: '数据量',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },


          series: [
            {
              name: '数据量',
              type: 'pie',
              radius: [20, 120],

              roseType: 'area',
              x: '50%',
              max: 50,
              sort: 'ascending',
              data: [
                {value: 865945, name: '江阴市'},
                {value: 476326, name: '宜兴市'},
                {value: 426779, name: '新吴区'},
                {value: 412140, name: '锡山区'},
                {value: 399754, name: '梁溪区'},
                {value: 361467, name: '滨湖区'},
                {value: 314173, name: '惠山区'}
              ]
            }
          ]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
      ,

      DrawChart23(ec)
      {

        var myChart = ec.init(document.getElementById('p8_chart2'), theme);

        myChart.setOption({
          title: {
            text: '单位类型分布',
            subtext: '数据量',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) {
              return params[0].name + ': ' + params[0].value;
            }
          },
          xAxis: {
            data: ['一级重点', '二级重点', '三级重点', '一般单位', '九小场所'],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
          },
          color: ['#e54035'],
          series: [{
            name: '数据量',
            type: 'pictorialBar',
            barCategoryGap: '-130%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            },

            data: [1394025, 880062, 485459, 295729, 201310],

          }]
        });
        let wid = document.body.clientWidth;
        myChart.resize({
          width: wid
        });
      }
      ,
      DrawChart24(ec)
      {

        var myChart = ec.init(document.getElementById('p8_chart3'), theme);

        myChart.setOption({
          title: {
            text: '行业类型排名',
            subtext: '数据量',
            x: 'center'
          },
          tooltip: {},
          legend: {},
          xAxis: {},
          yAxis: {
            data: [
              "经信",
              "教育",
              "交通",
              "建设",
              "环保",
              "公建",
              "公安",
              "房管",
              "城管",
              "安监"]
          },
          series: [{
            name: '数据量',
            type: 'bar',

            data: [45867, 45867, 55041, 55041, 59628, 59628, 105495, 114668, 192643, 2091553]
          }]
        });
        let wid = document.body.clientWidth * 0.9;
        myChart.resize({
          width: wid
        });
      }
    },
    components: {}
  }
</script>


