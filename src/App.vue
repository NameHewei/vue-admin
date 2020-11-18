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
    },
}
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
