<template>
    <div>
        <p>this is an example of a solt</p>
        <div class="div">
            <slot name="name"></slot>
        </div>
        <p>footer</p>

        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .div {
        color:powderblue;
    }
</style>
