<template>
    <div>
        <el-menu
            background-color="green"
            text-color="pink"
            active-text-color="#3478E6"
            class="ud-menu"
            unique-opened
            @open="handleOpen"
            @close="handleClose"
        >
            <el-submenu
                v-for="(item, index) in menu"
                :key="index"
                :index="`f${index}`"
            >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                    v-for="(_item, _index) in item.children"
                    :key="_index"
                    :index="`${index}-${_index}`"
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
            menu: []
        }
    },

    created () {
        this.menu = permitMenu(this.roles)
        console.log(this.menu)
    },

    computed: {
        ...mapState('user', ['roles'])
    },

    methods: {
        routerSkip (name) {
            this.$router.push({
                name
            })
        },

        handleClose (key, keyPath) {
            console.log('close', key, keyPath)
        },

        handleOpen (key, keyPath) {
            console.log('open', key, keyPath)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/layout/navbar.scss';
</style>
