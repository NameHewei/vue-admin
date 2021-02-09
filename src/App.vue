<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
/* 这里也可以直接配置 eslint 不报错即可 */
import NProgress from 'NProgress'
export default {
    mounted () {
        NProgress.done()

        /* 调用插件示例 */
        this.$pluginMethod()

        /* 调用插件mixin数据 */
        console.warn(this.pluginData)
    },
}
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
