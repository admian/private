 import Vue from 'vue'
 import vuex from 'vuex'
 import { cookie } from 'vux'
 Vue.use(vuex)


const state = {
  routerPath:'/',
  showTabbar:false,
  baseUrl:'https://file.niyouxi77.com/',
  showShare:false,
  showHeader:false,
  showModal:false,

  is_login:false,
  token:null,
  my_userId:null,
  my_userNick:null,
  my_userHeadPic:null,
  tips:[]
}
const mutations = {
  SHOWTABBAR(state,routerPath) {
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
    //console.log(payload);
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
