<template>
    <div class="qy-comment">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="单位评价">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
            <mt-button class="header-item" @click="action" slot="right" v-text="text"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap">
            <div class="label-wrap">
                <span class="label" :class="label.color" v-for="label in myLabels">{{label.name}}</span>
            </div>
            <div class="tips" v-text="tips"></div>
        </div>
    </div>
</template>
<script>
    import {NoData, ResError} from 'components';
    export default {
        data() {
            return {
                resError: false,
                noData: false,
                tips: '温馨提示：点击「编辑」进行新增/删除评价',
                text: '编辑',
                myLabels: [],
                labels: [{
                    name: '高危单位',
                    color: 'red',
                }, {
                    name: '不放心单位',
                    color: 'yellow',
                }],
                allLabels: [{
                    name: '高危单位',
                    color: 'red'
                }, {
                    name: '不放心单位',
                    color: 'yellow'
                },{
                    name: '放心单位',
                    color: 'green'
                }, {
                    name: '安全单位',
                    color: 'blue'
                }],
                isEdit: false
            }
        },
        watch: {

        },
        computed: {
            qyLabels() {
                let labels = this.allLabels;
                for(let item of labels) {
                    for(let subItem of this.labels) {
                        if(item.name == subItem.name) {
                            item.active = true;
                        }
                    }
                }
                return labels;
            }
        },
        activated() {
            this.myLabels = this.labels;
        },
        methods: {
            back(){
                this.$MKOPop();
            },
            action() {
                if(this.text === '编辑') {
                    this.text = '完成';
                    this.isEdit = true;
                    this.myLabels = this.qyLabels;
                } else {
                    this.text = '编辑';
                    this.isEdit = false;
                    this.myLabels = this.labels;
                }
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>
<style lang="less">
    .qy-comment {
        .page-wrap {
            padding: 0 14px;
            .label-wrap {
                background-color: #ffffff;
                height: 100px;
                margin-top: 14px;
                border-radius: 3px;
                .label {
                    min-width: 150px;
                    &.red {
                        color: #ff0008;
                    }
                    &.yellow {
                        color: #fff345;
                    }
                    &.green {
                        color: #19ff56;
                    }
                    &.blue {
                        color: #2CABFF;
                    }
                }
            }
            .tips {
                width: 100%;
                font-size: 12px;
                color: #ccc;
                margin-top: 10px;
            }
        }
    }
</style>
