import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/group/deduce'
import dream from '@/page/group/dream'
import impromptu from '@/page/group/impromptu'
import matter from '@/page/group/matter'
import deduceDet from '@/page/group/deduceDet'
import story from '@/page/group/story'
import groupDet from '@/page/group/groupDet'
import demo from '@/page/group/demo'
import personCenter from '@/page/personCenter/index'
import worksDet from '@/page/personCenter/worksDet'
import report from '@/components/report'
import login from '@/page/login/login'
import forgotPwd from '@/page/login/forgotPwd'
import activityDetails from '@/page/group/activityDetails' //梦想活动详情
import dub from '@/page/group/dub'//配音
import dubDetails from '@/page/group/dubDetails' //配音详情
import choiceActivity from '@/page/group/choiceActivity' //选择活动
import New from '@/page/personCenter/new' //消息
import myFocus from '@/page/personCenter/myFocus' //我的关注
import person from '@/page/personCenter/index' //个人主页
import prodution from '@/page/personCenter/prodution' //个人作品


import choiceness from '@/page/choice/index' //精选stack_basic
import newfocus from '@/page/personCenter/newFocus' //消息-关注
import ateme from '@/page/personCenter/ateme' //消息-@我
import reviews from '@/page/personCenter/reviews' //消息-评论
import givelike from '@/page/personCenter/givelike' //消息-点赞
import xtmessage from '@/page/personCenter/xtmessage' //消息-系统通知
import mystory from '@/page/personCenter/mystory' //我的故事
import storyDetails from '@/page/group/storyDetails' //故事详情
import onesStory from '@/page/personCenter/onesStory' //查看别人的故事


import editdata from '@/page/personCenter/editData' //编辑资料
/*
import setlog from '@/page/personCenter/setlog' // 设置、退出
import account from '@/page/personCenter/accountSaty' // 设置-账号安全
import telmsg from '@/page/personCenter/telmsg' //设置-绑定手机
import uptel from '@/page/personCenter/updateTel' //更换绑定手机
import safecode from '@/page/personCenter/safeCode' //安全验证
import newpass  from '@/page/personCenter/newPass' //修改密码
import forgetpass from '@/page/personCenter/forgetpass'  //找回密码

import about from '@/page/personCenter/about' //关于爱演
*/

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
      path:'/personCenter',
      name:'personCenter',
      component:personCenter
    },
    {
      path:'/worksDet',
      name:'worksDet',
      component:worksDet
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/forgotPwd',
      name:'forgotPwd',
      component:forgotPwd
    },
    {
      path:'/demo',
      name:'demo',
      component:demo
    },
    {
      path:'/report',
      name:'report',
      component:report
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
    },
    {
      path:'/newfocus',
      name:'newfocus',
      component:newfocus
    },
    {
      path:'/ateme',
      name:'ateme',
      component:ateme
    },
    {
      path:'/reviews',
      name:'reviews',
      component:reviews
    },
    {
      path:'/givelike',
      name:'givelike',
      component:givelike
    },
    {
      path:'/xtmessage',
      name:'xtmessage',
      component:xtmessage
    },
   /* {
      path:'/setlog',
      name:'setlog',
      component:setlog
    },
    {
      path:'/account',
      name:'account',
      component:account
    },
    {
      path:'/telmsg',
      name:'telmsg',
      component:telmsg
    },
    {
      path:'/uptel',
      name:'uptel',
      component:uptel
    },
    {
      path:'/safecode',
      name:'safecode',
      component:safecode
    },
    {
      path:'/newpass',
      name:'newpass',
      component:newpass
    },
    {
      path:'/forgetpass',
      name:'forgetpass',
      component:forgetpass
    },
    {
      path:'/about',
      name:'about',
      component:about
    },*/
    {
      path:'/editdata',
      name:'editdata',
      component:editdata
    },
    {
      path:'/choiceActivity',
      name:'choiceActivity',
      component:choiceActivity
    },
    {
      path:'/mystory',
      name:'mystory',
      component:mystory
    },
    {
      path:'/storyDetails',
      name:'storyDetails',
      component:storyDetails
    },
    {
      path:'/onesStory',
      name:'onesStory',
      component:onesStory
    },
    {
      path:'/prodution',
      name:'prodution',
      component:prodution
    },
    {
      path:'/groupDet',
      name:'groupDet',
      component:groupDet
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch("showTabbar",to.path);
  next();
})
export default router
