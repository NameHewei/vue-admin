<template>
    <div>
        <div style="margin: 10px 0">
            <slot name="header"> </slot>
        </div>
        <slot></slot>
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentTotal"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
/**
 * 需要绑定：
 * 1. total(总数据条数)
 * 2. callback (回掉，用于将变化后的数据传递给父组件)
 *
 * 插槽内容
 * 1. 表格顶部操作项
 * 2. 表格主体
 * 3. 默认分页
 */
export default {
    name: 'CusTable',
    props: {
        total: {
            type: Number,
            default: 0
        }
    },

    watch: {
        total (v) {
            this.currentTotal = v
        }
    },

    data () {
        return {
            currentPage: 1,
            pageSize: 20,
            currentTotal: 0
        }
    },

    methods: {
        handleSizeChange (val) {
            this.pageSize = val
            this.currentPage = 1
            this.handleCallback()
        },

        handleCurrentChange (val) {
            this.currentPage = val
            this.handleCallback()
        },

        handleCallback () {
            const { currentPage, pageSize } = this
            this.$emit('callback', { pageSize, currentPage })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
