import Vue from 'vue'
import Router from 'vue-router'
import homeList from '@/components/page/home/homeList'
import marketingActive from '@/components/page/active/marketingActive'
import activeDetail from '@/components/page/detial/activeDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeList',
      component: homeList
    },
    {
      path: '/marketingActive',
      name: 'marketingActive',
      component: marketingActive
    },
    {
      path: '/activeDetail',
      name: 'activeDetail',
      component: activeDetail
    }
  ]
})
