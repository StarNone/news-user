<template>
  <div class="header-item">
    <div class="container">
      <router-link :to="{name: 'index'}" class="left">
        <img src="../../../assets/logo.png" alt="">
        <i>NEWS  新闻发布网</i>
      </router-link>
      <router-link :to="{name: 'index'}" class="mainpage">首页</router-link>
      <div class="right-login" v-if="!usermsg.nikename">
        <router-link :to="{name: 'login'}" class="login">
          <p type="danger" class="login-item">
            登录
          </p>
        </router-link>
      </div>
      <div class="right-msg" v-if="usermsg.nikename">
        <img :src="usermsg.avatar" alt="" class="avatar">
        <el-dropdown class="user-msg" @command="handleCommand">
          <span class="el-dropdown-link username">
            {{usermsg.nikename}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link :to="{name: 'person'}">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'h',
  data () {
    return {
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        sessionStorage.removeItem('token')
        this.$store.commit('CHANGE_USER_MSG', {})
        if (location.hash === '#/person') {
          this.$router.push({
            name: 'index'
          })
        }
      }
    },
    getUserData () {
      if (sessionStorage.getItem('token')) {
        this.$store.dispatch('getUserMsg')
      } else {
        this.$store.commit('CHANGE_USER_MSG', {})
      }
    }
  },
  created () {
    this.getUserData()
  },
  computed: {
    usermsg () {
      return this.$store.state.userMsg
    }
  }
}
</script>

<style scoped lang="scss">
.header-item {
  background: #409eff;
  width: 100%;
  height: 46px;
  padding: 8px;

  .left {
    float: left;
    margin-top: 2px;

    img {
      float: left;
      width: 50px;
    }

    i {
      float: left;
      color: #fff;
      font-size: 32px;
    }
  }

  .mainpage {
    float: right;
    font-size: 20px;
    margin: 8px;
    color: #fff;
  }

  .mainpage:hover {
    color: #ff0;
  }

  .right-login {
    float: right;
    text-decoration: none;
    margin-top: 8px;

    .login {

      .login-item {
        color: #fff;
        font-size: 20px;
      }

      .login-item:hover {
        color: #ff0;
      }
    }
  }

  .right-msg {
    float: right;

    .avatar {
      float: left;
      height: 40px;
      width: 40px;
      background: #f00;
      border-radius: 40px;
    }

    .user-msg {
      margin-left: 8px;
      height: 40px;
      line-height: 40px;

      .username {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
