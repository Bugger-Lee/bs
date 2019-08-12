<template>
  <div id="app">
    <appRouterViev></appRouterViev>
  </div>
</template>

<script>
import appRouterViev from './components/public/appRouterViev'
export default {
  name: 'App',
  data() {
    return {
       
    }
  },
  components:{
    appRouterViev
  }
}
</script>
<style scoped lang="less">
#app{
  width: 100%;
  height: 100%;
}
</style>
