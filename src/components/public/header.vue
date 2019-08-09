<template>
  <div class="Header" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="headers">
      <el-col :span="4" class="headers-left ellipsis">
        <i class="ml15" @click="goToHome()">Journey Builder</i>
      </el-col>
      <el-col :span="1" class="headers-center">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="19" class="headers-right">
        <i class="el-icon-s-custom"></i>
        <span class="login-icon-id">{{this.userInfo}}</span>
      </el-col>
    </div>
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
      alertIndex:false
    };
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
  methods: {
    goToHome() {
      this.$router.push('./')
    }
  }
};
</script>
<style scoped lang="less">
.Header {
  position: fixed;
  z-index: 100;
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
</style>


