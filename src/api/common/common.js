import request from '@/api/request'

/**
 * @des 辅助改进request.js内容
 */
export function upgradeReqGet (params) { return request({ url: '/api/res/get/', params }) }
export function upgradeReqGetId (params) { return request({ url: '/api/res/:id/', params }) }
export function upgradeReqPost (params) { return request({ url: '/api/res/post/', method: 'post', params }) }
export function upgradeReqPut (params) { return request({ url: '/api/res/put/', method: 'put', params }) }

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
