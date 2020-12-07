<template>
    <div class="layout_nav_sidebar">
        <h1 @click="goIndex">
            <img src="../assets/logo.png"/>
            <span v-show="!menuCollapse">vue-admin</span>
        </h1>
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#fff"
            class="ud-menu"
            unique-opened
            :collapse-transition="false"
            :collapse="menuCollapse"
            :default-openeds="open"
            :default-active="active"
            @select="handleSelect"
        >

            <Menu :menuTree="menu"/>
            <!-- <el-submenu
                v-for="(item, index) in menu"
                :key="index"
                :index="item.name"
            >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                    v-for="(_item, _index) in item.children"
                    :key="_index"
                    :index="_item.name"
                    @click="routerSkip(_item.name)"
                >
                    {{ _item.title }}
                </el-menu-item>
            </el-submenu> -->
        </el-menu>
    </div>
</template>

<script>
import Menu from './menu'
import { mapState } from 'vuex'
import { permitMenu } from '@/router/router'

export default {
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
        // console.log(this.menu)
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
            const rp = this.$route.path
            const openPath = rp === '/' ? [] : rp.slice(1).split('/')
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
