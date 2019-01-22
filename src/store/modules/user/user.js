import { reqUserInfo } from '@/api/user/user'

export default {
    namespaced: true,

    state: {
        name: '',
        age: null,
        permissionCode: []
    },

    mutations: {
        setUserInfo (state, { name, age, permissionCode }) {
            state.name = name
            state.age = age
            state.permissionCode = permissionCode
        }
    },

    actions: {
        async actionSetUserInfo ({ commit }) {
            const userInfo = await reqUserInfo()
            commit('setUserInfo', { ...userInfo })
        }
    }
}
