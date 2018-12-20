 import Vue from 'vue'
 import vuex from 'vuex'
 import { cookie } from 'vux'
 Vue.use(vuex)
 const iy_cookie=cookie.get('cookie')==null ? " " :cookie.get('cookie').split('\t');
const state = {
  routerPath:'/',
  showTabbar:false,
  // baseUrl:'https://file.niyouxi77.com/',
  showShare:false,
  showHeader:false,
  showModal:false,
 /* is_login:iy_cookie[1] ? true : false,
  token:iy_cookie[0],
  my_userId:iy_cookie[1],
  my_userNick:iy_cookie[2],
  my_userHeadPic:iy_cookie[3],*/
  is_login:cookie.get('iy_userId') ? true : false,
  token:cookie.get('iy_token'),
  my_userId:cookie.get('iy_userId'),
  my_userNick:cookie.get('iy_userNick'),
  my_userHeadPic:cookie.get('iy_userHeadPic'),
  tips:[]
}
const mutations = {
  SHOWTABBAR(state,routerPath) {
    /*    if(routerPath == '/goodsFrom' || routerPath == '/goodsDetails' || routerPath == '/joinUs' || routerPath == '/address' || routerPath == '/refund'  || routerPath == '/login' || routerPath == '/reset' || routerPath == '/code' || routerPath == '/agreement' || routerPath =='/setting'|| routerPath =='/tradeConfirm' || routerPath =='/sendComment' || routerPath=='/secondCircles'|| routerPath=='/concernMore' || routerPath=='/publish' || routerPath=='/detail' || routerPath=='/pushCircle'){
          state.showTabbar = false;
          state.has_footer_padding = true;
        }else{
          state.showTabbar = true;
          state.has_footer_padding = false;
        }*/
    state.routerPath = routerPath;
    if (routerPath == '/' || routerPath == '/story' || routerPath == '/dream' || routerPath == '/impromptu' || routerPath == '/dub' || routerPath == '/login' || routerPath == '/forgotPwd' || routerPath == '/demo' || routerPath == '/report' || routerPath == '/choiceness' || routerPath == '/deduce_det' || routerPath == '/activityDetails' || routerPath == '/groupDet' || routerPath == '/storyDetails') {
      state.showTabbar = true;
      state.showHeader = false;
      if (routerPath == '/login' || routerPath == '/forgotPwd' || routerPath == '/demo' || routerPath == '/report') {
        state.showTabbar = false;
      }
    } else if(routerPath == '/editdata' || routerPath == '/activityDetails' || routerPath == '/person') {
      state.showTabbar = false;
      state.showHeader = false;
    }


  },
  /*设置state*/
  SETSTATE(state,payload){
    state[payload.type] = payload.val;
  }
}
const actions = {
  showTabbar(context,obj) {
    context.commit("SHOWTABBAR",obj);
  },
}
const getters = {

}
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
