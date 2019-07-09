<template>
  <div class="container">
    <h1 class="title">注册</h1>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="first-item" v-if="active == 0">
      <span>账号：</span>
      <el-form-item
        prop="account">
        <el-input
          class="input"
          v-model="ruleForm.account"
          clearable
          placeholder="请输入账号"></el-input>
      </el-form-item>
      <span>密码：</span>
      <el-form-item prop="password">
        <el-input
          class="input"
          type="password"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          show-password></el-input>
      </el-form-item>
      <span>确认密码：</span>
      <el-form-item prop="secondPassword">
        <el-input
          class="input"
          type="password"
          v-model="ruleForm.secondPassword"
          placeholder="请再次输入密码"
          show-password></el-input>
      </el-form-item>
      <el-button class="next" @click="next1">下一步</el-button>
    </el-form>
    <div class="second-item" v-if="active == 1">
      <div class="nikename">
        <span>昵称：</span>
        <el-input class="input" v-model="nikename" clearable></el-input>
      </div>
      <div class="sex">
        <span>性别：</span>
        <el-radio-group v-model="sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </div>
      <div class="birthday">
        <span>出生年月：</span>
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择日期"></el-date-picker>
      </div>
      <div class="address">
        <span>居住地址：</span>
        <el-cascader
          :options="cityOptions"
          v-model="address"
          @change="changeProvince"></el-cascader>
      </div>
      <div class="hobby">
        <span>爱好：</span>
        <el-input
          class="input"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="hobby"></el-input>
      </div>
      <div class="btns">
        <el-button class="last" @click="last">上一步</el-button>
        <el-button class="next" @click="submit">提交</el-button>
      </div>
    </div>
    <div class="third-item" v-if="active == 3">
      <h1 class="message">注册成功!</h1>
    </div>
  </div>
</template>

<script>
import CityData from '../../../static/js/city_data2017_element'
export default {
  name: 'register',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.secondPassword !== '') {
          this.$refs.ruleForm.validateField('secondPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      ruleForm: {
        account: '',
        password: '',
        secondPassword: ''
      },
      nikename: '',
      sex: 0,
      birthday: '',
      cityOptions: CityData,
      address: [],
      hobby: '',
      rules: {
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        secondPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      const _this = this
      this.$axios.post(this.$api.Register, {
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        nikename: this.nikename,
        sex: this.sex,
        birthday: this.birthday,
        address: this.address,
        hobby: this.hobby
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          _this.next()
        }
      })
    },
    last () {
      this.active--
    },
    next () {
      this.active++
      if (this.active === 2) this.active = 3
    },
    changeProvince () {},
    next1 () {
      const _this = this
      if (this.password !== this.secondPassword) {
        this.$alert('两次密码不一致！', '信息提示')
      } else {
        this.$axios.post(this.$api.Check, {
          account: this.ruleForm.account
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            _this.next()
          } else {
            _this.$alert(res.msg, '信息提示')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  min-height: 710px;

  .title {
    font-size: 50px;
    color: #0099ff;
    text-align: center;
    margin: 40px;
  }

  .first-item {
    width: 300px;
    margin: 104px auto;

    span {
      color: #409eff;
      font-size: 20px;
    }

    .input {
      margin: 10px 0;
    }

    .next {
      float: right;
    }
  }

  .second-item {
    width: 400px;
    margin: 100px auto;
    padding: 100px;
    border: 1px solid #0099ff;
    border-radius: 20px;

    .hobby {

      span {
        float: left;
        margin-top: 12px;
      }
    }

    .btns {
      margin-top: 30px;

      .next {
        float: right;
      }
    }

    div {
      margin: 10px 0;

      span {
        color: #409eff;
      }

      .input {
        width: 300px;
      }
    }
  }

  .third-item {
    margin: 300px auto;
    text-align: center;
    font-size: 36px;
    color: #0099ff;
    font-family:'Courier New', Courier, monospace;
  }
}
</style>
