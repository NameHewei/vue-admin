<template>
    <div>
        孙一级{{ grandsonName }}

        <el-button @click="handleListener">调用 listeners</el-button>
    </div>
</template>

<script>
export default {
    name: 'Grandson',
    props: {
        grandsonName: {
            type: String,
            default: ''
        },
        otherKey: {
            type: String,
            default: ''
        },
        someKey: {
            type: String,
            default: ''
        },
        watchObj: {
            type: Object,
            default: () => ({})
        }
    },

    created () {
        // console.log('grandson some key:', this.someKey)
    },

    watch: {
        watchObj: {
            handler (v) {
                // console.log('watch watchObj:', v)
            },
            immediate: true
            // deep: true
        }
    },

    methods: {
        handleListener () {
            /* 直接获取和用prop获取只能选一个 */
            // console.log('$attrs-$listener', this.$attrs, this.$listeners)
            this.$listeners.click()
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
