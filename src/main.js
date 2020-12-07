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

import './vueConfig.js'

// 引入路由守卫，判断权限 希望最先执行 所以在 index.html 引入 并执行，在App.vue 创建实例后结束
import './navigationGuard'

/* 数据请求模拟 */
if (process.env.NODE_ENV === 'development') {
    const { mockHttpServer } = require('../mock/mock.js')
    mockHttpServer()
}

/* 按钮权限 */
Vue.directive('permission', {
    /* 添加inserted钩子函数 当元素被插入时执行 */
    inserted: function (el, binding) {
        const permission = ['2012'].includes(binding.value)
        el.innerHTML = permission ? '有权限' : '无权限'
        if (!permission) {
            el.setAttribute('disabled', true)
        }
    }
})

Vue.prototype.$eCharts = eCharts
Vue.prototype.$message = ElementUI.Message

/* 全局挂载 utils */
Vue.prototype.$utils = utils

Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
