<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="个人资料" left-icon="icon-back" @handleLeftClick="back" :right-icon-text="isEdit ? '取消' : '编辑'" @handleRightClick="editInfo">
            <div class="header-person-edit-btn abs-vertical-middle" :class="isValidate?'':'disabled'" slot="custom" @click="saveInfo" v-if="isEdit">
                保存
            </div>
        </mko-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap person-data-wrap" v-show="!resError">
            <div ref="wrapper">
                <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange" :auto-fill="autoFill">
                    <div :style="{ height: wrapperHeight + 'px'}">

                        <div class="data-wrap">
                            <mko-double-cell class="avatar-cell-wrap" title="头像">
                                <div class="avatar-wrap fr">
                                    <div class="default"></div>
                                    <!--<img class="avatar" src="./logo.png">-->
                                </div>
                            </mko-double-cell>
                            <mko-form-cell title="姓名" :val="personData.name" v-model="formData.name"
                                           :edit="isEdit" type="text" required></mko-form-cell>
                            <mko-form-cell title="电话" :val="personData.phone" v-model="formData.phone"
                                           :edit="isEdit" type="text" required phone></mko-form-cell>
                            <mko-form-cell title="性别" :val="isEdit?genderFilter(formData.gender):genderFilter(personData.gender)"
                                           :edit="isEdit" type="sel" @click="popupPickerShow('gender')"></mko-form-cell>
                            <mko-form-cell title="生日" :val="isEdit?formatDate(bornDate,'YYYY-MM-DD'):formatDate(personData.bornDate,'YYYY-MM-DD')" non-text="暂无"
                                           :edit="isEdit" type="sel" @click="datePickerShow"></mko-form-cell>
                            <mko-form-cell title="身份证号" :val="personData.IDNumber" v-model="formData.IDNumber" non-text="暂无"
                                           :edit="isEdit" type="text"></mko-form-cell>
                            <mko-form-cell title="职位" :val="personData.position" v-model="formData.position" non-text="暂无"
                                           :edit="isEdit" type="text"></mko-form-cell>
                        </div>
                        <div class="data-wrap">
                            <mko-cell title="单位名称" :val="personData.dwName"></mko-cell>
                            <mko-cell title="单位类型" :val="personData.type|JgDwType"></mko-cell>
                            <mko-cell title="消防角色" :val="personData.role|JgRoleType"></mko-cell>
                        </div>
                    </div>
                </mt-loadmore>
            </div>
            <!--弹出框-->
            <mt-popup v-model="selPopupShow" position="bottom">
                <div class="p-header">
                    <div class="btn fl" @click="selPopupClose">取消</div>
                    <div class="btn fr" @click="selPickerVal">确定</div>
                </div>
                <div class="p-body">
                    <mt-picker :slots="genderList" @change="onGenderChange" v-if="pickerShow=='gender'"></mt-picker>
                </div>
            </mt-popup>
            <!--日期选择-->
            <mt-datetime-picker ref="bornDatePicker" type="date" :startDate="startDate" :end-date="new Date()"
                                year-format="{value} 年"
                                month-format="{value} 月" date-format="{value} 日" v-model="datePickerVal"
                                @confirm="selDate()"></mt-datetime-picker>
        </div>
    </div>
</template>


