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
        <div>name:{{ name }}</div>
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
            改变父组件的count的值
        </el-button>
        <el-button
            type="primary"
            @click="changeUpdate"
        >
            改变父组件的name值
        </el-button>
        <div>
            <h3>针对两种方式</h3>
            <ul>
                <li>方式1：父子组件是时刻也是必须保持一致的。 父可以改变子（数据）， 子也可以改变父（数据）</li>
                <li>方式2：父组件的数据的修改取决于父组件的方法中是否会去修改数据， 但是父组件数据修改子组件必定修改</li>
            </ul>
        </div>

        <div>
            <input v-model="input" placeholder="请输入内容"/>
            <el-input v-model="input1"></el-input>
            <TInput :value="input2"></TInput>
        </div>
    </div>
</template>

<script>
import DeepSelector from './DeepSelector.vue'
import Slot from './Slot.vue'
import ChildComponent from './ChildComponent.vue'
import TInput from './TInput.vue'

export default {
    components: {
        DeepSelector,
        TempSlot: Slot,
        ChildComponent,
        TInput
    },

    data () {
        return {
            name: 'hew',
            count: 10,
            input: '',
            input1: '',
            input2: ''
        }
    },

    watch: {
        input (v) {
            v = v.toString()
            console.log(v, v.length)
            // this.$nextTick(() => {
            if (v.length > 5) {
                // setTimeout(() => {
                this.input = 33335
                // }, 0)
                console.log('inner')
            }
            // })
        },

        input1 (v) {
            v = v.toString()
            console.log(v, v.length)
            // this.$nextTick(() => {
            if (v.length > 5) {
                setTimeout(() => {
                    this.input1 = 33335
                }, 1000)
                console.log('inner')
            }
            // })
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
