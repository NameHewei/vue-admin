<template>
    <div>
        <el-form :inline="true" :model="formData" :rules="formRules" ref="searchForm" :label-width="`${labelWidth}px`" class="demo-formData">
            <el-form-item
                v-for="item in searchOptions"
                :key="item.key"
                :label="item.label"
                :prop="item.key"
                :style="`width:${width}px`"
             >
                <el-input v-if="item.type === 'input'" v-model="formData[item.key]"></el-input>
                <el-select v-else-if="item.type === 'select'" v-model="formData[item.key]">
                    <el-option
                        v-for="option in item.options"
                        :key="option.key"
                        :label="option.value"
                        :value="option.key"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="part-btn">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',

    props: {
        width: {
            type: Number,
            default: () => 320
        },
        labelWidth: {
            type: Number,
            default: () => 100
        },
        searchOptions: {
            type: Array,
            /**
             * 输入框示例：[{ type: input, label:'搜索内容名称', key: '后端需要的字段' }]
             * 下拉框示例：[{ type: select, label:'搜索内容名称', key: '后端需要的字段', options: [{ key: value }] }]
             */
            default: () => []
        }
    },

    created () {
        this.createFormData()
    },

    data () {
        return {
            a: '',
            formData: {},
            /** @des 需要时添加 */
            formRules: {}
        }
    },

    methods: {
        createFormData () {
            const { searchOptions } = this, data = {}
            searchOptions.forEach(({ key }) => {
                data[key] = ''
            })
            this.formData = data
        },

        handleSearch () {
            this.$refs.searchForm.validate((valid) => {
                const { formData } = this
                this.$emit('callback', {
                    type: 'search',
                    data: formData
                })
            })
        },

        handleReset (formName) {
            this.$refs.searchForm.resetFields()
            this.$emit('callback', { type: 'reset' })
        }
    }
}
</script>

<style lang="scss" scoped>
.part-btn{
    text-align: right;
}
</style>
