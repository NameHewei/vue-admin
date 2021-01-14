<template>
    <div>
        <template v-for="item in menuTree" :index="item.name">
            <el-submenu v-if="item.children" :key="item.name" :index="item.name">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>
                <Menu :key="item.name" :menuTree="item.children" />
            </el-submenu>
            <el-menu-item
                v-else
                :index="item.name"
                :key="item.name"
                @click="routerSkip(item.name)"
            >
                {{ item.title }}
             </el-menu-item>
        </template>
    </div>
</template>

<script>

export default {
    /* 菜单组件 */
    name: 'Menu',

    props: {
        menuTree: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        routerSkip (name) {
            if (/infinity/i.test(name)) {
                this.$message.warning('无限菜单只做展示,不跳转')
                return
            }
            this.$router.push({ name })
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
