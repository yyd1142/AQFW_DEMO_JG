<template>
    <div class="photo-viewer">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="$route.query.title" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <div class="page-wrap">
            <img :src="$route.query.url" />
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .photo-viewer {
        img {
            width: 100%;
        }
    }
</style>

<script>
    export default{
        methods: {
            back(){
                this.$MKOPop();
            }
        }
    }
</script>


