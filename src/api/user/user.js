import request from '@/api/request'
import { v1 as uuIdV1 } from 'uuid'

import { cookieMethods } from '@/utils/commonFn'

export function reqLogin () {
    console.log('登录')
    return new Promise(function (resolve) {
        resolve({
            name: 123,
            age: 10,
            roles: ['ADMIN'],
            token: uuIdV1()
        })
    })
}

export function reqUserInfo () {
    console.log('获取用户信息')
    return new Promise(function (resolve, reject) {
        if (cookieMethods.get('token')) {
            resolve({
                name: 123,
                age: 10,
                roles: ['ADMIN']
            })
        } else {
            reject(new Error('模拟获取用户信息失败,cookie失效或没有'))
        }
    })
}
