<template>
  <div class="star" :class="starType">
    <span  v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import "../../config.less";

  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
      background-size: @bg-size;
      background-image: url('/static/icons/resource.png');
      &:last-child {
        margin-right: 0;
      }
    }
    &.star-normal {
      .star-item {
        width: 14px;
        height: 13px;
        margin-right: 5px;
        &.on {
          background-position: -822px -94px;
        }
        &.half {
          background-position: -836px -94px;
        }
        &.off {
          background-position: -836px -94px;
        }
      }
    }
    &.star-square {
      .star-item {
        width: 14px;
        height: 14px;
        margin-right: 2px;
        &.on {
          background-position: -822px -80px;
        }
        &.half {
          background-position: -836px -80px;
        }
        &.off {
          background-position: -850px -80px;
        }
      }
    }
  }
</style>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props: ['type', 'score'],
    computed: {
      starType() {
        return 'star-' + this.type;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasHalf = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasHalf) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }

</script>


