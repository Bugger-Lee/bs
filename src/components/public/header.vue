<template>
  <div class="Header">
    <div class="headers">
      <p class="headers-left">
        <i class="ml15">Journey Builder</i>
      </p>
      <p class="headers-center">
        <span
          v-for="i in tabList"
          :key="i.id"
          :class="{'selectState':changeTab == i.id}"
          @click="changes(i.id)"
        >{{i.name}}</span>
      </p>
      <div class="headers-right">
        <div class="headers-right-r">
          <p class="login-icon ml15">
            <i class="icon-dengluyonghu"></i>
          </p>
          <span class="login-icon-id">Chen Jingxue</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      tabList: [
        {
          id: 1,
          name: "Journeys"
        }
      ],
      changeTab: 1,
      userName:''
    };
  },
  created() {
    let user = {
      user_name:this.userName
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    if(user.user_name == '') {
      this.userList()
    }else{
      this.$router.push('./')
    }
  },
  methods: {
    changes(id) {
      this.changeTab = id;
    },
    userList() {
      this.$.get('http://bestsellerdmp.bestseller.com.cn/web/sso').then(res=>{
        if(res.data.code == 200) {
          this.userName = res.data.data.user_name
        }else{
          this.$message(res.data.msg)
        }
      })
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
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 5px solid #ccc;
  .headers-left {
    font-size: 17px;
    display: inline-block;
    i {
      font: bold 25px Brush Script MT;
      text-shadow: 0px 2px 5px #ccc;
      font-style: italic;
    }
  }
  .headers-center {
    display: inline-block;
    margin-left: 35px;
    height: 100%;
    font-size: 14px;
    span {
      padding: 0 8px;
      margin-right: 15px;
      height: 100%;
      display: inline-block;
    }
    .selectState {
      height: 100%;
      border-top: 4px solid #923100;
      border-left: 1px solid #e4e8ee;
      border-right: 1px solid #e4e8ee;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
      background-color: #fff;
    }
  }
  .headers-right {
    float: right;
    width: 15%;
    text-align: center;
    .headers-right-r {
      margin-right: 20px;
      line-height: 0px;
      margin-top: 5px;
      .login-icon {
        width: 35px;
        height: 35px;
        background-color: #409eff;
        display: inline-block;
        border-radius: 50%;
        text-align: center;
        i {
          color: #fff;
          font-size: 20px;
          line-height: 35px;
        }
      }
      .login-icon-id{
        line-height: 0px;
        margin-top: 5px;
      }
    }
  }
}
</style>


