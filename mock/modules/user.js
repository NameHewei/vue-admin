module.exports = [
    {
        url: '/login',
        data: { token: 'token-admin' },
        method: 'post',
        /* 这里要用 this 取 data 所以没有用箭头函数 */
        handler: function (request) {
            const req = JSON.parse(request.body)
            if (req.username === 'hew') {
                return this.data
            }

            return {}
        }
    },
    {
        url: '/user/info',
        data: {
            roles: ['ADMIN']
        },
        handler: function () {
            return this.data
        }
    }
]
