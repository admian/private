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
Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$get = tools.get;
Vue.prototype.$post = tools.post;
Vue.prototype.$setAutoSize = tools.setAutoSize;
Vue.prototype.filtName = tools.filtName;
Vue.prototype.filtNunm = tools.filtNunm;
Vue.prototype.getTimestamp = tools.getTimestamp;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
