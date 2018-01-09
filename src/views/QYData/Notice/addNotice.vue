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
export default {
    data() {
        return {
            formData: {
                title: this.$route.query.title,
                content: this.$route.query.content
            }
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
                    
                }
            })
        }
    }
}
</script>

<style lang="less">
.qy-addnotice-model {
    padding-top: 10px;
    .page-wrap {
        .form-card {
            background-color: #ffffff;
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