<script>
    import api from 'api';
    import { ResError } from 'components';
    import { Toast } from 'mint-ui'
    import { formatDate, JgDwType, genderFilter } from 'filters';
    import moment from 'moment'
    let history_gender = 0;
    let valid_key = ['name', 'phone'];

    export default {
        data() {
            return {
                //提示
                resError: false,
                //loadMore
                wrapperHeight: 0,
                autoFill: false,
                topStatus: '',
                //数据
                personData: {},
                //编辑
                holderText: '请完善信息',
                startDate: new Date(1960, 0, 1),
                selPopupShow: false,
                pickerShow: '',
                isEdit: false,
                isValidate: true,
                datePickerVal: new Date(),
                bornDate: '',
                formData: {
                    name: '',
                    phone: ''
                },
                genderList: [{flex: 1, values: ['男', '女']}], //1,2
            }
        },
        watch: {
            selPopupShow: function (val) {
                if (!val) {
                    this.pickerShow = '';
                    document.body.style.overflow = 'auto'
                } else {
                    document.body.style.overflow = 'hidden'
                }
            },
            formData: {
                handler() {
                    this.validForm();
                },
                deep: true
            }
        },
        mounted() {
            this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
        },
        activated(){
            this.$nextTick(() => {
                this.getLocalData();
                this.onInputData();
            });
        },
        deactivated() {
            window.mkoBackButton.bInputData = false;
            document.body.style.overflow = 'auto';
            this.selPopupShow = false;
            this.$refs.bornDatePicker.close();
            this.isEdit = false;
            this.isValidate = false;
        },
        methods: {
            formatDate,
            genderFilter,
            getLocalData() {
                let local = localStorage['USER_DATA'];
                if (local && local.length > 0) {
                    try {
                        this.personData = JSON.parse(local);
                    } catch (err) {
                    }
                    let data = this.personData;
                    this.bornDate = data.bornDate;
                    for (let key in data) {
                        this.formData[key] = data[key]
                    }
                } else {
                    this.UpdateData();
                }
            },
            UpdateData() {
                api.getPersonInfo({
                    userName: this.$store.getters.userName
                }).then(res => {
                    this.$refs.loadmore.onTopLoaded();
                    if (!res)
                        return;
                    try {
                        window.localStorage.setItem('USER_DATA', JSON.stringify(res.response));
                    } catch (err) {
                    }
                    this.personData = res.response;
                    let data = this.personData;
                    for (let key in data) {
                        this.formData[key] = data[key]
                    }
                });
            },
            loadTop() {
                let timer = setTimeout(() => {
                    this.UpdateData();
                    clearTimeout(timer);
                }, 1000);
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            //编辑按钮
            editInfo(){
                let form = this.formData;
                if (!this.isEdit) {
                    this.bornDate = form.bornDate;
                    this.validForm();
                    this.isEdit = true;
                    return false;
                }

                for (let key in form) {
                    form[key] = this.personData[key];
                }
                this.bornDate = form.bornDate;
                this.isEdit = false;
            },
            validForm(){
                for (let key of valid_key) {
                    if (!this.formData[key] && this.formData[key] !== 0) {
                        this.isValidate = false;
                        return false;
                    }
                }
                this.isValidate = true;
            },
            saveInfo(){
                if (!this.isValidate)
                    return false;

                let form = {};
                for (let key in this.formData) {
                    form[key] = this.formData[key]
                }
                form.bornDate = moment(form.bornDate).format("YYYY-MM-DD");
                api.postPerson(form).then(res => {
                    if (res && res.code == 0) {
                        for (let key in form) {
                            this.personData[key] = form[key];
                        }
                        try {
                            sessionStorage.setItem('USER_DATA', JSON.stringify(this.personData));
                        } catch (err) {
                        }
                        Toast({message: '修改成功！', duration: 1000});
                    } else {
                        Toast({message: '修改失败！', duration: 1000});
                    }
                });
                this.isEdit = false;
            },
            //弹出框
            selPopupClose(){
                this.selPopupShow = false;
            },
            popupPickerShow(picker){
                if (this.isEdit) {
                    let that = this;
                    let fns = {
                        'gender': function () {
                            if (that.formData.gender)
                                that.genderList[0].defaultIndex = that.formData.gender - 1;
                        },
                    };
                    if (fns[picker])
                        fns[picker]();
                    this.selPopupShow = true;
                    this.pickerShow = picker;
                }
            },
            selPickerVal(){
                let that = this;
                let form = this.formData;
                let Fns = {
                    'gender': function () {
                        form.gender = history_gender;
                        form.genderValue = that.genderList[0].values[history_gender - 1];
                    },
                };
                if (Fns[this.pickerShow])
                    Fns[this.pickerShow]();
                this.selPopupShow = false;
            },
            //时间
            datePickerShow(){
                if (this.isEdit) {
                    this.datePickerVal = this.formData.bornDate ? new Date(this.formData.bornDate) : new Date();
                    this.$refs.bornDatePicker.open();
                }
            },
            selDate(){
                this.bornDate = this.formData.bornDate = this.datePickerVal;
            },
            //当前选项
            onGenderChange(picker, vals){
                let list = this.genderList[0].values;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == vals[0])
                        history_gender = i + 1;
                }
            },
            back() {
                if (this.isEdit) {
                    this.$MKODialog({
                        title: '真的要返回吗',
                        msg: '编辑信息还未保存',
                        cancelBtn: true,
                    }).then(action => {
                        if (action === 'confirm') {
                            this.$MKOPop();
                        }
                    });
                    return;
                }
                this.$MKOPop();
            },
            onInputData() {
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                window.mkoBackButton.callback = this.back;
            }
        },
        components: {
            ResError
        }
    }
</script>


<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .header-person-edit-btn {
        position: absolute;
        right: 59px;
        font-size: 16px;
        z-index: 10;
        &.disabled {
            opacity: 0.5;
        }
    }

    .person-data-wrap {
        padding-top: 10px;
        padding-bottom: 0;

        .data-wrap {
            margin-bottom: 10px;
            .avatar-cell-wrap {
                .title {
                    position: relative;
                    top: 3px;
                    font-size: 16px;
                }
            }
            .avatar-wrap {
                /*margin: 10px 0;*/
                width: 44px;
                height: 44px;
                .default {
                    height: 100%;
                    background: url(/static/icons/resource.png) -654px*0.7666 0 no-repeat;
                    background-size: 892px*0.7666 auto;
                }
                .avatar {
                    width: 100%;
                }
            }
        }
    }
</style>
