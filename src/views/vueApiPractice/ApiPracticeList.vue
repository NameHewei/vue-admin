<template>
    <div>
        <div>
            <h2>v-for 和 v-if </h2>
            <pre>
                forArray: [
                    { name: 'hew', judge: true },
                    { name: 'other', judge: false }
                ]
            </pre>
            <div>
                需要v-for 和 v-if 一起作用于同一个元素时，请使用 computer 或methods 过滤，不使用v-if
            </div>
            <div>
                <ul>
                    <li v-for="(vItem, index) in filterForArray" :key="index">{{ vItem.name }}</li>
                </ul>
            </div>

            <h2>HTMLElement.click()</h2>
            <div style="padding: 10px 0;">
                1.在onchange中有效
                2.在watch中无效
            </div>
            <el-select v-model="selectValue" @change="handleSelectChange" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <input type="file" ref="inputFile" id="inputFile">
            <span>{{ selectValue }}</span>
        </div>

        <!-- <div id="move"></div> -->
        <h2>深度作用选择器</h2>
        <DeepSelector class="parent"></DeepSelector>

        <h2 class="sticky">slot</h2>
        <TempSlot>
            <em slot="name">被废弃了，在em标签中的文字 具名插槽 </em> <br/>
            <template v-slot:other>template tag</template> <br/>
             default text :this is the text in Slot tag
            <template #abbr>缩写 #</template>
        </TempSlot>
        <SlotPure v-slot="data">不要用具名函数：<b>{{ data }}</b></SlotPure>

        <h2 class="sticky">.sync modifier</h2>
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

        <div style="margin: 40px 0">
            <h2>vue 不能检测到数组变动</h2>
            <a href="https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9" target="_blank">点击跳转 https://cn.vuejs.org/v2/guide/list.html</a>
            <ul>
                <li v-for="(i, index) in arrayList" :key="index">{{ i }}</li>
            </ul>
            <div style="margin:10px">
                {{ Object.entries(someObject) }}
            </div>
            <el-button
                type="primary"
                @click="changeArrayList"
            >
                利用$set改变数组值
            </el-button>
            <el-button
                type="primary"
                @click="changeSomeObject"
            >
                给data中某个对象添加一个属性，并触发更新
            </el-button>
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
import SlotPure from './slotPure.vue'
import ChildComponent from './ChildComponent.vue'
import TInput from './TInput.vue'

export default {
    components: {
        DeepSelector,
        TempSlot: Slot,
        ChildComponent,
        TInput,
        SlotPure
    },

    data () {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            } ],
            selectValue: '',
            name: 'hew',
            count: 10,
            arrayList: [1, 2, 3],
            someObject: {
                a: 1111
            },
            input: '',
            input1: '',
            input2: '',

            forArray: [
                { name: 'hew', judge: true },
                { name: 'other', judge: false }
            ]
        }
    },

    mounted () {
        const tree = [
                {
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],

            loopTree = (data) => {
                const tempArr = []
                data.forEach(v => {
                    const tempObj = {}
                    tempObj.id = v.id
                    tempObj.label = `new ${v.label}`
                    if (v.children && v.children.length) {
                        tempObj.list = loopTree(v.children)
                    }
                    tempArr.push(tempObj)
                })
                return tempArr
            }

        function throttle (func, wait, options) {
            var context, args, result
            var timeout = null, previous = 0

            if (!options) options = {}
            var later = function () {
                previous = options.leading === false ? 0 : Date.now()
                timeout = null
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
            return function () {
                var now = Date.now()
                if (!previous && options.leading === false) previous = now
                var remaining = wait - (now - previous)
                context = this
                args = arguments
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout)
                        timeout = null
                    }
                    previous = now
                    result = func.apply(context, args)
                    if (!timeout) context = args = null
                } else if (!timeout && options.trailing !== false) {
                    timeout = setTimeout(later, remaining)
                }
                return result
            }
        };
    },

    computed: {
        filterForArray () {
            return this.forArray.filter(v => v.judge)
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
                }, 0)
                console.log('inner')
            }
            // })
        },

        selectValue () {
            // console.log(document.getElementById('inputFile'))
            // document.getElementById('inputFile').dispatchEvent(new Event('click'))

            console.log('watch')
            // document.getElementById('inputFile').click()
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
        },

        changeArrayList () {
            this.$set(this.arrayList, 1, 250)
        },

        changeSomeObject () {
            // this.$set(this.someObject, 'b', 250)
            // 或下面方法
            this.someObject = {
                ...this.someObject,
                b: 909090
            }
        },

        handleSelectChange (v) {
            // console.log('onchange')
            // console.log(document.getElementById('inputFile'))
            document.getElementById('inputFile').click()
        }
    }
}
</script>

<style lang="scss" scoped>
    #move{
        position: fixed;
        width: 100px;
        height: 100px;
        background-color: red;
    }
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
