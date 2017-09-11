require('es6-promise').polyfill();
import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/store.js'
import router from './router/index.js';
import './main.less';
import App from './App.vue';
Vue.use(Vuex);

router.afterEach(route=>{
	if(route.meta.title){
		document.title = route.meta.title;
		store.dispatch('setBottomStatus',route.meta.showBottom);
	}
	if(route.meta.tab){
		store.dispatch('setActiveTab',route.meta.tab);
	}
})

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
