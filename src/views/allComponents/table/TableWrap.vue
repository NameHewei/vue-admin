<template>
    <div>
        <div>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="handleCreate">新增</el-button>
                <el-button type="danger">删除</el-button>
            </div>
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
                <el-table-column prop="address" label="修改时间"></el-table-column>
                <el-table-column prop="zip" label="创建人"></el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.id)">修改</el-button>
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

        <div>
            <Create @callback="handleDialogCallback" :show="show"/>
        </div>
    </div>
</template>

<script>
import Create from './create'

export default {
    name: 'TableWrap',
    components: {
        Create
    },
    data () {
        return {
            currentPage: 1,
            show: false,

            tableData: [{
                id: 1,
                date: '2016-05-02',
                name: '王小虎1',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                id: 2,
                date: '2016-05-04',
                name: '王小虎2',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }]
        }
    },

    methods: {
        handleCreate () {
            this.show = true
        },

        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
        },

        handleCurrentChange (val) {
            console.log(`当前页: ${val}`)
        },

        handleSelectionChange (val) {
            // 返回数组
            console.log('选择了：', val)
        },

        handleDialogCallback () {
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
