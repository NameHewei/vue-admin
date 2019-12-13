<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import NProgress from 'NProgress'
export default {
    mounted () {
        NProgress.done()
    }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
