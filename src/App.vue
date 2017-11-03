<template>
  <div class="main-page-wrap">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import * as types from './store/mutation-types'
import api from 'api'
export default {
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    let userData = localStorage.getItem('USER_DATA');
    if (userData && userData.length > 0) {
      userData = JSON.parse(userData);
      this.$store.commit(types.USER_INIT_DATA, userData);
    } else {
      this.$MKOJump('/login');
    }
    // this.getAppState()
  },
  methods: {
    //获取APP状态
    getAppState() {
      api.getAppState().then(result => {
        if (!result) return false;
        if (result.code == 0) {
          if (result.response.status == 1) {
            this.$MKOJump({
              path: '/login',
              query: {
                appState: 1,
                time: '2017-05-10'
              }
            });
          }
        } else {

        }
      })
    }
  }
}

</script>
<style lang="less" src="./app.less"></style>
