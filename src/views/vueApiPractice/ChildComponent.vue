<template>
    <div style="padding: 10px">
        <input @input="inputChange"/>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'no data'
        }
    },

    methods: {
        inputChange (v) {
            this.$emit('update:title', v.target.value)
        }
    }
}
</script>

<style scoped>

</style>
