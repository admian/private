// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import tools from './utils/tools'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/base.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)


Vue.use(VideoPlayer)
Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$get = tools.get;
Vue.prototype.$post = tools.post;
Vue.prototype.$setAutoSize = tools.setAutoSize;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
