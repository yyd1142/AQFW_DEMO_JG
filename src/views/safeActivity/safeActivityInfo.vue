<template>
    <div class="safe-activity-detail">
        <div class="placeholder-item"></div>
        <mko-header :title="$route.query.description" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <div class="sfa-title"> 
                <mko-cell title="类型" :val="projectName[$route.query.project]"></mko-cell>
            </div> 
            <div class="files-list" v-for="item in files">
                <mko-cell title="文件下载" :val="`${titleFilers(item.title)}.${item.type}`" @click="downloadFile(item)"></mko-cell>
                <mko-cell title="有效期" :val="formatDate(item.createTime)"></mko-cell>
            </div>
            <!-- <div class="activity-item">
                <mko-cell title="上传日期" :val="formatDate(fileItem.uploadDate)"></mko-cell>
            </div>
            <div class="zhidu-wrap">
                <mko-cell :title="`${titleFilers(item.title)}.${item.type}`" :val="formatDate(item.createTime)" v-for="item in files" @click="downloadFile(item)"></mko-cell>
            </div> -->
        </div>
        <photo-preview :img="photoItem.photo" v-model="showPhoto"></photo-preview>
    </div>
</template>

<script>
import api from 'api'
import apiconf from 'apiconf'
import { PhotoBox, PhotoPreview } from 'components'
import moment from 'moment';
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
            this.files = []
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
            this.$MKOJumpOutsideURL(`${apiconf.resourcesDomain}/${item.resouceId}`)
        },
        titleFilers(val) {
            let stringLength = val.length;
            if (stringLength >= 6) {
                val = `${val.substring(0, 6)}...`;
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
.safe-activity-detail {
    .page-wrap {
        .sfa-title {
            .mko-basic-cell>.cell:after {
                display: none;
            }
        }
        padding-top: 10px;
        .files-list {
            margin-top: 10px;
        }
    }
}
</style>
