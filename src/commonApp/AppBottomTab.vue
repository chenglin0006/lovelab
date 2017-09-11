<!--
    底部tab
-->
<template>
	<section class="love-lab-bottom-tab-div flex-parent" :class="{'is-android':isAndroid}" v-show="showBottom">
        <div class="tab-title flex-child calendar" :class="{'active':activeTab=='invite'}" @click="toIndex(calendarLink,'invite')">
            <div class="number-div" v-if="notDealNumber"><span>{{notDealNumber}}</span></div>
            <div class="img-div"></div>
            <a>日程{{activeTab}}</a>
        </div>
        <div class="tab-title flex-child hotel" :class="{'active':activeTab=='hotel'}" @click="toIndex(hotelLink,'hotel')">
            <div class="img-div"></div>
            <a>资料库</a>
        </div>
        <div class="tab-title flex-child own" :class="{'active':activeTab=='own'}" @click="toIndex(ownLink,'own')">
            <div class="img-div"></div>
            <a>我的</a>
        </div>
	</section>
</template>
<script>
    import CommonFun from '../commonJs/CommonFun.js';
    import $ from '@dp/zepto';
    import qs from 'qs';
    import Util from '@dp/vc-util';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import UA from '@dp/util-m-ua';
    import { mapGetters } from 'vuex';
    var mDomain = CommonFun.getDomain();
    var gDomain = CommonFun.getGDomain();
    var eDomain = CommonFun.getEDomain();
    export default{
        data(){
            return{
                customerLink:'',
                calendarLink:'',
                hotelLink:'',
                ownLink:'',
                notDealNumber:0,
                isIOS:false,
                isAndroid:false,
                isLLApp:false
            }
        },
        watch:{
            notDealNum:function(){
                this.notDealNumber = this.notDealNum;
            }
        },
        computed:{
            ...mapGetters({
                activeTab:'getActiveTab',
                showBottom:'getShowBottomStatus'
            })
        },
        props:['notDealNum'],
        mounted() {
            this.isLLApp = CommonFun.getUaIsApp();
            this.customerLink = '/customer';
            this.calendarLink = '/invite';
            this.hotelLink = '/hotel';
            this.ownLink = '/own';
            this.getInviteNotDealNumFun();
        },
        methods:{
            //获取待处理日历数目
            getInviteNotDealNumFun:function(){
                let ajaxUrl = mDomain+'/lovelab/salescalendar/reddot';
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json) =>{
                    if(json.code!=200){
                        if(json.code == 600){
                            location.href= eDomain;
                        } else {
                            Toast(json.msg);
                            return
                        }
                    }
                    this.notDealNumber = json.content.count?json.content.count:0
                }).catch(function(ex) {
                    Toast('网络错误，请重试');
                    console.log('ajaxGetIndexResultData failed', ex);
                });
            },
            toIndex:function(link,text){
                if(this.activeTab!=text&&link){
                    this.$store.dispatch('setActiveTab',this.activeTab);
                    this.$router.push({path:link,query:{}});
                }
            }
        }
}
</script>
<style lang="less" scoped>
    .love-lab-bottom-tab-div{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #FFFFFF;
        box-shadow: 0 -1px 0 0 #D7D7D7;
        z-index: 12;
        text-align: center;
        padding-top: .8rem;
        padding-bottom: .5rem;
        font-size: 1rem;
        color: #666666;
        .tab-title{
            position: relative;
            a{
                display: block;
                line-height: 1rem;
                height: 1rem;
            }
            .number-div{
                width: 1.6rem;
                height: 1.6rem;
                position: absolute;
                right: 2.5rem;
                top: -.7rem;
                background: #F74C31;
                border-radius: 50%;
                color: #fff;
                border: solid 1px #fff;
                font-size: 1.1rem;
                z-index: 1;
            }
            .img-div{
                text-align: center;
                position: relative;
                margin: 0 auto;
                margin-bottom: .5rem;
            }
            &.active a{
                color: #FF66A1;
            }
        }
        .customer .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/customer-default.png');
            background-size: cover;
        }
        .customer.active .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/customer-active.png');
            background-size: cover;
        }
        .calendar .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/calendar-default.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        .calendar.active .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/calendar-active.png');
            background-size: cover;
        }
        .hotel .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/hotel-default.png');
            background-size: cover;
        }
        .hotel.active .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/hotel-active.png');
            background-size: cover;
        }
        .own .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/own-default.png');
            background-size: cover;
        }
        .own.active .img-div{
            width: 2.4rem;
            height: 2.4rem;
            background-image: url('../commonImg/own-active.png');
            background-size: cover;
        }
    }
    .love-lab-bottom-tab-div.is-android{
        .number-div span{
            position: relative;
            top: .1rem;
        }
    }
</style>