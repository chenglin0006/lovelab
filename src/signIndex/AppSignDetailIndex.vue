<template>
	<section class="sign-detail-section">
		<div class="sign-status-div"><img src="./img/active.png">签约成功</div>
        <section class="basic-info">
            <div class="customer-telephone"><p class="user-phone-show"><div class="name text-ellipse">{{orderDetailObj.userName}}</div>{{userPhoneShow}}</p></div>
            <div class="sign-type-desc">{{typeMap[type]}}</div>
        </section>
        <section class="sign-info">
            <div class="sign-info-item" v-if="hyOrderId">
                <div class="label">签约酒店</div>
                <div class="value text-ellipse">{{hyDetailObj.shopName}}</div>
            </div>
            <div class="sign-info-item" v-if="hqOrderId">
                <div class="label">签约婚庆</div>
                <div class="value text-ellipse">{{hqDetailObj.shopName}}</div>
            </div>
            <div class="sign-info-item">
                <div class="label">宴会档期</div>
                <div class="value">{{orderDetailObj.schedule}}</div>
            </div>
            <div class="sign-info-item">
                <div class="label">签约总价</div>
                <div class="value">¥{{totalAmount}}</div>
            </div>
        </section>
        <section class="deal-list-section">
            <app-deal-item :order-detail-obj="hyDetailObj" v-show="hyOrderId"></app-deal-item>
            <app-deal-item :order-detail-obj="hqDetailObj" v-show="hqOrderId"></app-deal-item>
        </section>
        <div class="back-to-customer" @click="toCustomerDetail">返回客户详情</div>
	</section>
