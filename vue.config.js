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

    // pages: {
    //     index: {
    //         /* 配置时， entry 是必填的,并且会和 chain中配置的 html-webpack-plugin 有冲突 */
    //         entry: './src/main.js',
    //         title: 'vue-page'
    //     }
    // },

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

    chainWebpack: config => {
        /**
         * @des 方式1：链式方式，直接启动server即可查看
         */
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        config
            /* 这里的 html-webpack-plugin  就用html表示 */
            .plugin('html')
            .tap(args => {
                // 可以用 console 将 args 打印出来
                // console.log(args)
                /* 这里默认是去取的 package.json 的name */
                args[0].title = 'vue-admin-chain'
                return args
            })
    },

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
            plugins: [],
            performance: {
                // 可设置的值有 'warning': 'error' | 'warning' boolean: false 是否要给出提示 默认是会输出提示
                // hints: true,
                /* 打包后输出的资源大小超过多少给出提示， 默认 250k */
                // maxAssetSize: 400000
            }
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
        /* 创建全局常量，参考 webpack-pure/config */
        data.plugins.push(new webpack.DefinePlugin({
            CUSTOM_NAME: JSON.stringify(cn)
        }))
        return data
    },

    // 是否每次保存时 lint 代码
    // default 输出错误，导致编译失败
    // true 或 'warning' lint 错误输出为编译警告 不会导致编译失败
    // error 警告、错误 输出，导致编译失败
    // process.env.NODE_ENV !== 'production' 生产环境(打包时) 设置为false 即不会开启校验
    lintOnSave: 'default'
}
