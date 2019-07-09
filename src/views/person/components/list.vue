<template>
  <div class="list">
    <div class="list-msg" v-for="(item, index) in message" :key="index">
      <el-card class="box-card" shadow="hover">
        <span>{{item.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleLook(item._id)">查看详情</el-button>
      </el-card>
    </div>
    <el-pagination
      class="pagemenu"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[8]"
      :current-page="currentPage"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    value: [],
    status: 0
  },
  data () {
    return {
      message: [],
      currentPage: 1,
      totalpages: 0,
      pagesize: 8,
      newsData: []
    }
  },
  methods: {
    initMessage () {
      this.message = this.newsData.slice(0, this.pagesize)
    },
    inittotalpage () {
      this.totalpages = Math.round(this.newsData.length)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initMessage()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.message = this.newsData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    getNewsData () {
      const _this = this
      this.$axios.get(this.$api.getNews, {
        params: {
          status: this.status
        }
      }).then(res => {
        console.log(res)
        _this.newsData = res.data
        this.initMessage()
        this.inittotalpage()
      })
    },
    handleLook (id) {
      this.$router.push({
        name: 'usernews',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.getNewsData()
  }
}
</script>

<style scoped>
.list {
  position: relative;
  height: 640px;
}

.box-card {
  margin-top: 12px;
}

.pagemenu {
  position: absolute;
  bottom: 20px;
  left: 228px;
}
</style>
