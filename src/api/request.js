import { v1 as uuIdV1 } from 'uuid'
import axios from 'axios'
import { Message } from 'element-ui'
import { getDomain } from '@/utils/common'

/**
 * @des get        方式只有 params 参数
 * @des post patch 等方式有 params data 参数，当只传 params 时，会转换赋值到data上 与axios需要的参数一致
 * @des 这里默认返回的数据结构 { code: '自定义状态码  当前项目 1 表示成功', data: '结果', msg: '结果描述' }
 */

const httpService = axios.create({
    withCredentials: true,
    timeout: 20000,
    headers: { Authorization: 'hewitt' }
})

httpService.interceptors.request.use((cfg) => {
    const { url, method, params, data } = cfg

    /* 重置或配置 headers 的值 */
    cfg.headers.uuid = uuIdV1().replace(/-/g, '')

    /**
     * @des 处理url中带参数（例：/xx/:id/xx/ -> /xx/123/xx/）  这里的参数要带在 params 里
     */
    if (/:/.test(url)) {
        const urlParam = /\/:([^/]+)(?:\/|$)/.exec(url)[1]
        cfg.url = url.replace(`:${urlParam}`, params[urlParam])
        delete cfg.params[urlParam]
    }

    /**
     * @des 处理不同请求方式
     * @des get        方式，参数放 params
     * @des post put 等方式，参数放 data
     */
    if (method !== 'get') {
        if (!data) {
            cfg.data = params
            /* 只有没传 data 的才删除 params，因为有些请求是 params 和 data 都需要 */
            delete cfg.params
        }
    }

    /**
     * @des 如果没有配置反向代理，可直接加地址
     */
    // console.log('NODE_ENV', process.env.NODE_ENV)
    cfg.baseURL = getDomain()

    return cfg
}, (error) => {
    // console.log(error)
    return Promise.reject(error)
})

httpService.interceptors.response.use((res) => {
    const { config, data } = res

    /* 注意这个参数实在 api文件里面的方法中传递的，是和url同一级 */
    // code === 'xxx 根据不同的后端数据结构来定义'
    if (config.showSuccessMsg && data.code === 1) {
        Message({
            message: data.msg,
            type: 'success',
            duration: 2000
        })
    }

    /* excludeCode 默认 false，表示返回的数据格式是符合统一标准的；当设置为true时，表示不对code检测判断错误，一般用于返回数据格式不规范(没有返回code)时使用  */
    if (data.code !== 1 && !config.excludeCode) {
        /* 这里的错误，只做提示信息的统一处理，因为每一个地方的错误处理业务不同 */
        Message({
            message: data.msg,
            type: 'error',
            duration: 2000
        })

        return Promise.reject(res.data)
    }

    return res.data
}, (error) => {
    /**
     * 这里可以用  error.toJSON()  打印 error中的一些信息 比如 error.code
     */
    if (error.code === 404) {
        Message({ message: '接口未找到', type: 'error', duration: 2000 })
    } else {
        Message({ message: error.message, type: 'error', duration: 2000 })
    }
    return Promise.reject(error)
})

export default httpService
