<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="创建账号" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap add-user-wrap">
            <div class="com-data-wrap is-edit">
                <mt-cell title="登录账号">
                    <span class="sign">*</span>
                    <input class="ipt" type="text" :placeholder="holderText" v-model="formData.userName">
                </mt-cell>
                <mt-cell title="登录密码">
                    <span class="sign">*</span>
                    <input class="ipt" type="text" placeholder="密码必须大约6位小于20位"
                           @keyup="formData.password = formData.password.replace(/[^\w./]/ig, '')"
                           @beforepaste="formData.password.setData('text',formData.password.getData('text').replace(/[^\w./]/ig, ''))"
                           v-model="formData.password">
                </mt-cell>
                <!--<mt-cell title="密码确认">-->
                <!--<span class="sign">*</span>-->
                <!--<input class="ipt" type="password" placeholder="密码必须大约6位小于20位" v-model="formData.passwordConfirm">-->
                <!--</mt-cell>-->
                <mt-cell title="姓名">
                    <span class="sign">*</span>
                    <input class="ipt" type="text" :placeholder="holderText" v-model="formData.name">
                </mt-cell>
                <div class="sel-cell-wrap" @click="popupPickerShow('gender')">
                    <span class="sign">*</span>
                    <mt-cell title="性别" :value="formData.gender|genderFilter" is-link></mt-cell>
                </div>
                <mt-cell title="身份证号">
                    <input class="ipt" type="text" :placeholder="holderText" v-model="formData.idNumber">
                </mt-cell>
                <mt-cell title="电话">
                    <span class="sign">*</span>
                    <input class="ipt" type="number" :placeholder="holderText" v-model="formData.phone">
                </mt-cell>
                <div class="sel-cell-wrap" @click="popupPickerShow('role')">
                    <span class="sign">*</span>
                    <mt-cell title="角色" :value="formData.role|JgRoleType" is-link></mt-cell>
                </div>
            </div>
            <div class="footer-btn">
                <mt-button class="btn" :disabled="!isValidate" size="large" @click="postData">创建账号</mt-button>
            </div>
            <!--弹出框-->
            <mt-popup v-model="selPopupShow" position="bottom">
                <div class="p-header">
                    <div class="btn fl" @click="selPopupClose">取消</div>
                    <div class="btn fr" @click="selPickerVal">确定</div>
                </div>
                <div class="p-body">
                    <mt-picker :slots="genderList" @change="onGenderChange" v-if="pickerShow=='gender'"></mt-picker>
                    <mt-picker :slots="roleList" @change="onRoleChange" v-if="pickerShow=='role'"></mt-picker>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import api from 'api'
    import {Indicator, Toast, MessageBox} from 'mint-ui'
    let history_gender = '';
    let history_role = '';
    export default {
        data () {
            return {
                holderText: '请完善信息',
                selPopupShow: false,
                pickerShow: '',
                isValidate: false,
                formData: {
                    userName: '',
                    password: '',
                    name: '',
                    gender: '',
                    phone: '',
                    role: ''
                },
                genderList: [{flex: 1, values: ['男', '女']}],  //1,2
                roleList: [{flex: 1, values: ['监管员', '文书']}]  //2,3
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
        },
        activated(){
            this.onInputData();
        },
        deactivated() {
        },
        destroyed(){
            window.mkoBackButton.bInputData = false;
            document.body.style.overflow = 'auto';
        },
        methods: {
            selPopupClose(){
                this.selPopupShow = false;
            },
            popupPickerShow(picker){
                let that = this;
                let fns = {
                    'gender': function () {
                        if (that.formData.gender)
                            that.genderList[0].defaultIndex = that.formData.gender - 1;
                    },
                    'role': function () {
                        if (that.formData.role)
                            that.roleList[0].defaultIndex = that.formData.role - 2;
                    }
                };
                if (fns[picker])
                    fns[picker]();
                this.selPopupShow = true;
                this.pickerShow = picker;
            },
            selPickerVal(){
                let form = this.formData;
                let Fns = {
                    'gender': function () {
                        form.gender = history_gender;
                    },
                    'role': function () {
                        form.role = history_role;
                    }
                };
                if (Fns[this.pickerShow])
                    Fns[this.pickerShow]();
                this.selPopupShow = false;
            },
            validForm(){
                for (let key in this.formData) {
                    if (key != 'idNumber' && !this.formData[key] && this.formData[key] !== 0) {
                        this.isValidate = false;
                        return false;
                    }
                }
                if ((this.formData.password.length < 6) || (this.formData.password.length > 20)) {
                    this.isValidate = false;
                    return false;
                }
                this.isValidate = true;
            },
            postData(){
                let form = JSON.parse(JSON.stringify(this.formData));
                api.postPerson(form).then(res => {
                    if (res && res.code == 0) {
                        Toast({
                            message: '创建账号成功！',
                            duration: 1000
                        });
                        sessionStorage.setItem('addUserData', JSON.stringify(form));
                        let that = this;
                        setTimeout(function () {
                            that.$MKOJump('/add_user_succ');
                            that.$destroy();
                        }, 1000);
                    } else if (res.code == 9) {
                        Toast({
                            message: '添加失败！账号名已存在，请使用其他账号名',
                            duration: 1000
                        });
                    } else {
                        Toast({
                            message: '创建账号失败！',
                            duration: 1000
                        });
                    }
                });
            },
            //联动
            onGenderChange(picker, vals){
                let list = this.genderList[0].values;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == vals[0])
                        history_gender = i + 1;
                }
            },
            onRoleChange(picker, vals){
                let list = this.roleList[0].values;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == vals[0])
                        history_role = i + 2;
                }
            },
            back() {
                for (let key in this.formData) {
                    if (this.formData[key].length != 0) {
                        MessageBox({
                            title: '真的要返回吗',
                            message: '此页面信息将被清空',
                            showCancelButton: true,
                        }).then(action => {
                            if (action === 'confirm') {
                                this.$MKOPop();
                                this.$destroy();
                            }
                        });
                        return;
                    }
                }
                this.$MKOPop();
                this.$destroy();
            },
            onInputData() {
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                window.mkoBackButton.callback = this.back;
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .add-user-wrap {
        .footer-btn {
            width: 100%;
            padding: 0 10px;
            margin-top: 14px;
            .btn {
                background: @bgBlue;
                color: #fff;
                text-align: center;
                &.is-disabled {
                    opacity: 0.3;
                }
            }
        }
    }
</style>
