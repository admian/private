import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const state = {
  showTabbar:false,
  showHeader:false,
  showModal:false,
  indexTabIndex:0,
  headerTxt:'测试',
  txt:0
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
    if(routerPath == '/' || routerPath.indexOf('/community') > -1 || routerPath == '/cart' || routerPath == '/personCenter' ){
      state.showTabbar = true;
      state.showHeader = false;
    }else{
      state.showTabbar = false;
      state.showHeader = true;
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
