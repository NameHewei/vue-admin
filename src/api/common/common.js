import request from '@/api/request'

export function getNames () {
    return request({
        url: '/api/names/'
    })
}

export function uploadFile (data) {
    return request({
        url: '/api/names/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
