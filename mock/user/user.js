export default [
    {
        url: '/login',
        request: (option) => {
            console.log('mock optipn', option)
            return { name: '23333' }
        }
    }
]
