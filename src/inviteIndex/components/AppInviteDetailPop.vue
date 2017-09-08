<template>
    <section class="invite-detail-pop-section">
        <div class="mask-div" @click="hideTypePop" @touchmove="touchMoveFun($event)"></div>
        <div class="content-div" :class="{'show-visit-pop':showAddVisitHistoryStatus}" @touchmove="touchMoveFun($event)">
            <div class="close-btn" @click="hideTypePop">关闭</div>
            <div class="title">
                <p>{{item.eventTitleShow}}</p>
                <!-- <p v-if="item.eventType==2&&item.eventStatus==201">{{invitePayStatusMap[item.eventStatus]}}</p>
                <p v-else>{{itemTypeMap[item.eventType]}}</p> -->
            </div>
            <div class="content">
                <div class="content-item">
                    <div class="label">时间</div>
                    <div class="value">{{item.eventTime}}</div>
                </div>
                <div class="content-item">
                    <div class="label">顾问</div>
                    <div class="value">{{item.salesName}}</div>
                </div>
                <div class="content-item">
                    <div class="label">酒店</div>
                    <div class="value text-ellipse">{{item.shopName}}</div>
                </div>
                <div class="content-item" v-if="item.eventInfo&&item.eventInfo.yzsUserName || item.eventInfo&&item.eventInfo.yzsUserPhone">
                    <div class="label">客户</div>
                    <div class="value"><span v-if="item.eventInfo.yzsUserName" style="margin-right: .5rem">{{item.eventInfo.yzsUserName}}</span><span>{{item.eventInfo.yzsUserPhone}}</span></div>
                </div>
                <div class="content-item" v-if="item.eventType==2&&item.eventInfo&&item.eventInfo.amount">
                    <div class="label">款项</div>
                    <div class="value">{{item.eventInfo.subOrderTitle}}&nbsp&nbsp{{item.eventInfo.amount}}</div>
                </div>
                <div class="remark-content" v-if="item.eventType!=2&&item.remark">
                    <div class="label">备注</div>
                    <div class="remark">{{item.remark}}</div>
                </div>
            </div>
            <div class="bottom-action-div flex-parent" v-show="item.eventType==1&&(currentMis.salesId==item.salesId) || item.eventType==1&&isBoss">
                <div class="action-btn flex-child" @click="changeTimeFun('invite')">更改时间</div>
                <div class="action-btn flex-child" @click="toCustomerDetailIndex">客户详情</div>
                <div class="action-btn flex-child" :class="{'disabled':item.eventStatus==102||item.eventStatus==101}" @click="showCancelInviteFun">取消邀约</div>
                <div class="action-btn active flex-child" :class="{'disabled':item.eventStatus==102}" @click="showAddVisitHistoryFun">已到店</div>
            </div>
            <div class="bottom-action-div flex-parent" v-show="item.eventType==3&&(currentMis.salesId==item.salesId) || item.eventType==3&&isBoss">
                <div class="action-btn flex-child" @click="changeTimeFun('invite')">更改时间</div>
                <div class="action-btn flex-child" @click="toCustomerDetailIndex">客户详情</div>
                <div class="action-btn flex-child" :class="{'disabled':item.eventStatus==302||item.eventStatus==301}" @click="showCancelInviteFun">取消邀约</div>
                <div class="action-btn active flex-child" :class="{'disabled':item.eventStatus==302}" @click="showAddVisitHistoryFun">已到店</div>
            </div>
            <div class="bottom-action-div flex-parent" v-show="item.eventType==2&&(currentMis.salesId==item.salesId) || item.eventType==2&&isBoss">
                <div class="action-btn flex-child" @click="changeTimeFun('pay')">更改时间</div>
                <div class="action-btn flex-child" @click="toOrderDetailIndex">收款详情</div>
                <div class="action-btn flex-child active" @click="showPayFun">已收款</div>
            </div>
        </div>
        <app-invite-visit-shop-history @refreshInviteAndSummaryNum="emitRefreshInviteAndSummaryNum"  :item="item" :select-hotel="selectHotel" :select-customer="selectCustomer" @hidepop="hideAddVisitHistoryFun" v-show="showAddVisitHistoryStatus" class="add-visit-history"></app-invite-visit-shop-history>
        <app-sure-pop v-show="showSureCancelInviteStatus" :text="'确认取消邀约么'" @hidepop="hideCancelVisitFun"></app-sure-pop>
        <app-sure-pop v-show="showSurePayStatus" :text="'确认收款么'" @hidepop="hidePayFun"></app-sure-pop>
    </section>
