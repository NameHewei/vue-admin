<template>
    <div>
        欢迎
    </div>
</template>

<script>
import { getNames } from '@/api/common/common.js'
export default {
    data () {
        return {
            key: 1,
            data: []
        }
    },

    mounted () {
        getNames().then((res) => { console.log(res) }).catch((err) => { console.log(err) })
    },

    methods: {}
}
</script>

<style scoped>

</style>
