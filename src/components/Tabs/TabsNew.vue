<template>
    <div>
        <nav class="home-tabs-wrap">
            <div class="home-tab-item" :class="actived == item.name ? 'actived' : null" @click="tab(item, index)"
                 v-for="(item, index) in tabs">
                <i :class="actived == item.name ? item.iconAct : item.icon"></i>
                <span>{{item.text}}</span>
            </div>
        </nav>
    </div>
</template>

<style lang="less" scoped>
    @import "../../config.less";

    .home-tabs-wrap {
        width: 100%;
        position: fixed;
        bottom: -1px;
        z-index: 10;
        height: 50px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
        background: #fff;
        .home-tab-item {
            float: left;
            padding-top: 4px;
            width: 33.33%;
            height: 50px;
            text-align: center;
            font-size: 10px;
            color: #9ea6ab;
            &.actived {
                color: @mainBlue;
            }
            i {
                display: block;
                width: 30px;
                height: 30px;
                margin: 0 auto 1px auto;
            }
            span {
                width: 100%;
                text-align: center;
                float: left;
                font-size: 10px;
            }
        }
        //icon
        //首页底部tab
        .icon-tabs(@x, @y) {
            display: inline-block;
            background: url('/static/icons/5_1/transparent_icons.png') @x @y no-repeat;
            width: 30px;
            height: 30px;
            background-size: @bgSize;
        }
        .icon-tabs-home-0 {
            .icon-tabs(-30px, -714px);
        }

        .icon-tabs-home-1 {
            .icon-tabs(-30px, -744px);
        }

        .icon-tabs-task-0 {
            .icon-tabs(-60px, -714px);
        }

        .icon-tabs-task-1 {
            .icon-tabs(-60px, -744px);
        }

        .icon-tabs-dpm-0 {
            .icon-tabs(-90px, -714px);
        }

        .icon-tabs-dpm-1 {
            .icon-tabs(-90px, -744px);
        }

        .icon-tabs-staff-0 {
            .icon-tabs(-120px, -714px);
        }

        .icon-tabs-staff-1 {
            .icon-tabs(-120px, -744px);
        }

        .icon-tabs-my-0 {
            .icon-tabs(-150px, -714px);
        }

        .icon-tabs-my-1 {
            .icon-tabs(-150px, -744px);
        }
    }
</style>

<script>
    export default {
        props: ['actived'],
        data() {
            return {
                tabs: [{
                    text: '首页',
                    name: 'home',
                    actived: 'actived',
                    url: '/enter/home',
                    icon: 'icon-tabs-home-0',
                    iconAct: 'icon-tabs-home-1'
                }, {
                    text: '部门',
                    name: 'mail',
                    actived: '',
                    url: '/enter/mail_list',
                    icon: 'icon-tabs-dpm-0',
                    iconAct: 'icon-tabs-dpm-1'
                }, {
                    text: '我的',
                    name: 'my',
                    actived: '',
                    url: '/enter/my',
                    icon: 'icon-tabs-my-0',
                    iconAct: 'icon-tabs-my-1'
                }]
            }
        },
        methods: {
            tab(item, index) {
                this.$MKOJump(item.url);
            }
        }
    }
</script>
