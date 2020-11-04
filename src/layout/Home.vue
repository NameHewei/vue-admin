<template>
    <div class="main-layout">
        <div class="mask"></div>
        <div class="mask-cover"></div>
        <div class="main-content">
            <Header class="layout-header"></Header>
            <div class="layout-content-container">
                <div class="layout-sidebar">
                    <Navbar></Navbar>
                </div>
                <TagsNav></TagsNav>
                <div class="layout-content">
                    <div class="content-inner">
                        <router-view></router-view>
                    </div>
                </div>
                <footer class="layout-footer">
                    copyright © {{ new Date().getFullYear() }} <a href="https://github.com/WarrenHewitt" target="_blank">Github-WarrenHewitt</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'
import TagsNav from './tagsNav.vue'

export default {
    name: 'home',
    components: {
        Header,
        Navbar,
        TagsNav
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/layout/layout.scss";
</style>
