<template>
    <section class="deal-item-section" @click="toDealDetailIndex">
        <div class="deal-item-title">
            <div class="left-border"></div>
            <span class="sign-text">{{orderDetailObj.typeDesc}}订单</span>
            <span>{{orderDetailObj.signTime}}</span>
            <span>签约</span>
            <span class="sign-type">{{orderDetailObj.signTypeTitle}}</span>
        </div>
        <div class="deal-item-content">
            <div class="sign-info-item">
                <div class="label">
                    <span v-if="orderDetailObj.typeDesc=='婚宴'">签约酒店</span>
                    <span v-else>签约婚庆</span>
                </div>
                <div class="value text-ellipse">{{orderDetailObj.shopName}}</div>
            </div>
            <div class="sign-info-item" v-if="orderDetailObj.typeDesc=='婚宴'">
                <div class="label">宴会档期</div>
                <div class="value">{{orderDetailObj.schedule}}</div>
            </div>
            <div class="sign-info-item">
                <div class="label">签约总价</div>
                <div class="value">{{orderDetailObj.transAmount}}</div>
            </div>
        </div>
    </section>
</template>
<script>
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var gDomain = CommonFun.getGDomain();
    export default{
        data(){
            return{
            }
        },
        props:['orderDetailObj'],
        mounted() {
        },
        methods:{
            toDealDetailIndex:function(){
                location.href=gDomain+'/app/gfe-app-page-yzs-love-lab/order-detail.html?orderId='+this.orderDetailObj.orderId;
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .deal-item-section{
        background-color: #fff;
        margin-bottom: 10px;
        position: relative;
        font-size: 1.4rem;
        .borderline(#e1e1e1);
        .deal-item-title{
            background: #FFEFF5;
            padding: 0 10px;
            line-height: 3.8rem;
            font-family: PingFangSC-Regular;
            font-size: 1.2rem;
            color: #777777;
            position: relative;
            .left-border{
                display: inline-block;
                width: .3rem;
                height: 1.5rem;
                background: @mainColor;
                position: absolute;
                left: 0;
                top: 1.05rem;
            }
            .sign-text{
                font-size: 1.5rem;
                color: #333333;
                margin-right: 1rem;
            }
            .sign-type{
                position: absolute;
                right: 1rem;
            }
        }
        .deal-item-content{
            padding: 10px;
            color: #666;
            .flex-parent{
                line-height: 20px;
            }
        }
    }
</style>