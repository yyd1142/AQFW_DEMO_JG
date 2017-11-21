<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header title="单位信息" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap qy-info-wrap">
            <div class="data-wrap">
                <mko-cell title="单位名称" :val="zrdwItem.dwName || '暂无'"></mko-cell>
                <mko-cell title="联系人" :val="zrdwItem.dwContact || '暂无'"></mko-cell>
                <mko-cell title="联系电话" :val="zrdwItem.dwPhone || '暂无'"></mko-cell>
                <mko-cell title="合同签订日期" :val="zrdwItem.contractDate||'未知'"></mko-cell>
                <mko-cell title="合同起止日期"
                         :val="(zrdwItem.contractStartDate+zrdwItem.contractEndDate)?(zrdwItem.contractStartDate||'未知') + '至' + (zrdwItem.contractEndDate||'未知'):'未知'"></mko-cell>
                <mko-double-cell title="点击下载" v-for="item in files" @click="downloadFile(item)" :label="item.filename"></mko-double-cell>
            </div>
        </div>
    </div>
</template>


<script>
    import moment from 'moment'
    import api from 'api'
    import apiconf from 'apiconf'
    import {Indicator} from 'mint-ui'
    var _id = '';
    export default {
        data() {
            return {
                notData: false,
                zrdwItem: {},
                files: []
            }
        },
        activated() {
            if (_id != this.$route.params.id) {
                this.getDWInfo()
            }
        },
        methods: {
            getDWInfo() {
                Indicator.open({spinnerType: 'fading-circle'});

                this.files = [];
                let params = {
                    id: this.$route.params.id
                };
                api.getZRUnitInfo(params).then(result => {
                    if (result.code === 0) {
                        let not_date = 'Invalid date';
                        this.zrdwItem = result.response;
                        this.zrdwItem.contractDate = moment(this.zrdwItem.contractDate).format("YYYY-MM-DD") == not_date ? '' : moment(this.zrdwItem.contractDate).format("YYYY-MM-DD");
                        this.zrdwItem.contractStartDate = moment(this.zrdwItem.contractStartDate).format("YYYY-MM-DD") == not_date ? '' : moment(this.zrdwItem.contractStartDate).format("YYYY-MM-DD");
                        this.zrdwItem.contractEndDate = moment(this.zrdwItem.contractEndDate).format("YYYY-MM-DD") == not_date ? '' : moment(this.zrdwItem.contractEndDate).format("YYYY-MM-DD");
                        if (result.response.attachmentID != null && result.response.attachmentID != '') {
                            this.getFiles(result.response.attachmentID)
                        }
                        _id = this.$route.params.id;
                    }
                    Indicator.close();
                });
            },
            getFiles(id) {
                api.getByPath(`/info/${id}`)({}).then(res => {
                    if (res && res.code != 0)
                        return;
                    if (res && res.response && res.response.length > 0) {
                        for (let i = 0; i < res.response.length; i++) {
                            let item = res.response[i]
                            this.files.push({
                                url: `${apiconf.resourcesDomain}/${item.resouceId}`,
                                filename: `${item.title}.${item.type}`
                            })
                        }

                    }
                });
            },
            downloadFile(item) {
                this.$MKOJumpOutsideURL(item.url)
            },
            back() {
                this.$MKOPop()
            }
        }
    }
</script>
