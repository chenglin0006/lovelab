<template>
    <section class="sign-section">
        <div class="flex-parent sign-item-div no-border-bottom">
           <div class="label sign-hotel">签约类型</div>
           <div class="value sign-hotel no-arrow no-border-bottom">{{typeMap[type]}}</div>
        </div>
        <section v-show="type==2||type==1">
            <div class="banquet-title sign-type-title">婚宴信息</div>
            <div class="flex-parent sign-item-div" @click="showHotelSearchFun">
               <div class="label sign-hotel">签约酒店</div>
               <div class="value sign-hotel" v-if="signHotelObj&&signHotelObj.shopName">
                    {{signHotelObj.shopName}}
               </div>
               <div class="value sign-hotel no-select" v-else>
                    未设置
               </div>
            </div>
            <div class="flex-parent sign-item-div" @click="showSignCategoryFun">
               <div class="label sign-type-pay">需求类型</div>
               <div class="value sign-type-pay" v-if="signCategoryObj.text">
                    {{signCategoryObj.text}}
               </div>
               <div class="value sign-type-pay no-select" v-else>
                    未设置
               </div>
            </div>
            <div class="flex-parent sign-item-div" @click="showTypePayWayFun">
               <div class="label sign-type-pay">签约方式</div>
               <div class="value sign-type-pay" v-if="signTypeObj.text">
                    {{signTypeObj.text}}
               </div>
               <div class="value sign-type-pay no-select" v-else>
                    未设置
               </div>
            </div>
            <div class="flex-parent sign-item-div" @click="showHallSearchFun">
                 <div class="label sign-hall">宴会厅</div>
                 <div class="value sign-hall" v-if="signHallObj&&signHallObj.label">
                      {{signHallObj.label}}
                 </div>
                 <div class="value sign-hall no-select" v-else>
                      未设置
                 </div>
            </div>
            <div class="flex-parent sign-item-div" @click="showCalendarFun">
               <div class="label schedule">婚宴日期</div>
               <div class="value schedule" v-if="signCheckInText">
                   {{signCheckInText}}<span v-show="signCheckInText!=signCheckOutText"> 至 {{signCheckOutText}}</span>
               </div>
               <div class="value schedule no-select" v-else>
                    未设置
               </div>
           </div>
           <div class="flex-parent sign-item-div">
               <div class="label sign-deal-price">婚宴金额</div>
               <div class="value sign-deal-price no-arrow">
                   <input type="number" name="" placeholder="请输入订单金额" v-model.number="signDealPrice">
                   <span>元</span>
               </div>
           </div>
           <div class="flex-parent sign-item-div no-border-bottom">
               <div class="label sign-wed-price">婚宴优惠</div>
               <div class="value sign-wed-price ">
                 <input type="" v-model="signBanquetDiscount" placeholder="请输入婚宴优惠" name="">
               </div>
            </div>
       </section>
       <section v-show="type==3||type==1">
           <div class="wed-title sign-type-title">婚庆信息</div>
           <div class="flex-parent sign-item-div" v-show="signWedNeed" @click="showWedSearchFun">
               <div class="label sign-wed-info">签约婚庆</div>
               <div class="value sign-wed-info" v-if="signWedObj&&signWedObj.label">
                    {{signWedObj.label}}
               </div>
               <div class="value sign-wed-info no-select" v-else>
                    未设置
               </div>
           </div>
           <div v-show="type==3" class="flex-parent sign-item-div" @click="showCalendarFun">
               <div class="label schedule">婚宴日期</div>
               <div class="value schedule" v-if="signCheckInText">
                   {{signCheckInText}}<span v-show="signCheckInText!=signCheckOutText"> 至 {{signCheckOutText}}</span>
               </div>
               <div class="value schedule no-select" v-else>
                    未设置
               </div>
           </div>
           <div class="flex-parent sign-item-div" v-show="signWedNeed">
               <div class="label sign-wed-price">婚庆订单金额</div>
               <div class="value sign-wed-price no-arrow">
                    <input type="" name="" placeholder="请输入订单金额" v-model="signWedPrice">
                    <span>元</span>
               </div>
           </div>
           <div class="flex-parent sign-item-div no-border-bottom" v-show="signWedNeed">
               <div class="label sign-wed-price">婚庆优惠</div>
               <div class="value sign-wed-price">
                 <input type="" v-model="signWedDiscount" placeholder="请输入婚庆优惠" name="">
               </div>
           </div>
           <div class="wed-note" v-show="type==3">
             <textarea class="wed-note-area" v-model="signWedNote" placeholder="请输入婚宴备注信息"></textarea>
           </div>
       </section>
       <div class="save-btn-div" @click="generateDeal">
           <div class="save-btn">确认签约</div>
       </div>
        <app-calendar
        :type="calendarType"
        :title="{text:'请选择婚宴日期'}"
        :showcalendar="showScheduleCalendar"
        :initcheckintext="signCheckInText"
        :maxscheduledatenumber="maxscheduledatenumber"
        :maxdays="maxdays"
        :initcheckouttext="signCheckOutText"
        @hidecalendar="hideCalendarFun">
        </app-calendar>
        <app-sign-type-pay-way :sign-type-list="signTypeList" v-show="showTypePayWayStatus" @hidetypepop="hideTypePayWayFun"></app-sign-type-pay-way>

        <app-sign-type-select :sign-type-list="signCategoryList" v-show="showSignCategoryStatus" @hidetypepop="hideSignCategoryFun"></app-sign-type-select>

        <app-select-search v-show="showHotelSearch" :option-list="hotelList" :select-model="signHotelObj" :placeholder-obj="{'text':'请输入酒店名称'}" @hidepop="hideHotelSearchFun" @setselectdata="hideHotelSearchFun" :null-text="'没有找到匹配项'"></app-select-search>
        <app-select-search v-show="showHallSearch" :option-list="selectHallList" :select-model="signHallObj" :placeholder-obj="{'text':'请输入宴会厅名称'}" @hidepop="hideHallSearchFun" @setselectdata="hideHallSearchFun" :null-text="'没有找到匹配项'"></app-select-search>
        <app-select-search v-show="showWedSearch" :option-list="selectWedList" :select-model="signWedObj" :placeholder-obj="{'text':'请输入婚庆名称'}" @hidepop="hideWedSearchFun" @setselectdata="hideWedSearchFun" :null-text="'没有找到匹配项'"></app-select-search>
    </section>
