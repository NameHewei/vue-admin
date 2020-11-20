<template>
    <div>
        <el-button :type="type" icon="el-icon-arrow-left" @click="handleBack">{{  showTxt ? '返回' : '' }}</el-button>
    </div>
</template>

<script>
export default {
    name: 'BackHeader',
    props: {
        type: {
            type: String,
            default: ''
        },
        routeName: {
            type: String,
            default: ''
        },
        showTxt: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleBack () {
            const { routeName } = this
            if (routeName) {
                this.$router.push({ name: routeName })
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
