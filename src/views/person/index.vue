<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="个人资料">
        <hzperson />
      </el-tab-pane>
      <el-tab-pane label="发布新闻">
        <hzrelease />
      </el-tab-pane>
      <el-tab-pane label="已发布">
        <hzlist class="list" :value="releasedData" :status="3"></hzlist>
      </el-tab-pane>
      <el-tab-pane label="待审核">
        <hzlist class="list" :value="auditedData" :status="0"></hzlist>
      </el-tab-pane>
      <el-tab-pane label="审核通过">
        <hzlist class="list" :value="passedData" :status="1"></hzlist>
      </el-tab-pane>
      <el-tab-pane label="审核未通过">
        <hzlist class="list" :value="unpassedData" :status="2"></hzlist>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import hzperson from './components/personmsg'
import hzrelease from './components/release'
import hzlist from './components/list'
export default {
  name: 'person',
  components: {
    hzperson,
    hzrelease,
    hzlist
  },
  data () {
    return {
      releasedData: [
        {
          'title': '测试内容标题1'
        },
        {
          'title': '测试内容标题2'
        },
        {
          'title': '测试内容标题3'
        },
        {
          'title': '测试内容标题4'
        },
        {
          'title': '测试内容标题5'
        },
        {
          'title': '测试内容标题6'
        },
        {
          'title': '测试内容标题7'
        },
        {
          'title': '测试内容标题8'
        },
        {
          'title': '测试内容标题9'
        }
      ],
      auditedData: [
        {
          'title': '待审核测试内容标题1'
        },
        {
          'title': '测试内容标题2'
        },
        {
          'title': '测试内容标题3'
        },
        {
          'title': '测试内容标题4'
        },
        {
          'title': '测试内容标题5'
        },
        {
          'title': '测试内容标题6'
        },
        {
          'title': '测试内容标题7'
        },
        {
          'title': '测试内容标题8'
        },
        {
          'title': '测试内容标题9'
        }
      ],
      passedData: [
        {
          'title': '通过测试内容标题1'
        },
        {
          'title': '测试内容标题2'
        },
        {
          'title': '测试内容标题3'
        },
        {
          'title': '测试内容标题4'
        },
        {
          'title': '测试内容标题5'
        },
        {
          'title': '测试内容标题6'
        },
        {
          'title': '测试内容标题7'
        },
        {
          'title': '测试内容标题8'
        },
        {
          'title': '测试内容标题9'
        }
      ],
      unpassedData: [
        {
          'title': '未通过测试内容标题1'
        },
        {
          'title': '测试内容标题2'
        },
        {
          'title': '测试内容标题3'
        },
        {
          'title': '测试内容标题4'
        },
        {
          'title': '测试内容标题5'
        },
        {
          'title': '测试内容标题6'
        },
        {
          'title': '测试内容标题7'
        },
        {
          'title': '测试内容标题8'
        },
        {
          'title': '测试内容标题9'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
