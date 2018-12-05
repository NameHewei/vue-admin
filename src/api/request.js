import axios from 'axios'
import { Message } from 'element-ui'

/**
 * @desc 返回的数据结构 { code: '自定义状态码', data: '结果', msg: '结果描述' }
 */

const httpService = axios.create({
    withCredentials: true,
    timeout: 2000,
    headers: { 'Authorization': 'hewitt' }
})

httpService.interceptors.request.use((cfg) => {
    console.log('req', cfg)
    const { method } = cfg
    cfg.method = method || 'GET'
    return cfg
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})

httpService.interceptors.response.use((res) => {
    const { config, data } = res
    console.log('res', res)

    if (config.showSuccessMsg) {
        Message({
            message: data.msg,
            type: 'success',
            duration: 2000
        })
    }

    if (data.code !== 1) {
        Message({
            message: data.msg,
            type: 'error',
            duration: 2000
        })
    }

    return res.data
}, (error) => {
    console.log(error)
    Message({
        message: error.message,
        type: 'error',
        duration: 2000
    })
    return Promise.reject(error)
})

export default httpService
