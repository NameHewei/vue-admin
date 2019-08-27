<template>
    <div>
        <el-checkbox v-model="checkedAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-tree
            show-checkbox
            default-expand-all
            ref="elTree"
            node-key="id"
            :data="treeData"
            :props="defaultProps"
            @check="handleCurrentChange"
        >
        </el-tree>
        <div>
            <h4>所有id：</h4>
            <p>{{ ids.toString() }}</p>
            <h4>直接选中：</h4>
            <p>{{ checked.toString() }}</p>
            <h4>半选中：</h4>
            <p>{{ halfIds.toString() }}</p>
        </div>
        <hr/>
         <h4>结果：</h4>
        <p>{{ checked.toString() }}</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeData: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 4',
                    children: [{
                        id: 9,
                        label: '三级 9'
                    }, {
                        id: 10,
                        label: '三级 10',
                        children: [{
                            id: 11,
                            label: '四级级 11',
                        }, {
                            id: 12,
                            label: '四级级 12',
                        }]
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 5'
                }, {
                    id: 6,
                    label: '二级 6'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 7'
                }, {
                    id: 8,
                    label: '二级 8'
                }]
            }],
            initIds: [1,4,10,3,7, 11],
            sureInit: [],
            checkedAll: false,
            checked: [],
            /** @des 所有选项的id */
            ids: [],
            halfIds: []
        }
    },

    mounted() {
        this.initData()
    },

    methods: {
        initData () {
            const { initIds } = this
            const tempArr = [],
                sureInit = [],
                filterTree = (arr) => {
                    arr.forEach(v => {
                        const haveChildren = v.children && v.children.length
                        tempArr.push(v.id)
                        if (initIds.includes(v.id) && !haveChildren) {
                            sureInit.push(v.id)
                        }
                        if (haveChildren) {
                            filterTree(v.children)
                        }
                    })
                }
            filterTree(this.treeData)

            this.ids = tempArr
            this.sureInit = sureInit 
            this.checked = initIds
            this.$refs.elTree.setCheckedKeys(sureInit)
        },

        handleCheckAllChange (val) {
            let arr = []
            if (val) {
                arr = this.ids
            }
            this.halfIds = []
            this.checked = arr
            this.$refs.elTree.setCheckedKeys(arr)
        },

        handleCurrentChange (v, a) {
            this.halfIds = this.$refs.elTree.getHalfCheckedKeys()
            this.checked = [...this.halfIds, ...a.checkedKeys]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
