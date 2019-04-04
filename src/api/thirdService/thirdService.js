import request from '@/api/request'

export function reqProducts () {
    return request({ url: '/api/financial/product/' })
}

export function reqUpdateProduct (params) {
    return request({ url: '/api/financial/product/', method: 'post', ...params })
}

export function reqCompany () {
    return request({ url: '/api/financial/company/' })
}

export function reqCompanyChange (params) {
    return request({ url: '/api/financial/company/', ...params })
    // return new Promise(function (resolve, reject) {
    //     resolve({
    //         code: 200,
    //         results: [{
    //             id: 1001001,
    //             name: 'yue',
    //             code: 'yue',
    //             list: [
    //                 { total: 888, date: '2019-03-05' },
    //                 { total: 889, date: '2019-03-06' }
    //             ]
    //         }, {
    //             id: 1001002,
    //             code: 'jianX',
    //             name: 'jianX',
    //             list: [
    //                 { total: 888, date: '2019-03-05' }
    //             ]
    //         }],
    //         msg: 'success'
    //     })
    // })
}
