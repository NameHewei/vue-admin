import uuidV1 from 'uuid/v1'
import axios from 'axios'
import { Message } from 'element-ui'

/**
 * @des 所有与业务相关的参数，直接以对象的形式传入；请求方式与url在api模块中添加
 * @des 返回的数据结构 { code: '自定义状态码', data: '结果', msg: '结果描述' }
 */

const httpService = axios.create({
    withCredentials: true,
    timeout: 2000,
    headers: { 'Authorization': 'hewitt' }
})

httpService.interceptors.request.use((cfg) => {
    const
        { url, method, params } = cfg,
        tempData = { ...params }

    cfg.headers.uuid = uuidV1().replace(/-/g, '')

    /**
     * @des 处理url中带参数（例：/xx/:id/xx/ -> /xx/123/xx/）
     */
    if (/:/.test(url)) {
        const urlParam = /\/:([^/]+)(?:\/|$)/.exec(url)[1]
        cfg.url = url.replace(`:${urlParam}`, tempData[urlParam])
        delete cfg.params[urlParam]
    }

    /**
     * @des 处理不同请求方式
     */
    if (method !== 'get') {
        cfg.method = method
        cfg.data = tempData
        delete cfg.params
    }

    /**
     * @des 如果没有配置反向代理，可直接加地址
     */
    if (/localhost/.test(window.location.host)) {
        cfg.baseURL = 'http://xxx.xx:8080/'
    }

    return cfg
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})

httpService.interceptors.response.use((res) => {
    const { config, data } = res

    if (config.showSuccessMsg) {
        Message({
            message: data.msg,
            type: 'success',
            duration: 2000
        })
    }

    if (data.code !== 200) {
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
