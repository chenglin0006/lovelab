import Vue from 'vue'
import KNB from '@dp/knb';
import '../main.less';
import AppSignIndex from './AppSignIndex.vue'
import AppSignDetailIndex from './AppSignDetailIndex.vue'
import FastClick from 'fastclick'
FastClick.attach(document.body); 

new Vue({
	el: '#app',
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
    });
  },
	components: {
      AppSignIndex,
      AppSignDetailIndex
	}
})
