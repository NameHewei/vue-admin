import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import eCharts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import utils from './utils/index.js'

// 自动全局挂载组件
import './componentsAuto/index.js'

/**
 * @des vue 配置
 */
import './vueConfig.js'

/**
 * @des 全局自定义指令
 */
import './directive/directive.js'

// 引入路由守卫，判断权限 希望最先执行 所以在 index.html 引入 并执行，在App.vue 创建实例后结束
import './navigationGuard'

import plugin from './plugin/plugin'

/* 数据请求模拟 */
if (process.env.NODE_ENV === 'development') {
    const { mockHttpServer } = require('../mock/mock.js')
    mockHttpServer()
}

Vue.prototype.$eCharts = eCharts
Vue.prototype.$message = ElementUI.Message

/* 全局挂载 utils */
Vue.prototype.$utils = utils

Vue.use(ElementUI)

/* App.vue 中有调用 */
Vue.use(plugin)

/* 谨慎使用 */
Vue.mixin({
    methods: {
        globalMixIn () {
            console.warn('globalMixIn')
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
