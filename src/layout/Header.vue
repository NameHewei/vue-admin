<template>
    <div class="page_head">
        <div class="menu_fold_icon">
            <span>
                <i @click="handleMenuFold" :class="menuCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </span>
        </div>
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
import { mapState, mapActions } from 'vuex'

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
        ...mapState(['user', 'menuCollapse'])
    },

    methods: {
        ...mapActions(['actionToggleMenu']),

        /* 处理菜单的折叠 */
        handleMenuFold () {
            this.actionToggleMenu()
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
@import "@/styles/layout/layout.scss";
</style>
