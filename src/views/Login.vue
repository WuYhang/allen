<template>
    <el-form ref="form" :inline="true" class="login-container" :rules="rules" :model="form">
        <h3 class="login_title">系统标签</h3>
        <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username" placeholder="请输入姓名"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"> </el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style=" margin-left: 100px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/'
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },

                ], password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit() {
            // // token信息
            // const token = Mock.Random.guid()
            // // token信息存入cookie用于不同页面间通信
            // Cookie.set('token', token)

            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 20000) {
                            Cookie.set('token', data.data.token)
                            // 获取菜单的数据   存入store

                            // data.data.menu

                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            console.log(this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                        } else {
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid rgb(211, 203, 203);
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px 0 rgb(146, 135, 135);
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin: 0px 0px 30px 0;
        color: #505458;
    }
}
</style>