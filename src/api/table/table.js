import request from '@/api'

export function getList () {
    return request({
        url: 'table-list/'
    })
}
