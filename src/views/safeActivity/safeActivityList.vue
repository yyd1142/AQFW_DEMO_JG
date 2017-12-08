<template>
    <div class="safe-activity-list">
        <div class="placeholder-item"></div>
        <mko-header title="安全活动" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap safe-aty-list">
            <mko-double-cell :title="item.description" :label="projectName[item.project]" :is-link="isLink(item.status)" v-for="(item, index) in files" v-if="index != 0" @click="goSafeActivity(item)">
                <div>
                    <span :style="{ color: valColor(item.status) }">{{item.status}}</span>
                </div>
            </mko-double-cell>
        </div>
    </div>
</template>

<script>
    import api from "api"
    import {formatDate} from 'filters'
    import {Indicator, Toast} from 'mint-ui'
    var _groupId = '';
    export default {
        data() {
            return {
                projectName: ['', '消防安全制度', '消防队管理（专职、义务）', '消防工作计划', '消防工作例会', '消防安全宣传教育与培训', '灭火、应急疏散预案', '演练'],
                files: [],
                loading: true,
                notData: false
            }
        },
        created() {
            for (let i = 0; i < 8; i++) {
                this.files.push({
                    "id": null,
                    "groupId": null,
                    "project": i,
                    "description": "暂无",
                    "startDate": null,
                    "stopDate": null,
                    "uploadDate": null,
                    "projectFileID": "暂无",
                    "status": '未开展',
                    "badgeBG": "yellow"
                })
            }
        },
        activated() {
            this.$nextTick(() => {
                if (_groupId != this.$route.params.id) {
                    this.safeActivity();
                }
            })
        },
        methods: {
            safeActivity() {
                let today = new Date();
                let params = {
                    groupId: this.$route.params.id
                };
                api.getXFSafetyFilesList(params).then(result => {
                    if (result.code == 0) {
                        let datas = result.response;
                        if (datas.length > 0) {
                            this.files.forEach((i) => {
                                datas.forEach((j) => {
                                    if (today < new Date(j.startDate)) {
                                        j.status = '未开展';
                                        j.badgeBG = "yellow"
                                    } else if (today >= new Date(j.startDate) && today <= new Date(j.stopDate)) {
                                        j.status = '已开展';
                                        j.badgeBG = "green"
                                    } else if (today > new Date(j.stopDate)) {
                                        j.status = '已超期';
                                        j.badgeBG = "red"
                                    }
                                    if (i.project == j.project) {
                                        this.files.splice(this.files.indexOf(i), 1, j)
                                    }
                                })
                            })
                        }
                        _groupId = this.$route.params.id
                    }
                    Indicator.close();
                })
            },
            goSafeActivity(item) {
                if (item.status == '已超期') {
                    Toast({
                        message: '此项安全活动已超期',
                        position: 'middle',
                        duration: 1500
                    });
                    return false;
                }
                if (item.status == '未开展') {
                    Toast({
                        message: '暂未开展此项安全活动',
                        position: 'middle',
                        duration: 1500
                    });
                    return false;
                }
                sessionStorage.setItem('SAFEACTIVITY_DATA', JSON.stringify(item));
                this.$MKOPush(`/safe_activity_info/${item.id}`)
            },
            refresh() {
                Indicator.open({spinnerType: 'fading-circle'});
                setTimeout(() => {
                    let files = []
                    for (let i = 0; i < 8; i++) {
                        files.push({
                            "id": null,
                            "groupId": null,
                            "project": i,
                            "description": "暂无",
                            "startDate": null,
                            "stopDate": null,
                            "uploadDate": null,
                            "projectFileID": "暂无",
                            "status": '未开展',
                            "badgeBG": "yellow"
                        })
                    }
                    this.files = files;
                    this.safeActivity()
                    Toast({
                        message: '刷新完成',
                        position: 'middle',
                        duration: 1500
                    });
                }, 1500)
            },
            back() {
                this.$MKOPop()
            },
            isLink(status) {
                if (status == '已超期' || status == '未开展') {
                    return false;
                } else {
                    return true;
                }
            },
            valColor(status) {
                if (status == '已超期' || status == '未开展') {
                    return '#333333';
                } else {
                    return '#666666';
                }
            }
        },
        components: {}
    }
</script>

<style lang="less">
    @import "../../config.less";
    .safe-activity-list {
        .page-wrap {
            padding-top: 10px;
        }
    }
</style>
