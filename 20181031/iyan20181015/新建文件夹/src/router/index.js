import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import dream from '@/page/group/dream' //梦想
import activityDetails from '@/page/group/activityDetails' //梦想活动详情
import dub from '@/page/group/dub'//配音
import dubDetails from '@/page/group/dubDetails' //配音详情

import store from '../store'
Vue.use(Router)

const  router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path:'/dream',
      name:'dream',
      component:dream
    },
    {
      path:'/dub',
      name:'dub',
      component:dub
    },
    {
      path:'/activityDetails',
      name:'activityDetails',
      component:activityDetails
    },
    {
      path:'/dubDetails',
      name:'dubDetails',
      component:dubDetails
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch("showTabbar",to.path);
  next();
})
export default router
