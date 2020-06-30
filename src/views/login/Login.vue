<template>
    <div class="login-part">
        <el-row type="flex" justify="center">
            <el-col :span="5">
                <el-form :model="formData" :rules="rules" ref="formLogin">
                    <el-form-item prop="username">
                        <el-input type="text" v-model="formData.username" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :type="eyeStatus? 'text' : 'password'" v-model="formData.password" placeholder="password"></el-input>
                        <div :class="eyeStatus? 'eye-open': 'eye-close'" @click="handleEye"></div>
                    </el-form-item>
                    <el-checkbox class="auto-login" v-model="autoLogin">remember login</el-checkbox>
                    <el-form-item>
                        <el-button style="width:100%" type="primary" @click="submitForm">Login</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:100%" type="primary" @click="reset">reset</el-button>
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
import { cookieMethods } from '@/utils/commonFn'
import { mapState, mapActions } from 'vuex'
import { reqLogin, reqUserInfo } from '@/api/user/user.js'
import CryptoJS from 'crypto-js'

export default {
    data () {
        return {
            autoLogin: false,
            MD5SHA1: '',
            eyeStatus: false,
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
        /* 如果能获取到用户信息 直接跳转 不再次登录 */
        reqUserInfo()
            .then((result) => {
                console.log('登录页自动登录')
                this.$router.push({ path: '/' })
            }).catch((err) => {
                console.log(err)
            })
    },

    computed: {
        ...mapState(['projectName', 'someKey'])
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

        handleEye () {
            this.eyeStatus = !this.eyeStatus
        },

        submitForm () {
            this.$refs.formLogin.validate((valid) => {
                if (valid) {
                    reqLogin()
                        .then(({ name, age, roles, token }) => {
                            cookieMethods.set('token', token)
                            this.actionSetUserInfo({
                                name,
                                age,
                                roles
                            })
                                .then((result) => {
                                    this.$router.push({ path: '/' })
                                }).catch((error) => {
                                    console.log(error)
                                })
                        }).catch((err) => {
                            console.log('error in login page:', err)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        reset () {
            Object.assign(this.$data, this.$options.data())
        }
    }
}
</script>

<style type="text/scss" lang="scss" scoped>
@import '@/styles/login/login.scss';
</style>
