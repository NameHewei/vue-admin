<template>
  <div class="app" v-if="show">
    <router-view/>
  </div>
</template>

<script>
import NProgress from 'NProgress'
export default {
    data () {
        return {
            show: false
        }
    },
    mounted () {
        setTimeout(() => {
            this.show = true
            NProgress.done()
        }, 3000)
    }
}
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
