import Vue from 'vue'
import AppOrderListIndex from './AppOrderListIndex.vue';
import AppOrderSearch from './AppOrderSearch.vue';
import AppOrderDetail from './AppOrderDetail.vue';
import AppSubOrderDetail from './AppSubOrderDetail.vue';
import AppMyIndex from './AppMyIndex.vue';
import AppMyGoalPage from './AppMyGoalPage.vue';
import '../main.less';
import FastClick from 'fastclick'
FastClick.attach(document.body);

new Vue({
  el: '#app',
  mounted:function(){
  },
  components: {
    AppOrderListIndex,
    AppOrderSearch,
    AppOrderDetail,
    AppSubOrderDetail,
    AppMyIndex,
    AppMyGoalPage,
  }
})
