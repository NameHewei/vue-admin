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
