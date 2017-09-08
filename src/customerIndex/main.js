import Vue from 'vue'
import Vuex from 'vuex'
import CustomerListIndex from './CustomerListIndex.vue'
import CustomerListWithUserStatus from './CustomerListWithUserStatus.vue'
import CustomerDetail from './CustomerDetail.vue'
import CustomerBusinessDetail from './CustomerBusinessDetail.vue'
import CustomerSignInfo from './CustomerSignInfo.vue'
import CustomerSearch from './CustomerSearch.vue'
import CustomerEdit from './CustomerEdit.vue'
import CommonFun from '../commonJs/CommonFun.js'
import KNB from '@dp/knb'
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
        icon: 'H5_Back', 
        handle: function(){
            KNB.closeWebview({})
        },
        success: function(){
        },
        fail: function(){
        }
    });
})
let mDomain = CommonFun.getDomain();
import '../main.less';
Vue.use(Vuex)
const  user_store = new Vuex.Store({
    state:{
        user: null,
        tips: null,
        customerList: [],
        pageCount: 0,
        index: 1,
        flowStatus: '',
        shopList: [],
        filterShopId: '',
        filterUserStatus: '',
        filterGrade: null,
        filterSales: null,
        customerDetailInfo: null,
        customerBasicInfo: null,
        contractNumber: 0,
        signOrderList: null,
        isLoading: true,
        historyObj: null,
        salesList: null,
        allCSList: null,
        editUserInfo: null,
        clentTypeList: null,
        banquetList: null,
        salesChanceList: null,
        errorMsg: ''
    },
    mutations:{
        getUserInfo(state) {
            let url = `//${mDomain}/lovelab/user/queryAccountInfo`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.user = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getHotelInfo(state) {
            let url = `//${mDomain}/lovelab/user/queryYzsShops`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.shopList = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getTipsInfo(state) {
            let url = `//${mDomain}/lovelab/user/queryUserStatus`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.tips = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getList(state, obj) {
            let msg = {'顾问': 'Sales','售前': 'CS', '服务': 'Service'}[state.user.keyRole]
            let url = `//${mDomain}/lovelab/user/queryUserListFor${msg}?page=${obj.index}&pageSize=10`
            if (state.flowStatus) {
                url += '&flowStatus=' + state.flowStatus
            }
            if (state.filterShopId) {
                url += '&shopId=' + state.filterShopId
            }
            if(state.filterGrade != null) {
                url += '&grade=' + state.filterGrade
            }
            if (state.filterSales != null) {
                url += '&salesId=' + state.filterSales
            }
            if(state.filterTime != null) {
                if (msg == 'Sales') {
                    url += `&assignSalesTimeBegin=${state.filterTime.startTime}&assignSalesTimeEnd=${state.filterTime.endTime}`
                } else if (msg == 'CS') {
                    url += `&addTimeBegin=${state.filterTime.startTime}&addTimeEnd=${state.filterTime.endTime}`
                }
            }
            if(state.filterCS != null) {
                url += `&csMisId=${state.filterCS}`
            }
            if (obj.index == 1) {
                state.customerList = []
            }
            state.isLoading = true
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.pageCount = data.content.pageCount
                    state.pageIndex = obj.index
                    if (state.pageCount == null) {
                        state.isLoading = 'none'
                    } else {
                        if (obj.index >= state.pageCount) {
                            state.isLoading = 'end'
                        } else {
                            state.isLoading = false
                        }
                    }
                    if (data.content.dataList) {
                        for (let i= 0;i<data.content.dataList.length; i++) {
                            state.customerList.push(data.content.dataList[i])
                        }
                    }
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        upgradeFilter(state, obj) {
            state[obj.name] = obj.value
        },
        getCustomerDetail(state, id) {
            let url = `//${mDomain}/lovelab/user/queryUserBriefInfo?yzsUserId=` + id
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.customerDetailInfo = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getCustomerBasicInfo(state, obj) {
            let url = `//${mDomain}/lovelab/user/basicInfo?yzsUserId=${obj.yzsUserId}&businessLineType=${obj.businessLineType}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.customerBasicInfo = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        doSearch(state, obj) {
            let url = `//${mDomain}/lovelab/user/queryUserListByKeyword?page=${obj.pageIndex}&pageSize=10&keyword=${obj.keyword}`
            state.isLoading = true
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.searchKeyWord = obj.keyword
                    state.pageIndex = obj.pageIndex
                    state.pageCount = data.content.pageCount
                    if(state.pageCount == null) {
                        state.isLoading = 'none'
                    } else {
                        if (state.pageIndex >= state.pageCount) {
                            state.isLoading = 'end'
                        } else {
                            state.isLoading = false
                        }
                    }
                    state.customerList = data.content.dataList
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        searchNextPage(state) {
            state.pageIndex = state.pageIndex + 1
            let url = `//${mDomain}/lovelab/user/queryUserListByKeyword?page=${state.pageIndex}&pageSize=10&keyword=${state.searchKeyWord}`
            state.isLoading = true
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    if (state.pageIndex == state.pageCount) {
                        state.isLoading = 'end'
                    } else {
                        state.isLoading = false
                    }
                    let dataList = data.content.dataList
                    for (let i=0; i< dataList.length; i++) {
                        state.customerList.push(dataList[i])
                    }
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getSignInfo(state, id){
            let url = `//${mDomain}/lovelab/user/signInfo?yzsUserId=${id}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.contractNumber = data.content.ContractNumber
                    state.signOrderList = data.content.signOrderList
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getCustomerHistory(state, id){
            let url = `//${mDomain}/lovelab/user/userLogInfo?yzsUserId=${id}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.historyObj = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getSalesList(state, obj) {
            let url = `//${mDomain}/lovelab/order/queryYZSInfoAjaxAction`
            if (obj.businessLineType == 1) {
                url = `//${mDomain}/lovelab/user/getHQSalesList`
                CommonFun.Ajax(url, (data=>{
                    if (data.code == 200) {
                        state.salesList = data.content
                    } else {
                        state.errorMsg = data.string || data.msg
                    }
                }))
            } else {
                CommonFun.Ajax(url, (data=>{
                    if (data.code == 200) {
                        state.salesList = data.content.salesList
                    } else {
                        state.errorMsg = data.string || data.msg
                    }
                }))
            }
        },
        setAssignSales(state, obj) {
            let url = `//${mDomain}/lovelab/user/assignSales?${obj.str}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    obj.fun()
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getAllPersonByRole(state, str) {
            let url = `//${mDomain}/lovelab/user/queryAllPersonByRole?role=${str}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.allCSList = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getCustomerEditInfo(state, yzsUserId) {
            let url = `//${mDomain}/lovelab/user/editUserInfo?yzsUserId=${yzsUserId}`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.editUserInfo = data.content
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        getGeneralEnum(state) {
            let url = `//${mDomain}/lovelab/user/getGeneralEnum`
            CommonFun.Ajax(url, (data=>{
                if (data.code == 200) {
                    state.clentTypeList = data.content.yzsClientTypeEnumList
                    state.banquetList = data.content.yzsUserReqTypeEnumList
                    state.salesChanceList = data.content.yzsSalesChanceEnumList
                } else {
                    state.errorMsg = data.string || data.msg
                }
            }))
        },
        saveCustomer(state, obj) {
            CommonFun.Ajax(obj.url, (data=>{
                obj.fun(data)
            }))
        }
    }
})
new Vue({
    el: '#app',
    store: user_store,
	components: {
        CustomerListIndex,
        CustomerListWithUserStatus,
        CustomerDetail,
        CustomerSearch,
        CustomerBusinessDetail,
        CustomerSignInfo,
        CustomerEdit
	}
})
