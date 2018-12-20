 import Vue from 'vue'
 import vuex from 'vuex'
 import { cookie } from 'vux'
 Vue.use(vuex)
const state = {
  routerPath:'/',
  is_login:cookie.get('iy_userId') ? true :false,
  showTabbar:false,
  showShare:false,
  showHeader:false,
  showModal:false,
  token:cookie.get('iy_token'),
  my_userId:cookie.get('iy_userId'),
  my_userNick:cookie.get('iy_userNick'),
  my_userHeadPic:cookie.get('iy_userHeadPic'),
  baseUrl:'2651/'
}
const mutations = {
  SHOWTABBAR(state,routerPath){
/*    if(routerPath == '/goodsFrom' || routerPath == '/goodsDetails' || routerPath == '/joinUs' || routerPath == '/address' || routerPath == '/refund'  || routerPath == '/login' || routerPath == '/reset' || routerPath == '/code' || routerPath == '/agreement' || routerPath =='/setting'|| routerPath =='/tradeConfirm' || routerPath =='/sendComment' || routerPath=='/secondCircles'|| routerPath=='/concernMore' || routerPath=='/publish' || routerPath=='/detail' || routerPath=='/pushCircle'){
      state.showTabbar = false;
      state.has_footer_padding = true;
    }else{
      state.showTabbar = true;
      state.has_footer_padding = false;
    }*/
    state.routerPath = routerPath;
    if(routerPath == '/' || routerPath== '/story' || routerPath == '/dream' || routerPath == '/impromptu' || routerPath == '/dub' || routerPath == '/login' || routerPath == '/forgotPwd' || routerPath == '/demo' || routerPath == '/report' || routerPath == '/choiceness'){
      state.showTabbar = true;
      state.showHeader = false;
      if(routerPath == '/login' || routerPath == '/forgotPwd' || routerPath == '/demo' || routerPath == '/report'){
        state.showTabbar = false;
      }
    }else if(routerPath=='/editdata' ||routerPath=='/activityDetails'){
      state.showTabbar = false;
      state.showHeader = false;
      state.showShare=false
    }else{
      state.showTabbar = false;
      state.showHeader = true;
      //
      if(routerPath=='/new'){
        state.showFocus = true;
        state.isShowShare = false;
      }
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
