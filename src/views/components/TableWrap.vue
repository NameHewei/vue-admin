<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250"
            border
        >
            <el-table-column
                fixed
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
                fixed="right"
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            class="custom-page"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getList } from '@/api/table/table'

export default {
    data () {
        return {
            currentPage: 2,
            tableData: [
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王56虎',
                    province: '上海',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ]
        }
    },

    mounted () {
        getList({
            params: {
                name: '123'
            }
        }).then((res) => {
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
        border: 0, 1px solid red, 1px solid red, 1px solid red
    }
</style>
