export default {
    data () {
        return {
            keya: 2333
        }
    },

    created () {
        // // console.log(123)
    },
    computed: {
        name () {
            return this.keya + '=='
        }
    }
}
