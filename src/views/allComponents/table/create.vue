<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="handleClose">
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'create',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            dialogFormVisible: false,
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
        show (v) {
            this.dialogFormVisible = v
        },
        id (id, old) {
            this.currentId = id
            if (id && id !== old) {
                this.getDetail()
            }
            if (!id) {
                this.resetData()
            }
        }
    },

    methods: {
        resetData () {
            this.form = {
                name: '',
                region: ''
            }
        },

        getDetail () {
            this.form = {
                name: 'detail name',
                region: '11'
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
                    console.log('error submit!!')
                    return false
                }
            })
        },

        handleHide () {
            this.$emit('callback')
        },

        handleClose () {
            this.handleHide()
        },

        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm (formName) {
            this.$refs.ruleForm.resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
