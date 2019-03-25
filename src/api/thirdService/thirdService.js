import request from '@/api/request'

export function reqList () {
    // return request({
    //     url: '/api/products/'
    // })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 200,
            results: [{
                id: 1001001,
                name: 'yue',
                list: [
                    { total: 888, date: '2019-03-05' },
                    { total: 889, date: '2019-03-06' }
                ]
            }, {
                id: 1001002,
                name: 'jianX',
                list: [
                    { total: 888, date: '2019-03-05' }
                ]
            }],
            msg: 'success'
        })
    })
}

export function reqTotal () {
    // return request({
    //     url: '/api/products/'
    // })
    return new Promise(function (resolve, reject) {
        resolve({
            code: 200,
            results: {},
            msg: 'success'
        })
    })
}
