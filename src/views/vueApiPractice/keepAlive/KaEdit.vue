<template>
    <div>
        <h2>编辑</h2>
        <el-button @click="handleBack">返回</el-button>
    </div>
</template>

<script>
    export default {
        name: 'KaEdit',
        methods: {
            handleBack() {
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>