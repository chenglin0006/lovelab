<template>
    <section class="add-history-section" :class="{'invite-history':historyType=='邀约看店','is-ios':isIOS}">
        <header class="normal m-header title-header">
            <img class="btn-back js_back" @click="goBack" src="../commonImg/back-head.png" >
            <h1>{{historyType}}</h1>
            <a href="javascript:void(0);" class="btn-save js_save" @click="saveAction">保存</a>
        </header>
        <div style="background-color: #fff">
            <div class="history-type history-item" :class="{'no-margin':historyType=='酒店报备'}">
                <div class="title">轨迹类型</div>
                <div class="value no-arrow">{{historyType}}</div>
            </div>
        </div>
        <div class="invite-shop-div" v-show="historyType=='邀约看店'">
            <!--添加的邀约 -->
            <div class="invite-list-item" v-for="(invite,index) in editInviteList">
                <div class="history-hotel history-item" @click="showInviteCalendarFun(invite)">
                    <div class="title">邀约日期／开始时间</div>
                    <div class="value" v-if="invite.inviteDate">{{invite.inviteDate}}/{{invite.inviteTime}}</div>
                    <div class="value no-select" v-else>未设置</div>
                </div>
                <div class="history-report flex-parent" @click="showInviteSelectFun(invite)">
                    <div class="title label">邀约酒店</div>
                    <div class="report-value value" v-if="invite.choosedInviteHotel&&invite.choosedInviteHotel.length">
                        <div>
                            <p>
                            <span v-for="(item,index) in invite.choosedInviteHotel">{{item.shopName}}<span v-show="index!=invite.choosedInviteHotel.length-1">,</span></span>
                            </p>
                        </div>
                    </div>
                    <div class="report-value value no-select" v-else><span>请选择邀约酒店</span></div>
                </div>
                <div class="delete-invite-btn" v-show="editInviteList.length>1" @click="deleteInviteFun(index)">删除邀约
                </div>
            </div>
            <div class="add-invite-btn" :class="{'top-border':editInviteList.length==1}" @click="addInviteFun">新增邀约</div>
        </div>
        <div class="history-reason history-item" v-show="historyType=='终止销售'" @click="showStopReasonSelectFun">
            <div class="title">终止理由</div>
            <div class="value" v-if="stopReason&&stopReason.text">{{stopReason.text}}</div>
            <div class="value no-select" v-else>请选择终止理由</div>
        </div>
        <div style="background-color: #fff">
            <div class="history-report flex-parent" v-show="historyType=='酒店报备'" @click="showReportSelectFun">
                <div class="title label">报备酒店</div>
                <div class="report-value value" v-if="choosedReportHotel&&choosedReportHotel.length">
                    <div>
                        <p>
                        <span v-for="(item,index) in choosedReportHotel">{{item.shopName}}<span v-show="index!=choosedReportHotel.length-1">,</span></span>
                        </p>
                    </div>
                </div>
                <div class="report-value value no-select" v-else><span>请选择报备酒店</span></div>
            </div>
        </div>
        <div style="background-color: #fff" >
            <div class="communicate-content" :class="{'border-top':historyType=='终止销售'}" v-show="showContentInput">
                <textarea v-if="historyType=='终止销售'" placeholder="请输入终止详细理由" v-model="communicateContent" class="communicate-text"></textarea>
                <textarea v-else-if="historyType=='邀约看店'" placeholder="请输入邀约内容" v-model="communicateContent" class="communicate-text"></textarea>
                <textarea v-else placeholder="请输入沟通内容" v-model="communicateContent" class="communicate-text"></textarea>
            </div>
        </div>
        <div class="customer-level-select-div">
            <span class="customer-level-title">客户等级</span>
            <div class="grade-list-div">
                <div v-for="(item,index) in gradeList" @click="chooseGradeFun(item)">
                    <img v-if="item.active" src="./img/radio-active.png">
                    <img v-else src="./img/radio-default.png">
                    <span>{{item.text}}</span>
                </div>
            </div>
            <!-- <input name="customerLevel" class="customer-level-radio" v-model="customerInfoObj.grade" type="radio" :value="1"/>A类
            <input name="customerLevel" class="customer-level-radio" v-model="customerInfoObj.grade" type="radio" :value="2"/>B类
            <input name="customerLevel" class="customer-level-radio" v-model="customerInfoObj.grade" type="radio" :value="3"/>C类 -->
        </div>
        <div v-show="historyType=='邀约看店'" style="height:60px;background-color: #f0f0f0"></div>
        <app-history-stop-reason v-show="showStopReasonSelect" :stop-reason-text="stopReason.text?stopReason.text:''" :reason-list="selectStopReasonList" @hidestopreason="hideStopReasonSelectFun"></app-history-stop-reason>

        <section class="add-history-invite-section">
            <app-select-mul :title-text="'邀约酒店'" :option-list="customerInfoObj.selectInviteShopList" :placeholder-obj="placeholderObj" :select-list="activeInviteItem.choosedInviteHotel" @hidechoosepop="hideInviteSelectFun" v-if="showChooseInviteStatus" :null-text="'用户暂未报备酒店'"></app-select-mul>
            <app-select-mul :title-text="'报备酒店'" :option-list="unreportedShopList" :placeholder-obj="{'text':'请输入酒店名称'}" :select-list="choosedReportHotel" @hidechoosepop="hideReportSelectFun" v-if="showChooseReportStatus" :null-text="'没有找到匹配项'"></app-select-mul>
        </section>
        <!-- 邀约选择时间 -->
        <app-history-invite-calendar :initcheckintext="activeInviteItem.inviteDate" :invitetime="activeInviteItem.inviteTime" v-if="showInviteCalendarStatus" @hidechoosepop="hideInviteCalendarFun" :maxscheduledatenumber="maxscheduledatenumber" :type="'invite'" :startdate="inviteCalendarStartDate" :yzsuserid="customerInfoObj.yzsUserId"></app-history-invite-calendar>
        <!-- 婚庆邀约选择时间 -->
        <app-history-invite-calendar :initcheckintext="wedInviteItem.inviteDate" :invitetime="wedInviteItem.inviteTime" v-if="showWedInviteCalendarStatus" @hidechoosepop="hideWedInviteCalendarFun" :maxscheduledatenumber="maxscheduledatenumber" :type="'invite'" :startdate="inviteCalendarStartDate" :yzsuserid="customerInfoObj.yzsUserId"></app-history-invite-calendar>
    </section>
