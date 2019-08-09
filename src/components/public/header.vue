<template>
  <div class="Header" v-loading.fullscreen.lock="fullscreenLoading">
    <header class="headers">
      <el-col :span="4" class="headers-left ellipsis">
        <i class="ml15" @click="goToHome()">Journey Builder</i>
      </el-col>
      <el-col :span="1" class="headers-center">
        <i class="el-icon-menu" @click="menuShow"></i>
      </el-col>
      <el-col :span="19" class="headers-right">
        <i class="el-icon-s-custom"></i>
        <span class="login-icon-id">{{this.userInfo}}</span>
      </el-col>
    </header>
    <section class="container">
      <el-col :span="4" class="container-l" :class="{'menu-none':this.isCollapse == true}" >
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
    </section>
  <div style="width:100%;height:100%;position:fixed;background:white;" v-if="this.alertIndex==true"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Header",
  data() {
    return {
      linkUserId:'',
      userInfo:'',
      fullscreenLoading: false,
      alertIndex:false,
      menuList: [],
      isCollapse:false
    }
  },
  // created() {
  //   let url = window.location.href
  //   let indexStart = url.indexOf("==")
  //   let indexEnd = url.indexOf("?token")
  //   if(indexStart > 0) {
  //     this.linkUserId = url.substring(indexStart+2,indexEnd).replace("#","").replace("/","")
  //   }else{
  //     this.linkUserId = ''
  //   }
  //   if(this.linkUserId == '') {
  //     this.fullscreenLoading = true
  //     this.alertIndex = false
  //     this.$.get('getSsoUrl').then(res=>{
  //       window.location.href=res.data.data
  //     })
  //   }else if(this.linkUserId != ''){
  //     this.fullscreenLoading = false
  //     this.$.get('getUserInfo',{params:{bsAccount:this.linkUserId}}).then(res=>{
  //       if(res.data.code == 200) {
  //         this.alertIndex = false
  //         this.userInfo=res.data.data.user_name
  //         let user = {
  //           user_info:res.data.data.user_name
  //         }
  //         sessionStorage.setItem("user", JSON.stringify(user));
  //       }else{
  //         this.alertIndex = true
  //         this.linkUserId = ''
  //         this.$alert(res.data.msg, '提示', {
  //           confirmButtonText:'请重新登录',
  //           showClose:false,
  //           callback: action => {
  //             window.location.href="https://sso.bestseller.com.cn/sso/login?service=http://bestsellerdmp.bestseller.com.cn/journey-builder/j_spring_cas_security_check?spring-security-redirect=http://bestsellerdmp.bestseller.com.cn/journey-builder/index.html"
  //           }
  //         });
  //         return false
  //       }
  //     })
  //   }else{
  //     this.$router.push('./')
  //   }
  // },
  // created() {
  //   for(var i=0;i<this.journey.length;i++) {
  //     console.log(this.journey[i].children)
  //   }
  // },
  created() {
    this.getMenu()
  },
  methods: {
    goToHome() {
      this.$router.push('./')
    },
    getMenu() {
      this.$.get("home/getMenu").then(res=>{
        this.menuList = res.data.data
      })
    },
    menuShow() {
      if(this.isCollapse == false) {
        this.isCollapse = true
      }else{
        this.isCollapse = false
      }
    }
  }
};
</script>
<style scoped lang="less">
.Header {
  width: 100%;
  height: 100%;
}
.headers {
  width: 100%;
  height: 60px;
  background-color: #335ba9;
  position: fixed;
  line-height: 60px;
  top: 0;
  left: 0;
  font-size: 24px;
  color: #fff;
  .headers-left {
    background-color: #274885; 
    cursor: pointer;
  }
  .headers-center {
    height: 100%;
    padding-left: 10px;
    i{
      cursor: pointer;
    }
  }
  .headers-right {
    padding-right: 20px;
    text-align: right;
    line-height: 54px;
    i{
      vertical-align: middle;
    }
    .login-icon-id{
      font-size: 12px;
    }
  }
}
.container{
  background-color: #f0f2f5;
  width: 100%;
  height: ~"calc(100% - 60px)";
  padding-top: 60px;
  .container-l{
    height: 100%;
    background-color: #fff;
    .fs18{
      font-size: 18px;
    }
    .fs16{
      font-size: 16px;
    }
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


