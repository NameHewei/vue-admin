<template>
    <div>
        <el-menu
            background-color="green"
            text-color="pink"
            active-text-color="#3478E6"
            class="ud-menu"
            unique-opened
            :default-openeds="open"
            :default-active="active"
            @select="handleSelect"
        >
            <el-submenu
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
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { permitMenu } from '@/router/router'

export default {
    data () {
        return {
            menu: [],
            open: []
        }
    },

    created () {
        this.menu = permitMenu(this.roles)
    },

    computed: {
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
@import '@/styles/layout/navbar.scss';
</style>
