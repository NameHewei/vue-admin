import router, { permitRouters } from '@/router/router'

export default {
    namespaced: true,

    state: {
        name: '',
        age: null,
        roles: []
    },

    mutations: {
        setUserInfo (state, { name, age, roles: roles = [] }) {
            state.name = name
            state.age = age
            state.roles = [...roles]
        }
    },

    actions: {
        async actionSetUserInfo ({ state, commit }, data) {
            try {
                /* 根据当前登录用户的角色，添加路由 */
                router.addRoutes(permitRouters(data.roles))
                commit('setUserInfo', { ...data })
            } catch (error) {
                throw new Error('未获取到用户信息')
            }
        }
    }
}
