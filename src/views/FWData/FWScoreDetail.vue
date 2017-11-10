<template>
    <div class="fw-score-detail">
        <div class="placeholder-item"></div>
        <mt-header class="header-wrap" :title="$route.query.time + '评分记录'" fixed>
            <mt-button class="header-item" icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <res-error v-if="resError"></res-error>
        <no-data v-if="noData"></no-data>
        <div class="page-wrap" v-show="!noData&&!resError">
            <ul class="table-view">
                <li class="table-cell" v-for="item in 5">
                    <div class="title">
                        <span class="number">任务编号：201921</span>
                        <span class="score">客户评分：74分</span>
                    </div>
                    <div class="qy-name">深圳大观信息科技有限公司</div>
                    <div class="zr-name">吴佳怡</div>
                    <div class="zx-name">杨子康,黄哄哄,德德</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../../config.less";

    .fw-score-detail {
        .table-view {
            width: 100%;
            .table-cell {
                width: 100%;
                background-color: #ffffff;
                height: 88px;
                .border-btm(@borderColor);
                .title {
                    width: 100%;
                    .number {
                        font-size: 14px;
                    }
                    .score {
                        font-size: 14px;
                    }
                }
                .qy-name {
                    width: 100%;
                }
                .zr-name {
                    font-size: 14px;
                }
                .zx-name {
                    font-size: 14px;
                }
            }
        }
    }
</style>

<script>
    import {NoData, ResError} from 'components'
    export default{
        data() {
            return {
                //提示
                resError: false,
                noData: false
            }
        },
        methods: {
            back() {
                this.$MKOPop();
            }
        },
        components: {
            NoData,
            ResError
        }
    }
</script>


