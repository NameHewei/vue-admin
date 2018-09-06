<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
        <div class="block">
        <span class="demonstration">页数较少时的效果</span>
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
        </div>
        <router-link to="/nav/echarts">eee</router-link>
    </div>
</template>

<script>
    export default {
        name: 'sss',
        data() {
            return {
                 tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
            }
        },
    }
</script>

<style scoped>

</style>