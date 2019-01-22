import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projectName: 'vueAdmin'
    },

    mutations: {
        changeProjectName () {

        }
    },
    actions: {
        change () {
            console.log(1)
        }
    },

    modules: {
        user
    }
})
