<template>
    <div class="main-layout">
        <Header class="layout-header"></Header>
        <div class="layout-content-container">
            <div class="layout-sidebar">
                <Navbar></Navbar>
            </div>
            <footer class="layout-footer">
                copyright © {{ new Date().getFullYear() }} <a href="https://github.com/NameHewei" target="_blank">NameHewei@github</a>
            </footer>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import Navbar from './Navbar.vue'

export default {
  name: 'home',
  components: {
    Header,
    Navbar
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/layout/layout.scss';
</style>
