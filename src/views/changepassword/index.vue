<template>
  <div class="container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="changePassword">
        <el-input type="password" v-model="ruleForm.changePassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button">
        <el-button class="btn" type="primary" @click="changepassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'changepassword',
  data () {
    var validateChangePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
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
        changePassword: '',
        password: ''
      },
      rules: {
        changePassword: [
          { validator: validateChangePassword, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      path: ''
    }
  },
  methods: {
    changepassword () {
      const _this = this
      this.$axios.post(this.$api.changePassword, {
        password: this.ruleForm.password,
        changePassword: this.ruleForm.changePassword
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$alert(res.msg, '信息提示', {
            callback: action => {
              _this.$router.back()
            }
          })
        } else {
          _this.$alert(res.msg, '信息提示')
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
