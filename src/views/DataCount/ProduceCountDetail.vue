<template>
    <div class="produce-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据分析" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-cell title="生成数据总量" val="1511926"></mko-cell>
            <div class="chart-wrap" ref="chart">

            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    let theme = 'macarons';
    export default {
        data () {
            return {}
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.DrawChart1(echarts);

        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            DrawChart1(ec){

                let myChart = ec.init(this.$refs['chart'], theme);
                myChart.setOption({
                    title: {
                        text: '生成数据总量',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['任务', '图片', '通知公告']
                    },
                    toolbox: {
                        show: true,
                        feature: {}
                    },
                    calculable: true,
                    series: [
                        {
                            name: '生成数据总量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 826852, name: '任务'},
                                {value: 521798, name: '图片'},
                                {value: 163276, name: '通知公告'},
                            ]
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

    .produce-count-detail-wrap {
        .chart-wrap {
            margin-top: 14px;
            padding-top: 14px;
            height: 300px;
            background-color: #fff !important;
        }
    }
</style>
