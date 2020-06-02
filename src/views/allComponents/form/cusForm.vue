<template>
    <el-form :model="formData" :rules="formRules" ref="cusForm" label-width="200px">
        <pre>主要利用blur事件将获取到input 将其值重新赋给绑定的字段，若提交了输入值，当类似编辑赋初值时需要伪造一条列表数据</pre>
        <el-form-item label="可输入，可搜索">
            <el-select
                v-model="formData.inputSelect"
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
                v-model="formData.selected"
            >
                <el-option
                    v-for="item in sOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
        </el-form-item>
        <pre>可获得label(不能第一级单选，第二级多选，只能统一单选或多选)</pre>
        <el-form-item label="级联选择">
            <el-cascader
                ref="refCas"
                v-model="formData.relationSelect"
                :options="options"
                :show-all-levels="false"
                :props="{ expandTrigger: 'hover', emitPath: false, multiple: true }"
                @change="handleChange"
            ></el-cascader>
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
import RelationSelect from './relationSelect'
export default {
    name: 'CusForm',
    components: {
        RelationSelect
    },
    data () {
        return {
            formData: {
                inputSelect: '',
                selected: [{ value: '1', label: '第一' }],
                relationSelect: '3',
                levelSelect: []
            },
            formRules: {
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
                    value: '21',
                    label: '2-1'
                }]
            }, {
                value: '3',
                label: '第一级3'
            }]
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs.cusForm.validate((valid) => {
                if (valid) {
                    console.log(this.formData)
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
            const arr = this.$refs.refCas.getCheckedNodes()
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i].label, arr[i].parent ? arr[i].parent.label : '--')
            }
        },

        handleInputSelectBlur (e, ee) {
            console.log(e, ee.target.value)
            this.formData.inputSelect = ee.target.value
        },

        handleRelationSelect (v) {
            this.formData.levelSelect = v
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
