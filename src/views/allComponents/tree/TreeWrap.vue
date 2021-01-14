<template>
    <div>
        <el-checkbox v-model="checkedAll" @change="handleCheckAllChange">全选</el-checkbox>
        <pre>
            :expand-on-click-node  是否在点击节点的时候展开或者收缩节点， 默认值为 true
        </pre>
        <el-tree
            show-checkbox
            default-expand-all
            ref="elTree"
            node-key="id"
            check-strictly
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
        <div>
            <h1>自定义设置，父子关联</h1>
            <pre>
                1. 勾选父一级，自动勾选所有子级
                2. 勾选父一级，可以不用必须勾选子级
                3. 勾选任一级，自动勾选所有父级
            </pre>
            <el-tree
                ref="cusTreeRef"
                show-checkbox
                check-strictly
                default-expand-all
                node-key="id"
                :data="treeData"
                :props="defaultProps"
                @check="handleCheck">
            </el-tree>
            <p>
                <b>当前选中</b> <span>{{ cusChecked }}</span>
            </p>
        </div>
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
                            label: '四级级 11'
                        }, {
                            id: 12,
                            label: '四级级 12'
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
                    label: '二级 7',
                    children: []
                }, {
                    id: 8,
                    label: '二级 8'
                }]
            }],
            initIds: [1, 4, 10, 3, 7, 11],
            sureInit: [],
            checkedAll: false,
            checked: [],
            /** @des 所有选项的id */
            ids: [],
            halfIds: [],
            cusChecked: []
        }
    },

    mounted () {
        this.initData()
    },

    methods: {
        initData () {
            const { initIds } = this
            const tempArr = []
            const sureInit = []
            const filterTree = (arr) => {
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
            /* 如果设置了父id 又没有设置 父子不互相关联 那子一级将被全部选中 */
            this.$refs.elTree.setCheckedKeys(initIds)
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
            /* 设置父子不关联的情况 半选中为空 */
            this.halfIds = this.$refs.elTree.getHalfCheckedKeys()
            this.checked = [...this.halfIds, ...a.checkedKeys]
        },

        handleCheck (currentNode, treeStatus) {
            // console.log(currentNode, treeStatus)
            /**
             * @des 根据父元素的勾选或取消勾选，将所有子级处理为选择或非选中状态
             * @param { node: Object }  当前节点
             * @param { status: Boolean } （true ： 处理为勾选状态 ； false： 处理非选中）
             */
            const setChildStatus = (node, status) => {
                /* 这里的 id children 也可以是其它字段，根据实际的业务更改 */
                this.$refs.cusTreeRef.setChecked(node.id, status)
                if (node.children) {
                    /* 循环递归处理子节点 */
                    for (let i = 0; i < node.children.length; i++) {
                        setChildStatus(node.children[i], status)
                    }
                }
            }
            /* 设置父节点为选中状态 */
            const setParentStatus = (nodeObj) => {
                /* 拿到tree组件中的node,使用该方法的原因是第一次传入的 node 没有 parent */
                const node = this.$refs.cusTreeRef.getNode(nodeObj)
                if (node.parent.key) {
                    this.$refs.cusTreeRef.setChecked(node.parent, true)
                    setParentStatus(node.parent)
                }
            }

            /* 判断当前点击是选中还是取消选中操作 */
            if (treeStatus.checkedKeys.includes(currentNode.id)) {
                setParentStatus(currentNode)
                setChildStatus(currentNode, true)
            } else {
                /* 取消选中 */
                if (currentNode.children) {
                    setChildStatus(currentNode, false)
                }
            }

            this.cusChecked = [...this.$refs.cusTreeRef.getHalfCheckedKeys(), ...this.$refs.cusTreeRef.getCheckedKeys()]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
