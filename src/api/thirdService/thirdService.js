import request from '@/api/request'

export function reqList () {
    return request({
        url: '/api/names/'
    })
}
