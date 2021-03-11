const { queryStringToObj } = require('@/utils/common')

module.exports = [
    {
        url: '/dictionary',
        data: [{ value: 1, label: '状态一' }, { value: 2, label: '状态二' }],
        method: 'get',
        reg: true,
        /* 这里要用 this 取 data 所以没有用箭头函数 */
        handler: function (request) {
            const obj = queryStringToObj(request.url)
            console.warn('get参数', obj)
            return this.data
        }
    }
]
