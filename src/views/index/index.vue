<template>
  <div>
    <hzHeader></hzHeader>
    <router-view></router-view>
    <hzFooter></hzFooter>
  </div>
</template>

<script>
import hzHeader from './component/header'
import hzFooter from './component/footer'
export default {
  name: 'layout',
  components: {
    hzHeader,
    hzFooter
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
