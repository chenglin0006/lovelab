import Vue from 'vue'
import Vuex from 'vuex';
import store from './vuex/store.js'
import KNB from '@dp/knb';
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
    KNB.ready(()=>{
        KNB.setNavigationBarHidden({
          flag: 1, //0表示显示，1表示隐藏
          success: function(){},
          fail: function(){}
        });
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
    });
  },
	components: {
      AppAddHistoryIndex
	}
})