</template>
<script>
    import AppCalendar from './components/AppCalendar.vue';
    import AppSignTypePayWay from './components/AppSignReqSelect.vue';
    import AppSignTypeSelect from './components/AppSignTypeSelect.vue';
    import AppSelectSearch from '../inviteIndex/components/AppSelectSearch.vue';
    import formatter from 'date-formatter';
    import Toast from '@dp/wepp-module-toast';
    import { mapGetters } from 'vuex';
    import fetchJsonp from 'fetch-jsonp';
    import Util from '@dp/vc-util';
    import qs from 'qs';
    import KNB from '@dp/knb';
    import $ from '@dp/zepto';
    require('@gfe/m-isomorphic-fetch');
    import CommonFun from '../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default{
        data(){
            return{
                yzsUserId:'',
                type:'',
                typeMap:{1:'婚宴＋婚庆',2:'婚宴',3:'婚庆'},
                signCheckInText:'',
                signCheckOutText:'',
                signHotelObj:{},
                signHallObj:{},
                signDealPrice:'',
                signWedNeed:true,
                signWedObj:{},
                signWedPrice:'',
                signBanquetDiscount:'',
                signWedDiscount:'',
                signWedNote:'',
                calendarType:'signCalendar',
                maxdays:100,
                maxscheduledatenumber:365*2,
                showScheduleCalendar:false,
                showTypePayWayStatus:false,
                showSignCategoryStatus:false,
                signTypeObj:{},
                signCategoryObj:{},
                showHotelSearch:false,
                showHallSearch:false,
                showWedSearch:false,
                signTypeList:[],
                signCategoryList:[{text:'婚宴',value:1,active:false},{text:'会议宴会',value:2,active:false},{text:'宝宝宴',value:3,active:false},{text:'年会',value:4,active:false}],
                selectHallList:[],
                selectWedList:[{label:'testWed1',value:'1001',shopId:'1001',shopName:'testWed1'},{label:'testWed2',value:'1002',shopId:'1002',shopName:'testWed2'},{label:'testWed3',value:'1003',shopId:'1003',shopName:'testWed3'}],
                hotelList:[],
                isAndroid:false,
                isLLApp:false,
                isIOS:false,
                businessLineType:0
            }
        },
        props:[],
        components:{
            AppCalendar,
            AppSignTypePayWay,
            AppSignTypeSelect,
            AppSelectSearch
        },
        watch:{
          'signHotelObj.shopId':function(val){
            this.getTargetHotelHallFun();
          }
        },
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
            this.type = Util.getUrlParam('type')?parseInt(Util.getUrlParam('type')):0;
            this.businessLineType = Util.getUrlParam('businessLineType')?parseInt(Util.getUrlParam('businessLineType')):0;
            this.yzsUserId = Util.getUrlParam('yzsUserId')?Util.getUrlParam('yzsUserId'):0;
            KNB.ready(()=>{
                KNB.getUA({
                    success: (info)=>{
                        this.isIOS = info&&info.osName=='ios'?true:false;
                        this.isAndroid = info&&info.osName=='android'?true:false;
                        this.getHotelList();
                        if(this.type!=2){
                          this.getSignWedList();
                        }
                    },
                    fail: (err)=>{
                        this.getHotelList();
                        if(this.type!=2){
                          this.getSignWedList();
                        }
                    }
                });
            });
        },
        computed:{
            ...mapGetters({
            })
        },
        methods:{
            getHotelList:function(){
                let ajaxUrl = mDomain+'/lovelab/user/queryYzsShops';
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        if(json.code == 600){
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
                        ele.label = ele.shopName;
                        ele.value = ele.shopId;
                    });
                    this.hotelList = json.content;
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('getTargetHotelHallFun failed', ex);
                });
            },
            getSignWedList:function(){
                let ajaxUrl = mDomain+'/lovelab/order/hqshoplist';
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        console.log(json.msg);
                        Toast('网络错误，请重试');
                        return
                    }
                    let arry = [];
                    json.content.forEach((ele,index)=>{
                      let obj={
                        label:ele.shopName,
                        value:ele.shopId,
                        shopName:ele.shopName,
                        shopId:ele.shopId
                      }
                      arry.push(obj)
                    });
                    this.selectWedList = arry;
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('failed', ex);
                });
            },
            showCalendarFun:function(){
                this.showScheduleCalendar = true;
            },
            hideCalendarFun:function(checkInDate,checkOutDate){
                if(checkInDate){
                    this.signCheckInText = formatter(checkInDate,'YYYY-MM-DD');
                }
                if(checkOutDate){
                    this.signCheckOutText = formatter(checkOutDate,'YYYY-MM-DD');
                }
                this.showScheduleCalendar = false;
            },
            showTypePayWayFun:function(){
                if(this.signHotelObj&&this.signHotelObj.shopId){
                  this.showTypePayWayStatus = true;
                } else {
                  Toast('请先选择签约酒店')
                }
            },
            hideTypePayWayFun:function(obj){
                this.showTypePayWayStatus = false;
                if(obj){
                  this.signTypeObj = obj;
                }
            },
            showSignCategoryFun:function(){
                this.showSignCategoryStatus = true;
            },
            hideSignCategoryFun:function(obj){
                this.showSignCategoryStatus = false;
                if(obj){
                  this.signCategoryObj = obj;
                }
            },
            showHotelSearchFun:function(){
                this.showHotelSearch = true;
            },
            hideHotelSearchFun:function(hotelObj){
                if(hotelObj){
                    this.signHotelObj = hotelObj;
                }
                this.showHotelSearch = false;
            },
            showHallSearchFun:function(){
                this.showHallSearch = true;
            },
            hideHallSearchFun:function(hallObj){
                if(hallObj){
                    this.signHallObj = hallObj;
                }
                this.showHallSearch = false;
            },
            showWedSearchFun:function(){
                this.showWedSearch = true;
            },
            hideWedSearchFun:function(wedObj){
                if(wedObj){
                    this.signWedObj = wedObj;
                }
                this.showWedSearch = false;
            },
            //每次选择酒店之后获取相应的宴会厅列表
            getTargetHotelHallFun:function(){
                let ajaxUrl = mDomain+'/lovelab/order/hotelSignInfo?shopId='+this.signHotelObj.shopId;
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code!=200){
                        console.log(json.msg);
                        Toast('网络错误，请重试');
                        return
                    }
                    json.content.halls.forEach((ele,index)=>{
                      ele.label = ele.name;
                    });
                    json.content.signTypes.forEach((ele,index)=>{
                      ele.text = ele.name;
                      ele.active = false;
                    });
                    this.selectHallList = json.content.halls;
                    this.signTypeList = json.content.signTypes;
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('getTargetHotelHallFun failed', ex);
                });
            },
            generateDeal:function(){
                let params = {
                    hotelShopId:this.signHotelObj.value||0,
                    weddingShopId:this.signWedObj.value||0,
                    hotelAmount:this.signDealPrice||0,
                    weddingAmount:this.signWedPrice||0,
                    startDate:this.signCheckInText+' 00:00:00',
                    endDate:this.signCheckOutText+' 00:00:00',
                    hallId:this.signHallObj.value||0,
                    yzsUserId:this.yzsUserId,
                    reqType:this.signCategoryObj.value||0,
                    signType:this.type==3?0:this.signTypeObj.value,
                    hotelSpecialInfo:this.signBanquetDiscount,
                    weddingSpecialInfo:this.signWedDiscount,
                    remark:this.signWedNote
                };
                if(this.type!=3&&!params.hotelShopId){
                  Toast('请选择签约酒店');
                  return
                }
                if(this.type!=3&&params.signType!=0&&params.signType!=1){
                  Toast('请选择签约方式');
                  return
                }
                if(this.type!=3&&!params.reqType){
                  Toast('请选择需求类型');
                  return
                }
                if(this.type!=3&&!params.hallId){
                  Toast('请选择宴会厅');
                  return
                }
                if(!params.startDate||!params.endDate){
                  Toast('请选择婚宴日期');
                  return
                }
                if(this.type!=3&&!params.hotelAmount){
                  Toast('请输入婚宴金额');
                  return
                }
                if(this.type!=3&&!params.hotelAmount){
                  Toast('请输入婚宴金额');
                  return
                }
                if(this.type!=2&&!params.weddingShopId){
                  Toast('请选择签约婚庆');
                  return
                }
                let saveUrl = mDomain+"/lovelab/order/signContract"
                console.log('签约参数：',params);
                $.ajax({
                    type: "post",
                    url: saveUrl,
                    data: params,
                    xhrFields: {
                      withCredentials: true
                    },
                    success: (json)=>{
                        if(json.code != 200){
                            if(json.code == 600){
                                if(this.isLLApp&&this.isAndroid){
                                    CommonFun.androidLogin();
                                } else {
                                    location.href= eDomain;
                                }
                            } else {
                              Toast(json.string);
                              console.log("save error",json.string);
                              return
                            }
                        }
                        location.href='./customer-sign-detail-index.html?hqOrderId='+json.content.hqOrderId+'&hyOrderId='+json.content.hyOrderId+'&yzsUserId='+this.yzsUserId+'&businessLineType='+this.businessLineType;
                    },
                    error:(ex)=>{
                        Toast('网络异常，请稍后重试');
                        console.log(ex.toString());
                    }
                });
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
    .sign-section{
        font-size: 1.5rem;
        color: #666;
        background-color: white;
        padding-left: 1.5rem;
        input,textarea{
            font-size: 1.5rem;
        }
        input::-webkit-input-placeholder{
            color: #ccc;
        }
        textarea::-webkit-input-placeholder{
            color: #ccc;
        }
        .sign-item-div{
            .borderline(#e1e1e1,bottom);
            line-height: 4.5rem;
            .label{
                width: 10rem;
                font-family: PingFangSC-Medium;
                color: #333333;
            }
            input{
              border: none !important;
            }
            .value{
                text-align: right;
                position: relative;
                padding-right: 3rem;
                font-family: PingFangSC-Regular;
                color: #666666;
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
                &.no-arrow{
                  &:after{
                      content: "";
                      background-image: none;
                  }
                }
                .ellipse(250px);
                &.no-select{
                    color: #ccc;
                }
                &.sign-deal-price input{
                    text-align: right;
                }
                &.sign-wed-need input{
                    position: relative;
                    top: 7px;
                }
                &.sign-wed-price input{
                    text-align: right;
                }
            }
            &.no-border-bottom:after{
                border-bottom: none !important;
            }
        }
    }
    .save-btn-div{
        padding:3rem 1.5rem;
        background-color: #f0f0f0;
        font-size: 1.6rem;
        color: #fff;
        margin-left: -1.5rem;
        .save-btn{
            background-color: @mainColor;
            color: white;
            text-align: center;
            line-height: 4rem;
            border-radius: .2rem;
        }
    }
    .sign-type-title{
        background-color: #f0f0f0;
        margin-left: -1.5rem;
        padding-left: 1.2rem;
        line-height: 3.8rem;
        font-family: PingFangSC-Regular;
        font-size: 1.3rem;
        color: #999999;
    }
    .banquet-amount-input{
      border:none;
      text-align: right;
    }
    .wed-note{
      padding-top: 10px;
      border-top: solid 1px #f2f2f2;

    }
    .wed-note-area{
        border: navajowhite;
        width: 97%;
        height: 120px;
    }
    .flex-parent{
      .label,.value{
        flex:1;
        -webkit-box-flex: 1;
        -ms-box-flex: 1; 
        -ms-flex: 1;
      }
    }
</style>