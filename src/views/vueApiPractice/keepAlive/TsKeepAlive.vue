<template>
    <div>
        <h4>创建自己的测试组件不要与keep-alive关键字冲突，否则会发生错误</h4>
        <el-button @click="handleJump('kaStart')">跳转开始演示页</el-button>
        <div style="padding: 20px;"></div>

        <keep-alive :max="10" include="Start">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'TsKeepAlive',

    data () {
        return {
            key: '23333'
        }
    },

    methods: {
        handleJump (name) {
            this.$router.push({
                name
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
