<template>
    <div>
        <DeepSelector class="parent"></DeepSelector>
    </div>
</template>

<script>
import DeepSelector from './DeepSelector.vue'

export default {
    components: {
        DeepSelector
    }
}
</script>

<style lang="scss" scoped>
    .parent /deep/ .need {
        color: red
    }
    p {
        height: 256px;
    }

</style>
