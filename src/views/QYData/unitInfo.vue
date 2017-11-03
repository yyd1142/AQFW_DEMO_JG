<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" fixed title="单位信息">
      <div slot="left" @click="back">
        <mt-button class="header-item" icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="page-wrap qy-info-wrap">
      <div class="data-wrap">
        <mt-cell title="单位名称：" :value="zrdwItem.dwName || '暂无'"></mt-cell>
        <mt-cell title="联系人：" :value="zrdwItem.dwContact || '暂无'"></mt-cell>
        <mt-cell title="联系电话：" :value="zrdwItem.dwPhone || '暂无'"></mt-cell>
        <mt-cell title="合同签订日期：" :value="zrdwItem.contractDate||'未知'"></mt-cell>
        <mt-cell title="合同起止日期："
                 :value="(zrdwItem.contractStartDate+zrdwItem.contractEndDate)?(zrdwItem.contractStartDate||'未知') + '至' + (zrdwItem.contractEndDate||'未知'):'未知'"></mt-cell>
        <div v-for="item in files" @click="downloadFile(item)">
          <mt-cell title="点击下载" :label="item.filename"></mt-cell>
        </div>
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
