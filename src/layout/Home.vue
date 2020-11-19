<template>
    <div :class="['main-layout', menuCollapse ? 'menu_fold': 'menu_unfold']">
        <Navbar></Navbar>
        <div class="layout-content-container">
            <Header></Header>

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
import { mapState } from 'vuex'
import Header from './header.vue'
import Navbar from './navbar.vue'

export default {
    name: 'home',
    components: {
        Header,
        Navbar
    },

    computed: {
        ...mapState(['menuCollapse'])
    },
}
</script>

<style lang="scss">
@import "@/styles/layout/layout.scss";
</style>
