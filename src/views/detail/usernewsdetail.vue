<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{content.title}}</h1>
      <div class="user-msg">
      <router-link :to="{name: 'person-msg'}" class="author"><el-link>{{author}}</el-link></router-link>
      <p class="date">{{content.updateTime}}</p>
      </div>
      <div class="content-item"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'details',
  data () {
    return {
      content: [],
      itmeid: '',
      author: ''
    }
  },
  methods: {
    getSwiperData () {
      const id = this.$route.params.id || this.itemid
      this.$axios.get(this.$api.getNewsById + id).then(res => {
        let resData = res.data
        resData.updateTime = moment(resData.updateTime).format('YYYY年M月D日')
        this.content = resData
        this.author = resData.author.nikename
        let contentitem = document.querySelector('.content-item')
        contentitem.innerHTML = this.content.content
        document.title = this.content.title
      })
    }
  },
  mounted () {
    this.itemid = this.$route.params.id
    this.getSwiperData()
  }
}
</script>

<style scoped lang="scss">
.container {

  .content {
    padding: 4px;
    min-height: 710px;

    .title {
      font-size: 26px;
      text-align: center;
      color: #000;
    }

    .user-msg {
      margin: 10px;
      text-align: center;
      color: #606266;
      height: 18px;

      .author {

        a {
          margin-top: -3px;
          font-size: 16px;
          background-origin: border-box;
        }
      }

      .date {
        margin-left: 10px;
        height: 18px;
        display: inline-block;
        background-origin: border-box;
      }
    }
  }
}
</style>
