import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['projectName'])
    },

    methods: {
        ...mapActions(['actionSetProjectName'])
    }
}
