import Vue from 'vue'
import '../main.less';
import AppSignIndex from './AppSignIndex.vue'
import AppSignDetailIndex from './AppSignDetailIndex.vue'
import FastClick from 'fastclick'
FastClick.attach(document.body); 

new Vue({
	el: '#app',
  mounted:function(){
    window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
  },
	components: {
      AppSignIndex,
      AppSignDetailIndex
	}
})
