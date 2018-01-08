<template>
    <div class="score-rank-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="单位排名"
                    left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div>
                <mko-cell :icon="isSel?'icon-link-arrow-up':'icon-link-arrow-down'"
                          :title="tabItems[tabI].text" :val="`共${total}个`" @click="sel"></mko-cell>
            </div>

            <div class="sel-wrap" @click.self="isSel=false" v-show="isSel">
                <mko-cell class="sel-item" :class="i==tabI?'active':''" :title="t.text" @click="tabFn(i)" v-for="(t,i) in tabItems">
                    <div class="icon-tick-blue-1 fr" v-show="i==tabI"></div>
                </mko-cell>
            </div>
            <div class="list-wrap">
                <mko-cell class="title-cell" title="企业名称" val="得分"></mko-cell>

                <mko-cell :title="item.dwName" main="left" :val="item.dwSafeScore" non-text="0" v-for="item in list"></mko-cell>

            </div>
            <mko-load-more @click="loadBottom" v-if="!noLoadMore"></mko-load-more>
        </div>
    </div>
</template>

<script>
    import api from 'api';
    import { ResError } from 'components'
    import { Indicator, Toast } from 'mint-ui';

    let _page = 1;
    let _count = 20;
    let _pageCount = 0;
    export default {
        data () {
            return {
                month: 0,
                isSel: false,
                tabI: 0,
//                tabItems: ['评分由高到低', '评分由低到高'],
                tabItems: [
                    {text: '评分由高到低', value: 'DESC'},
                    {text: '评分由低到高', value: 'ASC'},
                ],
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
                ],
                total: 0,
                noLoadMore: false

            }
        },
        watch: {
            tabI(){
                _page = 1;
                this.noLoadMore = false;
                this.getData();
            }
        },
        computed: {},
        mounted() {
            this.list.forEach((data, index) => {
                data.forEach(item => {
                    this.listReverse[index].unshift(item);
                })
            })
        },
        activated(){
            _page = 1;
            this.noLoadMore = false;
            this.tabI = 0;
            this.month = this.$route.query.month || '';
            this.getData();
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
            getData(){
                if (_page <= 1)
                    Indicator.open({spinnerType: 'fading-circle'});
                let pas = {
                    groupId: this.$store.getters.groupId,
                    dwId: this.$store.getters.userInfo.dwId || '',
//                    createDate: this.month,
                    page: _page,
                    count: _count,
                    sort: this.tabItems[this.tabI].value
                };
                api.getQyDwRanking(pas).then(res => {
                    if (res && res.code == 0) {
                        if (_page <= 1) {
                            this.list = res.response.datas;
                        } else {
                            this.list=this.list.concat(res.response.datas)
                        }
                        _pageCount = res.response.pageCount;
                        this.total = res.response.countNumber;
                    }
                    Indicator.close();

                })
            },
            loadBottom() {
                if (_page >= _pageCount) {
                    Toast({
                        message: '暂无更多数据',
                        position: 'middle',
                        duration: 1500
                    });
                    this.noLoadMore = true;
                    return false;
                }
                _page++;
                setTimeout(this.getData, 500);
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
                font-weight: bolder;
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
