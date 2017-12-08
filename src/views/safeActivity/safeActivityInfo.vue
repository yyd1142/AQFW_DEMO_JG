<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="projectName[fileItem.project]" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap safe-aty-info">
            <div class="activity-item">
                <mko-cell title="上传日期" :val="formatDate(fileItem.uploadDate)"></mko-cell>
            </div>
            <div class="zhidu-wrap">
                <mko-cell :title="`${titleFilers(item.title)}.${item.type}`" :val="formatDate(item.createTime)" v-for="item in files" @click="downloadFile(item)"></mko-cell>
            </div>
        </div>
        <photo-preview :img="photoItem.photo" v-model="showPhoto"></photo-preview>
    </div>
</template>

<script>
    import api from 'api'
    import apiconf from 'apiconf'
    import {PhotoBox, PhotoPreview} from 'components'
    import moment from 'moment'

    export default {
        data() {
            return {
                projectName: ['', '消防安全制度', '消防队管理（专职、义务）', '消防工作计划', '消防工作例会', '消防安全宣传教育与培训', '灭火、应急疏散预案', '演练'],
                fileItem: {},
                files: [],
                photoItem: "",
                showPhoto: false
            }
        },
        activated() {
            this.showPhoto = false;
            if (sessionStorage.getItem('SAFEACTIVITY_DATA')) {
                this.files = [];
                this.fileItem = JSON.parse(sessionStorage.getItem('SAFEACTIVITY_DATA'));
                api.getResourcesInfo(this.fileItem.projectFileID).then(result => {
                    if (!result) return false;
                    if (result.code == 0) {
                        this.files = result.response.map(item => {
                            let t = item.type.toLowerCase();
                            if (t == 'jpg' || t == 'jpeg' || t == 'bmp' || t == 'png') {
                                item.photo = `${apiconf.resourcesDomain}/${item.resouceId}`;
                            }
                            return item;
                        });

                    } else {
                        this.hasData = false;
                    }
                })
            } else {
                this.$MKOPop();
            }
        },
        methods: {
            back() {
                this.$MKOPop()
            },
            downloadFile(item) {
                if (item.photo) {
                    this.photoItem = item;
                    this.showPhoto = true;
                    return;
                }
                this.$MKOJumpOutsideURL(`${apiconf.resourcesDomain}/${item.resouceId}`)
            },
            titleFilers(val) {
                let stringLength = val.length;
                if (stringLength >= 10) {
                    val = `${val.substring(0, 10)}...`;
                }
                return val;
            },
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD HH:mm');
            }
        },
        components: {
            PhotoBox, PhotoPreview
        }
    }
</script>

<style lang="less">
    @import "../../config.less";
.activity-item {
    width: 100%;
    background-color: #ffffff;
    height: 44px;
    margin-top: 10px; 
}

.zhidu-wrap {
    margin: 10px 0 0 0;
}
</style>
