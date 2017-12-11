<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="消防安全管理得分" left-icon="icon-back" @handleLeftClick="$MKOPop()"></mko-header>
        <res-error v-if="resError"></res-error>
        <div class="page-wrap score-list-page-wrap" v-show="!resError">
            <mko-nav-bar>
                <mko-tab-item :label="item.text" :activied="item.actived" @handleTabClick="tab(item, index)" v-for="(item, index) in qyLevelList"></mko-tab-item>
            </mko-nav-bar>
            <div class="data-wrap">
                <mko-cell :title="item.dwName" :val="`${item.dwSafeScore}分`" v-for="item in qyLevelList[tabIndex].list" @click="go(`/score/${item.groupId}?name=${item.dwName}`)" main="left" is-link></mko-cell>
                <no-data v-if="qyLevelList[tabIndex].list.length == 0"></no-data>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api'
    import {NoData, ResError} from 'components';
    import {Indicator} from 'mint-ui';
    export default {
        data() {
            return {
                selected: '1',
                resError: false,
                qyList: [],
                qyLevelList: [
                    {text: '优秀', id: '1', list: [], actived: ''},
                    {text: '良好', id: '2', list: [], actived: ''},
                    {text: '中等', id: '3', list: [], actived: ''},
                    {text: '较低', id: '4', list: [], actived: ''},
                    {text: '极低', id: '5', list: [], actived: ''}
                ],
                tabIndex: 0
            }
        },
        watch: {
            selected: function (val) {
                let from = {
                    path: '/enter/home'
                }
                let path = `/score_list?type=${val}`
                if (this.$route.query.groupId && this.$route.query.from) {
                    path = `/score_list?type=${val}&groupId=${this.$route.query.groupId}&from=${this.$route.query.from}`;
                    from = {
                        path: this.$route.query.from
                    }
                }
                this.$MKOPush(path, from, true)
            }
        },
        created() {

        },
        mounted() {

        },
        activated() {
            this.$nextTick(() => {
                this.getData();
                this.selected = this.$route.query.type || '1';
                for(let index in this.qyLevelList) {
                    if(parseInt(this.selected) - 1 == index) {
                        this.tabIndex = index;
                        this.qyLevelList[index].actived = 'actived';
                    } else {
                        this.qyLevelList[index].actived = '';
                    }
                }
            });
        },
        methods: {
            getData() {
                Indicator.open({spinnerType: 'fading-circle'});
                let groupId = this.$store.getters.groupId;
                if (this.$route.query.groupId) groupId = this.$route.query.groupId;
                let params = {
                    groupId: groupId
                };
                api.getAllScoreList(params).then(res => {
                    if (!res) {
                        Indicator.close();
                        this.resError = true;
                        return;
                    }
                    if (res.code == 0) {
                        this.qyList = res.response;
                        this.calcScoreLevel(res.response);
                    }
                    Indicator.close();
                });
            },
            calcScoreLevel(datas) {
                if (datas.length <= 0)
                    return;

                let allList = this.qyLevelList;
                allList.forEach(item => {
                    item.list.length = 0;
                });
                datas.forEach(item => {
                    let val = item.dwSafeScore;
                    if (val) {
                        if (val >= 90) {
                            allList[0].list.push(item);
                        } else if (val >= 80) {
                            allList[1].list.push(item);
                        } else if (val >= 70) {
                            allList[2].list.push(item);
                        } else if (val >= 60) {
                            allList[3].list.push(item);
                        } else {
                            allList[4].list.push(item);
                        }
                    }
                });
                allList.forEach((item, index) => {
                    allList[index].list = this.scoreSort(item.list);
                });
            },
            scoreSort(arr) {
                let CALLBACK = function (a, b) {
                    return b.dwSafeScore - a.dwSafeScore;
                };
                return arr.sort(CALLBACK);
            },
            go(path) {
                this.$MKOPush(path);
            },
            tab(item, index) {
                this.tabIndex = index;
                this.selected = item.id;
                for(let index in this.qyLevelList) {
                    if(parseInt(this.selected) - 1 == index) {
                        this.tabIndex = index;
                        this.qyLevelList[index].actived = 'actived';
                    } else {
                        this.qyLevelList[index].actived = '';
                    }
                }
                this.$MKOPush(`/score_list?type=${item.id}`);
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>

<style lang="less">
    @import "../../config.less";

    .score-list-page-wrap {
        .mint-navbar {
            margin-bottom: 14px;
            .mint-tab-item {
                font-size: 14px;
                padding: 14px 0;
                &.is-selected {
                    border-bottom: 0;
                    .mint-tab-item-label {
                        position: relative;
                        &:after {
                            content: '';
                            display: block;
                            width: 30px;
                            border-bottom: 2px solid #26a2ff;
                            position: absolute;
                            left: 50%;
                            bottom: -6px;
                            transform: translate(-50%, 0);
                            -webkit-transform: translate(-50%, 0);
                        }
                    }
                }
            }
        }
        .data-wrap {
            margin-bottom: 14px;
            .mint-cell {
                min-height: 44px;
                .mint-cell-wrapper {
                    padding: @cellPadding;
                    font-size: 14px;
                    letter-spacing: 0;
                    color: #232323;
                    .mint-cell-value.is-link {
                        margin-right: 15px;
                    }
                    .mint-cell-title {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
