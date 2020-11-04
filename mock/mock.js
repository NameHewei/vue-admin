import Mock from 'mockjs'

Mock.setup({
    /* 被拦截的 Ajax 请求的响应时间 */
    timeout: 400
})

Mock.mock('/login', () => {
    return { code: 200, message: 'sucess', data: { token: Mock.Random.id() } }
})

Mock.mock('/user/info', (request) => {
    const body = JSON.parse(request.body)
    return { code: 200, message: 'sucess', data: { name: 'hew', age: 10, account: body.username, roles: ['ADMIN'] } }
})

console.log(process.env.NODE_ENV)
