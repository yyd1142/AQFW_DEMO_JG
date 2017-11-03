<template>
  <div>
    <div class="photo-wrap">
      <div class="photo-table" id="photoWrapper">
        <div class="photo-cell" v-for="(url, index) in photoList" :id="'photoCell' + index" @click="show(url, index)">
          <span :style="{ background: 'url('+ url +') 0 0 no-repeat' }"></span>
        </div>
        <div class="photo-cell" v-if="(readOnly === undefined || !readOnly) && photoList.length < max" @click="upload()">
          <span class="btn"></span>
        </div>
      </div>
    </div>
    <div class="photo-preview">
      <mt-popup v-model="popupShow">
        <div class="photo">
          <img :src="photoItem.url" width="350" height="350">
        </div>
        <mt-button class="delete" @click="sheetShow=true" type="danger" size="large" v-if="!readOnly">删除</mt-button>
        <mt-button @click="downloadFile(photoItem.index)" type="primary" size="large" v-if="download">下载</mt-button>
      </mt-popup>
      <mt-actionsheet v-model="sheetShow" :actions="actions" cancelText="取消"></mt-actionsheet>
    </div>
  </div>
</template>

<script>
export default {
  props: ['photoList', 'max', 'readOnly', 'download'],
  data() {
    return {
      popupShow: false,
      sheetShow: false,
      photoItem: {
        url: '',
        index: ''
      },
      actions: [],
      imgHeight: null,
      imgWidth: null
    };
  },
  created() {
    this.actions = [{
      name: '确认删除',
      method: this.deletePhoto
    }];
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById('photoWrapper').style.height = this.photoList.length >= 4 ? `${document.getElementById('photoCell0').offsetHeight * 2}px` : `${document.getElementById('photoCell0').offsetHeight}px`
    })
  },
  deactivated() {
    window.mkoBackButton.bInputData = false;
    window.mkoBackButton.callback = null;
  },
  watch: {
    popupShow: function(val) {
      window.mkoBackButton.bInputData = val;
      if (!val) this.$emit("onPopup");
    }
  },
  methods: {
    upload() {
      this.$emit('addPhotoEvent');
    },
    show(url, index) {
      this.photoItem = {
        url: url,
        index: index
      };
      this.popupShow = true;
      this.onPopupShow();
    },
    deletePhoto() {
      this.$emit('removePhotoEvent', this.photoItem.index);
      this.popupShow = false;
    },
    onPopupShow() {
      let self = this;
      window.mkoBackButton = {};
      window.mkoBackButton.callback = function() {
        self.popupShow = false
      }
    },
    downloadFile(index) {
      this.$MKOJumpOutsideURL(this.photoList[index])
    }
  }
};
</script>

<style lang="less" sccoped>
@import "../../config.less";

.photo-wrap {
  .photo-table {
    width: 100%;
    .photo-cell {
      width: 100vw / 4;
      height: 100vw / 4;
      float: left;
      position: relative;
      span {
        position: absolute;
        top: 5px;
        bottom: 5px;
        left: 5px;
        right: 5px;
        margin: auto;
        background-size: cover !important;
        border-radius: 3px;
      }
      .btn {
        background: url('/static/icons/add_photo.png') 0 0 no-repeat;
        background-size: cover;
        border-radius: 3px;
      }
      .photo-btn {
        background: url('/static/icons/camera.png') 0 0 no-repeat;
        background-size: cover;
        border-radius: 3px;
      }
    }
  }
  background: #fff;
}

.photo-preview {
  .mint-popup {
    padding-top: 30px;
    background: none;
    .photo {
      img {
        border-radius: 4px;
      }
    }
    .cancel {
      position: absolute;
      right: 0;
      top: -10px;
      font-size: 36px;
      font-weight: 600;
      color: #fff;
    }
    .delete {
      margin-top: 20px;
    }
  }
  .v-modal {
    opacity: .8;
    background: #565656;
  }
}
</style>
