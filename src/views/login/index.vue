<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title"></h3>
       <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="工号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima" ></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="outline_chang">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>推荐使用<a href="http://www.google.cn/chrome/browser/desktop/index.html" target="_blank">Google Chrome浏览器</a></div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { parseParamFromJson } from '@/utils/index'
// import Md5 from 'md5'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能小于1位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  
    .login-container {
           position: absolute;
           left: 0;
           top: 0;
           bottom:0;
           right:0;
           background:url(../../assets/login_imgs/beij.png) no-repeat center;
           background-size:cover;
           input:-webkit-autofill {
           color: #050505;
          }
          input{
            background: transparent;
            border:none;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px; 
            font-size:16px;
            height: 47px;
          }
          img{
            max-width:100%;
            height:100%;
            vertical-align: middle
          }
          .el-input{
            display: inline-block;
            height: 47px;
            width: 85%;
          }
          .login-form{
             background-color: #fff;
             position: absolute;
             width:384px;
             height:473px;
             background:url(../../assets/login_imgs/login.png) no-repeat;
             padding:15px;
             right: 150px;
             top:50%;
             transform:translateY(-50%);
             -webkit-transform:translateY(-50%);
          }
          .tips {
            font-size: 14px;
            position:absolute;
            top:390px;
            left:50px;
            color:transparent;
          }
          .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
              font-size: 20px;
            }
          }
          .title {
            width:100%;
            height:80px;
            text-align: center;
            background:url(../../assets/login_imgs/jinjian.png) no-repeat;
            background-position:center top;
            margin: 15px auto 30px auto;
          }
          .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border:1px solid #ccc;
            margin-bottom:30px;
          }
          .outline_chang{
            border: none;
          }
          .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
          }
          .thirdparty-button{
            position: absolute;
            right: 35px;
            bottom: 28px;
            margin-top:25px;
          }
        }
</style>
