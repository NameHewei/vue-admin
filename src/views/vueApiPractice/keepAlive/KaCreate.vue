<template>
    <div>
        <h2>创建</h2>
        <el-button @click="handleBack">返回</el-button>
    </div>
</template>

<script>
export default {
    name: 'KaCreate',
    methods: {
        handleBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
