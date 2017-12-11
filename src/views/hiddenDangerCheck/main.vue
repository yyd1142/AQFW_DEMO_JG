<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="风险上报" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap hdc-main-wrap" v-show="onPage==='main'">
            <div class="info-wrap">
                <mko-form-cell title="风险单位" :val="formData.dwName"
                               edit type="sel" @click="changePage('selDw')"></mko-form-cell>
                <mko-form-cell title="风险位置" :val="formData.yhPosition" @click="changePage('selPosition')"
                               edit :type="formData.groupId?'sel':''"></mko-form-cell>
                <mko-form-cell title="详细地址" v-model="formData.yhPositionDetail"
                               edit type="text" v-show="formData.yhPosition"></mko-form-cell>

                <mko-form-cell title="协同部门" :val="formData.xtSupervise"
                               edit :type="formData.groupId?'sel':''" @click="onXtPage"></mko-form-cell>

                <mko-form-cell title="处置期限" :val="formatDate(formData.limitedTime)"
                               edit type="sel" @click="ctrlDatePicker"></mko-form-cell>

            </div>
            <div class="content-wrap">
                <mko-textarea type="outer" v-model="formData.yhDesc" placeholder="请输入风险描述" @input="onInputData"></mko-textarea>
                <photo-box :photo-list="photoList" :max='8' @addPhotoEvent="sheetShow=true"
                           @removePhotoEvent="removePhoto()"></photo-box>
            </div>
            <div class="footer-wrap">
                <mko-button type="danger" size="large" :disabled="!formValid" no-radius @click="postHideDanger">提交</mko-button>
                <!--<mt-button class="btn" size="large" @click="postHideDanger">提交</mt-button>-->
            </div>
        </div>
        <!--选择页面-->
        <sel-xt :selFormData="xtFormData" :dwId="formData.groupId" @sel="selXt" @changePage="onPage='main'"
                v-show="onPage==='selXt'" ref="selXtPage"></sel-xt>
        <sel-dw @sel="selDw" @changePage="onPage='main'" v-if="onPage==='selDw'"></sel-dw>
        <sel-position :dwId="formData.groupId" @sel="selPosition" @changePage="onPage='main'"
                      v-if="onPage==='selPosition'"></sel-position>
        <!--<sel-level @changePage="onPage='main'" v-show="onPage==='selLevel'"></sel-level>-->
        <!--日期选择器-->
        <mt-datetime-picker ref="picker" type="date" :startDate="startDate" v-model="pickerVal"
                            @confirm="getLimitedTime"></mt-datetime-picker>
        <!--添加图片-->
        <mt-actionsheet :actions="actions" v-model="sheetShow"></mt-actionsheet>
    </div>
</template>


