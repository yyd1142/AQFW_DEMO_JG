<template>
  <div>
    <div class="placeholder-item"></div>
    <mt-header class="header-wrap" fixed :title="dwItem.name">
      <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="page-wrap qy-info-wrap">
      <div class="data-wrap">
        <div  v-for="item in dwItem.datas" @click="linkPath(item)">
          <mt-cell :title="item.dwName"></mt-cell>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        dwItem: {}
      }
    },
    activated() {
      let key = 'unitDatas' + this.$route.params.id;
      if (sessionStorage.getItem(key)) {
        let data = [];
        try {
          data = JSON.parse(sessionStorage.getItem(key))
        } catch (err) {
        }

        this.dwItem = data[this.$route.query.dwType];
      }
    },
    methods: {
      linkPath(item) {
        this.$MKOPush(`/unit_info/${item.id}`)
      },
      back() {
        this.$MKOPop()
      }
    }
  }
</script>
