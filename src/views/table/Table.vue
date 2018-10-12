<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250"
            border
        >
            <el-table-column
                prop="date"
                label="日期">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="handleDeleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            class="custom-page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 40]"
            :page-size="10"
            :total="400"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getList } from '@/api/table/table'

export default {
    name: 'tableWrap',

    data () {
        return {
            currentPage: 2,
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },

    mounted () {
        getList({
            params: {
                name: '123'
            }
        }).then((res) => {
            this.tableData = res.data
            console.log('success', res)
        }).catch((err) => {
            console.log(err)
        })
    },

    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`)
        },

        handleCurrentChange (val) {
            console.log(`当前页: ${val}`)
        },

        handleDeleteRow (index, rows) {
            rows.splice(index, 1)
        }
    }
}
</script>

<style scoped>
    .custom-page {
        padding: 10px;
        border: 1px solid #ebeef5;
        border-top: 0;
    }
</style>
