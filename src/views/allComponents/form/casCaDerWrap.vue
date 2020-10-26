<template>
    <div style="display:inline-block">
        <pre>可获得label(不能第一级单选，第二级多选，只能统一单选或多选)</pre>
        <pre>checkStrictly: true 是否严格的遵守父子节点不互相关联, 如果没有设置，又对数据进行了disabled 处理，则不能正常显示数据</pre>
        <el-cascader
            ref="refCas"
            v-model="value"
            @change="handleChange"
            @remove-tag="handleRemoveTag"
            :options="options"
            :props="casProps"
            :show-all-levels="false"
            style="width: 100%"
            placeholder="请选择"
        >
        </el-cascader>
    </div>
</template>

<script>
export default {
    /* 级联选择组件 */
    name: 'casCaDerWrap',

    model: {
        prop: 'casValue',
        event: 'selected'
    },

    props: {
        casValue: {
            type: Object,
            default: () => ({})
        },
        casOptions: {
            type: [Object, Array],
            default: () => ([])
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            /**
             * multiple 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值,
             * 当要设置多选默认值时，需要设置该值，否者会在视图显示上有异常
             */
            casProps: { expandTrigger: 'hover', emitPath: false, multiple: false, checkStrictly: true },
            options: [],
            /* 多选时，赋初始值 只需要value值组成的数组 */
            value: ['11']
        }
    },

    created () {
        const { casProps, multiple } = this
        this.casProps = { ...casProps, multiple }
    },

    mounted () {
    },

    watch: {
        casValue: {
            immediate: true,
            handler (v) {
                /* 规范化传递的参数，可以确保是否需要只在初始化数据 */
                /* 只有初始化时才需要赋值操作， 防止多次重复赋值 引发页面交互问题(要多次点击才能选中) */
                if (v.type && v.type === 'init') this.value = v.value
            }
        },
        casOptions: {
            immediate: true,
            handler (v) {
                this.options = v
            }
        }
    },

    methods: {
        handleChange (n) {
            /**
             * 这里不用返回的 n， 原因是 n 只返回了 id，而多数业务是需要返回 id 所对应的文本值
             * 这里是将原始数据直接返回，以便于不同义务需要不同的数据
             */
            this.$nextTick(() => {
                this.$emit('selected', { type: 'change', value: this.$refs.refCas.getCheckedNodes().filter(v => v.checked) })
            })
        },

        /* 当点击输入框的tag 删除时触发；同样的该操作也会触发 change 事件，但是需要在change事件中过滤掉 checked为 false 的值 */
        handleRemoveTag (n) {
            console.log(n)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
