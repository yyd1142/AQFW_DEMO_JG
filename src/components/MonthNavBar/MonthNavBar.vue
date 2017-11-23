<template>
    <div class="month-nav-bar-wrap">
        <div class="btn btn-left fl" :class="{'disable':monthIndex<=-1}" @click="getMonth(-1)">
            <span class="icon-arrow-left"></span>
        </div>
        <div class="abs-middle text">{{monthStart | formatDate('MM月')}}</div>
        <div class="btn btn-right fr" :class="{'disable':monthIndex>=0}" @click="getMonth(1)">
            <span class="icon-arrow-right"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                monthIndex: 0,
                monthStart: new Date(),
                monthEnd: '',
            }
        },
        watch: {
            monthIndex(){
                this.sendData();
            }
        },
        computed: {},
        mounted() {

        },
        activated(){
//            this.monthIndex = 0;
            this.getMonth(0);
        },
        deactivated() {
        },
        destroyed(){
        },
        methods: {
            getMonth(handle){
                if (this.monthIndex == 0 && handle == 1)
                    return;

                if (this.monthIndex == -1 && handle == -1)
                    return;

                this.monthIndex += handle;

                let now = this.monthStart;
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();
                let lastMonth = month + handle;
                let totalDay = 0;
                let json = {
                    1: 31,
                    2: 28,
                    3: 31,
                    4: 30,
                    5: 31,
                    6: 30,
                    7: 31,
                    8: 31,
                    9: 30,
                    10: 31,
                    11: 30,
                    12: 31
                };
                for (let k in json) {

                    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                        if (lastMonth == 2 && lastMonth == k) {
                            totalDay = json[k] + 1;
                        }
                        else if (lastMonth == k) {
                            totalDay = json[k];
                        }
                    }
                    else {
                        if (lastMonth == k) {
                            totalDay = json[k];
                        }
                    }
                }

                this.monthStart = new Date(year, lastMonth - 1, 1);
                this.monthEnd = new Date(year, lastMonth - 1, totalDay);
            },
            sendData(){
                this.$emit('get', this.monthIndex)
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .month-nav-bar-wrap {
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
