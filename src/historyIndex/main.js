import Vue from 'vue'
import Vuex from 'vuex';
import store from './vuex/store.js'
import '../main.less';
import AppAddHistoryIndex from './AppAddHistoryIndex.vue';
Vue.use(Vuex);
import FastClick from 'fastclick'
FastClick.attach(document.body); 

new Vue({
	el: '#app',
  store:store,
  mounted:function(){
    window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
  },
	components: {
      AppAddHistoryIndex
	}
})
