<template>
  <div class="container">
    <hzSwiper></hzSwiper>
    <div class="head" v-for="(item, index) in categoryData" :key="index" >
      <div class="head-item">
        <h1>{{item.name}}</h1>
        <router-link :to="{name: 'morenews', params: {id: item._id}}">
          <el-link class="more">更多...</el-link>
        </router-link>
      </div>
      <hzNewsList class="news-category" :value="item.news" :classname="true"></hzNewsList>
    </div>
  </div>
</template>

<script>
import hzSwiper from '@/components/swiper'
import hzNewsList from '@/components/news-list'
export default {
  name: 'homepage',
  components: {
    hzSwiper,
    hzNewsList
  },
  data () {
    return {
      categoryData: []
    }
  },
  methods: {
    getCategory () {
      this.$axios.get(this.$api.getNewsByCategory).then(res => {
        console.log(res)
        this.categoryData = res.data
      })
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;
  height: 1000px;

   .head {
    float: left;
    margin: 20px 20px;
    padding: 20px;
    width: 400px;
    // height: 200px;

    .head-item {
      height: 40px;
    }

    h1 {
      float: left;
      font-size: 24px;
      color: #555;
    }

    .more {
      margin-top: 6px;
      float: right;
    }

    .news-category {
      display: inline-block;
    }
  }

  .head:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
}
</style>
