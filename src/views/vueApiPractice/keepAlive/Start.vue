<template>
    <div>
        <h4>在该组件中设置路由钩子，当离开时，判断是否需要重置数据</h4>
        <el-input v-model="key"></el-input>
        <div style="padding: 20px;"></div>
        <el-button @click="handleJump('kaCreate')">跳转创建</el-button>
        <el-button @click="handleJump('kaEdit')">跳转编辑</el-button>
    </div>
</template>

<script>
export default {
    name: 'Start',

    data () {
        return {
            key: '23333'
        }
    },

    beforeRouteLeave (to, from, next) {
        if (!['kaEdit', 'kaCreate'].includes(to.name)) {
            this.key = '数据重置了'
        }
        next()
    },

    activated () {
        /**
             * @des 这里更新表格数据等
             */
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
