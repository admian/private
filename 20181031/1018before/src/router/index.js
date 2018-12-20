import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/group/deduce'
import dream from '@/page/group/dream'
import impromptu from '@/page/group/impromptu'
import matter from '@/page/group/matter'
import deduceDet from '@/page/group/deduceDet'
import story from '@/page/group/story'
import activityDetails from '@/page/group/activityDetails' //梦想活动详情
import dub from '@/page/group/dub'//配音
import dubDetails from '@/page/group/dubDetails' //配音详情
import New from '@/page/personCenter/new' //消息
import myFocus from '@/page/personCenter/myFocus' //我的关注
import person from '@/page/personCenter/index' //个人主页
import choiceness from '@/page/choice/index' //精选
import store from '../store'
Vue.use(Router)

const  router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/dream',
      name: 'dream',
      component: dream
    },{
      path: '/dub',
      name: 'dub',
      component: dub
    },{
      path: '/impromptu',
      name: 'impromptu',
      component: impromptu
    },{
      path: '/story',
      name: 'story',
      component: story
    },
    {
      path: '/matter',
      name: 'matter',
      component: matter
    },
    {
      path: '/deduce_det',
      name: 'deduce_det',
      component: deduceDet
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
    },
    {
      path:'/new',
      name:'New',
      component:New
    },
    {
      path:'/myfocus',
      name:'myFocus',
      component:myFocus
    },
    {
      path:'/person',
      name:'person',
      component:person
    },
    {
      path:'/choiceness',
      name:'choiceness',
      component:choiceness
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch("showTabbar",to.path);
  next();
})
export default router
