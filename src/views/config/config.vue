<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="设置" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap config-page-wrap">
            <div class="cell-wrap">
                <mko-cell title="修改密码" is-link @click="linkPath('/config/pwd')"></mko-cell>
                <mko-cell :title="'检测新版本（' + version + '）'" main="left"></mko-cell>
                <!--<mko-cell title="清除缓存" @click="clear()"></mko-cell>-->
            </div>
            <div class="footer-btn" @click="exit()">
                <!--<mt-cell class="exit" title="退出账号"></mt-cell>-->
                退出账号
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .config-page-wrap {
        padding-top: 10px;
        .cell-wrap {
            margin-bottom: 14px;
        }
        .footer-btn {
            width: 100%;
            height: 44px;
            line-height: 44px;
            .border-btm(@baseBorder);
            font-size: 14px;
            text-align: center;
            color: @baseText01;
            background-color: #fff;
            &::after {
                bottom: -1px;
            }
        }
        .config-cell-wrap {
            width: 100%;
            &.center {
                text-align: center;
            }
            .mint-cell {
                min-height: 44px;
                height: 44px;
                font-size: 14px;
                .mint-cell-wrapper {
                    font-size: 14px;
                }
            }

        }
    }
</style>

<script>
    import api from 'api'
    import {Toast, MessageBox} from 'mint-ui'
    export default {
        name: 'config',
        data() {
            return {
                version: ''
            }
        },
        created() {
            api.getVersion().then(result => {
                if (!result) return false;
                this.version = result.version;
                this.$getAppVersion((appVersion) => {
                    if (!appVersion || appVersion.length == 0)
                        return;
                    this.version += '-' + appVersion;
                })
            })
        },
        deactivated() {
            try {
                MessageBox.close();
            }
            catch (err) {
                alert(err);
            }
        },
        methods: {
            exit() {
                this.$MKODialog({
                    msg:'确定退出该账号吗',
                    cancelBtn: true,
                }).then(action=>{
                    if (action == 'confirm') {
                        this.$store.dispatch('logout');
                        Toast({
                            message: '已退出',
                            position: 'middle',
                            duration: 1000
                        });
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$Logout();
                                this.$MKOJump('/login');
                            }, 1000)
                        })
                    }
                });
//                MessageBox.confirm('确定退出该帐号吗', '提示').then(action => {
//                    if (action == 'confirm') {
//                        this.$store.dispatch('logout');
//                        Toast({
//                            message: '已退出',
//                            position: 'middle',
//                            duration: 1000
//                        });
//                        this.$nextTick(() => {
//                            setTimeout(() => {
//                                this.$Logout();
//                                this.$MKOJump('/login');
//                            }, 1000)
//                        })
//                    }
//                });
            },
            clear() {
                this.$MKODialog({
                    msg:'确定清除缓存吗',
                    cancelBtn: true,
                }).then(action=>{
                    if (action == 'confirm') {
                        this.$MKOClearApp((result) => {
                            if (!result || result.length == 0) return;
                            Toast({
                                message: `共清理了${result}缓存`,
                                position: 'middle',
                                duration: 1000
                            });
                        })
                    }
                })
//                MessageBox.confirm('确定清除缓存吗', '提示').then(action => {
//                    if (action == 'confirm') {
//                        this.$MKOClearApp((result) => {
//                            if (!result || result.length == 0) return;
//                            Toast({
//                                message: `共清理了${result}缓存`,
//                                position: 'middle',
//                                duration: 1000
//                            });
//                        })
//                    }
//                });
            },
            back() {
                this.$MKOPop()
            },
            linkPath(path) {
                this.$MKOPush(path)
            }
        }
    }
</script>
