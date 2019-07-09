<template>
  <div class="footer-item">
    <div class="container">
      <div class="desc">
        <img src="../../../assets/logo.png" alt="">
        <i class="newsname">NEWS  新闻发布网</i>
        <p>我们一直致力于为新闻发布者提供更优质的新闻发布服务！</p>
      </div>
      <div class="contact">
        <h1>联系方式</h1>
        <div class="contact-item">
          <el-link class="link">新浪微博</el-link>
          <el-link class="link">电子邮件</el-link>
        </div>
      </div>
      <div class="about">
        <h1>关于</h1>
        <div class="about-item">
          <el-link class="link">关于我们</el-link>
          <el-link class="link">广告合作</el-link>
          <el-link class="link">友情链接</el-link>
          <el-link class="link">招聘</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.footer-item {
  width: 100%;
  height: 210px;
  background: #eee;

  .container {

    .desc {
      float: left;
      margin: 60px 0;

      img {
        float: left;
        height: 60px;
      }

      .newsname {
        display: inline-block;
        color: #409eff;
        font-size: 28px;
        margin: 12px;
      }

      p {
        text-align: center;
        margin-top: 12px;
        font-size: 14px;
        color: #555;
      }
    }

    .about {
      float: right;
      width: 80px;
      margin: 40px;

      h1 {
        margin: 6px 0;
        color: #444;
      }

      .link {
        margin: 4px 0;
      }
    }

    .contact {
      float: right;
      width: 80px;
      margin: 40px;

      h1 {
        margin: 6px 0;
        color: #444;
      }

      .link {
        margin: 4px 0;
      }
    }
  }
}
</style>
