module.exports = {
    /**
     * @des 和webpack的一致
     * 这里用./目的是为了让打包后的静态文件可以直接运行
     */
    publicPath: './',

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

    configureWebpack: {
        externals: {
            AMap: 'AMap'
        }
    },

    // 是否每次保存时 lint 代码，错误输出为编译警告
    lintOnSave: false
}
