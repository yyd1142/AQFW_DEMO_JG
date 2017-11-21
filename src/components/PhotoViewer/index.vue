<template>
    <div class="photo-viewer">
        <div class="placeholder-item"></div>
        <mko-header :title="$route.query.title" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap">
            <img :src="$route.query.url" v-if="!isArray"/>
            <ul class="photo-list" v-else>
                <li class="cell" v-for="item in $route.query.url"><img :src="item"/></li>
            </ul>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .photo-viewer {
        img {
            width: 100%;
        }
        .photo-list {
            .cell {
                margin-bottom: 14px;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>

<script>
    export default{
        methods: {
            back(){
                this.$MKOPop();
            }
        },
        computed: {
            isArray() {
                if(Array.isArray(this.$route.url)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>


