<template>
    <div>
        <h1>page2</h1>
        <el-button @click="next">page3</el-button>
        <el-button @click="skip">go(-1)</el-button>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('page2', this.$router)
    },
    methods: {
        skip () {
            this.$router.go(-1)
        },
        next () {
            this.$router.push({ name: 'page3' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
