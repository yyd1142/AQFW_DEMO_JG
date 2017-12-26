<template>
    <div class="home-index" style="margin-bottom: 64px;">
        <div class="placeholder-item" :style="{backgroundColor:'#0056ff'}"></div>
        <mko-header title="安全服务云" background-color="#0056ff">
            <div class="header-right" slot="custom">
                <span class="more-message-count" v-if="hasMessageDataClass"></span>
                <i class="icon-message" @click="routerLink({url:'/message'})"></i>
            </div>
        </mko-header>
        <div class="page-wrap home-wrap" ref="wrapper" id="pageWrapper">
            <!--安全得分-->
            <score-banner-jg :title="jgName" :score="score" :datas="scoreDatas"></score-banner-jg>
            <!--管功能区-->
            <div class="actions-wrap">
                <div class="table-wrap">
                    <div class="cell" v-for="item in actions" @click="routerLink(item)">
                        <i class="icon" :class="item.class"></i>
                        <div class="title" v-text="item.text"></div>
                    </div>
                </div>
            </div>
        </div>
        <tabs actived="home"></tabs>
        <!--<res-error v-if="resError"></res-error>-->
    </div>
</template>

<script src="./home.js"></script>
<style lang="less" src="./home.less"></style>
