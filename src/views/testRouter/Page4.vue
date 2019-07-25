<template>
    <div>
        <h1>page4</h1>
        <el-button @click="next">replace2</el-button>
        <el-button @click="skip">go(-1)</el-button>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('page4', this.$router)
    },
    methods: {
        skip () {
            this.$router.go(-1)
        },
        next () {
            this.$router.replace({ name: 'page2' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
