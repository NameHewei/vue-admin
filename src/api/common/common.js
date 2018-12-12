import request from '@/api/request'

export function getNames () {
    return request({
        url: '/api/names/'
    })
}

export function reqUploadFile (data) {
    return request({
        url: '/api/upload/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}
