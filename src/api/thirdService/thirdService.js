import request from '@/api/request'

export function reqUpdateProduct () {

}

export function reqCompany () {
    return new Promise(function (resolve) {
        resolve({
            code: 200,
            results: [{
                id: 1001,
                name: 'ali',
                total: 22222
            }, {
                id: 1002,
                name: 'weChat',
                total: 12000
            }, {
                id: 1003,
                name: 'tt',
                total: 10000
            }],
            msg: 'success'
        })
    })
}

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
