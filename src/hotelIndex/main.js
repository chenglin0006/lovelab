import Vue from 'vue'
import AppHotelListIndex from './AppHotelListIndex.vue'
import AppHotelDetailIndex from './AppHotelDetailIndex.vue'
import AppHotelDetailInfoIndex from './AppHotelDetailInfoIndex.vue'
import AppHotelDetailDiscountIndex from './AppHotelDetailDiscountIndex.vue'
import AppHotelDetailRecommandIndex from './AppHotelDetailRecommandIndex.vue'
import AppHotelDetailAreaSetIndex from './AppHotelDetailAreaSetIndex.vue'
import AppHotelDetailServiceFeeIndex from './AppHotelDetailServiceFeeIndex.vue'
import AppHotelDetailMenuDetailIndex from './AppHotelDetailMenuDetailIndex.vue'
import AppHotelDetailCooperateIndex from './AppHotelDetailCooperateIndex.vue'
import AppHotelDetailOperateIndex from './AppHotelDetailOperateIndex.vue'
import AppHotelDetailHallIndex from './AppHotelDetailHallIndex.vue'
import AppHotelDetailPicIndex from './AppHotelDetailPicIndex.vue'
import '../main.less';
import FastClick from 'fastclick'
FastClick.attach(document.body); 

new Vue({
	el: '#app',
  mounted:function(){
    window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
  },
	components: {
      AppHotelListIndex,
  		AppHotelDetailIndex,
  		AppHotelDetailInfoIndex,
  		AppHotelDetailDiscountIndex,
  		AppHotelDetailRecommandIndex,
  		AppHotelDetailAreaSetIndex,
  		AppHotelDetailServiceFeeIndex,
  		AppHotelDetailMenuDetailIndex,
  		AppHotelDetailCooperateIndex,
  		AppHotelDetailOperateIndex,
  		AppHotelDetailHallIndex,
      AppHotelDetailPicIndex
	}
})
