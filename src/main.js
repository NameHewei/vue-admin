import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import eCharts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import utils from './utils/index.js'

// 自动全局挂载组件
import './views/components/index.js'

import './vueConfig.js'

// 引入路由守卫，判断权限
import './navigationGuard'
// NProgress.start()

Vue.prototype.$eCharts = eCharts
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$utils = utils

Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
