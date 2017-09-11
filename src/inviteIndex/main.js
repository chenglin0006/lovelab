import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/store.js'
import AppInviteDetailIndex from './AppInviteDetailIndex.vue'
import '../main.less';
import FastClick from 'fastclick'
FastClick.attach(document.body); 
Vue.use(Vuex);

new Vue({
	el: '#app',
	store:store,
	mounted:function(){
		window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
	},
	components: {
      AppInviteDetailIndex
	}
})

//需要其他的接口：1。检查邀约时间是否重复 2。添加用户看店记录的接口
