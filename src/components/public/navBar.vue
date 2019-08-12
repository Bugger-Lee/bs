<template>
  <el-col :span="4" :class="{'menu-none':this.isCollapse == true}" class="aside">
    <el-menu :default-active="this.$router.push" router :collapse="isCollapse">
      <el-submenu :index="i.id" v-for="i in this.menuList" :key="i.id">
        <template slot="title">
          <i class="icon-wenjian fs18"></i>
          <span>{{i.name}}</span>
        </template>
        <el-menu-item-group v-for="j in i.children" :key="j.id">
          <el-menu-item :index="j.path_url">
            <template slot="title">
              <i class="el-icon-star-off fs16"></i>
              <span>{{j.name}}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  name:"navBar",
  data() {
    return {
      menuList: [],
    }
  },
  created() {
    this.getMenu()
  },
  props:["isCollapse"],
  methods:{
    getMenu() {
      this.$.get("home/getMenu").then(res=>{
        this.menuList = res.data.data
      })
    },
  }
}
</script>
<style lang="less" scoped>
.aside{
  height: 100%;
  background-color: #fff; 
  .fs18{
    font-size: 18px;
  }
  .fs16{
    font-size: 16px;
  }
}
.el-menu{
  border-right: none;
}
.el-submenu .el-menu-item{
  height: 40px !important;
  line-height: 40px !important;
}
.menu-none{
  width: 64px;
}
</style>