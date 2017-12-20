<template>
    <div class="qy-count-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="社会单位数量(家)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="info-bar">
                {{datas.qydwTotalCount}}
            </div>
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t.text" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <!--<mko-cell class="title-cell" title="数据分析"></mko-cell>-->

            <div class="chart-wrap" ref="chart"></div>
            <div class="list-wrap">
                <mko-cell :title="item.name" :val="item.value||'0'" main="left" v-for="item in datas[tabItems[tabI].key]"></mko-cell>
            </div>
            <!--<mko-cell title="数据列表" is-link @click="goList"></mko-cell>-->
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import api from 'api';
    import { ResError } from 'components'
    import { Indicator } from 'mint-ui';

    let theme = 'macarons';
    let color = ['#3399FF', '#55DD66', '#F5A623', '#50E3C2 ', '#AD6DFF', '#F8E71C', '#FF336B', '#7E80FF', '#38b48b', '#96514b', '#ED6D35', '#824880'];
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
                    fontSize: '12px'
                }
            },
            labelLine: {
                length: 10,
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
    let tabItems = [
        {text: '管辖', key: 'qydwAreaCount'},
        {text: '行业', key: 'qydwIndustryCount'},
        {text: '单位类型', key: 'qydwTypeCount'},
    ];
    export default {
        data () {
            return {
                type: 0,
                tabI: 0,
                tabItems: [{text: '', key: ''}],
                month: 0,
                datas: {}
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
            this.month = this.$route.query.month;
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.tabI = 0;
            this.tabItems = this.type == 0 ? JSON.parse(JSON.stringify(tabItems)) : JSON.parse(JSON.stringify(tabItems)).splice(1, 2);
            this.getData();
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            goList(){
                this.$MKOPush('/qy_count_list');
            },
            tabFn(i){
                this.tabI = i;
            },
            getData(){
                Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId || '',
                    createDate: this.month
                };
                api.getQyCountByJg(pas).then(res => {
                    if (res && res.code == 0) {
                        this.datas = res.response;
                        let that = this;
                        let match = function (key) {
                            let names = {
                                qydwAreaCount: 'dwJC',
                                qydwIndustryCount: 'dwTypeName',
                                qydwTypeCount: 'safetyName'
                            };
                            if (res.response[key]) {
                                let other = res.response.qydwTotalCount || 0;
                                that.datas[key] = res.response[key].map(item => {
                                    other -= item.count;
                                    return {
                                        value: item.count,
                                        name: item[names[key]]
                                    }
                                });
                                //将剩余归为其他类
                                if (other > 0)
                                    that.datas[key].push({
                                        value: other,
                                        name: '未知'
                                    });
                                //排序
                                that.datas[key].sort(function (a, b) {
                                    return b.value - a.value;
                                });
                            }
                        };
                        match('qydwAreaCount');
                        match('qydwIndustryCount');
                        match('qydwTypeCount');
                        this.DrawChart(echarts);
                    }
                    Indicator.close();

                })
            },
            DrawChart(ec){
                let myChart = ec.init(this.$refs['chart'], theme);
                let data = this.datas[this.tabItems[this.tabI].key] || [];
                //限制饼图最多显示8个标签
                let length = 8;
                for (let i = data.length - 1; i >= length; i--) {
                    data[i].itemStyle = noLabel;
                }
                myChart.setOption({
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
//                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    color: color,
                    series: [
                        {
                            name: this.tabItems[this.tabI].text,
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
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
        components: {
            ResError
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .qy-count-wrap {
        .page-wrap {
            margin-top: @headerHeight + @headerTop - 1px;
        }
        .mkotabs {
            padding-top: 14px;
            height: 54px;
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
                }
            }
        }
        .chart-wrap {
            /*padding-top: 14px;*/
            margin-bottom: 10px;
            height: 300px;
            border-bottom: 1px solid @baseBorder;
            background-color: #fff !important;
        }
        .btn-wrap {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
</style>
