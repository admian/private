 import Vue from 'vue'
 import vuex from 'vuex'
 Vue.use(vuex)
const state = {
  showTabbar:false,
  showHeader:false,
  showModal:false,
  indexTabIndex:0,
  headerTxt:'测试',
  showShare:true,
  showFocus:false,
  showNew:false
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

    if(routerPath == '/' || routerPath== '/story' || routerPath == '/dream' || routerPath == '/impromptu' || routerPath == '/dub' || routerPath == '/choiceness'){
      state.showTabbar = true;
      state.showHeader = false;
      if(routerPath == '/choiceness'){
        state.showFocus = false;
        state.showShare = false;
        state.showNew=false;
      }
    }else{
      //头部标签
      state.showTabbar = false;
      state.showHeader = true;
      //
      if(routerPath=='/new'){
        state.showFocus = true;
        state.showShare = false;
        state.showNew=false;
      }
      if(routerPath=='/myfocus' || routerPath=='/newfocus' || routerPath=='/ateme' || routerPath =='/reviews' || routerPath == '/givelike' || routerPath == '/xtmessage' || routerPath == '/setlog' ||routerPath =='/account'||routerPath =='/telmsg'||routerPath=='/uptel'){
        state.showFocus = false;
        state.showShare = false;
        state.showNew=false;
      }
      if(routerPath=='/person'){
        state.showFocus=false;
        state.showShare = true;
        state.showNew=true;
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
