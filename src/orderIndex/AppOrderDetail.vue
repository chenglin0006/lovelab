<template>
    <div class="order-detail-section">

        <app-order-basic-info :order-detail-data="orderDetailData" :order-type="signType"></app-order-basic-info>

        <!--子账单-->
        <section class="order-detail-ds-section" v-if="signType==0">
            <div class="sub-order-title-div">
                子订单
            </div>
            <div class="sub-order-div">
                <div class="sub-order" v-if="orderDetailData&&orderDetailData.subOrders" :key="index" v-for="(item,index) in orderDetailData.subOrders">
                    <div class="sub-order-info-div" @click="toSubOrderDetailIndexFun(item)">
                        <div class="first-line">
                            <span >{{item.subOrderName}}</span>
                            <div class="pay-status" :class="{'not-pay':item.payType==0}">{{item.payTitle}}</div>
                        </div>
                        <div class="order-item">
                            <div class="label">订单金额:</div>
                            <div class="value">{{item.subOrderAmount}}</div>
                        </div>
                        <div class="order-item">
                            <div class="label">订单编号:</div>
                            <div class="value">{{item.subOrderNum}}</div>
                        </div>
                    </div>
                    <div class="qr-code" @click="showQrCodeFun(item)">
                        <img src="./img/icon_qr@3x.png">
                        <div class="">付款码</div>
                    </div>
                </div>
            </div>
            <div class="qr-code-pop" v-show="showQrCodeStatus">
                <div class="over-lay" @click="hideQrCodeFun"></div>
                <div class="qr-code-content-div">
                    <div class="title-div">
                        <div style="margin-bottom: 1rem;">您正在向美团点评支付</div>
                        <div>{{activeItem.subOrderName}} <span class="money-span">{{activeItem.subOrderAmount}}</span></div>
                        <div class="close-btn" @click="hideQrCodeFun"></div>
                    </div>
                    <qrcode :size="size" :cls="qrCls" :value="qrText"></qrcode>
                    <div class="foot-div">请扫码支付</div>
                </div>
            </div>
        </section>

        <app-order-upload-pic :order-type="signType" :sign-confirm="orderDetailData.signConfirm" :orderId="orderId" :subOrderId="orderDetailData.subOrderId"></app-order-upload-pic>

    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @import url('../commonLess/border.less');
    .order-detail-section{
        .order-detail-ds-section{
            margin-top:1.5rem;
            background:#fff;
        }
        .sub-order-title-div{
            color:#111;
            font-size:1.5rem;
            line-height: 1;
            padding:1.5rem;
            font-weight:600;
            .borderline(#e1e1e1, bottom);
        }
        .sub-order-div{
            padding:1.5rem;
        }
        .sub-order{
            padding:1.5rem 1.75rem 1.5rem 1.25rem;
            color:#777;
            font-size:1.2rem;
            margin-bottom:1.5rem;
            .borderline(#e1e1e1);
            &:last-child{
                margin-bottom:0;
            }
            .first-line{
                line-height:1;
                margin-bottom:1rem;
                span{
                    color:#333;
                    font-size:1.4rem;
                    font-weight:600;
                    vertical-align: middle;
                }
            }
            .order-item{
                .label{
                    text-align: left;
                    margin-right: 0px;
                    display: inline-block;
                    vertical-align: top;
                }
                .value{
                    text-align: left;
                    line-height: 20px;
                    display: inline-block;
                    vertical-align: top;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 54%;
                }
            }
            .pay-status{
                color:#fff;
                display:inline-block;
                margin-left:1.5rem;
                vertical-align: middle;
                background-color:#65C07A;
                line-height:1.7;
                padding:0 1rem;
                -webkit-border-radius:.2rem;
                -moz-border-radius:.2rem;
                border-radius:.2rem;
                &.not-pay{
                    background-color:#ccc;
                }
            }
            .qr-code{
                .borderline(#e1e1e1,left);
                position: absolute;
                right:1.75rem;
                top:1.5rem;
                padding-left:1.75rem;
                padding-top:1rem;
                img{
                    width:3.1rem;
                    height:3.1rem;
                    margin-bottom:.3rem;
                }
            }
        }

        .qr-code-pop{
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            width:100%;
            height:100%;
            z-index:22;
            font-size:1.5rem;
            line-height:1;
            .over-lay{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-color: #000;
                opacity: .6;
            }
            .qr-code-content-div{
                background:#fff;
                position:relative;
                top:50%;
                transform:translateY(-50%);
                text-align: center;
                margin:0 2.5rem;
            }
            .title-div{
                padding:3rem 0;
                color:#777;
                position: relative;
                .money-span{
                    color:#FF66A1;
                    font-weight:600;
                }
                .close-btn{
                    position: absolute;
                    top:1rem;
                    right:1rem;
                    width:2rem;
                    height:2rem;
                    background: url("./img/icon_close@3x.png") no-repeat center;
                    background-size:1.2rem 1.2rem;
                }
            }
            .foot-div{
                color:#999;
                padding:3rem 0;
            }
        }

    }
</style>
<script>
  import CONSTANT from './js/constant.js';
  import Qrcode from 'v-qrcode';
  import fetchJsonp from 'fetch-jsonp';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import Toast from '@dp/wepp-module-toast';
  import AppOrderBasicInfo from './components/AppOrderBasicInfo.vue';
  import AppOrderUploadPic from './components/AppOrderUploadPic.vue';
  import {getParameter} from './js/tool.js';
  import CommonFun from '../commonJs/CommonFun.js';
  var isAPP = CommonFun.getUaIsApp();
  var UAStr = (navigator.userAgent).toLowerCase(),
    isAndroid = /android/.test(UAStr);
  export default{
    data(){
      return {
        orderId: '',
        signType:1, //代收=0 直签=1
        orderDetailData:{}, //order具体的信息

        showQrCodeStatus:false,
        qrCls:'qrcode',//qrcode的class
        qrText:'Read VueJS Feed daily',
        size:200,
        activeItem:{},
      }
    },

    mounted(){
      this.orderId = getParameter('orderId');
      this.getOrderDetailFun();
    },
    methods: {
      getOrderDetailFun:function () {
        let eDomain = CONSTANT.ajaxAddress.eDomain;
        let ajaxGetDetailUrl = eDomain+CONSTANT.ajaxAddress.mainOrderPageAjaxAction+'?orderId='+this.orderId;
        let self = this;

        fetchJsonp(ajaxGetDetailUrl, {
          jsonpCallback:'jsonp'
        }).then(function (response) {
          return response.json();
        }).then((json)=>{
          if(json.code==200){
            let data = json.content;
            self.signType = data.signType;
            self.orderDetailData = data;

          }else if(json.code == 600){
            if(isAndroid && isAPP){
              CommonFun.androidLogin();
            }else{
              location.href = CommonFun.getEDomain();
            }
          }else{
            Toast(json.msg);
            console.log(json.msg);
            return;
          }
        }).catch(function (ex) {
          Toast('网络异常，请重试');
          console.log('获取订单详情失败',ex);
        })
      },

      toSubOrderDetailIndexFun:function (item) {
        location.href = './order-suborder-detail.html?subOrderId='+item.subOrderId;

      },
      showQrCodeFun:function (item) {
        if(item.payType){
          Toast('本订单已完成支付，请勿重复付款');
          return;
        }
        this.showQrCodeStatus = true;
        this.activeItem = item;
        this.qrText = item.subOrderNum.toString();
      },
      hideQrCodeFun:function () {
        this.showQrCodeStatus = false;
      },


    },
    components: {
      AppOrderBasicInfo,
      AppOrderUploadPic,
      Qrcode
    },
  }
</script>
