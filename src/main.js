// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.less'
import 'jquery-ui-dist/jquery-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
