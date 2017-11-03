<template>
    <div id="reply">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" fixed title="回复详情">
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <div class="page-wrap reply-detail-wrap">
            <div class="reply-cell">
                <span class="left">{{replyItem.dwName}}</span>
                <span class="right">{{replyStatus(replyItem)}}</span>
            </div>
            <div class="reply-cell">
                <span class="left">回复人：</span>
                <span class="right">{{replyItem.replyName || '暂无'}}</span>
            </div>
            <div class="reply-cell">
                <span class="left">阅读时长：</span>
                <span class="right">{{replyItem.checkTime || '暂无'}}</span>
            </div>
            <div class="reply-content">
                <span class="title">回执内容：</span>
                <span class="content">{{replyItem.conment || '暂无'}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notData: false,
            replyItem: {}
        }
    },
    activated() {
        this.$nextTick(() => {
            this.replyItem = this.$route.query.replyItem
        })
    },
    methods: {
        back() {
            this.$MKOPop()
        },
        replyStatus(item) {
            if (item.isReply == 1) {
                return '已处理'
            } else {
                return '未处理'
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../config.less";
#reply {
    .reply-detail-wrap {
        background-color: #ffffff;
        .reply-cell {
            width: 100%;
            display: table;
            height: 44px;
            .border-btm(#E0E0E0);
            padding: 0 14px;
            span {
                line-height: 44px;
                vertical-align: middle;
                display:table-cell;
            }
            .left {
                width: 50%;
                font-size: 14px;
            }
            .right {
                width: 50%;
                text-align: right;
                font-size: 12px;
            }
        }
        .reply-content {
            width: 100%;
            padding: 0 14px;
            min-height: 100px;
            span {
                display: block;
            }
            .title {
                width: 100%;
                font-size: 14px;
                line-height: 44px;
                height: 44px;
            }
            .content {
                width: 100%;
                font-size: 12px;
            }
        }
    }
}
</style>

