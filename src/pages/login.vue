<template>
  <div>
  <div class="sign">
    <div class="sign-img">
      <img src="../assets/img/logoy.png">
      <div>记住 / 过往，记忆 / 永存</div>
    </div>
    <div class="sign-box">
      <el-row>
        <el-col :span="14" :offset="5" style="margin-top:20px;">
          <div class="input-box">
            <i class="el-icon-user"></i>
            <el-input type="text" style="border: 0 !important;" class="name" placeholder="用户名/邮箱" v-model="login.name" @keyup.enter.native="loginFn"></el-input>
          </div>
          <div class="input-box">
            <i class="el-icon-lock"></i>
            <el-input type="text" style="border: 0 !important;" class="pass" placeholder="密码" v-model="login.pw" @keyup.enter.native="loginFn"></el-input>
          </div>
          <!-- <input type="file" @change="uploadFile"> -->
          <div>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="loginFn" @keyup.enter.native='loginFn'>登录</el-button>
          </div>
          <div>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="loginWxFn" @keyup.enter.native='loginWxFn'>微信小程序登录</el-button>
          </div>
          <!-- <el-divider>第三方登录</el-divider> -->
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>
<script>

import supabase from '@/utils/supabaseQuery'
import { login } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      login: {
        name: '',
        pw: ''
      },
      src: 'data:image/jpeg;base64,eyJlcnJjb2RlIjo0MDE2OSwiZXJybXNnIjoiaW52YWxpZCBsZW5ndGggZm9yIHNjZW5lLCBvciB0aGUgZGF0YSBpcyBub3QganNvbiBzdHJpbmcgaGludDogW2ZHcERNYk1yZS13TjQ0U2FdIHJpZDogNWY0Yzk0YTctMjUyOTk1Y2ItMGQyYzdhZmQifQ=='
    }
  },
  methods: {
    async loginFn () {
      if (this.login.name === '') {
        this.$message.warning('输入用户名')
        return
      } else if (this.login.pw === '') {
        this.$message.warning('输入登录密码')
        return
      }
      this.$http({url: `https://api.youlaji.com/v1/login?name=${this.login.name}&pw=${this.login.pw}`, method: 'get'}).then(res => {
        if (res.errcode === 0) {
          this.$store.commit('token', res.data.token)
          this.$store.commit('setUserInfo', res.data)
          this.Cookies.set('token', res.data.token, {expires: 1 / 24})
          this.$router.push({path: '/admin'})
        } else {
          this.Cookies.remove('token')
          this.$store.commit('token', '')
          this.$store.commit('setUserInfo', {})
          this.$message.error(res.data.msg)
        }
        // 跳转到指定页面
        // _this.$router.go(-1);
        // 往回跳
      })
    },
    async uploadFile (file) {
      console.log(file.target.files)
      const { data, error } = await supabase.storage.from('imgs').upload('/2024/' + new Date().toISOString().replace(/[:.-]/g, '') + '.' + file.target.files[0].name.split('.')[1], file.target.files[0])
      console.log(data)
      if (error) {
        // Handle error
      } else {
        // Handle success
      }
    },
    loginWxFn () {
      this.$http({url: '/weixin', method: 'post'}).then(res => {
        console.log(res)
        this.src = 'data:image/png;base64,' + res
      })
    }
  }
}
</script>
<style scoped>
.sign{
  width: 680px;
  height: 450px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #f5f8fc;
}
.sign-img{
  width: 260px;
  height: 450px;
  float: left;
  background: #2c3e50;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center
}
.sign-img img{
  margin-top: 100px;
}
.sign-img div{
  margin-top: 40px;
}
.sign-box{
  width: 420px;
  height: 450px;
  float: left;
}
.name,.pass{
  width: 200px;
  height: 40px;
  float: left;
}
.name input,.pass input{
  padding: 0;
  line-height: 40px;
  border:none;
  outline: none;
}
.input-box{
  width: 100%;
  margin: 40px auto;
  overflow: hidden;
}
.el-icon-user,.el-icon-lock{
  font-size: 20px;
  float: left;
  line-height: 40px;
  margin-right: 20px;
}
.input-box .el-input__inner{
  border: 0 !important;
}
</style>


