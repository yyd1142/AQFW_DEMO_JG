<template>
    <div class="home-index" >
        <div class="placeholder-item" :style="{backgroundColor:'#0056ff'}"></div>
        <mko-header title="安全服务云" background-color="#0056ff">
            <div class="header-right" slot="custom">
                <span class="more-message-count" v-if="hasMessageDataClass"></span>
                <i class="icon-message" @click="routerLink({url:'/message'})"></i>
            </div>
        </mko-header>
        <div class="page-wrap home-wrap" ref="wrapper" id="pageWrapper">
            <!--安全得分-->
            <score-banner-new-jg :title="jgName" :score="score" :datas="scoreDatas" @refresh="getBannerData"></score-banner-new-jg>
            <!--管功能区-->
            <div class="actions-wrap">
                <div class="table-wrap clear" v-for="table in actions">
                    <div class="cell"  v-for="item in table" @click="routerLink(item)">
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
