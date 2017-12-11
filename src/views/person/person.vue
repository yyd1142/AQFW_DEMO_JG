<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="我的"></mko-header>
        <div class="page-wrap person-page-wrap">
            <div ref="wrapper">
                <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange"
                             :auto-fill="autoFill">
                    <div :style="{ height: wrapperHeight - 100 + 'px'}">
                        <div class="cell-wrap">
                            <mko-double-cell :title="`${personData.name || 'null'}（${JgRoleType(personData.role)}）`"
                                             :label="personData.dwName || ''" is-link @click="go('/person_data')">
                                <div class="avatar-wrap" slot="icon">
                                    <div class="default"></div>
                                    <!--<img class="avatar" slot="icon" src="./logo.png">-->
                                </div>
                            </mko-double-cell>
                        </div>
                        <div class="cell-wrap">
                            <mko-cell title="消息" icon="sign sign-msg" is-link @click="go('/message')"></mko-cell>
                            <mko-cell title="设置" icon="sign sign-conf" is-link @click="go('/config')"></mko-cell>
                        </div>
                    </div>
                </mt-loadmore>
            </div>
        </div>
        <tabs actived="my"></tabs>
        <res-error v-if="resError"></res-error>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .person-page-wrap {
        .avatar-wrap {
            width: 44px;
            height: 44px;
            /*margin-right: 12px;*/
            .default {
                height: 100%;
                background: url(/static/icons/resource.png) -654px*0.7666 0 no-repeat;
                background-size: 892px*0.7666 auto;
            }
            .avatar {
                width: 100%;
            }
        }
        .sign {
            padding: 11px;
            font-size: 0;
            &.sign-msg {
                background: url(/static/icons/resource.png) -654px -60px no-repeat;
                background-size: @bg-size;
            }
            &.sign-conf {
                background: url(/static/icons/resource.png) -676px -60px no-repeat;
                background-size: @bg-size;
            }
        }
        .cell-wrap {
            margin-top: 10px;
        }
    }
</style>

<script>
    import api from 'api';
    import { ResError, Tabs } from 'components';
    import { JgRoleType } from 'filters';
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
                personData: {}
            }
        },
        activated() {
            this.$nextTick(() => {
                this.getLocalData();
                this.wrapperHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight) - this.$refs.wrapper.getBoundingClientRect().top;
            });
        },
        methods: {
            JgRoleType,
            getLocalData() {
                let local = localStorage['USER_DATA'];
                if (local && local.length > 0) {
                    try {
                        this.personData = JSON.parse(local);
                    } catch (err) {
                        console.log(err.name + '：' + err.message);
                        return;
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
                    if (!res) {
                        //            this.resError = true;
                        return;
                    }
                    try {
                        window.localStorage.setItem('USER_DATA', JSON.stringify(res.response));
                    } catch (err) {
                        console.log(err.name + '：' + err.message);
                        return;
                    }
                    this.personData = res.response;
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
            go(path) {
                if (this.topStatus != 'loading')
                    this.$MKOPush(path);
            }
        },
        components: {
            ResError, Tabs
        }
    }

</script>
