<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{contentData.title}}</h1>
      <div class="user-msg">
      <router-link :to="{name: 'person-msg'}" class="author"><el-link>{{author}}</el-link></router-link>
      <p class="date">{{contentData.createTime}}</p>
      </div>
      <div class="content-item"></div>
    </div>
    <h1>评论区：</h1>
    <el-divider></el-divider>
    <div class="block">
      <div class="comment-itemmain" v-for="(item, index) in message" :key="index">
        <div class="comment-item">
          <router-link :to="{name: 'person-msg'}"><el-link>{{item.user.nikename}}:</el-link></router-link>
          <p v-html="item.content"></p>
          <el-divider></el-divider>
        </div>
      </div>
      <el-pagination
        class="pagemenu"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 12]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpages">
      </el-pagination>
    </div>
    <div style="margin: 0.5%; width: 90%;">
      <editor
        class="editor"
        :value="content"
        :setting="editorSetting"
        @show="editors"
        :url="url"
        :max-size="MaxSize"
        :accept="Accept"
        :with-credentials="withCredentials"
        :menuboolen="menuboolen"
        :toolbar1="toolbar"
        @on-upload-fail="onEditorReady"
        @on-upload-success="onEditorUploadComplete"></editor>
    </div>
    <el-button type="primary" @click="handleSend">发表评论</el-button>
  </div>
</template>

<script>
import editor from '@/components/editor'
import moment from 'moment'

export default {
  name: 'detail',
  components: {
    editor
  },
  data () {
    return {
      activeName: '1',
      editorSetting: {
        height: 200
      },
      url: '',
      MaxSize: 75765, // 文件大小
      Accept: 'image/jpeg, image/png', // 文件格式
      withCredentials: true,
      menuboolen: false,
      toolbar: 'fontselect bold italic underline strikethrough | link unlink | emoticons',
      content: '', // 富文本编辑器双向绑定的内容
      commentData: [],
      message: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 4,
      contentData: {},
      author: ''
    }
  },
  methods: {
    editors (content) { // editor 组件传过来的值赋给content
      console.log(content)
      this.content = content
    },
    onEditorReady (ins, ina) { // 上传失败的函数
      console.log('ins', ins)
      console.log(ina)
    },
    onEditorUploadComplete (json) { // 处理上传图片后返回数据，添加img标签到编辑框内
      console.log('json', json)
      console.log(json[0].data.filePath)
      this.content = this.content + '<img src=' + json[0].data.filePath + '/>'
    },
    initMessage () {
      this.message = this.commentData.slice(0, this.pagesize)
    },
    inittotalpage () {
      this.totalpages = Math.round(this.commentData.length)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initMessage()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.message = this.commentData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    getSwiperData () {
      const id = this.$route.params.id || this.itemid
      const _this = this
      this.$axios.get(this.$api.getNewsById + id).then(res => {
        let resData = res.data
        resData.createTime = moment(resData.createTime).format('YYYY年M月D日')
        _this.contentData = resData
        _this.author = resData.author.nikename
        let contentitem = document.querySelector('.content-item')
        contentitem.innerHTML = _this.contentData.content
        document.title = _this.contentData.title
      })
    },
    handleSend () {
      if (!sessionStorage.getItem('token')) {
        this.$alert('请先登录', '信息提示')
      } else {
        this.$axios.post(this.$api.addComment, {
          newsId: this.$route.params.id,
          content: this.content
        }).then(res => {
          if (res.code === 200) {
            this.$alert(res.msg, '信息提示')
            this.getCommentData()
          }
        })
      }
    },
    getCommentData () {
      this.$axios.get(this.$api.getComment + this.$route.params.id).then(res => {
        this.commentData = res.data
        this.initMessage()
        this.inittotalpage()
      })
    }
  },
  mounted () {
    this.getSwiperData()
    this.getCommentData()
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;

  .content {
    padding: 4px;

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

  h1 {
    margin-top: 10px;
    margin-left: 4px;
    font-size: 20px;
    color: #888;
  }

  .block {

    .comment-itemmain {

      .comment-item {
        padding: 4px;
      }

      .comment-content {
        margin-top: 4px;
      }
    }

    .pagemenu {
      text-align: center;
    }
  }
}
</style>
