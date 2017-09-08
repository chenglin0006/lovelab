<template>
    <section class="order-basic-info-section">
        <div class="user-info-div">
           <div class="first-line">
               <span class="name">{{orderDetailData.userName}}</span>
               <span class="tel">{{orderDetailData.userPhone}}</span>
               <span class="tag tag-zhiqian" v-if="orderType==1">直签</span>
               <span class="tag tag-daishou" v-else-if="orderType==0">代收代付</span>
           </div>
            <div class="second-line">
                <span class="big-font">{{orderDetailData.orderType}}</span>
                <span class="small-font">{{orderDetailData.salesId}} 于 {{orderDetailData.signTime}} 签约</span>
            </div>
        </div>
        <div class="sign-info-div">
            <div class="order-item">
                <div class="label">签约门店</div>
                <div class="value">{{orderDetailData.shopName}}</div>
            </div>
            <div class="order-item">
                <div class="label">签约厅</div>
                <div class="value">
                    <span v-if="orderDetailData.hallName">{{orderDetailData.hallName}}</span>
                    <span v-else>无</span>
                </div>
            </div>
            <div class="order-item">
                <div class="label">签约档期</div>
                <div class="value">
                    <span v-if="orderDetailData.schedule">{{orderDetailData.schedule}}</span>
                    <span v-else>无</span>
                </div>
            </div>
            <div class="order-item">
                <div class="label">签约金额</div>
                <div class="value">{{orderDetailData.transAmount}}</div>
            </div>
        </div>
    </section>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @import url('../../commonLess/border.less');

    .order-basic-info-section {
        background:#fff;
        padding: 1.5rem;
        .user-info-div {
            position: relative;
            padding-bottom:1.5rem;
            .borderline(#e1e1e1, bottom);
            .first-line {
                line-height:2rem;
                margin-bottom:1rem;
                color:#111;
            }
            .name{
                font-size:2rem;
                margin-right:1rem;
                vertical-align: middle;
                max-width: 30%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
            }
            .tel{
                font-size:1.6rem;
                vertical-align: middle;
            }
            .tag{
                position:absolute;
                right:0;
                top:0;
                color:#25C8B8;
                border: 1px solid #fff;
                -webkit-border-radius:.2rem .2rem;
                -moz-border-radius:.2rem .2rem;
                border-radius:.2rem .2rem;
                font-size:1.2rem;
                line-height:1;
            }
            .tag-zhiqian{
                color:#25C8B8;
                border: 1px solid #25C8B8;
                padding:.4rem 1.7rem;
            }
            .tag-daishou{
                color:#3BA5E7;
                border: 1px solid #3BA5E7;
                padding:.4rem .5rem;

            }
            .second-line{
                line-height:1;
            }
            .big-font{
                color:#333;
                font-size:1.5rem;
                margin-right:1rem;
            }
            .small-font{
                color:#999;
                font-size:1.2rem;
            }
        }
        .sign-info-div{
            padding-top:1rem;
            font-size:1.4rem;
            line-height:1;
            text-align: left;
            .order-item{
                display:-webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display:flex;
                margin-bottom:1rem;
                &:last-child{
                    margin-bottom:0;
                }
            }
            .label{
                width:7rem;
                color:#999;
            }
            .value{
                color:#333;
                width:70%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
</style>
<script>
  export default{
    data(){
      return {
      }
    },
    props: ['orderType','orderDetailData'], //代收=0，酒店直签=1,子订单=2
    components: {}
  }
</script>
