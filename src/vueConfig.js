/**
 * @description 在main.js文件中引入该配置文件
 */

import Vue from 'vue'

// 设置为false，防止vue启动时生成提示
Vue.config.productionTip = false

console.log('环境变量：', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    // 跟踪运行时的错误
    Vue.config.errorHandler = function (err, vm, info) {
        console.error('errorHandler', err, vm, info)
    }
}
