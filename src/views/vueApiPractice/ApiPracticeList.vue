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

        <div>
            parent: {{ count }}
        </div>
        <ChildComponent
            :name="name"
            @updateName="handleName"
            :count.sync="count"
        ></ChildComponent>
        <el-button
            type="primary"
            @click="changeCount"
        >
        改变父组件的count的值</el-button>
        <el-button
            type="primary"
            @click="changeUpdate"
        >
        改变父组件的name值</el-button>

        <div>
            <h3>针对两种方式</h3>
            <ul>
                <li>方式1：父子组件是时刻也是必须保持一致的。 父可以改变子（数据）， 子也可以改变父（数据）</li>
                <li>方式1：父组件的数据的修改取决于父组件的方法中是否会去修改数据， 但是父组件数据修改子组件必定修改</li>
            </ul>
        </div>
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
            name: 'hew',
            count: 10
        }
    },

    methods: {
        handleName (v) {
            this.name = v
        },

        changeUpdate () {
            this.name = 'changed name'
        },

        changeCount () {
            this.count++
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
