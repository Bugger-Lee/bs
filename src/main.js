// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/https/axios'
import '@/assets/iconfont/iconfont.css' // 小图标
import ElementUI from 'element-ui' // UI框架
import 'element-ui/lib/theme-chalk/index.css'  // UI框架
import '@/assets/css/base.less' // 公共样式
import 'jquery-ui-dist/jquery-ui'
import '@/components/need.js'
import store from './store'
Vue.prototype.$ = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
