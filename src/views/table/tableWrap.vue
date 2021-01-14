<template>
    <div>
        <p>使用树形数据与懒加载时，删除某条数据，防止列表不更新，可以采用在 table 上绑定 v-if 重新渲染绑定table上的数据</p>
        <CusTable @callback="handleTableCallback" :total=total>
            <template #header>
                <el-button type="primary" @click="handleCreate">弹窗新增</el-button>
                <el-button type="primary" @click="handleBatch('publish')">批量发布</el-button>
                <el-button type="primary" @click="handleBatch('offline')">批量下线</el-button>
                <el-button type="danger" @click="handleBatch('del')">批量删除</el-button>
            </template>
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
        </CusTable>
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
import tableMixIn from '@/mixIn/tableMixIn.js'
import CudInfo from './cudInfo'
import DeleteBtn from './deleteBtn'
import CusTable from './cusTable.vue'

export default {
    name: 'TableWrap',
    components: {
        CudInfo,
        DeleteBtn,
        CusTable
    },
    mixins: [tableMixIn],
    data () {
        return {
            show: false,
            id: '1111',
            selectOptions: [1, 2, 3]
        }
    },

    mounted () {
        this.tableData = [{
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
        this.total = 100
    },

    methods: {
        handleCreate () {
            this.id = ''
            this.show = true
        },

        handleListener () {
            // console.log('console listeners')
        },

        /* 批量删除 */
        handleBatch (type) {
            const { multipleSelection } = this
            let ids = ''
            const commandObj = {
                publish: () => {
                    console.warn('publish ids', ids)
                },
                offline: () => {
                    console.warn('offline ids', ids)
                },
                del: () => {
                    console.warn('delete ids', ids)
                }
            }
            if (multipleSelection.length) {
                this.$confirm(this.msg, '确认操作当前选择的数据？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ids = multipleSelection.toString()
                    commandObj[type]()
                })
            } else {
                this.$message.warning('请选择操作项！')
            }
        },

        handleDialogCallback (value) {
            /* 这里只处理成功之后的一些操作 */
            this.show = false
            if (value) this.getTableData()
        },

        handleDeleteCb (v) {
            // console.log('删除: ', v)
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