</template>
<script>
    import calendarObj from '../inviteIndex/js/inviteCalendar.js';
    import AppHistoryInviteCalendar from '../inviteIndex/components/AppHistoryInviteCalendar.vue'
    import AppSelectSearch from '../inviteIndex/components/AppSelectSearch.vue';
    import AppHistoryStopReason from './components/AppHistoryStopReason.vue';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import formatter from 'date-formatter';
    import AppSelectMul from './components/AppSelectMul.vue';
    import Util from '@dp/vc-util';
    import qs from 'qs';]
    import $ from '@dp/zepto';
    import { mapGetters } from 'vuex';
    require('@gfe/m-isomorphic-fetch');
    import CommonFun from '../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default{
        data(){
            return{
                yzsUserId:197,
                historyList:[{text:'沟通用户',value:'SALES_RECORD',active:false},{text:'邀约看店',value:'APPOINTMENT',active:false},{text:'终止销售',value:'STOP_SALES',active:false},{text:'酒店报备',value:'USER_REPORT',active:false}],
                gradeList:[{text:'A类',value:1,active:false},{text:'B类',value:2,active:false},{text:'C类',value:3,active:false}],
                addType:1,      //1:沟通用户 2:邀约看店 3:终止销售 4:酒店报备
                businessLineType:0, //0:婚宴 1:婚庆
                historyTypeObj:{},
                showHistoryTypeSelect:false,
                selectHotel:{},             //选择的带看酒店
                inviteDate:'',
                inviteTime:'',
                editInviteList:[],              //后续添加的邀约数据
                showStopReasonSelect:false,
                showChooseReportStatus:false,   //选择报备酒店
                showChooseInviteStatus:false,   //选择邀约酒店
                showInviteCalendarStatus:false,    //邀约日期选择
                showWedInviteCalendarStatus:false, //婚庆邀约日起选择
                stopReason:{},              //选择的终止理由对象
                communicateContent:'',      //沟通内容
                customerLevel:0,           //客户等级
                activeInviteItem:{},
                placeholderObj:{text:'请输入邀约酒店名称'},
                inviteCalendarStartDate:'',
                maxscheduledatenumber:0,
                wedInviteItem:{
                    inviteDate:'',
                    inviteTime:''
                },
                isIOS:false,
                isAndroid:false,
                isLLApp:false,
                historyObj:'',
                unreportedShopList:[],
                selectStopReasonList:[],
                customerInfoObj:{
                    yzsUserId:'',
                    grade:'',
                    selectInviteShopList:[{label:'123',value:1,shopId:1,shopName:'123'},{label:'酒店报备时已经选择的报备酒店1',value:2,shopId:2,shopName:'酒店报备时已经选择的报备酒店2'},{label:'酒店报备时已经选择的报备酒店3',value:3,shopId:3,shopName:'酒店报备时已经选择的报备酒店3'},{label:'酒店报备时已经选择的报备酒店4',value:4,shopId:4,shopName:'酒店报备时已经选择的报备酒店4'}]
                },
                choosedInviteHotel:[], //邀约酒店时已经选择的报备酒店
            }
        },
        props:['nxKey','nxToken','hotelList'],
        components:{
            AppSelectSearch,
            AppHistoryStopReason,
            AppHistoryInviteCalendar,
            AppSelectMul
        },
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
            this.addType = Util.getUrlParam('addType')?parseInt(Util.getUrlParam('addType')):0;
            this.yzsUserId = Util.getUrlParam('yzsUserId')?parseInt(Util.getUrlParam('yzsUserId')):0;
            this.businessLineType = Util.getUrlParam('businessLineType')?parseInt(Util.getUrlParam('businessLineType')):0; //0:婚宴 1:婚庆
            this.customerInfoObj.yzsUserId = this.yzsUserId;
            this.historyList.forEach((ele,index)=>{
                if(ele.text == this.historyType){
                    this.historyTypeObj = ele;
                }
            });
            this.$store.dispatch('setChoosedReportHotel',[]);
            this.getCustomerGrade();
            this.getSelectInviteList();
            this.initInviteCalendarFun();
            this.getInviteDateFun();
            this.getUnReportedShopList();
            this.getSelectStopReasonList();
        },
        watch:{
            'customerInfoObj.grade':function(val){
                this.gradeList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.value == val){
                        ele.active = true;
                    }
                });
            }
        },
        computed:{
            ...mapGetters({
                choosedReportHotel:'getChoosedReportHotel',
                reportHotelList:'getReportHotelList',   //供选择的所有酒店list
            }),
            showContentInput:function(){
                if(this.historyType == "酒店报备"){
                    return false
                } else {
                    return true
                }
            },
            historyType:function(){
                if(this.addType==1){
                    return '沟通用户'
                } else if(this.addType==2){
                    return '邀约看店'
                } else if(this.addType==3){
                    return '终止销售'
                } else {
                    return '酒店报备'
                }
            }
        },
        methods:{
            getCustomerGrade:function(){
                let params = {
                    yzsUserId:this.yzsUserId,
                    businessLineType:this.businessLineType
                }
                var ajaxUrl = mDomain+'/lovelab/user/getUserGrade?'+qs.stringify(params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            console.log(json.msg);
                            Toast('网络错误，请重试');
                            return
                        }
                    }
                    this.customerInfoObj.grade = json.content.grade;
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('ajaxGetData failed', ex);
                });
            },
            getSelectInviteList:function(){
                let params = {
                    yzsUserId:this.yzsUserId,
                    businessLineType:this.businessLineType
                }
                var ajaxUrl = mDomain+'/lovelab/user/getShopList?'+qs.stringify(params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            console.log(json.msg);
                            Toast('网络错误，请重试');
                            return
                        }
                    }
                    if(json.content.shopList){
                        json.content.shopList.forEach((ele,index)=>{
                            ele.label = ele.shopName;
                            ele.value = ele.shopId;
                        });
                    } else {
                        json.content.shopList = [];
                    }
                    this.customerInfoObj.selectInviteShopList = json.content.shopList;
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.error('ajaxGetData failed', ex);
                });
            },
            //获取可选终止理由list
            getSelectStopReasonList:function(){
                var ajaxUrl = mDomain+'/lovelab/user/getStopSalesReason?businessLineType='+this.businessLineType;
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            console.log(json.msg);
                            Toast('网络错误，请重试');
                            return
                        }
                    }
                    json.content.forEach((ele,index)=>{
                        ele.text=ele.string;
                        ele.active = false;
                    });
                    this.selectStopReasonList = json.content;

                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('ajaxGetData failed', ex);
                });
            },
            //获取酒店报备时供选择的报备酒店list
            getUnReportedShopList:function(){
                var ajaxReportHotelUrl = mDomain+'/lovelab/user/getUnreportedShopList?yzsUserId='+this.yzsUserId;
                fetchJsonp(ajaxReportHotelUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            console.log(json.msg);
                            Toast('网络错误，请重试');
                            return
                        }
                    }
                    json.content.unreportedShopList.forEach((ele,index)=>{
                        ele.label = ele.shopName;
                        ele.value = ele.shopId;
                    });
                    this.unreportedShopList = json.content.unreportedShopList;
                    
                    this.$store.dispatch('setReportHotelList',this.unreportedShopList);
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('ajaxGetData failed', ex);
                });
            },
            //邀约日历开始时间：本月第一天，跨度：三个月
            initInviteCalendarFun:function(){
                let startDate = new Date(new Date().setDate(1));
                this.inviteCalendarStartDate = formatter(startDate,'YYYY-MM-DD');
                let endDate = new Date(new Date(this.inviteCalendarStartDate).setMonth(new Date(this.inviteCalendarStartDate).getMonth()+3));
                this.maxscheduledatenumber = parseInt((endDate.getTime()-startDate.getTime())/calendarObj.ONE_DAY_TS);
            },
            //获取邀约日历的数据
            getInviteDateFun:function(){
                this.editInviteList = [];
                if(this.editInviteList.length==0){
                    this.addInviteFun();
                }
            },
            showStopReasonSelectFun:function(){
                this.showStopReasonSelect = true;
            },
            hideStopReasonSelectFun:function(obj){
                if(obj&&obj.text){
                    this.stopReason = obj;
                }
                this.showStopReasonSelect = false;
            },
            saveAction:function(){
                var saveUrl = mDomain+"/lovelab/user/addUserLog";
                //params用于本地显示保存修改后的记录，submitObj用于提交接口需要的参数
                var params = {
                    logType:this.historyTypeObj.value,
                    logTitleDesc:this.historyType,
                    logContent:this.communicateContent?this.communicateContent:'',
                    visitShopName:this.selectHotel.shopName?this.selectHotel.shopName:'',
                    logTime:formatter(new Date(), 'YYYY-MM-DD hh:mm')
                };
                var submitObj={
                    yzsUserId:this.customerInfoObj.yzsUserId,
                    businessLineType:this.businessLineType,
                    logType:this.historyTypeObj.value,
                    logContent:this.communicateContent?this.communicateContent:'',
                    shopIds:'',
                    reason:'',
                    appointments:'',
                    grade:this.customerInfoObj.grade?this.customerInfoObj.grade:0
                };
                if(this.historyType=="沟通用户"&&!this.communicateContent){
                    Toast('请填写沟通内容');
                    return;
                }
                if((this.historyType=='沟通用户'||this.historyType=='邀约看店'||this.historyType=='酒店报备')&&!this.customerInfoObj.grade){
                    Toast('请选择客户等级');
                    return;
                }
                if(this.historyType=="邀约看店"){
                    let validStatus = true;
                    this.editInviteList.forEach((ele,index)=>{
                        if(!ele.inviteTime || !ele.inviteDate || !ele.choosedInviteHotel.length){
                            validStatus = false;
                            return
                        }
                    });
                    if(!validStatus){
                        Toast('请补全邀约时间和邀约酒店');
                        return;
                    }
                    if(!this.communicateContent){
                        Toast('请填写邀约内容');
                        return;
                    }
                    let array = [];
                    this.editInviteList.forEach((ele,index)=>{
                        console.log(ele);
                        let obj = {
                            shopIds:'',
                            appointmentDate:''
                        }
                        let shopIdsArry = [];
                        ele.choosedInviteHotel.forEach((item,index)=>{
                            shopIdsArry.push(item.shopId);
                        })
                        obj.shopIds = shopIdsArry.join(',');
                        obj.appointmentDate = ele.inviteDate+' '+ele.inviteTime;
                        array.push(obj);
                    });
                    submitObj.appointments = JSON.stringify(array);
                }
                //终止销售会对params的logContent进行修改
                if(this.historyType=='终止销售'){
                    if(!this.stopReason.text){
                        Toast('请选择终止理由');
                        return;
                    }
                    if(this.stopReason.ifNeedContent&&!this.communicateContent){
                        Toast('请填写终止详细理由');
                        return;
                    }
                    submitObj.reason=this.stopReason.text?this.stopReason.text:''
                    params.logContent = "终止理由是"+this.stopReason.text+' '+this.communicateContent;
                }
                //模拟酒店报备对params的logContent进行修改
                if(this.historyType=='酒店报备'){
                    if(!this.choosedReportHotel||!this.choosedReportHotel.length){
                        Toast('请选择报备酒店');
                        return;
                    }
                    var str = "已选报备酒店 ";
                    this.choosedReportHotel.forEach((ele,index)=>{
                        if(index == this.choosedReportHotel.length-1){
                            submitObj.shopIds = submitObj.shopIds+ele.shopId
                        } else {
                            submitObj.shopIds = submitObj.shopIds+ele.shopId+','
                        }
                        str = str+ele.shopName+' '
                    });
                    params.logContent = params.logContent+' '+str;
                }
                console.log('添加轨迹参数',submitObj);
                $.ajax({
                    type: "post",
                    url: saveUrl,
                    data: submitObj,
                    xhrFields: {
                      withCredentials: true
                    },
                    success: (json)=>{
                        if(json.code != 200){
                            if(json.code==600){
                                if(this.isLLApp&&this.isAndroid){
                                    CommonFun.androidLogin();
                                } else {
                                    location.href= eDomain;
                                }
                            } else {
                                if(this.historyType=='酒店报备'){
                                    Toast(json.string);
                                } else {
                                    Toast('网络连接错误');
                                }
                                console.log("save error",json.string);
                                return;
                            }
                        }
                        Toast('保存成功');
                        location.href='./customer-business-detail.html?yzsUserId='+this.yzsUserId+'&businessLineType='+this.businessLineType;
                    },
                    error:(ex)=>{
                        Toast('网络异常，请稍后重试');
                        console.log(ex.toString());
                    }
                });
            },
            showReportSelectFun:function(){
                this.showChooseReportStatus = true;
            },
            showInviteSelectFun:function(item){
                this.showChooseInviteStatus = true;
                this.activeInviteItem = item;
            },
            showWedInviteCalendarFun:function(){
                this.showWedInviteCalendarStatus = true;
            },
            hideWedInviteCalendarFun:function(checkInDate,activeTime){
                if(checkInDate){
                    this.wedInviteItem.inviteDate = formatter(checkInDate, 'YYYY-MM-DD');
                    this.wedInviteItem.inviteTime = activeTime;
                }
                this.showWedInviteCalendarStatus = false;
            },
            showInviteCalendarFun:function(item){
                this.activeInviteItem = item;
                this.showInviteCalendarStatus = true;
            },
            hideReportSelectFun:function(selectList){
                this.showChooseReportStatus = false;
                if(selectList){
                    this.$store.dispatch('setChoosedReportHotel',selectList);
                }
            },
            hideInviteSelectFun:function(selectList){
                this.showChooseInviteStatus = false;
                console.log(this.editInviteList);
                if(selectList){
                    this.activeInviteItem.choosedInviteHotel = selectList;
                }
            },
            hideInviteCalendarFun:function(checkInDate,activeTime){
                if(checkInDate){
                    this.activeInviteItem.inviteDate = formatter(checkInDate, 'YYYY-MM-DD');
                    this.activeInviteItem.inviteTime = activeTime;
                }
                this.showInviteCalendarStatus = false;
                this.showChooseInviteStatus = false;
            },
            addInviteFun:function(){
                let obj = {inviteDate:'',inviteTime:'',choosedInviteHotel:[]}
                this.editInviteList.push(obj);
            },
            deleteInviteFun:function(index){
                this.editInviteList.forEach((ele,eleIndex)=>{
                    if(eleIndex == index){
                        this.editInviteList.splice(index,1);
                    }
                });
            },
            goBack:function(){
                history.go(-1);
            },
            chooseGradeFun:function(item){
                this.customerInfoObj.grade = item.value;
            }
        }
}
</script>
<style lang="less">
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
    .add-history-section{
        background-color: #f0f0f0;
        font-size: 1.5rem;
        color: #666;
        input,textarea{
            font-size: 1.5rem;
        }
        input::-webkit-input-placeholder{
            color: #ccc;
        }
        textarea::-webkit-input-placeholder{
            color: #ccc;
        }
        &.is-ios{
            header.title-header{
                padding-top: 2rem;
                .js_save{
                    top: 2rem;
                }
            }
        }
        .history-item{
            margin-left: 1.5rem;
            line-height: 4.5rem;
            position: relative;
            background-color: #fff;
            .borderline(#e1e1e1,top);
            &.history-type{
                border-top: none;
                margin-bottom: 1.5rem;
                &.no-margin{
                    margin-bottom: 0;
                }
            }
            .title{
                font-family: PingFangSC-Medium !important;
                font-size: 1.5rem !important;
                color: #333333 !important;
            }
            .value{
                position: absolute;
                top: 0;
                right: 0;
                padding-right: 3rem;
                .ellipse(70%);
                &.no-select{
                    color: #ccc;
                }
            }
            &:first-child:after{
                border:none;
            }
        }
        .history-report{
            position: relative;
            height: 4.5rem;
            .borderline(#e1e1e1,top);
            margin-left:1.5rem;
            background-color: #fff;
            .title{
                display: table-cell;
                vertical-align: middle;
                height: 100%;
                position: relative;
                width: 100px;
                height: 4.5rem;
                font-family: PingFangSC-Medium !important;
                font-size: 1.5rem !important;
                color: #333333 !important;
            }
            .report-value{
                // display: table-cell;
                // vertical-align: middle;
                // text-align: right;
                &.no-select{
                    line-height: 4.5rem;
                    text-align: right;
                    padding-right: 3rem;
                    flex: 1;
                    -webkit-box-flex: 1;
                    -ms-box-flex: 1;
                    -ms-flex: 1;
                    display: block !important;
                    color: #ccc;
                }
                &.value{
                    text-align: right;
                    padding-right: 3rem;
                    position: absolute;
                    right: 0;
                    height: 4.5rem;
                    padding-left: 100px;
                    div{
                        display: table-cell;
                        vertical-align: middle;
                        height: 4.5rem;
                    }
                    p{
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        width: 100%;
                        padding-right: 10px;
                        span{
                            margin-right: 5px;
                        }
                    }
                    &:after{
                        content: "";
                        background-image: url('./img/right-arrow.png');
                          background-size: contain;
                          width: .8rem;
                          height: 1.3rem;
                          background-repeat: no-repeat;
                          top: 1.6rem;
                          right: 1.5rem;
                          position: absolute;
                    }
                }
            }
        }
        .history-reason.history-item{
            padding-left: 1.5rem;
            margin-left: 0;
            &:after{
                border:none;
            }
        }
        .communicate-content{
            margin-left: 10px;
            background-color: #fff;
            &.border-top{
                .borderline(#e1e1e1,top);
            }
            textarea{
                width: 100%;
                border: none;
                height: 190px;
                .borderline(#e1e1e1,top);
                padding-top: 10px;
            }
        }
    }

    .save-btn-div{
        padding:10px 15px;
        background-color: #f0f0f0;
        font-size: 15px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        .save-btn{
            background-color: @mainColor;
            color: white;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
        }
    }

    .history-item .value{
        padding-right: 15px;
        &:after{
            content: "";
            background-image: url('./img/right-arrow.png');
              background-size: contain;
              width: .8rem;
              height: 1.3rem;
              background-repeat: no-repeat;
              top: 1.6rem;
              right: 1.5rem;
              position: absolute;
        }
    }
    .add-invite-btn{
        line-height: 4.5rem;
        text-align: center;
        color:#0076FF;
        background-color: #fff;
        margin-bottom: 1.5rem;
    }
    .invite-shop-div{
        .invite-list-item{
            background-color: #fff;
            margin-bottom: 1.5rem;
            .history-item{
                border-top: none !important;
            }
        }
    }
    .delete-invite-btn{
        line-height: 4.5rem;
        background-color: #fff;
        text-align: center;
        .borderline(#e1e1e1,top);
        color: @mainColor;
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .line-between{
        height: 15px;
        background:#f0f0f0;
    }
    .no-arrow:after {
        background-image: none !important;
    }
    .customer-level-select-div{
        line-height: 4.5rem;
        background-color: #fff;
        position: relative;
        margin-top: 1.5rem;
        span.customer-level-title{
            padding-left: 1.5rem;
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #333333;
        }
        .grade-list-div{
            display: inline-block;
            position: absolute;
            right: 1.5rem;
            div{
                display: inline-block;
            }
            img{
                width: 2.3rem;
                height: 2.3rem;
                vertical-align: sub;
                margin-left: 2.5rem;
            }
            span{
                font-family: PingFangSC-Regular;
                font-size: 1.5rem;
                color: #666666;
            }
        }
        .customer-level-radio{
            position: relative;
            margin-left: 10px;
            top: 2px;
            margin-right: 5px;
        }
    }
    .over-lay{
        position: fixed;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.6;
        z-index: 12;
    }
    .v-calendar{
        position:fixed;
        bottom: 0;
        left:0;
        width:100%;
        background:#fff;
        .v-calendar--title{
            height:3.2rem;
            padding-top: .7rem;
            padding-bottom: .6rem;
            border-bottom:.1rem solid #d7d7d7;
            font-size:1.6rem;
            box-shadow: 0 .2rem .1rem rgba(204, 202, 200, 0.2);
            position:relative;
            background:#fff;
            z-index:1;
        }
        .v-calendar--title-back{
            display:block;
            width:3.5rem;
            position:relative;
            position:absolute;
            left:1.5rem;
            height:100%;
            top:0;
            z-index:10;
            &:after{
                content:"";
                display:block;
                position:absolute;
                left:0;
                top:50%;
                background-size:.8rem 1.4rem;
                -webkit-transform:translateY(-50%) rotate(135deg);
                transform:translateY(-50%) rotate(135deg);
                width:.8rem;
                height:.8rem;
                border:none;
                border-bottom:.2rem solid #f63;
                border-right:.2rem solid #f63;
            }
        }
        .v-calendar--title-btn{
            position:absolute;
            right:1.5rem;
            color:#f63;
            display:block;
            text-align:right;
            height:100%;
            top:0;
        }
        .v-calendar--title-content{
            display:block;
            text-align:center;
            font-weight:400;
            line-height:2rem;
            width:100%;
            position:absolute;
            left:0;
            top:1.5rem;
            font-size: 1.4rem;
        }
        .v-calendar--header{
            height:2.5rem;
            line-height:2.5rem;
            background:#ffffff;
            color:#333;position:
            relative;
            z-index:10003;
            .borderline(#e1e1e1,bottom);
        }
        .v-calendar--header-wrapper{
            display:-webkit-box;
            display:flex;
        }
        .v-calendar--header-item{
            display:block;
            -webkit-box-flex:1;
            flex:1;
            text-align:center;
            font-size: 1.2rem;
            color: #777777;
        }
        .v-calendar--date{
            position:relative;
            width:100%;
            left:0;
            top:0;
            height: 40rem;
            overflow-y:scroll;
            -webkit-overflow-scrolling:touch;
            &.no-scroll{
                overflow: hidden;
                position: fixed;
                height: 100%;
                width: 100%;
            }
        }
        .v-calendar--date-month{
            height:4.4rem;
            line-height:4.4rem;
            text-align:center;
            font-size: 1.5rem;
            color: #333;
            position: relative;
            .pre-month-span{
                position: absolute;
                left: 1rem;
                top: 1rem;
                -webkit-transform: rotate(180deg);
                width: 2rem;
            }
            .next-month-span{
                position: absolute;
                right: 1rem;
                top: 1rem;
                width: 2rem;
            }
        }
        .v-calendar--date-day-group{
            overflow:hidden;
            padding-left: 0;
            border-bottom: solid 1px #ebebeb;
            &:last-child{
                padding-bottom: 0;
            }
        }
        .v-calendar--date-day-wrapper{
            width:14.285%;
            float:left;
            text-align:center;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            border-top: 0.1rem solid #ebebeb;
            border-right: 0.1rem solid #ebebeb;
            &.is-active{
                background:@mainColor;
                color:#fff;
                &.start .back-color{
                    position: absolute;
                    left: 50%;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: #a3569e;
                    z-index: 10000;
                }
                &.start{
                    &:nth-child(7n) .back-color{
                        display: none;
                    }
                }
                .v-calendar--date-item{
                    z-index: 10001;
                    background-color: @mainColor;
                }
                &.end .back-color{
                    position: absolute;
                    left: 0%;
                    right: 50%;
                    top: 0;
                    bottom: 0;
                    background-color: #a3569e;
                    z-index: 10000;
                }
                &.end{
                    &:nth-child(7n+1) .back-color{
                        display: none;
                    }
                }
            }
            &.is-select{
                background: #FFEFF5;
                font-size: 1.5rem;
                color: #FF66A1;
            }
        }
        .v-calendar--date-item{
            position: relative;
            font-size: 1.5rem;
            &.tag{
                line-height: 2.5rem;
                font-size: 1rem;
            }
        }

        .v-calendar {
            &.transition {
                transition: all .2s ease-in-out;
                transform: translate3d(0, 0, 0);
            }

            &.enter, &.leave {
                transform: translate3d(100%, 0, 0);
            }
        }
        .choos-date-way{
            display: box;
            display: -webkit-box;
            display: -ms-flexbox;
            text-align: center;
            background: white;
            z-index: 10;
            position: relative;
            padding-top: 1.2rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: .8rem;
            background-color: white;
            z-index: 10003;
            .choose-way{
                display: block;
                -webkit-box-flex: 1;
                box-flex: 1;
                -ms-box-flex: 1;
                -ms-flex: 1;
                width: 50%;
                height: 4.2rem;
                border:solid .1rem @mainColor;
                border-radius: .5rem;
                color:#111111;
                position: relative;
                &:last-child{
                    margin-left: 1rem;
                }
                &.active{
                    border:none;
                    background-color: @mainColor;
                    color:#fff;
                    height: 4.4rem;
                    .way-title{
                        color: #fff;
                    }
                    .way-date{
                            display: none;
                    }
                    i{
                        width: 2.1rem;
                        height: 2.1rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        // background: url('./img/choose-way-active.png') no-repeat top left;
                        background-size: contain;
                    }
                    &.active-text{
                        .way-title{
                            font-size: 1.4rem;
                            margin-top: .5rem;
                            color:#fff;
                        }
                        .way-date{
                            display: inherit;
                            font-size: 1rem;
                        }
                    }
                }
                .way-title{
                    font-size: 1.6rem;
                    margin-top: 1.1rem;
                    line-height: 2.2rem;
                    color: @mainColor;
                }
            }
        }

        .v-calendar--title-content{
            display:inline-block;
            text-align:center;
            font-weight:400;
            line-height:2rem;
            position:relative;
            top:-.7rem;
            font-size: 1.6rem;
            width: inherit;
            background-color: #f0f0f0;
            padding-left: 1.1rem;
            padding-right: .8rem;
            border-radius: .4rem;
            padding-bottom: .5rem;
            padding-top: .5rem;
            color: #777;
            i{
                width: 2rem;
                height: 2.1rem;
                // background: url('./img/calendar-title-icon.png') no-repeat top left;
                background-size: contain;
                display: inline-block;
                vertical-align: bottom;
            }
            span{
                padding-left: .6rem;
                margin-left: .8rem;
                .borderline(#d7d7d7,left);
            }
        }

        .over-lay{
            position: fixed;
            top: 0;
            left:0;
            right: 0;
            bottom: 0;
            background-color: #000;
            opacity: 0.6;
            z-index: 13;
        }

        header{
            position: relative;
            height: 4.4rem;
            line-height: 4.4rem;
            text-align: center;
            background-color: #FCFCFC;
            z-index: 100;
            color: #686868;
            font-size: 1.5rem;
            border-bottom: solid .1rem #e1e1e1;
            &.normal{
                background-color: #fcfcfc;
                z-index: 100002;
            }
            .btn-save{
                position: absolute;
                right: 0;
                top: 0;
                width: 4.4rem;
                height: 4.4rem;
                color: @mainColor;
            }
            .btn-back {
                position: absolute;
                left: 0;
                top: 0;
                color: @mainColor;
                width: 4.4rem;
                height: 4.4rem;
                &:after {
                  content: '';
                  position: absolute;
                  left: 1.6rem;
                  top: 1.2rem;
                  width: 1.1rem;
                  height: 2rem;
                  background-size: 4.1rem auto;
                }
              }
              h1{
                padding: 0 8.8rem;
                font-size: 1.8rem;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
        }
    }
    .add-history-invite-section .normal-recommand-section{
        background:#f0f0f0;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        .mask-div{
            display: none !important;
        }
        .select-search-section .select-search-div{
            position: relative;
        }
    }
    .add-history-invite-section .select-search-section .select-search-div{
        z-index: 20 !important;
    }
    .add-history-invite-section,.normal-recommand-section{
        .select-search-div{
            top: 0;
        }
    }
    header.title-header{
            position: relative;
            height: 4.4rem;
            line-height: 4.4rem;
            text-align: center;
            background-color: #FCFCFC;
            z-index: 1;
            color: #686868;
            font-size: 1.5rem;
            border-bottom: solid .1rem #e1e1e1;
            &.normal{
                background-image: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
                z-index: 1;
                font-family: PingFangSC-Regular;
                font-size: 1.8rem;
                color: #FFFFFF;
            }
            .btn-save{
                position: absolute;
                right: 0;
                top: 0;
                font-family: PingFangSC-Regular;
                font-size: 1.5rem;
                color: #FFFFFF !important;
                width: 4.4rem;
                height: 4.4rem;
                color: @mainColor;
            }
            .btn-back {
                position: absolute;
                left: 1.3rem;
                bottom: 1.2rem;
                color: @mainColor;
                width: 2rem;
                height: 2rem;
              }
              h1{
                padding: 0 8.8rem;
                font-size: 1.8rem;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
        }
</style>