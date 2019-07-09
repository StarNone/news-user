<template>
  <div class="msg">
    <hz-upload class="avatar-item" @success="changeAvatar">
      <img class="avatar" :src="usermsg.avatar" alt="">
    </hz-upload>
    <div class="msg-item1" v-if="visible">
      <div class="nikename">
        <span>昵称：</span>
        <p>{{nikename}}</p>
      </div>
      <div class="sex">
        <span>性别：</span>
        <p>{{sex}}</p>
      </div>
      <div class="birthday">
        <span>出生年月：</span>
        <p>{{birthday}}</p>
      </div>
      <div class="address">
        <span>居住地址：</span>
        <p>{{address[0]}}{{address[1]}}{{address[2]}}</p>
      </div>
      <div class="signature">
        <span>个性签名：</span>
        <p>{{signature}}</p>
      </div>
      <div class="hobby">
        <span>爱好：</span>
        <p>{{hobby}}</p>
      </div>
    </div>
    <div class="msg-item2" v-if="!visible">
      <div class="nikename">
        <span>昵称：</span>
        <el-input
          class="input"
          v-model="nikename"
          clearable
          ></el-input>
      </div>
      <div class="sex">
        <span>性别：</span>
        <el-input
          class="input"
          v-model="sex"
          ></el-input>
      </div>
      <div class="birthday">
        <span>出生年月：</span>
        <el-date-picker
          class="input"
          v-model="birthday"
          type="date"
          placeholder="选择日期"
          ></el-date-picker>
      </div>
      <div class="address">
        <span>居住地址：</span>
        <el-cascader
          class="input"
          :options="cityOptions"
          v-model="address"
          ></el-cascader>
      </div>
      <div class="signature">
        <span>个性签名：</span>
        <el-input
          class="signature-item input"
          type="textarea"
          :rows="2"
          v-model="signature"
          ></el-input>
      </div>
      <div class="hobby">
        <span>爱好：</span>
        <el-input
          class="hobby-item input"
          type="textarea"
          :rows="1"
          v-model="hobby"
          ></el-input>
      </div>
    </div>
    <div class="revise">
      <el-button class="btn1" @click="revise" v-if="visible">修改资料</el-button>
      <el-button class="btn1" @click="save" v-if="!visible">确认修改</el-button>
      <el-button class="btn2" @click="changePassword">修改密码</el-button>
    </div>
  </div>
</template>

<script>
import CityData from '../../../../static/js/city_data2017_element'
import moment from 'moment'
import hzUpload from '@/components/hzupload'
export default {
  name: 'personmsg',
  components: {
    hzUpload
  },
  data () {
    return {
      avatar: '../../../assets/logo.png',
      nikename: '昵称',
      sex: '男',
      birthday: '2018-2-2',
      address: [
        '河北省',
        '唐山市',
        '曹妃甸区'
      ],
      signature: '这个人很懒，什么都没有写...',
      hobby: '看电影、读书、旅游',
      cityOptions: CityData,
      visible: true
    }
  },
  methods: {
    revise () {
      this.visible = false
    },
    save () {
      const _this = this
      let sexnum = this.sex === '男' ? 0 : 1
      this.$axios.put(this.$api.changeMessage, {
        nikename: this.nikename,
        sex: sexnum,
        birthday: this.birthday,
        address: this.address,
        signature: this.signature,
        hobby: this.hobby
      }).then(res => {
        if (res.code === 200) {
          _this.$alert(res.msg, '信息提示')
          _this.visible = true
          _this.$store.dispatch('getUserMsg')
        }
      })
    },
    getUserData () {
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('getUserMsg')
      }
    },
    userDataInit () {
      this.nikename = this.$store.state.userMsg.nikename
      this.sex = this.$store.state.userMsg.sex === 0 ? '男' : '女'
      this.birthday = moment(this.$store.state.userMsg.birthday).format('YYYY-M-D')
      this.address = this.$store.state.userMsg.address
      this.signature = this.$store.state.userMsg.signature
      this.hobby = this.$store.state.userMsg.hobby
    },
    changeAvatar (url) {
      url = url.replace('https', 'http')
      this.$axios.put(this.$api.changeAvatar, {avatar: url}).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg, '信息提示')
          this.$store.dispatch('getUserMsg')
        }
      })
    },
    changePassword () {
      this.$router.push({
        name: 'changepassword'
      })
    }
  },
  created () {
    this.userDataInit()
  },
  computed: {
    usermsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>

<style scoped lang="scss">
.msg {
  position: relative;
  height: 573px;
  margin-bottom: 60px;

  .avatar-item {
    position:absolute;
    top: 0;
    left: 0;

    .avatar {
      display: block;
      height: 100px;
      margin: 10px;
    }
  }

  .msg-item1 {
    margin-left: 200px;

    div {
      margin-top: 50px;

      span {
        display: inline-block;
        color: #888;
        width: 100px;
      }

      p {
        display: inline;
      }
    }

    .nikename {
      margin-top: 14px;
    }
  }

  .msg-item2 {
    margin-left: 200px;

    div {
      margin: 14px 0 0 0;

      span {
        display: inline-block;
        color: #888;
        width: 100px;
      }

      .input {
        margin-left: 20px;
        width: 300px;
      }
    }

    .signature {

      span {
        float: left;
        margin-top: 20px;
      }

      .signature-item {
        margin-left: 24px;
      }
    }

    .hobby {

      span {
        float: left;
        margin-top: 20px;
      }

      .hobby-item {
        margin-left: 24px;
      }
    }
  }

  .revise {
    margin: 90px auto;
    width: 600px;
    height: 50px;

    .btn1 {
      float: left;
    }

    .btn2 {
      float: right;
    }
  }
}
</style>
