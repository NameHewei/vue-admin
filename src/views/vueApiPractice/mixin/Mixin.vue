<template>
    <div>
        <p>{{ this.key }}</p>
        <pre>
            说明见笔记 vue => mixin
        </pre>
    </div>
</template>

<script>
import mixin from './mixin'

export default {
    mixins: [mixin],
    data () {
        return {
            key: 25
        }
    },

    computed: {
        age () {
            return 5656
        },
        name () {
            return 'kkkk'
        }
    },

    mounted () {
        this.key = this.keya

        // console.log(this.name, this.age)
    }
}
</script>

<style lang="scss" scoped>

</style>
