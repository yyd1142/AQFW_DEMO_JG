<template>
    <div class="message-index">
        <div class="placeholder-item"></div>
        <mko-header title="消息列表" left-icon="icon-back" @handleLeftClick="back" right-icon-text="刷新" @handleRightClick="refresh"></mko-header>
        <div class="page-wrap message-page-wrap" id="pageWrapper">
            <mko-cell :class="index == systemMessages.length - 1 ? 'no-border' : ''" v-for="item, index in systemMessages" :title="titleFilters(item)" @click="linkPath(item)" main="left" is-link>
                <div style="color: #666666">{{item.createTime | formatDate('YYYY-MM-DD')}}</div>
            </mko-cell>
            <mko-load-more @click="loadBottom" :no-load-more="noLoadMore" v-if="!notData"></mko-load-more>
        </div>
        <no-data class="not-data-wrap" v-if="notData"></no-data>
        <res-error v-if="resError"></res-error>
    </div>
</template>

<script src="./message.js">
</script>

<style lang="less">
@import "../../config.less";
.message-index {
    .message-page-wrap {
        padding-top: 10px;
        .mint-loadmore > .mint-loadmore-content > .no-border {
            .border-btm(#eeeeee);
            &::after {
                bottom: -1px;;
            }
            .cell{
                &:after {
                    display: none;
                    content: none;
                }
            }
        }
    }

    .is-not-read {
        background-color: @blueColor;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .not-read-title {
        padding-left: 20px;
    }
}
</style>
