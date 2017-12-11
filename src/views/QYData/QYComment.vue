<template>
    <div class="qy-comment">
        <div class="placeholder-item"></div>
        <mko-header :title="qyItem.dwName" :background-color="scoreHeadColor($route.query.score)" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap">
            <div class="comment-title"><span>单位标签</span></div>
            <div class="label-wrap">
                <span class="label" :class="label.active ? scoreColorStyle($route.query.score) : 'no-active'" v-for="label, index in labelsDatas" @click="choose(label, index)">{{label.attributeName}}</span>
            </div>
            <mko-button class="btn" size="large" @click="action">保存</mko-button>
        </div>
    </div>
</template>
<script>
    import api from 'api'
    import { NoData, ResError } from 'components'
    import {Toast } from 'mint-ui'
    export default {
        data() {
            return {
                resError: false,
                noData: false,
                text: '编辑',
                labelsDatas: [],
                qyItem: {}
            }
        },
        activated() {
            this.setBackButton();
            this.getAllLabels();
        },
        methods: {
            back(){
                this.$MKOPop();
            },
            action() {
                this.$MKODialog({
                    title: '确认保存当前修改？',
                    cancelBtn: true,
                    cancelText: '取消'
                }).then(msg => {
                    if (msg == 'confirm') {
                        this.updateLabel();
                        this.text = '编辑';
                        this.isEdit = false;
                    }
                })
            },
            choose(item, index) {
                this.labelsDatas[index].active = !item.active;
            },
            getLabels(datas) {
                let labelsDatas = [];
                api.getQyInfo({
                    groupId: this.$route.params.id
                }).then(result => {
                    if (!result) return false;
                    if (result.code === 0) {
                        result.response.dwAttributeId = result.response.dwAttributeId.split(',');
                        let attributes = result.response.dwAttributeId
                        this.qyItem = result.response;
                        labelsDatas = attributes;
                    } else {
                        labelsDatas = [];
                    }
                    for (let item of datas) {
                        item.active = false;
                        for (let subItem of labelsDatas) {
                            if (item.id === parseInt(subItem)) item.active = true;
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
                for (let item of this.labelsDatas) {
                    if (item.active) {
                        dwAttributeId.push(item.id);
                    }
                }
                api.addDWByZF({
                    groupId: this.qyItem.groupId,
                    gxDWID: this.qyItem.gxDWID,
                    dwAttributeId: dwAttributeId.join(',')
                }).then(result => {
                    if (!result) return false;
                    if (result.code == 0) {
                        Toast({message: '保存成功', duration: 1500});
                        setTimeout(() => {
                            this.back()
                        }, 1500);
                    } else {
                        Toast({message: '保存失败', duration: 1500});
                    }
                })
            },
            getLabelsDatasEmpty(datas) {
                let emptyDatas = datas.filter(item => {
                    return item.active === false;
                });
                if (emptyDatas.length === datas.length) {
                    return true;
                } else {
                    return false;
                }
            },
            scoreHeadColor(val) {
                val = parseFloat(val);
                if (!val)
                    return '#8988FF';
                if (val >= 90) {
                    return '#8988FF'
                } else if (val >= 80) {
                    return '#52B0FE'
                } else if (val >= 70) {
                    return '#34D986'
                } else if (val >= 60) {
                    return '#FF9744'
                } else {
                    return '#FF8383'
                }
            },
            scoreColorStyle(score) {
                let val = parseFloat(score);
                if (!val)
                    return 'gradients90';
                if (val >= 90) {
                    return 'gradients90'
                } else if (val >= 80) {
                    return 'gradients80'
                } else if (val >= 70) {
                    return 'gradients70'
                } else if (val >= 60) {
                    return 'gradients60'
                } else {
                    return 'gradients50'
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
            .label-wrap {
                background-color: #ffffff;
                min-height: 60px;
                border-radius: 2px;
                padding: 0 14px;
                overflow: hidden;
                .label {
                    height: 30px;
                    max-width: 100%;
                    font-size: 14px;
                    color: #ffffff;
                    border-radius: 2px;
                    text-align: center;
                    display: inline-block;
                    line-height: 14px;
                    padding: 8px;
                    box-sizing: border-box;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    &.no-active {
                        color: #666666;
                        border: 1px solid #dddddd;
                    }
                }
            }
            .tips {
                width: 100%;
                font-size: 12px;
                color: #ccc;
                margin-top: 10px;
            }
            .btn {
                    margin-top: 14px;
                    margin-bottom: 14px;
                }
        }
        .comment-title {
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            width: 100%;
            background-color: #ffffff;
            height: 50px;
            display: table;
            padding-left: 14px;
            span {
                line-height: 50px;
                vertical-align: middle;
                display: table-cell;
            }
        }
    }
</style>
