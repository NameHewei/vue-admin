import { reqPermissionCode } from '@/api/user/user'

export default {
    namespace: true,

    state: {
        permissionCode: [],
        router: []
    },

    mutations: {
        getPermissionCode (state, data) {
            state.router = [ ...data ]
        }
    },

    actions: {
        async actionGetPermissionCode ({ commit }) {
            const code = await reqPermissionCode()
            commit('getPermissionCode', code)
        }
    }
}
