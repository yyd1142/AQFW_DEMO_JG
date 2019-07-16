<template>
    <div class="train-default-list">
        <div class="placeholder-item"></div>
        <mko-header 
            title="教育培训" 
            left-icon="icon-back" 
            leftIconText="关闭" 
            @handleLeftClick="back"
            @handlePressIconText="close">
        </mko-header>
        <div class="page-wrap train-wrap">
            <iframe 
                id="iframe1" 
                frameborder="no" 
                :src="url" 
                width="100%" 
                height="100%">
            </iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '',
            }
        },
        activated() {
            this.init();
            this.onInputData();
        },
        methods: {
            onInputData() {
                let that = this;
                window.mkoBackButton = {};
                window.mkoBackButton.bInputData = true;
                window.mkoBackButton.callback = function () {
                    window.mkoBackButton.bInputData = false;
                    that.$destroy();
                    that.back();
                }
            },
            init() {
                const yksCode = `7ada5da83f8673ed5c84746417826912`
                const { userName } = this.$store.getters.userInfo;
                const password = `123456`;
                this.url = `https://www.youkaoshi.cn/index.php?option=com_exams&task=api.newStudentSSO&format=raw&code=${yksCode}&loginValue=${userName}&password=${password}`
            },
            back() {
                window.history.back();   
            },
            close() {
                this.$MKOPop();
            }
        },
    }
</script>

<style lang="less">
@import url('../../config.less');
    .train-default-list {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        height: 100vh;
        .train-wrap {
            -webkit-overflow-scrolling: touch;
            overflow-y: scroll;
            display: flex;
            display: -webkit-flex;
            flex: 1;
            width: 100%;
            height: 100%;
            padding-bottom: 44px + @headerTop;
        }
    }
</style>
