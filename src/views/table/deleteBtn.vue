<template>
    <div style="display:inline-block;margin: 0 5px">
        <el-button type="danger" :size="size" @click="handleDel">删除</el-button>
    </div>
</template>

<script>
/**
     * @des 点击后调用 callback 函数
     */
export default {
    name: 'deleteBtn',
    props: {
        msg: {
            type: String,
            default: '是否继续?'
        },
        size: {
            type: String,
            default: 'mini'
        }
    },

    methods: {
        handleDel () {
            this.$confirm(this.msg, '删除？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit('callback', true)
                this.$message({
                    type: 'success',
                    message: '确认'
                })
            }).catch(() => {
                this.$emit('callback', false)
                this.$message({
                    type: 'info',
                    message: '取消'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
