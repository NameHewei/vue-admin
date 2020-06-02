<template>
    <div>
        <div>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="handleCreate">弹窗新增</el-button>
                <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
            </div>
             <el-table
                border
                v-loading="loading"
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
                <el-table-column fixed="right" align="center" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <DeleteBtn @callback="handleDeleteCb"/>
                        <el-button size="mini" @click="handlePageEdit(scope.row.id)">跳页编辑</el-button>
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
        <CudInfo
            :show="show"
            :id="id"
            @callback="handleDialogCallback"
            @click="handleListener"
            :selectOptions="selectOptions"
            grandsonName="hew-son"
            otherKey="other key value"
            someKey="some key value"/>
    </div>
</template>

<script>
import CudInfo from './cudInfo'
import DeleteBtn from './deleteBtn'

export default {
    name: 'TableWrap',
    components: {
        CudInfo,
        DeleteBtn
    },
    data () {
        return {
            show: false,
            idList: [],
            id: '1111',
            loading: false,
            currentPage: 1,
            pageSize: 20,
            total: 0,
            query: {},
            selectOptions: [1, 2, 3],
            tableData: [{
                id: '1',
                date: '2016-05-02',
                name: '王小虎1',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                id: '2',
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
            this.id = ''
            this.show = true
        },

        handleListener () {
            console.log('console listeners')
        },

        /* 批量删除 */
        handleBatchDelete () {
            if (this.idList.length) {
                console.log('选择了：', this.idList)
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            } else {
                this.$message.warning('请选择数据')
            }
        },

        handleSearchCallback ({ data }) {
            this.query = data
            this.getTableData()
        },

        /** 获取表格数据 */
        getTableData () {
            // const { currentPage, pageSize, query } = this
            // this.loading = true
            // reqKnowledgeList({
            //     pageNum: currentPage,
            //     pageSize,
            //     ...query
            // })
            //     .then(() => {
            //         this.total = 1
            //         this.tableData = []
            //         this.loading = false
            //     }).catch((err) => {
            //         this.loading = false
            //         console.log(err)
            //     })
        },

        handleSizeChange (val) {
            this.pageSize = val
            this.currentPage = 1
            this.getTableData()
        },

        handleCurrentChange (val) {
            this.currentPage = val
            this.getTableData()
        },

        handleSelectionChange (array) {
            this.idList = array.map(({ id }) => id)
        },

        handleDialogCallback (value) {
            this.show = false
            if (value) this.getTableData()
        },

        handleDeleteCb (v) {
            console.log('删除: ', v)
        },

        handleEdit (id) {
            this.$prompt('输入提前编辑内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                this.id = id
                this.show = true
                this.$message({
                    type: 'success',
                    message: '输入了: ' + value
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },

        handlePageEdit (id) {
            this.$router.push({
                name: 'pageEdit',
                params: {
                    id: id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
