<template>
  <div class="container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <router-link :to="{name: 'register'}" class="register"><el-link>还没有账号？赶紧注册一个吧</el-link></router-link>
      <el-form-item class="button">
        <el-button class="btn" type="primary" @click="check">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'login',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('passowrd')
        }
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      path: ''
    }
  },
  methods: {
    login () {
      const _this = this
      this.$axios.post(this.$api.Login, {
        account: this.ruleForm.account,
        password: this.ruleForm.password
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          let token = res.data.token
          sessionStorage.setItem('token', token)
          _this.$store.dispatch('getUserMsg').then(this.$alert(res.msg, '信息提示', {
            callback: action => {
              _this.$router.back()
            }
          }))
        } else {
          _this.$alert(res.msg, '信息提示')
        }
      })
    },
    check () {
      this.$axios.post(this.$api.checkUser, {
        account: this.ruleForm.account
      }).then(res => {
        if (res.data.limitTime === '永久禁用') {
          this.$alert(`用户${res.data.nikename},您好！由于您的一些违规操作，您的账号已被永久禁用！！！`)
        } else {
          let limitTime = new Date(res.data.limitTime).getTime()
          let nowTime = new Date().getTime()
          if (nowTime < limitTime) {
            limitTime = moment(limitTime).format('YYYY年M月D日')
            this.$alert(`用户${res.data.nikename}，您好！由于你的一些违规操作，你的账号已被封禁，封禁截止日期为${limitTime}`, '信息提示')
          } else {
            this.login()
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {

  .demo-ruleForm {
    display: inline-block;
    padding: 260px 280px;
    width: 400px;
  }

  .register {
    float: right;
    color: #0099ff;
  }

  .button {
    margin-top: 60px;

    .btn {
      width: 100%;
    }
  }
}
</style>
