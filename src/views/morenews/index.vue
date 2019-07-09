<template>
  <div class="container">
      <hzNewsList class="news-category" :value="newsData.news"></hzNewsList>
  </div>
</template>

<script>
import hzNewsList from '@/components/news-list'
export default {
  name: 'morenews',
  components: {
    hzNewsList
  },
  data () {
    return {
      newsData: []
    }
  },
  methods: {
    getNewsData () {
      this.$axios.get(this.$api.getAllNewsByCategory + this.$route.params.id).then(res => {
        this.newsData = res.data
      })
    }
  },
  mounted () {
    this.getNewsData()
  }
}
</script>

<style scoped lang="scss">
.container {
  min-height: 710px;
}
</style>
