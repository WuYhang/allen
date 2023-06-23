import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import router from './router';
import store from './store';
import './api/mock'
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router);
  }
}).$mount('#app')
