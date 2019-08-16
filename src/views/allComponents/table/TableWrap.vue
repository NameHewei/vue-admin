<template>
    <div>
        <div>
             <el-table
                border
                style="width: 100%"
                :data="tableData"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column fixed prop="date" label="序号">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色名字"></el-table-column>
                <el-table-column prop="province" label="启用状态"></el-table-column>
                <el-table-column prop="city" label="菜单权限"></el-table-column>
                <el-table-column prop="address" label="修改时间"></el-table-column>
                <el-table-column prop="zip" label="创建人"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleRouterSkip({ name: 'cedRole', params: { type: 'edit' }, query: { id: scope.row.zip } })">修改</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100,]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableWrap',

    data () {
        return {
            currentPage: 1,

            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }]
        }
    },

    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
        },

        handleCurrentChange (val) {
            console.log(`当前页: ${val}`)
        },

        handleSelectionChange () {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
