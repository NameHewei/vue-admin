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

    lintOnSave: false
}
