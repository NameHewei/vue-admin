export default {
    data () {
        return {
            multipleSelection: [],
            loading: false,
            currentPage: 1,
            pageSize: 20,
            total: 0,
            query: {},
            tableData: []
        }
    },

    methods: {
        /* 搜索回调 */
        handleSearchCallback ({ data }) {
            this.query = data
            this.getTableData()
        },

        /* 勾选表格项 */
        handleSelectionChange (array) {
            this.multipleSelection = array.map(({ id }) => id)
        },

        /* 表格分页操作回掉 */
        handleTableCallback ({ pageSize, currentPage }) {
            this.pageSize = pageSize
            this.currentPage = currentPage
            this.getTableData()
        },

        /** 获取表格数据 */
        getTableData () {
            // console.log(this.currentPage, this.pageSize)
        }
    }
}
