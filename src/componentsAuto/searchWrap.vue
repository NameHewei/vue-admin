<template>
    <div>
        <div :class="{'ele-inline': inline}">
            <el-form :inline="true" :model="formData" :rules="formRules" ref="searchForm" :label-width="`${labelWidth}px`" class="demo-formData">
                <el-form-item
                    v-for="item in searchOptions"
                    :key="item.key"
                    :label="withoutLabel ? '' : item.label"
                    :prop="item.key"
                    :style="widthStyle"
                >
                    <el-input v-if="item.type === 'input'" v-model="formData[item.key]" :placeholder="withoutLabel ? item.label : ''"></el-input>
                    <el-select v-else-if="item.type === 'select'" :clearable="item.clearable" :multiple="!!item.multiple" v-model="formData[item.key]" :placeholder="withoutLabel ? item.label : ''">
                        <el-option
                            v-for="option in item.options"
                            :key="option.key"
                            :label="option.value"
                            :value="option.key"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-else-if="item.type === 'date'"
                        v-model="formData[item.key]"
                        type="date"
                        :placeholder="withoutLabel ? item.label : '选择日期'">
                    </el-date-picker>
                    <el-date-picker
                        v-else-if="item.type === 'dateTime'"
                        v-model="formData[item.key]"
                        type="datetime"
                        :placeholder="withoutLabel ? item.label : '选择日期时间'">
                    </el-date-picker>
                    <el-date-picker
                        v-else-if="item.type === 'dateTimeRange'"
                        v-model="formData[item.key]"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-date-picker
                        v-else-if="item.type === 'dateRange'"
                        type="daterange"
                        v-model="formData[item.key]"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-cascader
                        v-else-if="item.type === 'cascade'"
                        v-model="formData[item.key]"
                        :show-all-levels="false"
                        :options="item.options"
                        :placeholder="withoutLabel ? item.label : ''"
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
        </div>
        <div :class="{ 'part-btn': true,'ele-inline':inline }">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
        </div>
    </div>
</template>

<script>
export default {
    /* 公用搜索 */
    name: 'SearchWrap',

    props: {
        /** 控制每一条搜索项宽度，不传就直接顺序排列 */
        width: {
            type: [Number, String],
            default: () => 0
        },
        withoutLabel: {
            type: Boolean,
            default: false
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
        },
        /** @des 搜索按钮是否换行 */
        inline: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            formData: {},
            /** @des 需要时添加 */
            formRules: {},
            currentWidth: ''
        }
    },

    created () {
        const { width } = this
        this.getWidthStyle(width)
        this.createFormData()
    },

    methods: {
        getWidthStyle (width) {
            if (width) {
                width = `width:${width}px`
            } else {
                width = ''
            }
            this.widthStyle = width
        },

        createFormData () {
            const { searchOptions } = this; const data = {}
            searchOptions.forEach(({ key, defaultValue }) => {
                data[key] = defaultValue || ''
                if (/Range/.test(key)) this.getWidthStyle(500)
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
.ele-inline{
    display: inline-block;
    vertical-align: text-top;
}
</style>
