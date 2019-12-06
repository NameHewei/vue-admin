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
        <a href="/static"></a>
        <div style="color: #fff; text-align: center">
            {{ MD5SHA1 }}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CryptoJS from 'crypto-js'

export default {
    data () {
        return {
            autoLogin: false,
            MD5SHA1: '',
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

    created () {
        console.log('get store data: ', this.projectName)
        this.actionSetProjectName('Login create data!!')
        setTimeout(() => {
            console.log('setTimeout get store data: ', this.projectName)
        }, 1000)
    },

    computed: {
        ...mapState(['projectName'])
    },

    watch: {
        'formData.password' (v) {
            if (v) {
                this.MD5SHA1 = CryptoJS.SHA1(CryptoJS.MD5(v).toString()).toString()
            } else {
                this.MD5SHA1 = ''
            }
        }
    },

    methods: {
        ...mapActions(['actionSetProjectName']),
        ...mapActions('user', ['actionSetUserInfo']),
        submitForm () {
            this.actionSetUserInfo()
            this.$router.push({
                path: '/'
            })
            // this.$refs.formLogin.validate((valid) => {
            //     if (valid) {
            //         alert('submit!')
            //     } else {
            //         console.log('error submit!!')
            //         return false
            //     }
            // })
        }
    }
}
</script>

<style type="text/scss" lang="scss" scoped>
@import '@/styles/login/login.scss';
</style>
