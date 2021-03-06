import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },

    state: {
        menuCollapse: false,
        /**
         * @des 直接调用下面属性，参考 Login.vue
         */
        projectName: 'vueAdmin',
        someKey: 'someKey',
        /* 数据字典 */
        dictionary: {}
    },

    getters: {
        getDictionary: state => (key) => {
            return state.dictionary[key]
        }
    },

    mutations: {
        /* 处理菜单的展开与隐藏 */
        TOGGLE_MENU: state => {
            state.menuCollapse = !state.menuCollapse
        },

        /**
         * @des 第一个参数state，第二个参数为用户自定义参数,只接受两个参数
         */
        setProjectName (state, payload) {
            state.projectName = payload
        },

        setSomeKey (state, data) {
            state.someKey = data
        },

        DICTIONARY (state, data) {
            state.dictionary[data.key] = data.data
        }
    },
    actions: {
        actionToggleMenu ({ commit }) {
            commit('TOGGLE_MENU')
        },

        /**
         * @des 第一个参数context 包含 state，commit，dispatch 等方法，第二个参数为用户自定义参数
         * 1. 如果在action中调用另一个action，就要用dispatch
         * 2. action 方法执行后 返回的也是一个 Promise，所以在组件中调用 action 方法获取服务器数据，可以用 async 和 await 处理，保证数据已经从服务器获取成功
         * 3. dispatch 返回的也是 Promise
         * 4. 如果是统一获取数据放入store中，不推荐在App.vue中统一获取数据，因为有些接口需要登录验证，这里是早于登录页面先加载的，会导致登录页面无法正常加载
         */
        actionSetProjectName (context, data) {
            context.commit('setProjectName', data || 'vueAdmin change action')

            context.dispatch('actionSetSomeKey', 'new some key!')
        },

        actionSetSomeKey (context, data) {
            context.commit('setSomeKey', data)
        },

        actionGetDictionary ({ commit }, data) {
            commit('DICTIONARY', data)
        }
    },
})
