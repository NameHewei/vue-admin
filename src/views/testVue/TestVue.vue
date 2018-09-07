<template>
    <div>
        <h1>deep selector</h1>
        <DeepSelector class="parent"></DeepSelector>

        <h1>slot</h1>
        <TestSlot>
            <em slot="name">text in em tag </em> <br/>
            this is the text in the TestSlot tag
        </TestSlot>
    </div>
</template>

<script>
import DeepSelector from './DeepSelector.vue'
import TestSlot from './TestSlot.vue'

export default {
    components: {
        DeepSelector,
        TestSlot
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
