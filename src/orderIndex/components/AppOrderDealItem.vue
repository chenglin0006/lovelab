<template>
    <section class="result-item-section" @click="toDetailIndex($event)">
        <div class="head-div">
            <span class="name">{{item.userName}}</span>
            <span class="tel">{{item.userPhone}}</span>
            <div class="price">￥{{item.transAmount}}<span>（{{item.orderType}}）</span></div>
            <div :class="[ item.signTypeDesc=='酒店直签' ? 'tag-zhiqian' : 'tag-daishou', 'pay-way']"></div>
        </div>
        <div class="deal-detail-div">
            <div class="deal-info">
                <div class="detail-label">签约商户:</div>
                <div class="text-ellipse detail-value">{{item.shopName}}</div>
            </div>
            <div class="deal-info">
                <div class="detail-label">宴会档期:</div>
                <div class="detail-value">{{item.scheduleFrom}}<span v-show="item.scheduleFrom!=item.scheduleTo">~{{item.scheduleTo}}</span></div>
            </div>
            <div class="other-div">
                <span class="dispatcher-name">{{item.salesName}}</span>于
                <span class="dispatcher-time">{{item.signTime}}</span>签约
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import url('../../commonLess/border.less');
    .result-item-section{
        padding:1.5rem 1rem;
        margin:1rem 1.5rem;
        background:#fff;
        .borderline(#e1e1e1);
        border-radius: .5rem;
        .head-div{
            font-size:1.6rem;
            line-height:1;
            color:#111;
            padding-bottom:1rem;
            position:relative;
            .borderline(#e1e1e1,bottom);
            .name{
                font-weight:600;
                margin-right:1rem;
                max-width: 30%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
                vertical-align: middle;
            }
            .tel{
                vertical-align: middle;
                max-width: 40%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
            }
            .price{
                color:#333;
                font-size:1.5rem;
                margin-top:1rem;
            }
            .pay-way{
                position:absolute;
                display: inline-block;
                right:0;
                top:0;
                width:5.8rem;
                height:2rem;
                background-size:cover;
                background-repeat: no-repeat;
                &.tag-zhiqian{
                    background-image: url('../img/tag_zhiqian@3x.png');
                }
                &.tag-daishou{
                    background-image: url("../img/tag_daishou@3x.png");
                }
            }
        }
        .deal-detail-div{
            padding-top:1rem;
            color:#999;
            font-size:1.2rem;
            line-height:1.1;
            .deal-info{
                margin-bottom:.65rem;
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                .detail-label{
                    width:5.55rem;
                }
                .detail-value{
                    -webkit-box-flex: 1;
                    -ms-box-flex: 1;
                    -ms-flex: 1;
                    flex:1;
                    width:95%;
                }
            }
            .other-div{
                padding-top:.5rem;
                span{
                    margin-right:.5rem;
                }
            }
        }
    }
</style>
<script>
  import CONSTANT from '../js/constant.js';
  import CommonFun from '../../commonJs/CommonFun.js';
  var isAPP = CommonFun.getUaIsApp();
  export default{
    props: ['item'],

    methods:{
      toDetailIndex: function (event) {
        location.href = './order-detail.html?orderId='+this.item.id;

      }
    },
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
