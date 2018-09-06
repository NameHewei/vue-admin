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
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Test Place</span>
                </template>
                <el-menu-item index="1-1" @click="routerSkip('testVue')">test vue</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
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
