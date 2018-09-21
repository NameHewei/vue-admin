import request from '@/api/request'

export function getNames () {
    return request({
        url: '/api/names/'
    })
}
