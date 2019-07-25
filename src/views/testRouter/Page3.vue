<template>
    <div>
        <h1>page3</h1>
        <el-button @click="next">page4  跳转到第四页用replace 在第四页返回时可以直接返回第二页</el-button>
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
            this.$router.replace({ name: 'page4' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
