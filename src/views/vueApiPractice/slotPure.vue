<template>
    <div>
        <slot v-bind:anyName="data" v-bind:someName="data1">
            {{ data.name }}{{ data1.name }}
        </slot>
        <div>
            <slot name="scopedSlotData" v-bind:anyName="data">===data===</slot>
        </div>
        <slot name="age">default age</slot>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: {
                name: 'warren1'
            },
            data1: {
                name: 'warren2'
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
