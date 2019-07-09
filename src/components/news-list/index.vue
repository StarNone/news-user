<template>
  <div class="list">
    <div class="msg" v-for="(item, index) in value" :key="index">
      <router-link :to="{name: 'detail', params: {id: item._id}}" >
        <el-link class="news-item"><p :class="{pmsg: classname}">{{item.title}}</p></el-link>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new-list',
  props: {
    value: [],
    classname: ''
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.list {

  .head {
    height: 40px;

    h1 {
      float: left;
      font-size: 24px;
      color: #555;
    }

    .more {
      margin-top: 6px;
      float: right;
    }
  }

  .msg {

    .news-item {
      font-size: 20px;
      margin-top: 10px;

      .pmsg {
        width: 370px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
