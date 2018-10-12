import request from '@/api/request'

export function getList () {
    return request({
        showSuccessMsg: true,
        url: '/api/table-list/'
    })
}
