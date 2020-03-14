import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'c_common/toast'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
fastClick.attach(document.body);
Vue.config.productionTip = false
Vue.use(toast);
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
});
Vue.prototype.$bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
