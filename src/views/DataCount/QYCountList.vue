<template>
    <div class="qy-count-list-wrap">
        <div class="placeholder-item"></div>
        <mko-header title="数据列表" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <mko-nav-bar>
                <mko-tab-item :activied="tabI==i" :label="t" @handleTabClick="tabFn(i)" v-for="(t,i) in tabItems"></mko-tab-item>
            </mko-nav-bar>
            <div class="list-wrap">
                <!--<mko-double-cell :title="item.name" :label="item.desc"-->
                <!--:val="`${item.person} ${item.number}`"-->
                <!--v-for="item in list[tabI]"></mko-double-cell>-->
                <mko-cell :title="item.name" is-link @click="goDetail(item)" v-for="item in list[tabI]"></mko-cell>
            </div>
        </div>
    </div>
</template>

<script>
    let list_0 = [
        [
            {name: '锡山区鹅湖天叶百货超市', desc: '鹅湖镇鹅湖路85号', person: '张辰', number: '15962101177'},
            {name: '无锡市优网网络有限公司', desc: '锡北镇八士芙蓉广场苏果超市三楼', person: '许影', number: '13914259393'},
            {name: '锡山区鹅湖福尔顿商务宾馆', desc: '锡山区鹅湖镇鹅湖路68号', person: '王根娣', number: '13506195188'},
            {name: '宜兴市嘉百乐贸易有限公司', desc: '周铁镇解放路98号', person: '胡定有', number: '18251555999'},
        ],
        [
            {name: '滨湖区春和足浴馆', desc: '无锡市滨湖区湖滨路3号三楼', person: '沈为平', number: '13951506363'},
            {name: '无锡市皇家浴场责任有限公司', desc: '无锡市梁青路8号4-6楼', person: '吴德康', number: '13771535996'},
            {name: '无锡市美丽华大酒店有限公司', desc: '无锡市滨湖区梁溪路6号', person: '陈振根', number: '13093085191'},
            {name: '无锡美丽都大酒店有限公司', desc: '无锡市滨湖区梁溪路2号', person: '朱靖宇', number: '85865665'},
            {name: '无锡华港协和医院', desc: '湖滨路9号', person: '陈玉国', number: '85819999'},
        ]
    ];
    let list_1 = [
        [
            {name: '无锡市优网网络有限公司', desc: '锡北镇八士芙蓉广场苏果超市三楼', person: '许影', number: '13914259393'},
            {name: '锡山区鹅湖福尔顿商务宾馆', desc: '锡山区鹅湖镇鹅湖路68号', person: '王根娣', number: '13506195188'},
            {name: '无锡金和大厦有限公司', desc: '无锡市崇安区解放东路1008号', person: '单京赋', number: '13601482217'},
        ],
        [
            {name: '无锡市皇家浴场责任有限公司', desc: '无锡市梁青路8号4-6楼', person: '吴德康', number: '13771535996'},
            {name: '无锡市美丽华大酒店有限公司', desc: '无锡市滨湖区梁溪路6号', person: '陈振根', number: '13093085191'},
            {name: '无锡美丽都大酒店有限公司', desc: '无锡市滨湖区梁溪路2号', person: '朱靖宇', number: '85865665'},
            {name: '无锡梁溪饭店', desc: '无锡市崇安区中山路177号', person: '丁晏', number: '88683888'},
        ]
    ];
    let list = [list_0, list_1];
    export default {
        data () {
            return {
                tabI: 0,
                tabItems: ['未激活单位', '不活跃单位'],
                list: [],
                type: 0
            }
        },
        watch: {},
        computed: {},
        mounted() {
        },
        activated(){
            this.type = sessionStorage.getItem(`jgDwType${this.$store.getters.groupId}`) || 0;
            this.list = list[this.type];
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            tabFn(i){
                this.tabI = i;
            },
            goDetail(data){
                let id = 1;
                let json = JSON.stringify(data);
                sessionStorage.setItem('QYCountDetail', json);
                this.$MKOPush('/qy_count_detail/'+id)
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

    .qy-count-list-wrap {
        .list-wrap {
            .mko-basic-cell {
                .title {
                    flex: auto;
                    -webkit-flex: auto;
                    width: 90%;
                }
            }
        }
    }
</style>
