<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="currentShow" @close="handleCancel">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="v1" value="11"></el-option>
                        <el-option label="v2" value="22"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="handleChangeWatchObj">修改watchObj</el-button>
            </div>
            <div>
                <Grandson v-bind="$attrs" v-on="$listeners" :watchObj="watchObj"></Grandson>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Grandson from './grandson'
export default {
    name: 'create',
    components: {
        Grandson
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        selectOptions: {
            type: Array,
            default: () => ([])
        },
        otherKey: {
            type: String,
            default: ''
        }
    },

    created () {
        // console.log('child otherKey:', this.otherKey)
        // console.log('created id', this.id)
        // console.log('created selectOptions', this.selectOptions)
    },

    data () {
        return {
            currentShow: false,
            watchObj: {
                name: 'hew'
            },
            form: {
                name: '',
                region: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'blur' }
                ]
            }
        }
    },

    watch: {
        /* 不直接用 show 属性， 点击dialog自带的关闭，或是点击空白透明区域关闭，会提示 prop 不能修改的 warning */
        show: {
            immediate: true,
            handler (v) {
                this.currentShow = v
                if (v) {
                    this.getDetail()
                } else {
                    this.resetData()
                }
            }
        }
    },

    methods: {
        handleChangeWatchObj () {
            this.watchObj = { name: 'warren11' }
        },

        resetData () {
            /* 这里在第一次执行时是拿不到dom的，所以排除 */
            if (this.$refs.ruleForm) {
                this.$refs.ruleForm.resetFields()
            }
        },

        getDetail () {
            const { id } = this
            if (id) {
                // console.log('有ID')
                this.form = {
                    name: 'detail name',
                    region: '11'
                }
            } else {
                // console.log('无ID')
            }
        },

        handleCancel () {
            this.handleHide()
        },

        handleSure () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.handleHide()
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        },

        handleHide () {
            this.$emit('callback')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
