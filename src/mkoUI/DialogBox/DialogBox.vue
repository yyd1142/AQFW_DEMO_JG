<template>
    <div class="dialog-box-wrap">
        <div class="modal"></div>
        <div class="box">
            <div class="header line-middle">
                <div class="title line-middle-text">{{title || '提示'}}</div>
            </div>
            <div class="body" v-if="msg">
                <div class="content text-center" :class="overflow?'flow':null" ref="content" v-html="msg"></div>
                <div class="mask" v-if="overflow"></div>
            </div>
            <div class="footer" :class="cancelBtn?'double-btn':''">
                <mko-button class="btn" size="flex" plain @click="close" v-if="cancelBtn">{{cancelText}}</mko-button>
                <mko-button class="btn" :size="cancelBtn?'flex':'large'" @click="confirm" v-if="confirmBtn===undefined||confirmBtn===true">
                    {{confirmText}}
                </mko-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
//    props: ['title', 'msg', 'cancelBtn', 'cancelText', 'confirmText'],
        props: {
            title: {},
            msg: {},
            cancelBtn: Boolean,
            cancelText: {type: String, default: '取消'},
            confirmText: {type: String, default: '确定'},
            confirmBtn: Boolean
        },
        data () {
            return {
                overflow: false,
                page: null,
                pageClass: '',
                pageScrollTop: 0
            }
        },
        mounted() {
            this.setBackButton();

            this.pageScrollTop = document.body.scrollTop;
            this.page = document.body.querySelector('.page-wrap');
            this.pageClass = this.page.className;
            this.page.className += ' hidden';
            document.body.style.overflow = 'hidden';
            if (this.$refs.content && this.$refs.content.clientHeight >= 376)
                this.overflow = true;
        },
        activated(){
        },
        deactivated() {
        },
        destroyed(){
            window.mkoBackButton.bInputData = false;
            window.mkoBackButton.callback = null;

            this.page.className = this.pageClass;
            document.body.style.overflow = 'auto';
            scrollTo(0, this.pageScrollTop);
        },
        methods: {
            fr(val){
                return val !== undefined && val !== false
            },
            setBackButton() {
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                if (window.mkoBackButton.bInputData) {
                    window.mkoBackButton.callback = function () {
                        return false;
                    };
                }
            },
            confirm(){
                this.$emit('confirm')
            },
            close(){
                this.$emit('close')
            }
        },
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../config.less";

    .dialog-box-wrap {
        .box {
            position: fixed;
            z-index: 2001;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            width: 93%;
            max-width: 386px;
            border-radius: 4px;
            text-align: center;
            background-color: #fff;
            .header {
                height: 44px;
                width: 100%;
                .border-btm(#DEE3E8);
                font-size: 19px;
            }
            .body {
                position: relative;
                padding: 16px 14px 0 14px;
                line-height: 22px;
                font-size: 14px;
                letter-spacing: 0;
                /*text-align: justify;*/
                text-align: center;
                color: #72787D;
                .content {
                    &.flow {
                        padding-bottom: 14px;
                    }
                    max-height: 376px;
                    overflow-y: scroll;
                }
                .mask {
                    position: absolute;
                    left: 0;
                    bottom: -1px;
                    width: 100%;
                    height: 20px;
                    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.80) 1%, #FFFFFF 100%);
                    border-radius: 4px;
                }
            }
            .footer {
                display: flex;
                padding: 14px 0;
                &.double-btn {
                    padding: 14px;
                }
                .btn {
                    & + .btn {
                        margin-left: 14px;
                    }
                }
            }
        }
        .modal {
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.5;
            background: #000;
        }
    }
</style>
