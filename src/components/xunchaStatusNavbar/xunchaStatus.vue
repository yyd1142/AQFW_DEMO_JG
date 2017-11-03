<template>
  <div style="min-height: 50px">
    <nav class="status-bav-wrap">
      <div class="item">
        <span class="name">黄队长</span><br>
        <span class="date">1月18日17:00-1月18日17:30</span>
      </div>
      <div class="status-image">
        <span>待审核</span>
        <i class="icon iconfont icon-prompt"></i>
      </div>
    </nav>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scope>
  .status-bav-wrap {
    width: 100%;
    position: fixed;
    top: 40px;
    height: 50px;
    background-color: #7CCE2D;
    z-index: 10;
    .item {
      width: auto;
      color: #ffffff;
      float: left;
      height: 50px;
      line-height: 22px;
      padding-left: 14px;
      .name {
        font-size: 14px;
      }
      .date {
        font-size: 12px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
    }
  }
  
  .status-image {
    width: 100px;
    height: 50px;
    float: right;
    background-color: #80D92A;
    color: #fff;
    line-height: 50px;
    text-align: center;
    span {
      font-size: 18px;
    }
    i {
      font-size: 20px;
    }
  }
  
  .weikaishi-bg {
    background-color: #ADBAC1;
    .button-weikaishi {
      background-color: #B4C1CA;
    }
  }
  
  .blue-bg {
    background-color: #A613C1;
    .button-blue {
      background-color: #B431CA;
    }
  }
  
  .black-bg {
    background-color: #AEB3C1;
    .button-black {
      background-color: #B431CA;
    }
  }
  
  .chaoqi-bg {
    background-color: #ffffff;
    .button-chaoqi {
      background-color: #AA31CA;
    }
  }
</style>

<script>
  import { xunchaStatusColor } from 'filters';
  export default {
    props: ['statusName', 'status'],
    data() {
      return {
        statusBgColor: {
          mainBgColor: '', buttonBgColor: ''
        }
      }
    },
    mounted() {
      let status = this.status;
      console.log(status)
      let colors = {};
      if (status == 0) {
        colors = {
          mainBgColor: 'weikaishi-bg', buttonBgColor: 'button-weikaishi'
        }
      } else if (status == 1) {
        colors = {
          mainBgColor: 'blue-bg', buttonBgColor: 'button-blue'
        }
      } else if (status == 2) {
        colors = {
          mainBgColor: 'black-bg', buttonBgColor: 'button-black'
        }
      } else if (status == 3) {
        colors = {
          mainBgColor: 'chaoqi-bg', buttonBgColor: 'button-chaoqi'
        }
      }
      this.statusBgColor = colors;
    }
  }

</script>