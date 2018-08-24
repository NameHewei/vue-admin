<template>
    <div class="login-part">
        <el-row type="flex" justify="center">
            <el-col :span="5">
                <el-form :model="formData" status-icon :rules="rules" ref="formLogin">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="formData.username" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="formData.password" placeholder="password"></el-input>
                    </el-form-item>
                    <el-checkbox class="auto-login" v-model="autoLogin">remember login</el-checkbox>
                    <el-form-item>
                        <el-button style="width:100%" type="primary" @click="submitForm">Login</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <a href="/static">3434433434</a>
    </div>
</template>
<script>
export default {
  data () {
    return {
      autoLogin: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'please enter username', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please enter password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.formLogin.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
@import '../../styles/login/login.scss';
</style>
