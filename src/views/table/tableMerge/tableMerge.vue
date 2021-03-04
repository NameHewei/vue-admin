<template>
    <div>
        <h2>表头和表格行列合并(示例只有行合并)</h2>
        表格数据格式为，如下，
        <pre>
            [
                { name: hew, number: 2020,
                scoreList: [
                    { subject: 'math', score: 80  },
                    { subject: 'physical', score: 90  }
                ]}
            ]
        </pre>

        <el-table :data="data" style="width: 100%" border :span-method="handleTableMerge">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="number" label="学号"></el-table-column>
            <el-table-column label="各科得分">
                <el-table-column prop="subject" label="学科"></el-table-column>
                <el-table-column prop="score" label="得分"></el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'TableMerge',

    data () {
        return {
            data: [
                {
                    name: 'hew',
                    number: 2020,
                    scoreList: [
                        { subject: 'math', score: 80 },
                        { subject: 'physical', score: 90 }
                    ]
                }
            ]
        }
    },

    created () {
        this.data = this.$utils.table.merge(this.data, 'scoreList')
        // console.log(this.data)
    },

    methods: {
        handleTableMerge ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                if (row.mergeStart) {
                    return [row.mergeStart, 1]
                }
                if (row.beMerged) {
                    return [0, 1]
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
