module.exports = {
    devServer: {
        compress: true,
        port: 7878,

        proxy: {
            '/api': {
                target: 'http://localhost:2500',
                changeOrigin: true
            }
        }
    },

    // 修改打包后的地址
    baseUrl: './',

    // 是否每次保存时 lint 代码，错误输出为编译警告
    lintOnSave: false
}
