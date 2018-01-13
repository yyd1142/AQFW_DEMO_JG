<template>
    <div class="qy-addnotice-model">
        <div class="placeholder-item"></div>
        <mko-header title="通知内容" left-icon-text="取消" @handleLeftClick="back" right-icon-text="选择模板" @handleRightClick="chooseModel"></mko-header>
        <div class="page-wrap">
            <div class="form-card">
                <mko-form-cell title="标题" v-model="formData.title" holder-text="请输入通知标题" :edit="true" type="text"></mko-form-cell>
                <mko-textarea v-model="formData.content" :val="formData.content" placeholder="请输入通知正文"></mko-textarea>
            </div>
            <mko-button class="btn" size="large" @click="send">发送</mko-button>
        </div>
    </div>
</template>

<script>
import api from 'api'
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            formData: {
                title: '',
                content: ''
            }
        }
    },
    activated() {
        if(sessionStorage.getItem('chooseModelDatas')) {
            let formData = JSON.parse(sessionStorage.getItem('chooseModelDatas'));
            this.formData = {
                title: formData.title,
                content: formData.content
            }
        }
    },
    deactivated() {
        this.formData = {
            title: '',
            content: ''
        }
        sessionStorage.removeItem('chooseModelDatas')
    },
    methods: {
        back() {
            this.$MKOPop();
        },
        send() {
            this.$MKODialog({
                title: '确认发送此通知吗？',
                cancelBtn: true,
                cancelText: '取消'
            }).then(msg => {
                if (msg == 'confirm') {
                    this.addMessage()
                }
            })
        },
        addMessage() {
            let extendData = {
                editForm: {
                    type: "1",
                    role: "",
                    dwTypeID: "",
                    dwSubTypeID: "",
                    dwSafeTypeID: "",
                    dwSafeSubTypeID: "",
                    jzType: "",
                    jzSubType: "",
                    dxDwName: this.$route.query.dwName,
                    dxGroupId: this.$route.query.groupId
                },
                editExdForm: {
                    dxDwList: [{
                        name: this.$route.query.dwName,
                        groupId: this.$route.query.groupId
                    }],
                    dwTypeList: [],
                    dwRoleList: [],
                    dwSafeList: [],
                    dwJzTypeList: []
                },
                dwTypeID: "",
                dwSubTypeID: "",
                dwSafeTypeID: "",
                dwSafeSubTypeID: "",
                jzType: "",
                jzSubType: "",
                role: "",
                type: "1"
            };
            let postbody = {
                title: this.formData.title,
                type: "message",
                receipt: "1",
                content: `<p>${this.formData.content}</p>`,
                summary: this.formData.title,
                attachment: "",
                receive: "5",
                dxDwName: this.$route.query.dwName,
                dxGroupId: this.$route.query.groupId,
                extendData: JSON.stringify(extendData),
                receiveDW: this.$route.query.dwName,
                releaseDW: this.$store.getters.userInfo.dwName
            }
            api.addMessage(postbody).then(result => {
                if(!result) return false;
                if(result && result.code == 0) {
                    this.messagePublish(result.response.id);
                } else {
                    Toast({message: `code: ${result.code}`, duration: 1500});
                }
            })
        },
        messagePublish(id) {
            api.messagePublish(id).then(result => {
                if(!result) return;
                if(result && result.code == 0) {
                    Toast({message: `发送成功`, duration: 1500});
                    this.back()
                } else {
                    Toast({message: `code: ${result.code}`, duration: 1500});
                }
            })
        },
        chooseModel() {
            this.$MKOPush({
                path: '/qy_notice_model'
            })
        }
    }
}
</script>

<style lang="less">
@import "../../../config.less";
.qy-addnotice-model {
    // padding-top: 10px;
    .page-wrap {
        .form-card {
            background-color: #ffffff;
            .border-btm(#eeeeee);
            &::after {
                bottom: -1px;
            }
            .mko-text-area {
                background: none;
                .body {
                    background: #f2f2f2;
                    textarea {
                        background: #f2f2f2;
                    }
                }
            }
        }
        .btn {
            margin-top: 14px;
        }
    }
}
</style>
