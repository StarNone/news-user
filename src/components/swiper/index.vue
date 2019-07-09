<template>
  <el-carousel class="container">
    <el-carousel-item class="msg" v-for="(item, index) in swiperData" :key="index">
      <router-link :to="{name: 'swiperdetails', params: {id: item._id}}">
        <img :src="item.img" alt="">
        <div class="title">
            {{item.title}}
        </div>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      swiperData: []
    }
  },
  methods: {
    getSwiper () {
      const _this = this
      this.$axios.get(this.$api.getSwiper).then(res => {
        _this.swiperData = res.data
      })
    }
  },
  mounted () {
    this.getSwiper()
  }
}
</script>

<style scoped>
.container {
  height: 406px;
}
.el-carousel__item {
  height: 406px;
}
  .el-carousel__item img {
    line-height: 406px;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

.title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 4px 12px;
  font-size: 20px;
  line-height: 40px;
  height: 40px;
  color: #fff;
  background: rgba(0, 0, 0, .5);
}
</style>
