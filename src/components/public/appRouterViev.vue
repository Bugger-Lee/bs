<template>
  <div id="appRouterViev" class="appRouterViev">
    <Header v-if="!$route.meta.ifHeader" @menuShow="menuShow"></Header>
    <section class="container">
      <navBar :isCollapse="isCollapse"></navBar>
      <el-col :span="20" class="main" :class="{'menuWidth':this.isCollapse == true}">
        <router-view></router-view>
      </el-col>
    </section>
  </div>
</template>

<script>
import Header from './header'
import navBar from './navBar'
export default {
  name: 'appRouterViev',
  data() {
    return {
      isCollapse:false       
    }
  },
  components:{
    Header,
    navBar
  },
  methods:{
    menuShow() {
      if(this.isCollapse == false) {
        this.isCollapse = true
      }else{
        this.isCollapse = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.appRouterViev {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  height: ~"calc(100% - 60px)";
  width: 100%;
  padding-top: 60px;
  background-color: #f0f2f5;
  .main{
    padding: 15px;
  }
  .menuWidth{
    width: ~"calc(100% - 60px)"
  }
}
</style>
