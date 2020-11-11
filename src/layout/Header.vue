<template>
    <div class="page_head">
        <h1 @click="routerSkip">
            <img src="../assets/logo.png"/>
            <span>vue-admin</span>
        </h1>
        <div class="user">
            <el-popover
                placement="top-start"
                trigger="hover">
                <div style="text-align:center;cursor:pointer" @click="handleLogOut">退出登录</div>
                <span slot="reference"> 欢迎： {{ username }} </span>
            </el-popover>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            username: ''
        }
    },

    created () {
        this.username = this.user.name
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        routerSkip () {
            this.$router.push({
                path: '/'
            })
        },

        handleLogOut () {
            Cookies.set('token', '')
            this.$router.push({
                path: '/login'
            })
        },

        handleMenuClick (name) {
            if (name === 'modifyPassword') {
                this.$router.push({
                    name: 'modifyPassword'
                })
            }
            if (name === 'logout') {
                this.handleOut()
            }
        },

        handleOut () {
            this.LogOut()
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/layout/header.scss";
</style>