</template>
<script>
    import { mapGetters } from 'vuex';
    import AppDealItem from './components/AppDealItem.vue';
    import fetchJsonp from 'fetch-jsonp';
    import Toast from '@dp/wepp-module-toast';
    import $ from '@dp/zepto';
    import Util from '@dp/vc-util';
    import CommonFun from '../commonJs/CommonFun.js';
    import KNB from '@dp/knb';
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();
    var gDomain =CommonFun.getGDomain();
    export default{
        data(){
            return{
                hyOrderId:0,
                hqOrderId:0,
                yzsUserId:'',
                typeMap:{1:'婚宴＋婚庆',2:'婚宴',3:'婚庆'},
                orderDetailObj:{
                    type:'',
                },
                hqDetailObj:{
                },
                hyDetailObj:{
                },
                isAndroid:false,
                isLLApp:false,
                isIOS:false,
                businessLineType:0
            }
        },
        computed:{
            type:function(){
                if(this.hqOrderId&&this.hyOrderId){
                    return 1;
                } else if(!this.hqOrderId&&this.hyOrderId){
                    return 2;
                } else if(this.hqOrderId&&!this.hyOrderId){
                    return 3;
                }
            },
            userPhoneShow:function(){
                return this.orderDetailObj.userPhone?this.orderDetailObj.userPhone.split(',')[0]:''
            },
            totalAmount:function(){
                let number = 0;
                if(this.hqDetailObj.realTransAmount){
                    number = number+this.hqDetailObj.realTransAmount;
                }
                if(this.hyDetailObj.realTransAmount){
                    number = number+this.hyDetailObj.realTransAmount;
                }
                return number.toFixed(2);
            }
        },
        props:[],
        components:{
            AppDealItem
        },
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
            this.hqOrderId = Util.getUrlParam('hqOrderId')?parseInt(Util.getUrlParam('hqOrderId')):0;
            this.hyOrderId = Util.getUrlParam('hyOrderId')?parseInt(Util.getUrlParam('hyOrderId')):0;
            this.yzsUserId = Util.getUrlParam('yzsUserId')?parseInt(Util.getUrlParam('yzsUserId')):0;
            this.businessLineType = Util.getUrlParam('businessLineType')?parseInt(Util.getUrlParam('businessLineType')):0;
            KNB.ready(()=>{
                KNB.getUA({
                    success: (info)=>{
                        this.isIOS = info&&info.osName=='ios'?true:false;
                        this.isAndroid = info&&info.osName=='android'?true:false;
                        if(this.hyOrderId&&!this.hqOrderId){
                            this.getOrderDetailHY();
                        }
                        if(this.hqOrderId&&!this.hyOrderId){
                           this.getOrderDetailHQ();
                        }

                        if(this.hqOrderId&&this.hyOrderId){
                            this.getOrderDetailHY();
                            this.getOrderDetailHQ();
                        }
                    },
                    fail: (err)=>{
                        if(this.hyOrderId&&!this.hqOrderId){
                            this.getOrderDetailHY();
                        }
                        if(this.hqOrderId&&!this.hyOrderId){
                           this.getOrderDetailHQ();
                        }

                        if(this.hqOrderId&&this.hyOrderId){
                            this.getOrderDetailHY();
                            this.getOrderDetailHQ();
                        }
                    }
                });
            });
        },
        methods:{
            toCustomerDetail:function(){
                location.href= gDomain+'/app/gfe-app-page-yzs-love-lab/customer-business-detail.html?yzsUserId='+this.yzsUserId+'&businessLineType='+this.businessLineType;
            },
            getOrderDetailHQ:function(){
                let ajaxUrl = mDomain+'/lovelab/order/mainOrderPageAjaxAction?orderId='+this.hqOrderId;
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
                          console.log('网络错误，请重试');
                          Toast('网络错误，请重试');
                          return
                        }
                    }
                    json.content.orderId = this.hqOrderId;
                    json.content.typeDesc = '婚庆';
                    this.hqDetailObj = json.content;
                    this.orderDetailObj = json.content;
                    console.log(json.data);
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('failed', ex);
                });
            },
            getOrderDetailHY:function(){
                let ajaxUrl = mDomain+'/lovelab/order/mainOrderPageAjaxAction?orderId='+this.hyOrderId;
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
                          console.log('网络错误，请重试');
                          Toast('网络错误，请重试');
                          return
                        }
                    }
                    json.content.orderId = this.hyOrderId;
                    json.content.typeDesc = '婚宴';
                    this.hyDetailObj = json.content;
                    this.orderDetailObj = json.content;
                    console.log(json.data);
                }).catch(function(ex) {
                    Toast('网络异常，请重试');
                    console.log('failed', ex);
                });
            }
        }
}
</script>
<style lang="less">
    @import url("../commonLess/border.less");
    @import url("../commonLess/util.less");
    .sign-detail-section{
        color: #333;
        font-size: 1.5rem;
        .sign-status-div{
            text-align: center;
            background: #72CEE3;
            line-height: 3.8rem;
            color: #fff;
            font-size: 1.3rem;
            img{
                width: 1.5rem;
                height: 1.5rem;
                position: relative;
                top: .3rem;
                margin-right: 1rem;
            }
        }
        .basic-info{
            background-color: #fff;
            padding-left: 1.5rem;
            padding-top: 2.2rem;
            position: relative;
            .sign-type-desc{
                padding-bottom: 1.5rem;
                margin-right: 1.5rem;
                .borderline(#e1e1e1,bottom);
            }
        }
        .customer-telephone{
            color: #111;
            font-size: 1.6rem;
            font-family: PingFangSC-Regular;
            line-height: 3rem;
            .user-phone-show{
                display: inline-block;
                margin-bottom: 1.4rem;
                line-height: 1.6rem;
            }
            div.name{
                font-family: PingFangSC-Medium;
                font-size: 2rem;
                color: #111111;
                margin-right: 1rem;
                max-width: 20rem;
                display: inline-block;
                vertical-align: top;
            }
            .call-span{
                padding: .5rem;
            }
            img{
                position: relative;
                top: .5rem;
            }
        }
        .sign-info{
            background-color: #fff;
            color: #666;
            padding: 1.5rem;
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
            .flex-parent{
                line-height: 2rem;
            }
        }
    }
    .deal-list-section{
        padding: 1rem;
        background: #fff;
    }
    .back-to-customer{
        line-height: 4rem;
        border:solid 1px #bbbbbb;
        text-align: center;
        border-radius: .2rem;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        color: @mainColor;
        font-size:1.3rem;
        font-family: PingFangSC-Regular;
        font-size: 1.5rem;
        color: #666666;
        margin-top: 3rem;
    }
    .sign-info-item{
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
        line-height: 1.4rem;
        &:last-child{
            margin-bottom: 0;
        }
        .label,.value{
            display: inline-block;
            vertical-align: top;
        }
        .label{
            color: #999;
            width: 5.6rem;
            margin-right:2.2rem;
        }
        .value{
            color: #333;
            max-width: 75%;
        }
    }
</style>