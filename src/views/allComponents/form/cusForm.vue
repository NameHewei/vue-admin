<template>
    <el-form :model="form" :rules="rules" ref="cusForm" label-width="200px">
        <pre>主要利用blur事件将获取到input 将其值重新赋给绑定的字段，若提交了输入值，当类似编辑赋初值时需要伪造一条列表数据</pre>
        <el-form-item label="name" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="可输入，可搜索">
            <el-select
                v-model="form.inputSelect"
                filterable
                @blur="handleInputSelectBlur('name', $event)"
            >
                <el-option
                    v-for="item in sOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <pre> 这里的 value 传入整个key value 对象 </pre>
        <el-form-item label="可返回label 可多选">
            <el-select
                multiple
                v-model="form.selected"
            >
                <el-option
                    v-for="item in sOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="级联选择">
            <CasCaDerWrap v-model="form.casData" :casOptions="options" multiple/>
        </el-form-item>
        <el-form-item label="联动选择">
            <RelationSelect @callbackRelationSelect="handleRelationSelect"></RelationSelect>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import CasCaDerWrap from './casCaDerWrap.vue'
import RelationSelect from './relationSelect'

export default {
    name: 'CusForm',
    components: {
        RelationSelect, CasCaDerWrap
    },
    data () {
        const validateFn = (rule, value, callback) => {
            const { field } = rule
            const commandObject = {
                name: () => {
                    if (value) {
                        callback()
                    } else {
                        callback(new Error('请输入名称'))
                    }
                },
                error: () => {
                    callback()
                    console.error(`没有${rule.field}项`)
                }
            }

            if (commandObject[field]) {
                commandObject[field]()
            } else {
                callback(new Error(`不存在${field}校验`))
            }
        }
        return {
            form: {
                name: '',
                inputSelect: '',
                selected: [{ value: '1', label: '第一' }],
                levelSelect: [],
                casData: {}
            },
            rules: {
                name: [
                    { required: true, validator: validateFn, trigger: 'blur' }
                ]
            },
            sOptions: [{
                value: '1',
                label: '第一'
            }, {
                value: '2',
                label: '第二'
            }, {
                value: '3',
                label: '第三'
            }],
            options: [{
                value: '1',
                label: '第一级1',
                children: [{
                    /* 这里如果不是 value label  也可以设置prop属性来适配 */
                    value: '11',
                    label: '1-1'
                },
                {
                    value: '12',
                    label: '1-2'
                }, {
                    value: '13',
                    label: '1-3'
                }, {
                    value: '14',
                    label: '1-4'
                }, {
                    value: '15',
                    label: '1-5'
                }]
            }, {
                value: '2',
                label: '第一级2',
                children: [{
                    value: 21,
                    label: '2-1',
                    children: []
                }, {
                    value: '22',
                    label: '2-2'
                }]
            }, {
                value: '3',
                label: '第一级3'
            }]
        }
    },

    mounted () {
        setTimeout(() => {
            this.form.casData = { type: 'init', value: ['11', '21'] }
        }, 3000)
    },

    methods: {
        submitForm (formName) {
            this.$refs.cusForm.validate((valid) => {
                if (valid) {
                    console.log(this.form)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        resetForm (formName) {
            this.$refs[formName].resetFields()
        },

        handleChange (v) {
            console.log('联级选择获取label：')
            /* 该方法是将当前节点后其子节点一并返回 */
            const arr = this.$refs.refCas.getCheckedNodes()
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].label, arr[i].parent ? arr[i].parent.label : '--')
            }
        },

        handleInputSelectBlur (e, ee) {
            console.log(e, ee.target.value)
            this.form.inputSelect = ee.target.value
        },

        handleRelationSelect (v) {
            this.form.levelSelect = v
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
