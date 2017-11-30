<template>
    <div>
        <div class="placeholder-item"></div>
        <mko-header :title="dwItem.name" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap qy-info-wrap">
            <mko-cell v-for="item in dwItem.datas" :title="item.dwName" main="left" is-link @click="linkPath(item)"></mko-cell>
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
