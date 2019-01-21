export default {
    namespaced: true,

    state: {
        name: '',
        age: null
    },

    mutations: {
        setUserInfo (state, { name, age }) {
            state.name = name
            state.age = age
        }
    },

    actions: {

    }
}
