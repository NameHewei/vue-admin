import request from '@/api/request'

export function getList () {
    return request({
        url: 'table-list/'
    })
}
