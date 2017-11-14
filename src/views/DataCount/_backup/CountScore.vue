<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" title="安全评分统计" fixed>
      <router-link to="/enter/home" slot="left">
        <mt-button class="header-item" icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="page-wrap count-score-wrap">
      <div class="section">
        <div class="folder">关键数据指标</div>
        <div class="sub-folder">
          <div id="" style="margin: 0 auto; width:90%; height:260px">
            <div class="item">
              <p class="lab">单位数量</p>
              <p class="val">158</p>
            </div>
            <div class="item">
              <p class="lab">管辖单位平均安全得分</p>
              <p class="val">90.8</p>
            </div>
            <div class="item">
              <p class="lab">用户数量（人）</p>
              <p class="val">117</p>
            </div>
            <div class="item">
              <p class="lab">检查项目个数（个）</p>
              <p class="val">1335</p>
            </div>
            <div class="item">
              <p class="lab">数据量（条）</p>
              <p class="val">207113</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="folder">总体评分趋势</div>
        <div class="sub-folder">
          <div id="chart1" style="margin: 0 auto; width:90%; height:300px"></div>
        </div>
      </div>
      <div class="section">
        <div class="folder">单位评分区域排名</div>
        <div class="sub-folder">
          <table width="98%">
            <thead>
            <tr>
              <th width="10%">排名</th>
              <th width="70%">乡镇/街道办</th>
              <th width="20%">总评分</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td class="txt-l">临港街道</td>
              <td>90.55%</td>
            </tr>
            <tr>
              <td>2</td>
              <td class="txt-l">云亭街道</td>
              <td>89.11%</td>
            </tr>
            <tr>
              <td>3</td>
              <td class="txt-l">南闸街道</td>
              <td>88.45%</td>
            </tr>
            <tr>
              <td>4</td>
              <td class="txt-l">月城镇</td>
              <td>88.24%</td>
            </tr>
            <tr>
              <td>5</td>
              <td class="txt-l">青阳镇</td>
              <td>88.10%</td>
            </tr>
            <tr>
              <td>6</td>
              <td class="txt-l">澄江街道</td>
              <td>87.26%</td>
            </tr>
            <tr>
              <td>7</td>
              <td class="txt-l">徐霞客镇</td>
              <td>87.14%</td>
            </tr>
            <tr>
              <td>8</td>
              <td class="txt-l">璜土镇</td>
              <td>84.78%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="section">
        <div class="folder">单位安全评级雷达图</div>
        <div class="sub-folder">
          <div id="chart3" style="margin: 0 auto; width:90%; height:350px"></div>
        </div>
      </div>
      <div class="section">
        <div class="folder">需重点改善指标</div>
        <div class="sub-folder">
          <div id="chart4" style="margin: 0 auto; width:90%; height:400px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less" media="screen">
  .count-score-wrap {
    background: #fff;
    p, div, ul{
      margin: 0;
      padding: 0;
    }
    .section {
      border-bottom: #ccc 1px solid;
    }

    .folder {
      display: block;
      width: 100%;
      height: 48px;
      text-align: center;
      line-height: 48px;
    }

    .folder p {
      line-height: 48px;
      padding: 0;
      display: block;

    }

    .item {
      padding: 20px 0;
    }

    .item .lab {
      text-align: left;
      float: left;
      width: 60%;
      margin-left: 12px;
    }
    .item .val {
      text-align: right;
      float: right;
      width: 20%;
      margin-right: 12px;
    }

    .sub-folder {
      position: relative;
      margin-top: 30px;
      /*display: none;*/
    }

    .sub-folder table {
      padding-bottom: 50px;
      margin: 0 auto;
    }
    .sub-folder table tr, .sub-folder table td {
      text-align: center;
      padding: 6px 0;
      line-height: 24px;
    }
    .txt-l {
      /*text-align: left !important;*/
    }
  }
</style>

