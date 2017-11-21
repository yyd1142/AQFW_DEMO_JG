<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="设置" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap config-page-wrap">
            <div class="cell-wrap">
                <div @click="linkPath('/config/pwd')">
                    <mt-cell title="修改密码" is-link></mt-cell>
                </div>
                <!--<mt-cell title="意见反馈"></mt-cell>-->
                <!--<mt-cell title="用户指南"></mt-cell>-->
                <!--<mt-cell title="服务协议"></mt-cell>-->
                <mt-cell :title="'检测新版本（' + version + '）'"></mt-cell>
                <!--<div class="config-cell-wrap" @click="linkPath('/cacheDebug')">
                        <mt-cell title="查看缓存"></mt-cell>
                      </div>-->
                <!--<div class="config-cell-wrap" @click="clear()">
                  <mt-cell title="清除缓存"></mt-cell>
                </div>-->
            </div>
            <div class="config-cell-wrap center" @click="exit()">
                <mt-cell class="exit" title="退出"></mt-cell>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .config-page-wrap {
        .mint-cell {
            min-height: 44px;
            height: 44px;
            font-size: 14px;
            .mint-cell-wrapper {
                font-size: 14px;
            }
        }
        .cell-wrap {
            margin-bottom: 15px;
            box-shadow: @baseShadow;
            .mint-cell-wrapper {
                padding: @cellPadding;
            }
        }
    }

    .config-cell-wrap {
        width: 100%;
        &.center {
            text-align: center;
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
                MessageBox.confirm('确定退出该帐号吗', '提示').then(action => {
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
            },
            clear() {
                MessageBox.confirm('确定清除缓存吗', '提示').then(action => {
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
                });
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
