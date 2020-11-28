<template>
    <div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"></el-menu-item>
            <el-submenu index="2">
                <template slot="title"></template>
                <el-menu-item index="2-1"></el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    /* 无限层级菜单 */
    name: 'InfinityMenu',

    data () {
        return {
        }
    },

    methods: {
        handleSelect () {

        }
    },
}
</script>

<style lang="scss" scoped>

</style>
