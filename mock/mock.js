import Mock from 'mockjs'

Mock.setup({
    /* 被拦截的 Ajax 请求的响应时间 */
    timeout: 400
})

Mock.mock('/login', (request) => {
    const body = JSON.parse(request.body)
    if (body.username === 'name') {
        return { code: 200, message: 'sucess', data: { token: Mock.Random.id() } }
    }
    return { code: 401, message: '账号为：name' }
})

Mock.mock('/user/info', () => {
    return { code: 200, message: 'sucess', data: { name: 'hew', age: 10, roles: ['ADMIN'] } }
})

console.log(process.env.NODE_ENV)
