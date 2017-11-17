<template>
    <div class="score-rank-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="单位排名"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <!--<mko-nav-bar>-->
            <!--<mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>-->
            <!--</mko-nav-bar>-->
            <mko-cell :icon="isSel?'icon-link-arrow-down':'icon-link-arrow-up'"
                      :title="tabItems[tabI]" val="共9个" @click="sel"></mko-cell>
            <div class="sel-wrap" @click.self="isSel=false" v-show="isSel">
                <mko-cell class="sel-item" :class="i==tabI?'active':''" :title="t" @click="tabFn(i)" v-for="(t,i) in tabItems">
                    <div class="icon-tick-blue-1 fr" v-show="i==tabI"></div>
                </mko-cell>
            </div>
            <div class="list-wrap">
                <mko-cell class="title-cell" title="企业名称" val="得分"></mko-cell>

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
                isSel: false,
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
            sel() {
                this.isSel = !this.isSel;
            },
            tabFn(i){
                this.tabI = i;
                this.isSel = false;
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

    .score-rank-wrap {
        .sel-wrap {
            position: fixed;
            z-index: 1;
            top: @headerHeight+@headerTop+44px;
            bottom: 0;
            width: 100%;
            background-color: @baseMasking;
            .sel-item {
                background-color: @baseBG02;
            }
        }
        .list-wrap {
            margin-top: 10px;
            .title-cell {
                height: 50px;
                .cell {
                    height: 50px;
                }
            }
            .mko-basic-cell {
                .title {
                    flex: auto;
                    -webkit-flex: auto;
                    width: 80%;
                }
                .value {
                    flex: 0 0 40px;
                    -webkit-flex: 0 0 40px;
                    width: 40px;
                }
            }
        }
    }
</style>
