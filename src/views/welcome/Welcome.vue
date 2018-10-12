<template>
    <div>
        欢迎
    </div>
</template>

<script>
// import { getNames } from '@/api/common/common.js'
export default {
    data () {
        return {
            key: 1,
            data: []
        }
    },

    mounted () {
        // this.name(1, 2)
        // getNames().then((res) => { console.log(res) }).catch((err) => { console.log(err) })

    },

    methods: {
        name (...a) {
            console.log(a, 999)
            this.age(1, 2)
        },

        age (b, c, d) {
            console.log(b, '----', c, d, 9090)
        }
    }
}
</script>

<style scoped>

</style>