<script>
    import { Indicator, Toast } from 'mint-ui';
    import moment from 'moment'
    import api from 'api'
    import apiconf from 'apiconf'
    import PhotoBox from 'components/photoBox/photoBox.vue';
    import selDw from './selDw.vue';
    import selPosition from './selPosition.vue';
    import selXt from './selXtSupervise.vue';
    //  import selLevel from './selLevel.vue';
    import * as types from '../../store/mutation-types'
    var isClick = false;
    export default {
        data() {
            return {
                //控制
                sheetShow: false,
                actions: [],
                onPage: this.$route.query.page || 'main',
                //数据
                photoList: [],
                formValid: false,
                formData: {
                    //          yhType: 1,
                    //          userName: this.$store.getters.userName,
                    //          sbGroupId: this.$store.getters.groupId,
                    groupId: '',
                    dwName: '',
                    yhPosition: '',
                    yhPositionDetail: '',
                    limitedTime: '',
                    yhDesc: '',
                    xtSupervise: '',
                    xtDWName: '',
                    yhFilesID: ''
                },
                xtFormData: {
                    xtId: [],
                    xtName: []
                },
                //日期选择
                pickerVal: '',
                startDate: new Date()
            }
        },
        watch: {
            formData: {
                handler() {
                    this.formValidFn();
                },
                deep: true
            },
            onPage: function (page) {
                window.mkoBackButton.bInputData = page == 'main';
            },
            $route() {
                this.onPage = this.$route.query.page || 'main';
            }
        },
        mounted() {
            //      this.formData.userName = this.$store.getters.userName;
            this.actions = [{
                name: '拍照',
                method: this.takePhoto
            }, {
                name: '从相册中选择',
                method: this.choosePhoto
            }];
        },
        activated() {
            this.onInputData();
        },
        deactivated() {
            window.mkoBackButton.bInputData = false;
        },
        methods: {
            //选择
            selDw(val) {
                this.formData.yhPosition = '';
                this.formData.yhPositionDetail = '';
                this.formData.xtSupervise = '';
                this.formData.xtDWName = '';
                this.formData.groupId = val.groupId;
                this.formData.dwName = val.dwName;
            },
            selPosition(val) {
                this.formData.yhPosition = val.build + '' + val.floor;
            },
            deactivated() {
                window.mkoBackButton.bInputData = false;
            },
            selXt(form) {
                this.xtFormData = JSON.parse(JSON.stringify(form));
                this.formData.xtSupervise = form.xtId.join(',');
                this.formData.xtDWName = form.xtName.join(',');
            },
            changePage(page) {
                this.$MKOPush(`/hidden_danger_check?page=${page}`);
                //        this.onPage = page;

            },
            onXtPage() {
                this.changePage('selXt');
                let xtPage = this.$refs.selXtPage;
                if (xtPage.xtList.length === 0) {
                    xtPage.getData();
                } else {
                    xtPage.checkSelItem();
                }
            },
            ctrlDatePicker() {
                this.$refs.picker.open();
            },
            getLimitedTime() {
                this.formData.limitedTime = moment(this.pickerVal).format("YYYY-MM-DD");
            },
            //照片
            takePhoto() {
                this.$takePhoto((photo) => {
                    this.photoList.push(photo.url);
                });
            },
            choosePhoto() {
                this.$choosePhoto((photos) => {
                    for (let photo of photos) {
                        this.photoList.push(photo.url);
                    }
                });
            },
            removePhoto(index) {
                this.photoList.splice(index, 1);
            },
            //filters
            formatDate(date) {
                if (!date) {
                    return ''
                }
                date = moment(date).format('YYYY-MM-DD');
                return date;
            },
            //表单
            formValidFn() {
                let data = this.formData;
                let NonValid = {
                    yhFilesID: 1,
                    xtSupervise: 1,
                    xtDWName: 1
                };
                for (let key in data) {
                    if (!NonValid[key] && data[key] === "") {
                        this.formValid = false;
                        return;
                    }
                }
                this.formValid = true;
            },
            postHideDanger() {
                for (let i in this.formData) {
                    if (this.formData[i] == '') {
                        switch (i) {
                            case 'yhFilesID':
                                break;
                            case 'xtSupervise':
                                break;
                            case 'xtDWName':
                                break;
                            default:
                                return false;
                        }
                    }
                }
                if (this.photoList.length == 0) {
                    Toast({
                        message: '请拍照上传',
                        duration: 1000
                    });
                    return false;
                }
                if (isClick) {
                    return false;
                }
                isClick = true;
                Indicator.open({spinnerType: 'fading-circle'});
                let self = this;
                //        let form = this.formData;
                let form = {
                    "yhType": 1,
                    "userName": this.$store.getters.userName,
                    "sbGroupId": this.$store.getters.groupId,
                    "groupId": this.formData.groupId,
                    "yhPosition": `${this.formData.yhPosition},${this.formData.yhPositionDetail}`,
                    "limitedTime": this.formData.limitedTime,
                    "yhDesc": this.formData.yhDesc,
                    "xtSupervise": this.formData.xtSupervise,
                    "xtDWName": this.formData.xtDWName
                };
                let doUploadSuccess = function (resourceId) {
                    if (resourceId != '') {
                        form['yhFilesID'] = resourceId;
                    }
                    api.addYhk(form).then(res => {
                        Indicator.close();
                        isClick = false;
                        if (res) {
                            self.$MKODialog({
                                msg: '提交成功'
                            }).then(res => {
                                if (res === 'confirm') {
                                    window.mkoBackButton.bInputData = false;
                                    self.$destroy();
                                    self.$MKOJump('/enter/home');
                                }
                            });
                        } else {
                            Toast({
                                message: '提交数据失败',
                                duration: 1000
                            });
                        }
                    });
                };
                let doDumpYHKData = function () {
                    if (self.photoList.length <= 0) {
                        doUploadSuccess('');
                        return;
                    }
                    let uploadURL = `${apiconf.resourcesDomain}/uploads`;
                    self.$uploadImages(self.photoList, uploadURL, function (result) {
                        if (result.error && result.error.length > 0) {
                            Toast({
                                message: '图片上传失败',
                                duration: 1000
                            });
                            return false;
                        }
                        if (result.resourceId && result.resourceId.length > 0) {
                            doUploadSuccess(result.resourceId);
                        }
                    });
                };
                this.$getMobileNetworkType(function (result) {
                    if (result == "unknown") {
                        self.$MKODialog({
                            msg: '当前网络不可用，请确保网络正常...'
                        });
                        return;
                    } else if (result == "3G/4G") {
                        let opts = {
                            title: '提示',
                            msg: '当前3G/4G网络，提交数据会消耗流量，建议WIFI环境下上传。',
                            cancelBtn: true,
                            confirmText: '立即提交',
                            cancelText: '稍后提交'
                        }
                        self.$MKODialog(opts).then(action => {
                            if (action != 'confirm')
                                return;
                            doDumpYHKData();
                        });
                    } else if (result == "wifi") {
                        doDumpYHKData();
                    }
                });
            },
            back() {
                this.$MKODialog({
                    title: '真的要返回吗',
                    msg: '此页面信息将被清空',
                    cancelBtn: true,
                }).then(action => {
                    if (action === 'confirm') {
                        window.mkoBackButton.bInputData = false;
                        this.$destroy();
                        this.$MKOPop();
                    }
                });
            },
            onInputData() {
                let that = this;
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                window.mkoBackButton.callback = function () {
                    that.$MKODialog({
                        title: '真的要返回吗',
                        msg: '此页面信息将被清空',
                        cancelBtn: true,
                    }).then(action => {
                        if (action === 'confirm') {
                            window.mkoBackButton.bInputData = false;
                            that.$destroy();
                            that.$MKOPop();
                        }
                    });
                }
            }
        },
        components: {
            selDw,
            selPosition,
            selXt,
            //      selLevel,
            PhotoBox
        }
    }
</script>


<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .hdc-main-wrap {
        .info-wrap {
            margin-bottom: 14px;
        }
        .content-wrap {
            margin-top: 14px;
            .mko-text-area {
                padding-bottom: 0;
            }
        }
        .footer-wrap {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    }
</style>
