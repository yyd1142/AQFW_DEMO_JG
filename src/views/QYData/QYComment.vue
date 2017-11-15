<template>
    <div class="qy-comment">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :style="{backgroundColor: scoreHeadColor($route.query.score)}" fixed
                   title="单位评价">
            <mt-button class="header-item" @click="back" slot="left" icon="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap">
            <div class="comment-title"><span>单位评价</span></div>
            <div class="label-wrap">
                <span class="label" :class="label.active ? scoreColorStyle($route.query.score) : 'no-active'"
                      v-for="label, index in labelsDatas"
                      @click="choose(label, index)">{{label.attributeName}}</span>
            </div>
            <div class="btn">
                <mko-button size="large" no-radius @click="action">保存</mko-button>
            </div>
        </div>
    </div>
</template>
<script>
    import api from 'api'
    import {NoData, ResError} from 'components'
    import {MessageBox, Toast} from 'mint-ui'
    export default {
        data() {
            return {
                resError: false,
                noData: false,
                tips: '温馨提示：点击「编辑」进行新增/删除评价',
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
                        let attributes = result.response.attributes.filter(item => {
                            return item.type == 1
                        });
                        this.qyItem = result.response;
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
                for (let item of this.labelsDatas) {
                    if (item.active) {
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
                        Toast({ message: '评价成功', duration: 1500 });
                        setTimeout(() => {
                            this.back()
                        }, 1500);
                    } else {
                        Toast({ message: '评价失败', duration: 1500 });
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
                    return '#FFC128'
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
                .label {
                    height: 30px;
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
        .btn {
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 22;
        }
    }
</style>
