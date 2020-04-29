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
        /** 这里主要是重置数据 */
        if (!['kaEdit', 'kaCreate'].includes(to.name)) {
            this.key = '数据重置了'
        }
        console.log(to.name)
        next()
    },

    activated () {
        /**
        * @des 这里更新表格数据等
        */
    },

    created () {
        /**
         * 这里请求不需要频繁更新的数据
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
