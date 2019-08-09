<template>
  <div id="app">
    <Header v-if="!$route.meta.ifHeader"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/public/header'
export default {
  name: 'App',
  data() {
    return {
       
    }
  },
  components:{
    Header
  }
}
</script>
<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
