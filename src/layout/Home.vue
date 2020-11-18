<template>
    <div class="main-layout">
        <Navbar></Navbar>
        <div class="layout-content-container">
            <Header class="layout-header"></Header>
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
