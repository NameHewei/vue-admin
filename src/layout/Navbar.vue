<template>
    <div class="layout_nav_sidebar">
        <h1 @click="goIndex">
            <img src="../assets/logo.png"/>
            <span v-show="!menuCollapse">vue-admin</span>
        </h1>
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#059974"
            class="ud-menu"
            unique-opened
            :collapse-transition="false"
            :collapse="menuCollapse"
            :default-openeds="open"
            :default-active="active"
            @select="handleSelect"
        >
            <Menu :menuTree="menu"/>
        </el-menu>
    </div>
</template>

<script>
import Menu from './menu'
import { mapState } from 'vuex'
import { permitMenu } from '@/router/router'

export default {
    name: 'Navbar',
    components: {
        Menu
    },

    data () {
        return {
            menu: [],
            open: [],
        }
    },

    created () {
        this.menu = permitMenu(this.roles)
    },

    computed: {
        ...mapState(['menuCollapse']),
        ...mapState('user', ['roles']),

        active () {
            const r = this.$route
            const { name } = r
            this.initOpen()
            return name
        }
    },

    methods: {
        initOpen () {
            const { path } = this.$route
            const openPath = path === '/' ? [] : path.slice(1).split('/')
            this.open = openPath
        },

        goIndex () {
            this.$router.push({
                path: '/'
            })
        },

        routerSkip (name) {
            this.$router.push({
                name
            })
        },

        handleSelect (val, select) {
            this.open = select
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
