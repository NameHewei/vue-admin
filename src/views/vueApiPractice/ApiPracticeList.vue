<template>
    <div>
        <h2>deep selector</h2>
        <DeepSelector class="parent"></DeepSelector>

        <h2 class="sticky">slot</h2>
        <TempSlot>
            <em slot="name">text in em tag </em> <br/>
             default text :this is the text in Slot tag
        </TempSlot>

        <h2>.sync modifier</h2>
        <div>{{ name }}</div>
        <ChildComponent
            :name="name"
            @update:title="handleName"
        ></ChildComponent>
    </div>
</template>

<script>
import DeepSelector from './DeepSelector.vue'
import Slot from './Slot.vue'
import ChildComponent from './ChildComponent.vue'

export default {
    components: {
        DeepSelector,
        TempSlot: Slot,
        ChildComponent
    },

    data () {
        return {
            name: 'hew'
        }
    },

    methods: {
        handleName (v) {
            this.name = v
        }
    }
}
</script>

<style lang="scss" scoped>
    h2{
        padding: 6px;
        border-left: solid 2px rgb(214, 214, 214);
        font-weight: 500;
        color: rgb(110, 110, 110);
        background-color: rgb(238, 238, 238);
        &::after {
            content: "[example]";
            padding-left: 10px;
            font-size: 14px;
            font-style: italic;
            color: #999;
        }
    }

    .parent /deep/ .need {
        color: rgb(7, 197, 108)
    }

    p {
        height: 256px;
    }

    .sticky{
        position: sticky;
        top: 0;
    }

</style>
