<template>
    <div class="train-default-list">
        <div class="placeholder-item"></div>
        <mko-header title="教育培训" left-icon="icon-back" @handleLeftClick="back"></mko-header>
        <div class="page-wrap train-wrap">
            <iframe class="html" frameborder="no" :src="url" width="100%" :height="height + 'px'"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '',
                height: 100
            }
        },
        activated() {
            this.$nextTick(() => {
                this.height = document.documentElement.clientHeight - 44;
            })
            this.init();
        },
        methods: {
            init() {
                const yksCode = `7ada5da83f8673ed5c84746417826912`
                const { userName } = this.$store.getters.userInfo;
                const password = `123456`;
                this.url = `https://www.youkaoshi.cn/index.php?option=com_exams&task=api.newStudentSSO&format=raw&code=${yksCode}&loginValue=${userName}&password=${password}`
            },
            back() {
                this.$MKOPop()
            },
        },
    }
</script>

<style lang="less">
    .train-default-list {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex: 1;
        .train-wrap {
            .html {
                .contentpane {
                    .stu-dashboard-head {
                        display: none;
                    }
                }
            }
        }
    }
</style>
