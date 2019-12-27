<template>
    <div>
        <slot v-bind:data="data">
            {{ data.name }}
        </slot>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: {
                name: 'warren'
            }
        }
    }
}
</script>

<style scoped>
    .div {
        color:rgb(7, 197, 108)
    }
</style>