</template>
<script>
    import commonData from '../js/commonData.js';
    import qs from 'qs';
    import AppSurePop from './AppSurePop.vue';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import { mapGetters } from 'vuex';
    import AppInviteVisitShopHistory from './AppInviteVisitShopHistory.vue'
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var gDomain = CommonFun.getGDomain();
    var eDomain = CommonFun.getEDomain();


    export default{
        data(){
            return{
               itemTypeMap:commonData.itemTypeMap,
               showAddVisitHistoryStatus:false,
               showSureCancelInviteStatus:false, //确认取消邀约弹窗
               showSurePayStatus:false, //确认收款弹窗
               invitePayStatusMap:commonData.invitePayStatusMap,
               isLLApp:false
            }
        },
        props:['item'],
        computed:{
            ...mapGetters({
                isBoss:'getIsBoss',
                currentMis:'getCurrentMis',
            }),
            selectHotel:function(){
                let obj = {
                    shopId:this.item.shopId,
                    shopName:this.item.shopName
                }
                return obj
            },
            selectCustomer:function(){
                return this.item.yzsUserId
            }
        },
        components:{
            AppInviteVisitShopHistory,
            AppSurePop
        },
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
        },
        methods:{
            hideTypePop:function(){
                this.$emit('hidepop');
            },
            changeTimeFun:function(type){
                this.$emit('showchangetimepop',type);
            },
            showAddVisitHistoryFun:function(){
                //已取消的情况不能点击已到店
                if(this.item.eventStatus==102){
                    return;
                }
                this.showAddVisitHistoryStatus = true;
            },
            hideAddVisitHistoryFun:function(){
                this.showAddVisitHistoryStatus = false;
            },
            showCancelInviteFun:function(){
                if(this.item.eventType==1&&(this.item.eventStatus==102 || this.item.eventStatus==101) || this.item.eventType==3&&(this.item.eventStatus==302 || this.item.eventStatus==301)){
                    return;
                }
                this.showSureCancelInviteStatus = true;
            },
            hideCancelVisitFun:function(bool){
                if(!bool){
                    this.showSureCancelInviteStatus = false;
                    return
                }
                let params = {
                    eventId:this.item.eventId,
                    eventTime:this.item.eventTime,
                    remark:this.item.remark,
                    status:102,
                    operationType:2
                }
                if(this.item.eventType==3){
                    params.status = 302;
                }
                let ajaxUrl = mDomain+'/lovelab/salescalendar/updateevent?'+qs.stringify(params);
                console.log('更改取消邀约状态:',params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code != 200){
                        Toast(json.msg);
                        console.log('更改取消邀约状态失败')
                        return;
                    }
                    this.item.eventStatus= 102;
                    this.showSureCancelInviteStatus = false;
                    this.$emit('refreshInviteNum');
                    this.$emit('refreshSummaryNum');
                }).catch(function(ex) {
                    Toast('网络错误，请重试');
                    console.log('更改取消邀约状态失败 failed', ex);
                });
            },
            showPayFun:function(){
                this.showSurePayStatus = true;
            },
            hidePayFun:function(bool){
                if(!bool){
                    this.showSurePayStatus = false;
                    return
                }
                let params = {
                    eventId:this.item.eventId,
                    eventTime:this.item.eventTime,
                    remark:this.item.remark,
                    status:201,
                    operationType:2
                }
                console.log('更改付款状态:',params);
                let ajaxUrl = mDomain+'/lovelab/salescalendar/updateevent?'+qs.stringify(params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json)=>{
                    if(json.code != 200){
                        Toast(json.msg);
                        console.log('更改付款状态失败')
                        return;
                    }
                    this.item.eventStatus = 201;
                    this.showSurePayStatus = false;
                    this.$emit('refreshInviteNum');
                    this.$emit('refreshSummaryNum');
                }).catch(function(ex) {
                    Toast('网络错误，请重试');
                    console.log('更改付款状态 failed', ex);
                });
            },
            toCustomerDetailIndex:function(){
                let businessLineType = 0;
                if(this.item.eventType==1){
                    businessLineType=0;
                } else if(this.item.eventType==3){
                    businessLineType=1;
                }
                let urlLink = 'https:'+gDomain+'/app/gfe-app-page-yzs-love-lab/customer-business-detail.html?yzsUserId='+this.item.yzsUserId+'&businessLineType='+businessLineType;
                if(this.isLLApp){
                    KNB.openWebview({
                      url: urlLink
                    });
                } else {
                    location.href= urlLink;
                }
            },
            toOrderDetailIndex:function(){
                let urlLink = 'https:'+gDomain+'/app/gfe-app-page-yzs-love-lab/order-suborder-detail.html?subOrderId='+this.item.eventInfo.subOrderId;
                if(this.isLLApp){
                    KNB.openWebview({
                      url: urlLink
                    });
                } else {
                    location.href= urlLink;
                }
            },
            emitRefreshInviteAndSummaryNum:function(){
                this.$emit('refreshInviteNum');
                this.$emit('refreshSummaryNum');
            },
            touchMoveFun:function(event){
                event.preventDefault();
                event.stopPropagation();
            }
        }
}
</script>
<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");
    .invite-detail-pop-section{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 1.4rem;
        bottom: 0;
        z-index: 14;
        .content-div{
            color: #333;
            background: #fff;
            position: relative;
            z-index: 100;
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            &.show-visit-pop{
                display: none;
            }
            .close-btn{
                position: absolute;
                right: 1.5rem;
                top: 1.3rem;
                font-family: PingFangSC-Medium;
                font-size: 1.5rem;
                color: #111111;
                z-index: 10;
            }
            .content{
                padding: 2rem 1.5rem;
                padding-bottom: 0;
            }
        }
        .bottom-action-div{
            padding: .6rem 1.5rem;
            border-top: solid .1rem #f2f2f2;
            .action-btn{
                font-size: 1.5rem;
                width: 0;
                line-height: 4rem;
                border:solid .1rem #bbb;
                border-radius: .2rem;
                color: #666;
                margin-right: 1rem;
                &:last-child{
                    margin-right: 0;
                }
                &.active{
                    background-color: @mainColor;
                    border:solid .1rem @mainColor;
                    color: #fff;
                }
                &.disabled{
                    background-color: #f2f2f2;
                    border-color: #ddd;
                    color: #999;
                }
            }
        }
    }
    .content-div{
        .title{
            line-height: 4.5rem;
            .borderline(#e1e1e1,bottom);
            font-size: 1.5rem;
            color: #333333;
        }
    }

    .content-item{
        margin-bottom: 1rem;
        font-size: 1.4rem;
        line-height: 1.4rem;
        height: 1.4rem;
        .label{
          text-align: right;
          display: inline-block;
          vertical-align: top;
          color: #999;
          margin-right: 1.5rem;
          line-height: 1.4rem;
          height: 1.4rem;
        }
        .value{
            text-align: left;
            display: inline-block;
            vertical-align: top;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 75%;
            line-height: 1.4rem;
            height: 1.4rem;
        }
    }
    .remark-content{
        text-align: left;
        .label{
            color: #999;
            line-height: 1.4rem;
            height: 1.4rem;
            padding-left: 1.9rem;
        }
        .remark{
            position: relative;
            top: -1.8rem;
            display: -webkit-box;
            -webkit-line-clamp: 8;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding-left: 6.6rem;
            padding-right: 1rem;
            word-wrap: break-word;
        }
    }
</style>