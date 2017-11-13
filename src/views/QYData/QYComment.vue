<template>
    <div class="qy-comment">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="单位评价">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
            <mt-button class="header-item" @click="action" slot="right" v-text="text"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="labelsDatas.length == 0"></no-data>
        <div class="page-wrap">
            <div class="label-wrap" v-if="!isEdit">
                <span class="label blue" v-for="label, index in labelsDatas"
                      v-if="label.active">{{label.attributeName}}</span>
            </div>
            <div class="label-wrap" v-else>
                <span class="label" :class="label.active ? 'blue' : null" v-for="label, index in labelsDatas"
                      @click="choose(label, index)">{{label.attributeName}}</span>
            </div>
            <div class="tips" v-text="tips"></div>
        </div>
    </div>
</template>
<script>
    import api from 'api'
    import {NoData, ResError} from 'components'
    import {MessageBox} from 'mint-ui'
    export default {
        data() {
            return {
                resError: false,
                noData: false,
                tips: '温馨提示：点击「编辑」进行新增/删除评价',
                text: '编辑',
                labelsDatas: [],
                isEdit: false,
                qyItem: {}
            }
        },
        activated() {
            this.setBackButton();
            this.getAllLabels();
        },
        methods: {
            back(){
                if (this.isEdit) {
                    this.isEdit = false;
                    this.text = '编辑';
                    this.labelsDatas = JSON.parse(sessionStorage.getItem('labelsDatas'));
                } else {
                    this.$MKOPop();
                }
            },
            action() {
                if (this.text === '编辑') {
                    this.text = '完成';
                    this.isEdit = true;
                    sessionStorage.setItem('labelsDatas', JSON.stringify(this.labelsDatas))
                } else {
                    MessageBox({
                        title: '确认保存当前修改？',
                        showCancelButton: true
                    }).then(action => {
                        if (action === 'confirm') {
                            this.updateLabel();
                            this.text = '编辑';
                            this.isEdit = false;
                        }
                    });
                }
            },
            choose(item, index) {
                if (this.isEdit) {
                    this.labelsDatas[index].active = !item.active;
                }
            },
            getLabels(datas) {
                let labelsDatas = [];
                api.getQyInfo({
                    groupId: this.$route.params.id
                }).then(result => {
                    if (!result) return false;
                    if (result.code === 0) {
                        let attributes = result.response[0].attributes.filter(item => {
                            return item.type == 1
                        });
                        this.qyItem = result.response[0];
                        labelsDatas = attributes;
                    } else {
                        labelsDatas = [];
                    }
                    for (let item of datas) {
                        item.active = false;
                        for (let subItem of labelsDatas) {
                            if (item.attributeName === subItem.attributeName) item.active = true;
                        }
                    }
                    this.labelsDatas = datas;
                })
            },
            getAllLabels() {
                let labelsDatas = [];
                api.getAllLabels({
                    m: 'attribute',
                    dep: 1,
                    type: 1
                }).then(result => {
                    if (!result) return false;
                    if (result.code === 0) {
                        labelsDatas = result.response;
                    } else {
                        labelsDatas = [];
                    }
                    this.getLabels(labelsDatas);
                });
            },
            setBackButton() {
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                if (window.mkoBackButton.bInputData) {
                    window.mkoBackButton.callback = this.back;
                }
            },
            updateLabel() {
                let dwAttributeId = [];
                for(let item of this.labelsDatas) {
                    if(item.active) {
                        dwAttributeId.push(item.id);
                    }
                }
                api.addDWByZF({
                    groupId: this.qyItem.groupId,
                    gxDWID: this.qyItem.gxDWID,
                    dwAttributeId: JSON.stringify(dwAttributeId)
                }).then(result => {
                    if (!result) return false;
                    if (result.code == 0) {

                    } else {

                    }
                })
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
                min-height: 60px;
                margin-top: 14px;
                border-radius: 3px;
                padding: 14px;
                .label {
                    min-width: 150px;
                    height: 34px;
                    line-height: 34px;
                    padding: 4px;
                    border: 1px solid;
                    border-radius: 3px;
                    font-size: 14px;
                    margin-right: 6px;
                    color: #eaeaea;
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
