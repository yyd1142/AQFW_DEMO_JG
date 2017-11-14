<template>
    <div>
      <div class="placeholder-item"></div>     <mt-header class="header-wrap" title="数据统计" fixed>
        <router-link to="/enter/home" slot="left">
          <mt-button class="header-item" icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="page-wrap data-count-list-wrap">
        <div class="data-wrap">
          <mt-cell title="安全评分统计" to="/count_score" is-link></mt-cell>
          <mt-cell title="任务统计" to="/count_tasks" is-link></mt-cell>
        </div>
      </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
  .data-count-list-wrap{

  }
</style>

<script>
    export default{
        data() {
            return {}
        },
        mounted() {

        },
        methods: {},
        components: {}
    }
</script>


