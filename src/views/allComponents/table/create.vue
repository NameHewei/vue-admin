<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="handleClose">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
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
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            }
        }
    },

    watch: {
        show (v) {
            this.dialogFormVisible = v
            if (v) {
                this.resetData()
            }
        }
    },

    methods: {
        resetData () {
            // this.form.name = ''
            // this.form.region = ''
            this.form = {
                name: '',
                region: ''
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
