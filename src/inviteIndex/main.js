import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/store.js'
import AppInviteDetailIndex from './AppInviteDetailIndex.vue'
import '../main.less';
import KNB from '@dp/knb';
import FastClick from 'fastclick'
FastClick.attach(document.body); 
Vue.use(Vuex);

new Vue({
	el: '#app',
	store:store,
	mounted:function(){
		window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
	    KNB.ready(()=>{
	        KNB.setBouncesEnabled({
	          enabled: 0, //1表示允许反弹，0表示禁止。default: 1
	          success: function(){},
	          fail: function(){}
	        });
	        KNB.setStatusBarStyle({
	          style: 1, //1:状态栏字体为白色, 0:状态栏字体为黑色
	          success: function(){},
	          fail: function(){}
	        });
	        KNB.setLLButton({
              disable: 1,
              success: function(){
                 console.log('reset LLButon success');
              },
              fail: function(){
                 console.log('not supported yet!');
              }
            });
	    });
	},
	components: {
      AppInviteDetailIndex
	}
})

//需要其他的接口：1。检查邀约时间是否重复 2。添加用户看店记录的接口
