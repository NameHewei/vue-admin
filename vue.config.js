// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/**
 * @des vue-cli-3 中已安装 webpack 只是webpack被隐藏
 */
const webpack = require('webpack')

module.exports = {
    /**
     * @des 和webpack的一致
     * 1. 这里用./目的是为了让打包后的静态文件可以直接运行
     * 2. 只有加了 publicPath BASE_URL 才有值
    */
    publicPath: './',

    /* 生产环境打包时,不生成 map 文件 */
    productionSourceMap: false,

    devServer: {
        compress: true,
        port: 7878,

        // publicPath: './',

        proxy: {
            '/api': {
                target: 'http://localhost:2500',
                changeOrigin: true,
                /* 如果这个 'api' 公共前缀不是后端需要的，用以下方法去除 */
                pathRewrite: { '^/api': '' }
            }
        }
    },

    /**
     * @des 方式1：链式方式，直接启动server即可查看
     */
    // chainWebpack: config => {
    //     config
    //         .plugin('webpack-bundle-analyzer')
    //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }

    /**
     * @des
     * 1. 第一个参数会收到已经解析好的配置
     * 2. 可以直接修改配置，或者返回一个将会被合并的对象
     */
    configureWebpack: config => {
        const data = {
            /* 参见 webpack-pure/README.md */
            externals: {
                NProgress: 'NProgress'
            },
            plugins: []
        }

        /**
         * @des
         * 方式2：配置webpackbundleAnalyze
         * 区分环境执行
         * 这里是当运行打包时，即开启分析
         * 这里如果修改mode可能导致配置与production不一致，无法启动分析服务
         */

        /**
          * @des 方式3： 可以不加此插件，直接使用 命令行 --report(查看package.json) 方式生成report.html 打开查看即可
          * cli服务中有说明
         */
        let cn = ''
        if (process.env.NODE_ENV === 'production') {
            // data.plugins.push(new BundleAnalyzerPlugin())
            cn = 'product hewitt'
        } else {
            cn = 'develop hewitt'
        }
        data.plugins.push(new webpack.DefinePlugin({
            CUSTOM_NAME: JSON.stringify(cn)
        }))
        return data
    },

    // 是否每次保存时 lint 代码，错误输出为编译警告
    lintOnSave: true
}
