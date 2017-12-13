<template>
    <div class="user-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="用户数量(人)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{datas.userTotal}}
            </div>

            <div class="chart-wrap">
                <mko-nav-bar>
                    <mko-tab-item :activied="tabI==i" :label="t.text" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
                </mko-nav-bar>
                <!--<mko-cell title="数据分析"></mko-cell>-->
                <div class="chart" ref="chart"></div>
            </div>
            <div>
                <mko-cell :title="item.name||'未知'" :val="item.value" main="left"
                          v-for="item in datas[tabItems[tabI].key]"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>

    import echarts from 'echarts';
    import api from 'api';
    import { allQyRoleType } from 'filters'
    import { Indicator, Toast } from 'mint-ui';


    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B', '#7E80FF'];
    let itemStyle = {
        normal: {
            label: {
                formatter: function (data) {
                    let max = 6;
                    let name = data.name || '';
                    if (name.length > max) {
                        name = name.split('').splice(0, max).join('');
                        name += '…'
                    }
                    return `${name}\n(${data.percent}%)`
                },
                textStyle: {
                    color: '#666',
                    fontSize: '14px'
                }
            },
            labelLine: {
                length: 20,
                lineStyle: {
                    color: '#ddd',
                }
            }
        },
    };
    let noLabel = {
        normal: {label: {show: false}, labelLine: {show: false}},
        emphasis: {label: {show: false}, labelLine: {show: false}}
    };

    export default {
        data () {
            return {
                month: 0,
                tabI: 0,
                tabItems: [
                    {text: '区域', key: 'userAreaCount', nameKey: 'dwAreaName'},
                    {text: '单位类型', key: 'userSafetyCount', nameKey: 'safetyName'},
                    {text: '用户类型', key: 'userRoleCount', nameKey: 'role'},
                    {text: '行业类型', key: 'userTypeCount', nameKey: 'dwTypeName'},
                ],
                datas: {
                    userAreaCount: '',
                    userSafetyCount: '',
                    userRoleCount: '',
                    userTypeCount: '',
                }
            }
        },
        watch: {
            tabI(){
                this.DrawChart(echarts);
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
            this.tabI = 0;
            this.month = this.$route.query.month;
            this.getData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            allQyRoleType,
            tabFn(i){
                this.tabI = i;
            },
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId || '',
                    createDate: this.month,
                };
                api.getUserCountByJg(pas).then(res => {
                    if (res && res.code == 0) {
                        this.datas = res.response;
                        let that = this;
                        let match = function (key) {
                            if (res.response && res.response[key]) {
                                let other = res.response.userTotal || 0;
                                let names = {
                                    userAreaCount: 'dwAreaName',
                                    userSafetyCount: 'safetyName',
                                    userRoleCount: 'role',
                                    userTypeCount: 'dwTypeName',
                                };
                                let nameKey = names[key];
                                that.datas[key] = res.response[key].map(item => {
                                    other -= item.count;
                                    let name = item[nameKey];
                                    if (key == 'userRoleCount') {
                                        name = that.allQyRoleType(name);
                                    }
                                    return {
                                        value: item.count,
                                        name: name
                                    }
                                });
                                //将剩余归为其他类
                                if (other > 0)
                                    that.datas[key].push({
                                        value: other,
                                        name: '其他'
                                    });
                                //排序
                                that.datas[key].sort(function (a, b) {
                                    return b.value - a.value;
                                });
                            }
                        };
                        match('userAreaCount');
                        match('userSafetyCount');
                        match('userRoleCount');
                        match('userTypeCount');
                        this.DrawChart(echarts);
                    }
                    Indicator.close();
                })
            },
            DrawChart(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                let data = this.datas ? (this.datas[this.tabItems[this.tabI].key]) : [];

                if (data.length <= 0) {
                    Toast({
                        message: '暂无数据',
                        position: 'middle',
                        duration: 1500
                    });
                }

                let length = [7, 4, 4, 4];
                for (let i = data.length - 1; i >= length[this.tabI]; i--) {
                    data[i].itemStyle = noLabel;
                }
                myChart.setOption({
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: this.tabItems[this.tabI],
                            type: 'pie',
                            radius: '55%',
//                            clockWise: false,
                            center: ['50%', '50%'],
//                            minAngle: 10,
                            data: data,
                            itemStyle: itemStyle
                        }
                    ]
                })
            },
            back(){
                this.$MKOPop();
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .user-count-wrap {
        .page-wrap {
            margin-top: @headerHeight + @headerTop - 1px;
        }
        .info-bar {
            height: 44px;
            line-height: 44px;
            font-size: 30px;
            text-align: center;
            color: #fff;
            background-color: @mainBlue;
        }
        .mko-basic-cell {
            &.title-cell {
                height: 50px;
                .cell {
                    height: 50px;
                    box-shadow: none;
                    .title {
                        flex: 0 0 160px;
                        -webkit-flex: 0 0 160px;
                        width: 160px;
                    }
                }
            }
        }
        .chart-wrap {
            margin-bottom: 10px;
            .chart {
                height: 300px;
                background-color: #fff !important;
            }

        }
    }
</style>
