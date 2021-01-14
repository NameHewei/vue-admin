import request from '@/api/request'

/* 登录 */
export function reqLogin (params) {
    return request({ url: '/mock/login', method: 'post', params })
}

/* 获取用户信息 */
export function reqUserInfo () {
    return request({ url: '/mock/user/info', method: 'get' })
}
