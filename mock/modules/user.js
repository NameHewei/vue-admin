module.exports = [
    {
        url: '/login',
        data: { token: 'token-admin' },
        method: 'post',
        /* 这里要用 this 取 data 所以没有用箭头函数 */
        handler: function (request) {
            const req = JSON.parse(request.body)
            if (req.username === 'hew' && req.password === '123456') {
                return ''
            } else {
                return { data: {}, msg: '账号密码错误', code: 0 }
            }
        }
    },
    {
        url: '/user/info',
        data: {
            roles: ['ADMIN'],
            name: 'hew',
            age: 10
        },
        handler: function () {
            return this.data
        }
    }
]
