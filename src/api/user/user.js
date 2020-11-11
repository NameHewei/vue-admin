import request from '@/api/request'

/* 登录 */
export function reqLogin (params) {
    return request({ url: '/login', method: 'post', params })
}

/* 获取用户信息 */
export function reqUserInfo () {
    return request({ url: '/user/info', method: 'post' })
}
