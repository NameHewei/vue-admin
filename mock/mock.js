
const Mock = require('mockjs')
const { getDomain } = require('@/utils/common')

const user = require('./modules/user')
const common = require('./modules/common')

Mock.setup({
    timeout: 400
})

// console.warn(process.env.NODE_ENV)
const preUrl = (url, reg) => {
    url = `${getDomain()}${url}`
    /* url 是否采用正则匹配，一般用于get请求在url传递参数 */
    if (reg) {
        url = url.replace(/\//g, '\\/')
        url = new RegExp(url)
    }
    return url
}

const mockRequestList = [
    ...user,
    ...common
]

exports.mockHttpServer = function () {
    /* 统一执行挂载 mock 请求 */
    mockRequestList.forEach((value) => {
        const { url, method = 'get', code, msg, data, reg, handler } = value
        // console.log(preUrl(url, reg))
        Mock.mock(preUrl(url, reg), method, (request) => {
            const res = {
                code: code || 1,
                msg: msg || 'success',
                data
            }
            if (handler) {
                const re = handler(request) || res
                res.data = re.data
                res.code = re.code
                res.msg = re.msg
            }

            if (process.env.NODE_ENV === 'development') {
                console.warn('mock请求：', url, request, res)
            }

            return res
        })
    })
}
