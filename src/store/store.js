import Vue from 'vue'
import Vuex from 'vuex'

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
        Change () {
            console.log(1)
        }
    },

    modules: {

    }
})
