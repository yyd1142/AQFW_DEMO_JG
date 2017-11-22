<template>
    <div class="week-nav-bar-wrap">
        <div class="btn btn-left fl" :class="{'disable':weekIndex<=-1}" @click="getWeek(-1)">
            <span class="icon-arrow-left"></span>
        </div>
        <!--<div class="abs-middle text" v-show="all">按周筛选数据</div>-->
        <div class="abs-middle text">{{weekStart | formatDate('YYYY/MM/DD')}} - {{weekEnd | formatDate('YYYY/MM/DD')}}
        </div>
        <div class="btn btn-right fr" :class="{'disable':weekIndex>=0}" @click="getWeek(1)">
            <span class="icon-arrow-right"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
//                all: true,
                weekIndex: 0,
                weekStart: '',
                weekEnd: '',
            }
        },
        watch: {
            weekIndex(){
                this.sendData();
            }
        },
        computed: {},
        mounted() {
        },
        activated(){
//            this.all = true;
            this.weekIndex = 0;
            this.getWeek(0);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            handleBtn(handle){
                if (this.all) {
                    this.getWeek(0);
                } else {
                    this.getWeek(handle);
                }
            },
            getWeek(handle){
                if (this.weekIndex == 0 && handle == 1)
                    return;

                if (this.weekIndex == -1 && handle == -1)
                    return;

                let index = this.weekIndex += handle;
                index = index >= 0 ? 0 : Math.abs(index);

                let fns = function (n) {
                    let now = new Date();
                    let year = now.getFullYear();
                    let month = now.getMonth() + 1;
                    let date = now.getDate();
                    let day = now.getDay();
                    if (day !== 0) {
                        n = n + (day - 1);
                    } else {
                        n = n + day;
                    }
                    if (day) {
                        if (month <= 1) {
                            year--;
                            month = 12;
                        }
                    }
                    now.setDate(now.getDate() - n);
                    year = now.getFullYear();
                    month = now.getMonth() + 1;
                    date = now.getDate();

//                    return year + "/" + (month < 10 ? ('0' + month) : month) + "/" + (date < 10 ? ('0' + date) : date);
                    return new Date(year, month - 1, date);
                };

                this.weekStart = fns(index * 7);
                this.weekEnd = fns(index * 7 - 6);
//                this.all = false;
            },
            sendData(){
                this.$emit('get', this.weekIndex)
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .week-nav-bar-wrap {
        position: relative;
        margin-bottom: 10px;
        height: 30px;
        width: 100%;
        text-align: center;
        background-color: #fff;
        .btn {
            position: relative;
            margin: 0 14px;
            width: 100px;
            top: 9px;
            &.btn-left {
                text-align: left;
            }
            &.btn-right {
                text-align: right;
            }
            &.disable {
                opacity: 0.5;
            }
        }
        .text {
            font-size: 14px;
            line-height: 30px;
        }
    }
</style>
