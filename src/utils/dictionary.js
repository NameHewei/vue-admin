import store from '@/store/store'

const table = {
    status: [{ value: 0, label: '状态一' }, { value: 1, label: '状态二' }],
}

/**
 * 获取本地字典
 */
const getLocal = (...params) => {
    /* key 表示要获取哪个对象数组 */
    const p1 = params[0]
    /* value 用于匹配得到具体的某个对象（用于根据value 获取对应中文，也就是 label值） */
    const p2 = params[1]
    const obj = table[p1]
    if (!obj) throw new Error(`获取本地字典出错,没有${p1}字段`)
    if (p2) {
        return table[p1].find(v => v.value === p2) || { label: '' }
    } else {
        return table[p1]
    }
}

/* 获取数据字典 */
export async function getDicData (code) {
    await store.dispatch('actionDataDic', code)
    return store.state.dataDictionary[code] || ''
}

/* 获取数据对应值 */
export function getDicValue (code, val) {
    const arr = store.state.dataDictionary[code]
    return arr ? arr.find(v => v.val === `${val}`) || {} : {}
}

/**
 * 获取服务端字典
 */
// const getRemote = (...params) => {
//     /* key 表示要获取哪个对象数组 */
//     const p1 = params[0]
//     /* value 用于匹配得到具体的某个对象（用于根据value 获取对应中文，也就是 label值） */
//     const p2 = params[1]
//     const obj = table[p1]
//     if (!obj) throw new Error(`获取远程字典出错,没有${p1}字段`)
// }

export default {
    getLocal
}
