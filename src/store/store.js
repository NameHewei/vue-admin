import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /**
         * @des 直接调用下面属性，参考 Login.vue
         */
        projectName: 'vueAdmin'
    },

    mutations: {
        /**
         * @des 第一个参数state，第二个参数为用户自定义参数
         */
        setProjectName (state, data) {
            state.projectName = data
        }
    },
    actions: {
        /**
         * @des 第一个参数context 包含 state，commit，dispatch 等，第二个参数为用户自定义参数
         * 1. 如果在action中调用另一个action，就要用dispatch
         * 2. action 方法执行后 返回的也是一个 Promise， 所以在组件中调用 action 方法获取服务器数据，可以用 async 和 await 处理，保证数据已经从服务器获取成功
         */
        actionSetProjectName (context, data) {
            context.commit('setProjectName', data || 'vueAdmin change action')
        }
    },

    modules: {
        user
    }
})
