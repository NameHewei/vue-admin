<template>
    <div>
        <p>child tag</p>
        <div class="div">
            <slot name="name"></slot>
        </div>
        <p>tag P, in child tag</p>
        <hr>
        <p>默认插槽</p>
        <slot></slot>
        <p>v-slot</p>
        <slot name="other">other</slot>
        <div>
            <slot name="abbr">abbr</slot>
        </div>
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
