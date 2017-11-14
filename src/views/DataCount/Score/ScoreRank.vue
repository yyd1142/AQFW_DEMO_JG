<template>
    <div class="score-count-detail-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="单位排名"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <div class="list-wrap">
                <div v-show="tabI==0">
                    <mko-cell :title="item.name" :val="item.score" v-for="item in list"></mko-cell>
                </div>
                <div v-show="tabI==1">
                    <mko-cell :title="item.name" :val="item.score" v-for="item in listReverse"></mko-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['评分由高到低', '评分由低到高'],
                list: [
                    {name: '无锡市舒心商务宾馆有限公司', score: 95.5},
                    {name: '江阴市华西加油站有限公司', score: 94.7},
                    {name: '江阴市华宏装饰材料市场有限公司', score: 93.5},
                    {name: '中国石油天然气股份有限公司江苏江阴月城加油站', score: 92.4},
                    {name: '宜兴市张渚高级中学', score: 91.8},
                    {name: '宜兴市茶竹度假村有限公司', score: 91.7},
                    {name: '江阴华士中意大酒店', score: 91.4},
                    {name: '宜兴市张渚高级中学', score: 91.2},
                    {name: '无锡市高技能人才公共实训管理服务中心', score: 90.6},
                ],
                listReverse: []
            }
        },
        watch: {},
        computed: {},
        mounted() {
            this.list.forEach(item => {
                this.listReverse.unshift(item);
            })
        },
        activated(){
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            back(){
                this.$MKOPop();
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../config.less";

    .score-count-detail-wrap {

    }
</style>
