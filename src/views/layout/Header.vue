<template>
    <div>
        <h1 @click="routerSkip">
            <img src="../../assets/logo.png"/>
            <span>vue-admin</span>
        </h1>
    </div>
</template>

<script>
export default {
    methods: {
        routerSkip () {
            this.$router.push({
                path: '/'
            })
        },

        handleMenuClick (name) {
            if (name === 'modifyPassword') {
                this.$router.push({
                    name: 'modifyPassword'
                })
            }
            if (name === 'logout') {
                this.handleOut()
            }
        },

        handleOut () {
            this.LogOut()
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/layout/header.scss";
</style>
