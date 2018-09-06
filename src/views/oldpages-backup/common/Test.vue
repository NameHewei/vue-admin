<template>
    <div>
        <input 
            type="text"
            v-bind="$attrs"
            @input="$emit('input', $event.target.value)"
            v-on="listeners"
        >
    </div>
</template>

<script>
    export default {
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    input: event => 
                        this.$emit('input', event.target.value)
                }
            }
        },
    }
</script>

<style scoped>

</style>