<template>
    <section class="order-detail-section">
        <!--<div class="order-head-area">-->
            <!--<span class="head-icon back-icon" @click="toBack"></span>-->
            <!--<h3 class="title">子订单详情</h3>-->
        <!--</div>-->
        <app-order-basic-info :order-detail-data="subOrderDetailData" :order-type="2"></app-order-basic-info>
        <div class="sub-order-content-div">
            <div class="head-area">
                <div class="sequence-type-div">{{subOrderDetailData.subOrderName}}</div>
                <div class="order-number-div">{{subOrderDetailData.subOrderNum}}</div>
                <div class="pay-status-div has-pay" v-if="subOrderDetailData.payType">已支付</div>
                <div class="pay-status-div" v-else>未支付</div>
            </div>
            <div class="amount-div">
                <div class="order-amount amount">
                    <div class="title">订单金额</div>
                    <div class="money">{{subOrderDetailData.subOrderAmount}}</div>
                </div>
                <div class="pay-amount amount">
                    <div class="title">已支付</div>
                    <div class="money">{{subOrderDetailData.alreadyPayAmount}}</div>
                </div>
                <div class="should-pay-amount amount">
                    <div class="title">待支付</div>
                    <div class="money">{{subOrderDetailData.needToPayAmount}}</div>
                </div>
            </div>
            <div class="pay-info-div">
                <div class="info-text" v-if="subOrderDetailData.payType">
                <div>本订单已完成支付，请勿重复付款</div>
                </div>
                <div class="pay-code-qr-div" v-else>
                    <div style="margin-bottom:10px;">付款码</div>
                    <qrcode :size="size" :cls="qrCls" :value="qrText"></qrcode>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    /*@import './orderCommonLess.less';*/
    @import url('../commonLess/border.less');
    .sub-order-content-div{
        background:#fff;
        margin-top:1.5rem;
        .head-area{
            padding:1.5rem;
            font-size:1.2rem;
            position: relative;
            line-height:1;
            .pay-status-div{
                position: absolute;
                right:1.5rem;
                top:1.5rem;
                background-color: #ccc;
                color:#fff;
                line-height:2rem;
                padding:0 1rem;
                -webkit-border-radius:.2rem;
                -moz-border-radius:.2rem;
                border-radius:.2rem;
                &.has-pay{
                    background-color:#65C07A;
                }
            }
        }
        .sequence-type-div{
            font-size:1.4rem;
            color:#333;
            font-weight:600;
            margin-bottom:.5rem;
            line-height:2rem;
        }
        .amount-div{
            padding:1.7rem 0;
            font-size:0;
            .borderline(#e1e1e1,top);
            .borderline(#e1e1e1,bottom);
            color:#999;
            line-height:1;
            .amount{
                width:33.3%;
                display: inline-block;
                vertical-align: top;
                font-size:1.2rem;
                text-align: center;
                .borderline(#e1e1e1,right);
                &:last-child:after{
                    border-right:none;
                }
            }
            .money{
                color:#333;
                margin-top:1.5rem;
            }
        }
        .pay-info-div{
            text-align: center;
            margin-top:3rem;
            padding-bottom:2rem;
            font-size:1.2rem;
            color:#999;
        }
    }
</style>
<script>
  import AppOrderBasicInfo from './components/AppOrderBasicInfo.vue';
  import CONSTANT from './js/constant.js';
  import fetchJsonp from 'fetch-jsonp';
  import Toast from '@dp/wepp-module-toast';
  import Qrcode from 'v-qrcode';
  import {getParameter} from './js/tool.js';
  import CommonFun from '../commonJs/CommonFun.js';
  var UAStr = (navigator.userAgent).toLowerCase(),
    isAndroid = /android/.test(UAStr);
  var isAPP = CommonFun.getUaIsApp();

  export default{
    data(){
      return {
        subOrderId: '',
        subOrderDetailData:{},
        qrText:'',
        qrCls:'qrcode',
        size:200,
      }
    },
    mounted(){
      this.subOrderId = getParameter('subOrderId');
      console.log(this.subOrderId);
      this.getSubOrderDetailFun();
    },

    methods:{
      getSubOrderDetailFun:function () {
        let eDomain = CONSTANT.ajaxAddress.eDomain;
        let ajaxGetSubDetailUrl = eDomain+CONSTANT.ajaxAddress.subOrderDetailInfoAjaxAction+'?subOrderId='+this.subOrderId;
        fetchJsonp(ajaxGetSubDetailUrl, {
          jsonpCallback:'jsonp'
        }).then(function (response) {
          return response.json();
        }).then((json)=>{
          if(json.code==200){
            this.subOrderDetailData = json.content;
            this.qrText = this.subOrderDetailData.subOrderNum.toString();
          }else if(json.code==600){
            if(isAndroid && isAPP){
              CommonFun.androidLogin();
            }else{
              location.href = CommonFun.getEDomain();
            }
        }else{
            Toast(json.msg);
            console.log(json.msg);
          }
        }).catch(function (ex) {
          Toast('网络异常，请重试');
          console.log('获取子订单失败',ex);
        })
      },

    },
    components: {
      AppOrderBasicInfo,
      Qrcode,
    }
  }
</script>
