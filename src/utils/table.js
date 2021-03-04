export default {
    /**
     * @des 表格合并
     * @param
     * 第一个参数 数据数组
     * 第二个参数 子一级要合并的属性名或要采用的子一级的字段
     * 第三个参数 要采用的子一级的字段
     */
    merge: (...argu) => {
        const params = argu
        const length = params.length
        const _d = params[0]
        let tier = 'children'
        let useChildFields = []
        if (length === 2) {
            /* 两个参数 第二个参数可以是要合并的数据数组键名，也可以是要使用的子一级的属性名 */
            if (typeof params[1] === 'string') {
                /* 第二个参数为 要合并的数组的键名 */
                tier = params[1]
            } else {
                /* 第二个参数为 子一级要使用的属性名 */
                useChildFields = params[1]
            }
        } else if (length === 3) {
            tier = params[1]
            useChildFields = params[2]
        }

        if (_d instanceof Array) {
            const list = []
            /* 将数据展平为一层 */
            _d.forEach(parent => {
                const children = parent[tier]
                const len = children.length
                children.forEach((child, index) => {
                    /* 将父级公共的字段，放入子一级 */
                    Object.keys(parent).forEach(key => {
                        /* 处理父子级有相同字段名，如果是用子一级的字段，就不进行赋值操作 */
                        if (key !== tier && !useChildFields.includes(key)) child[key] = parent[key]
                    })
                    if (len > 1) {
                        if (index === 0) {
                            /* 表示从这里开始合并, 并且要合并几行 */
                            child.mergeStart = len
                        } else {
                            /* 表示该条数据是要被合并的 */
                            child.beMerged = true
                        }
                    }
                    list.push(child)
                })
            })
            return list
        } else {
            return []
        }
    }
}
