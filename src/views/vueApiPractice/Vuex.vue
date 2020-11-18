<template>
    <div>
        vuex
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: '1'
        }
    },

    mounted () {
        // console.log(this.$store)
        this.$store.dispatch('Change')
    }
}
</script>

<style scoped>

</style>
