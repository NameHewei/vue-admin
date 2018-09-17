<template>
    <div>
        <p>child tag</p>
        <div class="div">
            <slot name="name"></slot>
        </div>
        <p>tag P, in child tag</p>

        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .div {
        color:rgb(7, 197, 108)
    }
</style>
