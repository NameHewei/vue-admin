<template>
    <div>
        <h1>page1</h1>
        <el-button @click="next">page2</el-button>
        <el-button @click="skip">go(-1)</el-button>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('page1', this.$router)
    },
    methods: {
        skip () {
            this.$router.go(-1)
        },
        next () {
            this.$router.push({ name: 'page2' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