<script>
  import echarts from 'echarts';
  let theme = 'macarons';
  export default{
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      this.$nextTick(() => {
        this.DrawChart1(echarts);
      this.DrawChart3(echarts);
      this.DrawChart4(echarts);
    });
    },
    methods: {
      DrawChart1(ec){
        var chart = ec.init(document.getElementById('chart1'), theme);
        chart.setOption(
          {

            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['最高分']
            },

            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['2016年8月', '2016年9月', '2016年10月', '2016年11月', '2016年12月', '2017年1月', '2017年2月']
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  formatter: '{value} '
                }
              }
            ],
            series: [
              {
                name: '当月分数',
                type: 'line',
                data: [50.93,
                  68.71,
                  70.83,
                  75.42,
                  78.31,
                  83.44,
                  90.80],
                markPoint: {
                  data: [
                    {name: '2016年8月', value: 50.93, xAxis: 0, yAxis: 50.93},
                    {name: '2016年9月', value: 68.71, xAxis: 1, yAxis: 68.71},
                    {name: '2016年10月', value: 70.83, xAxis: 2, yAxis: 70.83},
                    {name: '2016年11月', value: 75.42, xAxis: 3, yAxis: 75.42},
                    {name: '2016年12月', value: 78.31, xAxis: 4, yAxis: 78.31},
                    {name: '2017年1月', value: 83.44, xAxis: 5, yAxis: 83.44},
                    {name: '2017年2月', value: 90.80, xAxis: 6, yAxis: 90.80},
                  ]
                },

              },
            ]
          });
      },
      DrawChart3(ec){
        var chart = ec.init(document.getElementById('chart3'), theme);
        chart.setOption({


          radar: {
            // shape: 'circle',
            indicator: [
              {name: '优秀', max: 60},
              {name: '良好', max: 50},
              {name: '中等', max: 50},
              {name: '较低', max: 10},
              {name: '极低', max: 8}
            ]

          },

          series: [{
            name: '',
            type: 'radar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value + '%'
                  }
                }
              }
            },
            data: [
              {
                formatter: '{value} %',
                value: [48, 26, 24, 2, 0],
                name: '单位安全评级',
                areaStyle: {
                  normal: {}
                }
              },

            ]
          }]
        });
      },
      DrawChart4(ec){
        var labelTop = {
          normal: {
            label: {
              show: true,
              position: 'center',
              formatter: '{b}',
              textStyle: {
                baseline: 'bottom'
              }
            },
            labelLine: {
              show: false
            }
          }
        };
        var labelFromatter = {
          normal: {
            label: {
              show: false,
              formatter: function (params) {
                return (100.0 - params.value).toFixed(2) + '%'
              },
              textStyle: {
                show: false,
                baseline: 'top'
              }
            }
          },
        }
        var labelBottom = {
          normal: {
            color: '#ccc',
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        };
        var radius = [55, 75];
        var chart1 = ec.init(document.getElementById('chart4'), theme);
        chart1.setOption({
          series: [
            {
              type: 'pie',
              center: ['50%', '20%'],
              radius: radius,
              itemStyle: labelFromatter,
              data: [
                {name: '人员履职率', value: 28.9, itemStyle: labelTop},
                {name: 'other', value: 71.1, itemStyle: labelBottom}
              ]
            },
            {
              type: 'pie',
              center: ['20%', '50%'],
              radius: radius,
              itemStyle: labelFromatter,
              data: [
                {name: '安全管理执行率', value: 27.27, itemStyle: labelTop},
                {name: 'other', value: 72.73, itemStyle: labelBottom}

              ]
            },
            {
              type: 'pie',
              center: ['80%', '50%'],
              radius: radius,
              itemStyle: labelFromatter,
              data: [
                {name: '学习培训覆盖率', value: 20.64, itemStyle: labelTop},
                {name: 'other', value: 79.36, itemStyle: labelBottom}
              ]
            }
          ]
        });
      }
    },
    components: {}
  }
</script>


