import request from '@/api/request'

export function reqLogin (params) {
    console.log('登录')
    return request({ url: '/login', method: 'post', params })
}

export function reqUserInfo () {
    return request({ url: '/user/info', method: 'post' })
    // return new Promise(function (resolve, reject) {
    //     if (cookieMethods.get('token')) {
    //         resolve({
    //             name: 123,
    //             age: 10,
    //             roles: ['ADMIN']
    //         })
    //     } else {
    //         reject(new Error('模拟获取用户信息失败,cookie失效或没有'))
    //     }
    // })
}
