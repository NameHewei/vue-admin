<template>
    <div>
        <p>{{ this.key }}</p>
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

    mounted () {
        this.key = this.keya
    }
}
</script>

<style lang="scss" scoped>

</style>
