<template>
    <div>
        <p>{{ this.key }}</p>
        <pre>
            遇到同名，除了周期钩子函数是都执行外，其它的都是组件覆盖混合对象
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

    mounted () {
        this.key = this.keya
    }
}
</script>

<style lang="scss" scoped>

</style>
