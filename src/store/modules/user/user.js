import { reqUserInfo } from '@/api/user/user'

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
        async actionSetUserInfo ({ commit }) {
            const userInfo = await reqUserInfo()

            document.cookie = 'token=hewei'

            commit('setUserInfo', { ...userInfo })
        }
    }
}
