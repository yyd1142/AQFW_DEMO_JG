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
                    <mko-cell :title="item.name" :val="item.score" v-for="item in list[monthIndex]"></mko-cell>
                </div>
                <div v-show="tabI==1">
                    <mko-cell :title="item.name" :val="item.score" v-for="item in listReverse[monthIndex]"></mko-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                monthIndex: 0,
                isSel: false,
                tabI: 0,
                tabItems: ['评分由高到低', '评分由低到高'],
                list: [
                    [
                        {name: '江阴市协丰棉麻有限公司', score: 93},
                        {name: '江阴市兴隆特种油墨有限公司', score: 92.1},
                        {name: '江阴市华西加油站有限公司', score: 92},
                        {name: '江阴华士中意大酒店', score: 91.9},
                        {name: '江阴市云亭亚明网吧', score: 91.6},
                        {name: '江阴市长泾永尚生活超市', score: 91.1},
                        {name: '江阴市麦博士量贩式歌城有限公司', score: 90.6},
                        {name: '江阴市华顺石化有限公司', score: 90.5},
                        {name: '江阴享悦宝诚汽车销售服务有限公司', score: 90.2},
                    ],
                    [
                        {name: '中石化江阴市镇澄路加油站', score: 96.9},
                        {name: '江阴华士中意大酒店', score: 91.9},
                        {name: '江阴市祝塘实验幼儿园', score: 89.1},
                        {name: '江阴市麦博士量贩式歌城有限公司', score: 88.6},
                        {name: '江阴市长泾永尚生活超市', score: 88.5},
                        {name: '江阴市华顺石化有限公司', score: 88.3},
                        {name: '江阴新东亚大酒店有限公司', score: 88.1},
                        {name: '江阴市比图加油有限公司', score: 87.9},
                        {name: '无锡市梅村加油站有限公司', score: 86.8},
                    ]
                ],
                listReverse: [
                    [], []
                ]
            }
        },
        watch: {},
        computed: {},
        mounted() {
            this.list.forEach((data, index) => {
                data.forEach(item => {
                    this.listReverse[index].unshift(item);
                })
            })
        },
        activated(){
            this.tabI = 0;
            this.monthIndex = this.$route.query.month || 0;
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
