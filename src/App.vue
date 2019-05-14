<template>
  <div id="app">
    <Header v-if="!$route.meta.ifHeader"></Header>
    <div class="box" :class="{'pt10':$route.meta.ifHeader}">
      <router-view></router-view>
    </div>
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
.box{
    width: 100%;
    height: 100%;
    background-image: url(./assets/img/homeBackgrounds.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 60px;
    box-sizing: border-box;
}
</style>
