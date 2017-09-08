import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './type'
Vue.use(Vuex)


const state={
	isBoss:false,
	currentMis:{},	//当前登陆者的信息
	nxKey:'',
	nxToken:'',
	saleList:[],
	hotelList:[],
	customerInfoObj:{},
	historyObj:{},
	signObj:{},
	notDealInviteNum:0,	//待处理的邀约事件数量
	reportHotelList:[],					//报备酒店，用于添加客户记录时酒店报备下选择的酒店list
	choosedReportHotel:[],				//已选报备酒店
	choosedInviteHotel:[]				//已选邀约酒店
}

const mutations={
	[type.IS_BOSS](state,boolFlag){
		state.isBoss = boolFlag;
	},
	[type.CURRENT_MIS](state,obj){
		state.currentMis = obj;
	},
	[type.NX_KEY](state,str){
		state.nxKey = str;
	},
	[type.NX_TOKEN](state,str){
		state.nxToken = str;
	},
	[type.SALE_LIST](state,list){
		state.saleList = list;
	},
	[type.HOTEL_LIST](state,list){
		state.hotelList = list;
	},
	[type.CUSTOMER_INFO_OBJ](state,obj){
		state.customerInfoObj = obj;
	},
	[type.HISTORY_OBJ](state,obj){
		state.historyObj = obj;
	},
	[type.SIGN_OBJ](state,obj){
		state.signObj = obj;
	},
	[type.REPORT_HOTEL_LIST](state,list){
		state.reportHotelList = list;
	},
	[type.CHOOSED_REPORT_HOTEL](state,list){
		state.choosedReportHotel = list;
	},
	[type.CHOOSED_INVITE_HOTEL](state,list){
		state.choosedInviteHotel = list;
	},
	[type.NOT_DEAL_INVITE_NUM](state,num){
		state.notDealInviteNum = num;
	}
}

const actions= {
	 setIsBoss({commit},boolFlag){
	 	commit(type.IS_BOSS,boolFlag);
	 },
	 setCurrentMis({commit},obj){
	 	commit(type.CURRENT_MIS,obj);
	 },
	 setNxKey({commit},str){
	 	commit(type.NX_KEY,str);
	 },
	 setNxToken({commit},str){
	 	commit(type.NX_TOKEN,str);
	 },
	 setSaleList({commit},list){
	 	commit(type.SALE_LIST,list);
	 },
	 setHotelList({commit},list){
	 	commit(type.HOTEL_LIST,list);
	 },
	 setCustomerInfoObj({commit},obj){
	 	commit(type.CUSTOMER_INFO_OBJ,obj);
	 },
	 setHistoryObj({commit},obj){
	 	commit(type.HISTORY_OBJ,obj);
	 },
	 setSignObj({commit},obj){
	 	commit(type.SIGN_OBJ,obj);
	 },
	 setReportHotelList({commit},list){
	 	commit(type.REPORT_HOTEL_LIST,list);
	 },
	 setChoosedReportHotel({commit},list){
	 	commit(type.CHOOSED_REPORT_HOTEL,list);
	 },
	 setChoosedInviteHotel({commit},list){
	 	commit(type.CHOOSED_INVITE_HOTEL,list);
	 },
	 setNotDealInviteNum({commit},num){
	 	commit(type.NOT_DEAL_INVITE_NUM,num);
	 }

}

const getters = {
	getIsBoss:state=>state.isBoss,
	getCurrentMis:state=>state.currentMis,
	getNxKey:state=>state.nxKey,
	getNxToken:state=>state.nxToken,
	getSaleList:state=>state.saleList,
	getHotelList:state=>state.hotelList,
    getCustomerInfoObj:state=>state.customerInfoObj,
    getHistoryObj:state=>state.historyObj,
    getSignObj:state=>state.signObj,
    getReportHotelList:state=>state.reportHotelList,
    getChoosedReportHotel:state=>state.choosedReportHotel,
    getChoosedInviteHotel:state=>state.choosedInviteHotel,
    getNotDealInviteNum:state=>state.notDealInviteNum
}


export default new Vuex.Store({
    state:state,
	actions:actions,
	mutations:mutations,
	getters:getters
})