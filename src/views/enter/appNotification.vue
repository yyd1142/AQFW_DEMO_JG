<template>
    <div id="appNotification">
    </div>
</template>

<script>
var fromPath = '/enter/home'
var notificationParams = {};
export default {
    activated() {
        let userData = localStorage.getItem('USER_DATA');
        notificationParams = this.$route.query.params;
        if (userData && userData.length > 0) {
            this.messageTypeFilter(notificationParams)
        } else {
            this.$MKOJump('/login');
        }
    },
    methods: {
        linkPath(routeOption) {
            this.$MKOPush(routeOption, fromPath, true);
        },
        messageTypeFilter(val) {
            if (val.name == '') {
                this.$MKOJump(fromPath)
                return false
            }
            if (val.name == 'yhk') {
                this.linkPath({ path: `/hidden_danger_info/${val.id}` })
            } else if (val.name == 'notice') {
                this.$MKOPush({
                    name: 'noticeReplyList',
                    params: {
                        pid: val.noticeId
                    }
                })
            } else {
                this.$MKOJump(fromPath)
            }
        }
    }

}
</script>

