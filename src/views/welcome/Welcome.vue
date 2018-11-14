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
        try {
            throw new Error('Hello', 'someFile.js', 10)
        } catch (e) {
            // console.log(e instanceof ReferenceError) // true
            // console.log(e.message) // "Hello"
            // console.log(e.name) // "ReferenceError"
            // console.log(e.fileName) // "someFile.js"
            // console.log(e.lineNumber) // 10
            // console.log(e.columnNumber) // 0
            // console.log(e.stack) // "@Scratchpad/2:2:9\n"
            console.log(e) // "@Scratchpad/2:2:9\n"
        }
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
