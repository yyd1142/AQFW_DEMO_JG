<template>
    <div class="qy-addnotice-model">
        <div class="placeholder-item"></div>
        <mko-header title="通知内容" left-icon-text="取消" @handleLeftClick="back" right-icon-text="发送" @handleRightClick="send"></mko-header>
        <div class="page-wrap">
            <div class="form-card">
                <mko-form-cell title="标题" v-model="formData.title" holder-text="请输入通知标题" :edit="true" type="text"></mko-form-cell>
                <mko-textarea v-model="formData.content" :val="formData.content" placeholder="请输入通知正文"></mko-textarea>
            </div>
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
        this.formData = {
            title: this.$route.query.title,
            content: this.$route.query.content
        }
    },
    deactivated() {
        this.formData = {
            title: '',
            content: ''
        }
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
            api.addMessage({
                title: this.formData.title,
                type: "message",
                receipt: "1",
                content: `<p>${this.formData.content}</p>`,
                summary: this.formData.content,
                attachment: "",
                receive: "5",
                dxDwName: this.$route.query.dwName,
                dxGroupId: this.$route.query.groupId,
                extendData: "社会单位(主管单位)",
                releaseDW: this.$store.getters.userInfo.dwName
            }).then(result => {
                if(!result) return false;
                if(result && result.code == 0) {
                    Toast({message: '发布成功', duration: 1500});
                    this.back();
                } else {
                    Toast({message: `code: ${result.code}`, duration: 1500});
                }
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
    }
}
</style>
