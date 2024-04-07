<template>
  <div>
  <div class="sign">
    <div><img src="../assets/img/logosl.png"></div>
    <div class="sign-box">
      <el-row>
        <el-col :span="18" :offset="3" style="margin-top:20px;">
          <div class="input-box">
            <i class="el-icon-user"></i>
            <input type="text" class="name" placeholder="用户名" v-model="login.name"/>
          </div>
          <div class="input-box">
            <i class="el-icon-message"></i>
            <input type="text" class="email" placeholder="邮箱" v-model="login.email"/>
          </div>
          <div class="input-box">
            <i class="el-icon-lock"></i>
            <input type="password" class="pass" placeholder="密码" v-model="login.password"/>
          </div>
          <el-button type="success" plain style="width:100%;margin-bottom:10px;" @click="register">创建免费账户</el-button>
          <el-divider>第三方登录</el-divider>
          <div>已有账号？ <router-link to="/login">登录</router-link></div>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      login: {
        name: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    register () {
      if (this.login.name === '') {
        this.$message({message: '请输入用户名', type: 'warning'});
        return
      }
      if (this.login.password === '') {
        this.$message({message: '请输入密码', type: 'warning'});
        return
      }
      if (this.login.email === '') {
        this.$message({message: '请输入邮箱', type: 'warning'});
        return
      }
      this.$http({url: '/registered', method: 'post', data: this.login}).then(res => {
        if (res.errcode === 0) {
          this.$router.push({path: '/login'})
        } else {
          let msg = res.msg
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.sign{
  width: 380px;
  height: 600px;
  margin: auto;
  margin-top: 120px;
}
.sign-box{
  width: 340px;
  height: 480px;
  margin: 0 auto;
  border: 1px solid rgba(0,0,0,.06);
}
.name,.pass,.email{
  width: 200px;
  height: 40px;
  float: left;
  line-height: 40px !important;
  border:none;
  outline: none;
}
.input-box{
  width: 100%;
  margin: 30px auto;
  overflow: hidden;
  border-bottom: #ccc 1px solid;
}
.el-icon-user,.el-icon-lock,.el-icon-message{
  font-size: 20px;
  float: left;
  line-height: 40px !important;
  margin-right: 20px;
}
</style>


