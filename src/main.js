// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/https/axios'
import '@/assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.less'
import 'jquery-ui-dist/jquery-ui'
import '@/components/need.js'
Vue.prototype.$ = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  let _this = this
  const type = to.meta.requireAuth
  if(type===true) {
    let url = window.location.href
    let indexStart = url.indexOf("==")
    let indexEnd = url.indexOf("?token")
    let linkUserId = ''
    let userInfo = ''
    if(indexStart > 0) {
      linkUserId = url.substring(indexStart+2,indexEnd).replace("#","").replace("/","")
    }else{
      linkUserId = ''
    }
    let user = {
      user_info:userInfo
    }
    sessionStorage.setItem("user", JSON.stringify(user));
    if(linkUserId == '') {
      debugger
      // console.log(111)
      // axios.get('getSsoUrl').then(res=>{
        // window.location.href=res.data.data
        window.location.href="https://www.baidu.com/"
        return false
      // })
    }else if(linkUserId != ''){
      axios.get('getUserInfo',{params:{bsAccount:linkUserId}}).then(res=>{
        userInfo=res.data.data.user_name
      })
    }else{
      _this.$router.push('./')
    }
  }else{
    // next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
