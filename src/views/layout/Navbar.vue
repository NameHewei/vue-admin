<template>
    <div>
        <el-menu
            default-active="2"
            background-color="rgba(250,250,250,.3)"
            text-color="#fff"
            active-text-color="#fff"
            class="ud-menu"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-submenu
                v-for="(item, index) in menu"
                :key="index"
                :index="`${index}`"
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

        handleClose () {
            console.log('')
        },

        handleOpen () {
            console.log('')
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/layout/navbar.scss';
</style>
