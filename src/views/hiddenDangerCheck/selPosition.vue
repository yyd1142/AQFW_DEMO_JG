<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="风险位置" left-icon="icon-back" @handleLeftClick="changePage"></mko-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap hdc-sel-wrap" v-show="!noData||!resError">
            <div class="data-wrap" v-show="listType==='build'">
                <mko-cell :title="item.jzName" main="left"
                          @click="selBuild(item.jzName,index)" v-for="(item,index) in buildList"></mko-cell>
            </div>
            <div class="data-wrap" v-show="listType==='floor'">
                <mko-cell :title="item" main="left" @click="selData(item)" v-for="item in floorList"></mko-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
</style>

<script>
    import api from 'api'
    import NoData from 'components/NoData/NoData.vue';
    import ResError from 'components/ResError/ResError.vue';
    import {Indicator} from 'mint-ui';
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false,
                listType: 'build',
                buildList: [],
                floorList: [],
                formData: {
                    build: '',
                    floor: ''
                }
            }
        },
        props: ['dwId'],
        watch: {
//      $route (){
//        this.listType=this.$route.query.listType||'build';
//      }
        },
        created() {

        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                this.noData = false;
                Indicator.open({spinnerType: 'fading-circle'});
                let params = {
                    groupId: this.dwId
                };
                api.getJZList(params).then(res => {
                    Indicator.close();
                    if (!res) {
                        this.resError = true;
                        return;
                    }
                    this.buildList = res.response.map(item => {
                        return item;
                    });
                    if (!this.buildList.length)
                        this.noData = true;
                });
            },
            getFloorList(item){
                let jzDSNumber = item.jzDSNumber;
                let jzDXNumber = item.jzDXNumber;
                let arr1 = [];
                let arr2 = [];
                for (let i = 1; i <= jzDSNumber; i++) {
                    arr1.push(`${i}层`);
                }
                for (let i = jzDXNumber; i > 0; i--) {
                    arr2.push(`负${i}层`);
                }
                this.floorList = arr2.concat(arr1);
            },
            selBuild(id, index){
                this.getFloorList(this.buildList[index]);
                this.formData.build = id;
//        this.$MKOPush('/hidden_danger_check?page=selPosition&listType=floor');
                this.listType = 'floor';
            },
            selData(val){
                this.formData.floor = val;
                this.$emit('sel', this.formData);
                this.$MKOPop();
//        this.$MKOPop();
//        this.$emit('changePage', 'main');
            },
            changePage(){
                this.$MKOPop();
//        if (this.listType === 'floor') {
//          this.listType = 'build'
//        } else {
//          this.$emit('changePage', 'main');
//        }
                Indicator.close();
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


