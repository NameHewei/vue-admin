import { permitRouters } from '@/router/router'

export default {
    namespaced: true,

    state: {
        name: '',
        age: null,
        roles: [],
        module: ''
    },

    mutations: {
        SET_USER_INFO (state, { name, age, roles = [] }) {
            state.name = name
            state.age = age
            state.roles = [...roles]
        },
        SET_MODULE (state, data) {
            state.module = data
        }
    },

    actions: {
        actionSetUserInfo ({ commit }, data) {
            try {
                /* 根据当前登录用户的角色，添加路由 */
                permitRouters(data.roles)
                commit('SET_USER_INFO', { ...data })
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        },
        actionSetModule ({ commit }, data) {
            commit('SET_MODULE', data)
        }
    }
}
