<template>
    <el-form :model="form" :rules="rules" ref="cusForm" label-width="200px">
        <el-form-item label="name" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <pre>带推荐输入框  所有可搜索选择，或直接输入的形式输入框都采用该方式</pre>
        <el-form-item label="recommend" prop="recommend">
            <el-autocomplete
                popper-class="my-autocomplete"
                v-model="form.recommend"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                value-key="cusVal"
                id="someId"
                @select="handleSelect"
                @focus="handleCompleteFocus"
            >
                <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                    <div class="name">{{ item.cusVal }}</div>
                    <span class="addr">{{ item.address }}</span>
                </template>
            </el-autocomplete>
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
            restaurants: [],
            form: {
                name: '',
                recommend: '',
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

        this.restaurants = this.loadAll()
    },

    methods: {
        querySearch (queryString, cb) {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                var restaurants = this.restaurants
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
                // 调用 callback 返回建议列表的数据
                cb(results)
            }, 2000)
        },

        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.cusVal.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },

        handleSelect (item) {
            // console.log('select', item)
        },

        handleCompleteFocus (e) {
            /**
             * 这里通过id去获取当前操作项数据 例如 可编辑表格中获取当前操作的行
             */
            // console.log('change id', e.target.id)
        },

        handleIconClick (ev) {
            // console.log(ev)
        },

        loadAll () {
            return [{ cusVal: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' }]
        },

        submitForm (formName) {
            this.$refs.cusForm.validate((valid) => {
                if (valid) {
                    // console.log(this.form)
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        },

        resetForm (formName) {
            this.$refs[formName].resetFields()
        },

        handleChange (v) {
            // console.log('联级选择获取label：')
            /* 该方法是将当前节点后其子节点一并返回 */
            const arr = this.$refs.refCas.getCheckedNodes()
            for (let i = 0; i < arr.length; i++) {
                // console.log(arr[i].label, arr[i].parent ? arr[i].parent.label : '--')
            }
        },

        handleRelationSelect (v) {
            this.form.levelSelect = v
        },
    }
}
</script>

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
