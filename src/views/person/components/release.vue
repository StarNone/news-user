<template>
  <div class="release">
    <div class="title">
      <span>新闻题目：</span>
      <el-input v-model="title"></el-input>
    </div>
    <div class="desc">
      <span>新闻简介：</span>
      <el-input v-model="desc"></el-input>
    </div>
    <div class="content">
      <span>新闻内容：</span>
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
        @on-upload-success="onEditorUploadComplete" />
    </div>
    <div class="category">
      <span>新闻分类：</span>
      <el-radio-group v-model="categoryId" v-for="(item, index) in categoryData" :key="index">
        <el-radio-button :label="item._id">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="">
      <el-button type="primary" @click="release">发布</el-button>
    </div>
  </div>
</template>

<script>
import editor from '@/components/editor'
export default {
  name: 'release',
  components: {
    editor
  },
  data () {
    return {
      editorSetting: {
        height: 600
      },
      url: '',
      MaxSize: 75765, // 文件大小
      Accept: 'image/jpeg, image/png', // 文件格式
      withCredentials: true,
      menuboolen: true,
      toolbar: 'fontselect bold italic underline strikethrough | link unlink',
      content: '', // 富文本编辑器双向绑定的内容
      categoryId: '',
      categoryData: [],
      title: '',
      desc: ''
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
    getCategoryData () {
      const _this = this
      this.$axios.get(this.$api.getCategory).then(res => {
        _this.categoryData = res.data
      })
    },
    release () {
      this.$axios.post(this.$api.addNews, {
        title: this.title,
        desc: this.desc,
        content: this.content,
        categoryId: this.categoryId
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg, '信息提示')
        }
      })
    }
  },
  created () {
    this.getCategoryData()
  }
}
</script>

<style scoped lang="scss">
.release {

  div {
    margin-top: 10px;
    span {
      display: block;
      color: #555;
      margin: 10px;
    }
  }
}
</style>
