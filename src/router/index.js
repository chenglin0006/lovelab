import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';

import AppHotelDetailIndex from '../hotelIndex/AppHotelDetailIndex.vue';
import AppHotelDetailDiscountIndex from '../hotelIndex/AppHotelDetailDiscountIndex.vue'
import AppHotelDetailRecommandIndex from '../hotelIndex/AppHotelDetailRecommandIndex.vue'
import AppHotelDetailAreaSetIndex from '../hotelIndex/AppHotelDetailAreaSetIndex.vue'
import AppHotelDetailServiceFeeIndex from '../hotelIndex/AppHotelDetailServiceFeeIndex.vue'
import AppHotelDetailMenuDetailIndex from '../hotelIndex/AppHotelDetailMenuDetailIndex.vue'
import AppHotelDetailCooperateIndex from '../hotelIndex/AppHotelDetailCooperateIndex.vue'
import AppHotelDetailOperateIndex from '../hotelIndex/AppHotelDetailOperateIndex.vue'
import AppHotelDetailHallIndex from '../hotelIndex/AppHotelDetailHallIndex.vue'
import AppHotelDetailPicIndex from '../hotelIndex/AppHotelDetailPicIndex.vue'

// 组件
const Invite = resolve => require(['../inviteIndex/AppInviteDetailIndex.vue'], resolve);
const Hotel = resolve => require(['../hotelIndex/AppHotelListIndex.vue'], resolve);
const Own = resolve => require(['../orderIndex/AppMyIndex.vue'], resolve);

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {path: '/',name: 'hotel',component: Hotel,meta:{title:"酒店列表",showBottom:true,tab:'hotel'}},
    {path: '/invite',name: 'invite',component: Invite,meta:{title:"邀约详情",showBottom:true,tab:'invite'}},
    {path: '/hotel',name: 'hotel',component: Hotel,meta:{title:"酒店列表",showBottom:true,tab:'hotel'}},
    {path: '/own',name: 'own',component: Own,meta:{title:"我的",showBottom:true,tab:'own'}},
    {path: '/hotel/hotelDetail', component: AppHotelDetailIndex,meta:{title:"酒店详情",showBottom:false}},
    {path: '/hotel/hotelDetail/hall', component: AppHotelDetailHallIndex,meta:{title:"宴会厅详情",showBottom:false}},
    {path: '/hotel/hotelDetail/discount', component: AppHotelDetailDiscountIndex,meta:{title:"优惠详情",showBottom:false}},
    {path: '/hotel/hotelDetail/recommand', component: AppHotelDetailRecommandIndex,meta:{title:"推荐信息",showBottom:false}},
    {path: '/hotel/hotelDetail/fee', component: AppHotelDetailServiceFeeIndex,meta:{title:"收费及服务",showBottom:false}},
    {path: '/hotel/hotelDetail/menu', component: AppHotelDetailMenuDetailIndex,meta:{title:"菜单详情",showBottom:false}},
    {path: '/hotel/hotelDetail/cooperate', component: AppHotelDetailCooperateIndex,meta:{title:"合作详情",showBottom:false}},
    {path: '/hotel/hotelDetail/operate', component: AppHotelDetailOperateIndex,meta:{title:"运营状况",showBottom:false}},
    {path: '/hotel/hotelDetail/pic', component: AppHotelDetailPicIndex,meta:{title:"图片详情",showBottom:false}},
  ],
  linkActiveClass: 'active'
});

