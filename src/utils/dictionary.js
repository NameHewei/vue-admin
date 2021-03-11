import { reqGetDictionary } from '@/api/common/common'
import store from '@/store/store'

const table = {
    status: [{ value: 11, label: 'L状态一' }, { value: 12, label: 'L状态二' }],
}

/**
 * 获取本地字典
 */
const getLocal = (...params) => {
    /* 第一个参数 表示要获取哪个对象数组 */
    const p1 = params[0]
    /* 第二个参数 用于匹配得到具体的某个对象（用于根据value 获取对应中文，也就是 label值） */
    const p2 = params[1]
    const obj = table[p1]
    if (!obj) throw new Error(`获取本地字典出错,没有${p1}字段`)
    if (p2) {
        return table[p1].find(v => v.value === p2) || { label: '' }
    } else {
        return table[p1]
    }
}

/**
 * 获取服务端字典
 * 调用示例在 form/cusForm
 */
const getRemote = async (...params) => {
    /* 第一个参数 表示要获取哪个对象数组 */
    const p1 = params[0]
    /* 第二个参数 用于匹配得到具体的某个对象（用于根据value 获取对应中文，也就是 label值） */
    const p2 = params[1]
    const dicList = store.state.dictionary[p1]
    let re = []

    if (dicList) {
        re = store.getters.getDictionary(p1)
    } else {
        try {
            const resData = await reqGetDictionary({ key: p1 })
            store.dispatch('actionGetDictionary', { key: p1, data: resData.data })
            re = resData.data
        } catch (error) {
            console.error('utils>字典：', error)
        }
    }
    re = p2 ? re.find(v => v.value === p2) : re

    return re
}

export default {
    getLocal,
    getRemote
}
