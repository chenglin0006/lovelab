<template>
    <section class="hotel-detail-section">
        <div class="pic-div" @click="toPicIndex">
            
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide :key="index" v-for="(item,index) in imgList">
                    <img :src="item">
                </swiper-slide>
                 <div v-show="imgList.length>0" class="swiper-pagination" slot="pagination"></div>
                </swiper>
            
            <div class="mask-index-div">
            </div>
            <div class="pic-number-div" v-if="hotelBasicBriefInfoData.picCount">共{{hotelBasicBriefInfoData.picCount}}张</div>
        </div>
        <div class="hotel-info-div">
            <div class="hotel-name-div text-ellipse">{{hotelBasicBriefInfoData.shopName}}</div>
            <div class="hotel-desc-div">
                <div class="level-span" v-if="hotelBasicBriefInfoData.level">
                    <img v-if="hotelBasicBriefInfoData.level==20" src="./img/detail-level-a.png">
                    <img v-if="hotelBasicBriefInfoData.level==30" src="./img/detail-level-b.png">
                    <img v-if="hotelBasicBriefInfoData.level==40" src="./img/detail-level-c.png">
                    <img v-if="hotelBasicBriefInfoData.level==10" src="./img/detail-level-s.png">
                    <img style="height:1.5rem" v-if="hotelBasicBriefInfoData.level==6" src="./img/detail-level-ss.png">
                </div>
                <div class="price-div">{{hotelBasicBriefInfoData.price}}</div>
            </div>
            <div class="region-div" v-show="hotelBasicBriefInfoData.address||hotelBasicBriefInfoData.phoneNumber">
                <div class="region-text" v-show="hotelBasicBriefInfoData.address">{{hotelBasicBriefInfoData.address}}</div>
                <div class="call-div" v-if="hotelBasicBriefInfoData.phoneNumber" @click="callShopFun">
                    <img src="./img/call-icon.png">
                </div>
            </div>
        </div>
        <div class="recommand-div detail-module-div" @click="toHotelRecommandIndex" v-show="hotelBasicBriefInfoData.description">
            <div class="recommand-title detail-module-title-div">
                <div class="title-text">推荐理由</div>
                <div class="right-arrow">
                    <img src="./img/right_arrow.png">
                </div>
            </div>
            <div class="recommand-content" v-html="hotelBasicBriefInfoData.description">
            </div>
        </div>
        <div class="discount-div detail-module-div" @click="toHotelDiscountIndex" v-if="discountData">
            <div class="discount-title">
                <div class="discount-tag-div">独家优惠</div>
                <div class="text-ellipse" style="vertical-align:bottom;max-width:60%;display: inline-block ">{{discountData.showText}}</div>
                <div class="right-arrow">共{{discountData.discountNum}}条
                    <img src="./img/right_arrow.png">
                </div>
            </div>
        </div>
        <div class="banquet-div detail-module-div" v-show="hallListData.length">
            <div class="banquet-title detail-module-title-div">
                <div class="title-text">宴会厅（{{hallListData.length}}）</div>
            </div>
            <div class="check-schedule-btn" v-if="!scheduleFrom" @click="showCalendarFun">
                请选择查询起止日期
                <img src="./img/right_arrow.png">
            </div>

            <div class="check-schedule-btn" v-else @click="showCalendarFun">
                <div class="schedule-from-to-div from-div">
                    <p class="schedule-text">{{scheduleFrom}}</p>
                    <p class="schedule-desc">开始日期</p>
                </div>
                <div style="vertical-align: top;line-height: 3rem;">~</div>
                <div class="schedule-from-to-div to-div">
                    <p class="schedule-text">{{scheduleTo}}</p>
                    <p class="schedule-desc">结束日期</p>
                </div>
                <img src="./img/right_arrow.png">
            </div>
            <div class="hall-list-div">
                <app-check-hall-item v-if="index<=2||toggleHallStatus" :key="index" :shop-id="shopId" :item="item" v-for="(item,index) in hallListData" @checkScheduleFun="showCalendarFun" @showValidScheduleFun="showValidScheduleFun"></app-check-hall-item>
            </div>
            <div v-show="hallListData.length>3">
                <div class="more-div" @click="toggleMoreHallFun" v-if="!toggleHallStatus">更多{{hallListData.length-3}}个宴会厅<img src="../commonImg/fold.png"></div>
                <div class="more-div" @click="toggleMoreHallFun" v-else>收起<img src="../commonImg/fold.png" style="margin-left:10px;-webkit-transform: rotate(180deg)"></div>
            </div>
        </div>
        <div class="banquet-menu-div detail-module-div" v-show="menuListData.length">
            <div class="banquet-menu-title detail-module-title-div">
                <div class="title-text">婚宴菜单</div>
            </div>
            <div class="banquet-menu-list-div">
                <app-banquet-menu-item v-if="index<=2||toggleMenuStatus" :item="item" :key="index" v-for="(item,index) in menuListData"></app-banquet-menu-item>
            </div>
            <div v-show="menuListData.length>3">
                <div class="more-div" v-if="!toggleMenuStatus" @click="toggleMoreMenuFun">更多{{menuListData.length-3}}个菜单<img src="../commonImg/fold.png"></div>
                <div class="more-div" v-else @click="toggleMoreMenuFun">收起<img src="../commonImg/fold.png" style="margin-left:10px;-webkit-transform: rotate(180deg)"></div>
            </div>
        </div>
        <div class="setting-div detail-module-div" v-show="facilityData">
            <div class="setting-title detail-module-title-div">
                <div class="title-text">收费服务</div>
            </div>
            <div class="setting-info">
                <div class="setting-item" v-for="(item,index) in facilityData">
                    <div class="left-label text-ellipse">{{item.facilityName}}</div>
                    <div class="left-value">
                        <span v-if="item.facilityType==0">免费</span>
                        <span v-if="item.facilityType==1">{{item.fee}}{{item.feeUnit}}</span>
                        <span v-if="item.facilityType==2">面议</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cooperate-rule-div detail-module-div" @click="toHotelCooperateIndex" v-if="cooperateData">
            <div class="cooperate-rule-title detail-module-title-div">
                <div class="title-text">合作条款</div>
                <div class="right-arrow"><img src="./img/right_arrow.png"></div>
            </div>
            <div class="cooperate-rule-content" v-if="cooperateData">
                <div class="cooperate-rule-item">
                    <div class="left-label">合作时间</div>
                    <div class="left-value" v-if="cooperateData.startTimeShow||cooperateData.endTimeShow">{{cooperateData.startTimeShow}}<span v-show="cooperateData.startTimeShow&&cooperateData.endTimeShow&&cooperateData.startTimeShow!=cooperateData.endTimeShow">～{{cooperateData.endTimeShow}}</span></div>
                    <div class="left-value" v-else>未设定</span></div>
                </div>
                <div class="cooperate-rule-item">
                    <div class="left-label">合作模式</div>
                    <div class="left-value" v-if="cooperateData.coType">{{cooperateData.coType}}</div>
                    <div class="left-value" v-else>未设定</div>
                </div>
                <div class="cooperate-rule-item">
                    <div class="left-label">销售策略</div>
                    <div class="left-value" v-if="strategyMap[cooperateData.strategy]">{{strategyMap[cooperateData.strategy]}}</div>
                    <div class="left-value" v-else>未设定</div>
                </div>
            </div>
        </div>
        <div class="operate-status-div detail-module-div" @click="toHotelOperateIndex">
            <div class="operate-status-title detail-module-title-div">
                <div class="title-text">运营现状</div>
                <div class="right-arrow">
                    <img src="./img/right_arrow.png">
                </div>
            </div>
        </div>
        <app-calendar v-show="showCalendarStatus" :is-ios="isIOS" :initcheckintext="scheduleFrom" :initcheckouttext="scheduleTo" :hot-days-list="hotDaysList" @hidechoosepop="hideCalendarFun"></app-calendar>
        <app-valid-schedule-pop :item="activeScheduleHallItem" v-if="showValidScheduleStatus" @hidepop="hideValidScheduleFun"></app-valid-schedule-pop>
    </section>
</template>

<script>
import AppCheckHallItem from './components/AppCheckHallItem.vue'
import AppBanquetMenuItem from './components/AppBanquetMenuItem.vue'
import AppCalendar from './components/AppCalendarPop.vue'
import AppValidSchedulePop from './components/AppValidSchedulePop.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import formatter from 'date-formatter';
import CommonFun from '../commonJs/CommonFun.js';
import KNB from '@dp/knb';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            swiperOption: {
                notNextTick: false,
                setWrapperSize :true,
                autoHeight: false,
                pagination: '.swiper-pagination'
            },
            hallLimitNumber:2,
            scheduleFrom:'',
            scheduleTo:'',
            toggleHallStatus:false,
            toggleMenuStatus:false,
            showCalendarStatus:false,
            showValidScheduleStatus:false,
            activeScheduleHallItem:null,
            imgList:[],
            hotelBasicBriefInfoData:{},
            discountData:{},
            hallListData:[],
            menuListData:[],
            cooperateData:null,
            strategyMap:{1:'一战',2:'二战',3:'散户'},
            facilityData:[],
            hotDaysList:[],
            isLLApp:false,
            isIOS:false,
            isAndroid:false
        }
    },
    props:[],
    components: {
       AppCheckHallItem,
       AppBanquetMenuItem,
       AppCalendar,
       swiper,
       swiperSlide,
       AppValidSchedulePop
    },
    watch:{
        
    },
    computed:{

    },
    mounted(){
        this.shopId = this.$route.query.shopId;
        this.isLLApp = CommonFun.getUaIsApp();
        KNB.ready(()=>{
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info&&info.osName=='ios'?true:false;
                    this.isAndroid = info&&info.osName=='android'?true:false;
                    this.getHotDaysList();
                    this.getBasicBriefInfo();
                    this.getDiscountData();
                    this.getHallData();
                    this.getMenuData();
                    this.getCooperateData();
                    this.getFacilityData();
                },
                fail: (err)=>{
                    this.getHotDaysList();
                    this.getBasicBriefInfo();
                    this.getDiscountData();
                    this.getHallData();
                    this.getMenuData();
                    this.getCooperateData();
                    this.getFacilityData();
                }
            });
        });
    },
    methods:{
        showCalendarFun:function(){
            this.showCalendarStatus = true;
            KNB.ready(()=>{
                KNB.setNavigationBarHidden({
                  flag: 1, //0表示显示，1表示隐藏
                  success: function(){},
                  fail: function(){}
                });
            });
        },
        hideCalendarFun:function(checkInDate,checkOutDate){
            this.showCalendarStatus = false;
            if(checkInDate){
                this.scheduleFrom = checkInDate;
                this.scheduleTo = checkOutDate;
                this.getHallData();
            }
            KNB.ready(()=>{
                KNB.setNavigationBarHidden({
                  flag: 0, //0表示显示，1表示隐藏
                  success: function(){},
                  fail: function(){}
                });
            });
        },
        callShopFun:function(){
            window.location.href = 'tel:'+this.hotelBasicBriefInfoData.phoneNumber;
        },
        toHotelDiscountIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/discount',query:{shopId:this.shopId}})
        },
        toHotelRecommandIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/recommand',query:{shopId:this.shopId}})
        },
        toHotelFeeIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/fee',query:{shopId:this.shopId}})
        },
        toHotelCooperateIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/cooperate',query:{shopId:this.shopId}})
        },
        toHotelOperateIndex:function(){
            this.$router.push({path:'/hotel/hotelDetail/operate',query:{shopId:this.shopId}})
        },
        toPicIndex:function(){
            if(this.hotelBasicBriefInfoData.picCount>0){
                this.$router.push({path:'/hotel/hotelDetail/pic',query:{shopId:this.shopId}})
            }
        },
        showValidScheduleFun:function(hallItem){
            this.activeScheduleHallItem = hallItem;
            this.showValidScheduleStatus = true;
        },
        hideValidScheduleFun:function(){
            this.showValidScheduleStatus = false;
        },
        toggleMoreHallFun:function(){
            this.toggleHallStatus = !this.toggleHallStatus;
        },
        toggleMoreMenuFun:function(){
            this.toggleMenuStatus = !this.toggleMenuStatus;
        },
        getHotDaysList:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hallSchedule/hotSchedule?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast(json.msg);
                        console.log('获取酒店热门档期失败')
                        return;
                    }
                }
                if(json.content.hotSchedules&&json.content.hotSchedules.length){
                    this.hotDaysList = json.content.hotSchedules;
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取酒店基本信息
        getBasicBriefInfo:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/hotelBriefInfo?'+qs.stringify(params);
            // return;
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast(json.msg);
                        console.log('获取酒店基本信息失败')
                        return;
                    }
                }
                if(json.content.hotelInfo.description){
                    json.content.hotelInfo.description = json.content.hotelInfo.description.split('\n').join('<br>');
                }
                this.hotelBasicBriefInfoData = json.content.hotelInfo;
                if(json.content.hotelInfo.headPic){
                    this.imgList.push(json.content.hotelInfo.headPic);
                } else {
                    this.imgList=[];
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取优惠信息
        getDiscountData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/specialinfo?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast("查询优惠信息失败:"+json.msg);
                        console.log('查询优惠信息失败')
                        return;
                    }
                }
                if(JSON.stringify(json.content)!='{}'){
                    json.content.showText='';
                    json.content.discountNum = json.content.visible.length+json.content.invisible.length;
                    if(json.content.default&&json.content.default.specialInfo){
                        json.content.showText = json.content.default.specialInfo;
                    } else {
                        json.content.showText = "点评独家优惠";
                    }
                    if(json.content.showText.length>=15){
                        json.content.showText = '点评独家优惠';
                    }
                    this.discountData = json.content;
                } else {
                    this.discountData = null;
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取宴会厅信息
        getHallData:function(){
            let params = {
                shopId:this.shopId,
                scheduleFrom:this.scheduleFrom,
                scheduleTo:this.scheduleTo
            }
            let ajaxUrl = mDomain+'/lovelab/hallSchedule/list?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast("查询宴会厅信息失败:"+json.msg);
                        console.log('查询宴会厅信息失败')
                        return;
                    }
                }
                if(json.content&&json.content.hallList){
                    json.content.hallList.forEach((ele,index)=>{
                        ele.needSchedule = json.content.needSchedule;
                    });
                }
                this.hallListData = json.content&&json.content.hallList?json.content.hallList:[];
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取菜单列表信息
        getMenuData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/menu/list?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast("获取菜单列表失败:"+json.msg);
                        console.log('获取菜单列表失败')
                        return;
                    }
                }
                this.menuListData = json.content&&json.content.menuArray?json.content.menuArray:[];
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取合作条款接口
        getCooperateData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/contract?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast("查询合作信息失败:"+json.msg);
                        console.log('查询合作信息失败')
                        return;
                    }
                }
                if(json.content){
                    json.content.startTimeShow = json.content.startTime?formatter(new Date(json.content.startTime),'YYYY-MM-DD'):'';
                    json.content.endTimeShow = json.content.endTime?formatter(new Date(json.content.endTime),'YYYY-MM-DD'):'';
                    this.cooperateData = json.content;
                } else{
                    this.cooperateData = null;
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        },
        //获取设施信息接口
        getFacilityData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/facilities?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast("查询设施信息失败:"+json.msg);
                        console.log('查询设施信息失败')
                        return;
                    }
                }
                this.facilityData = json.content&&json.content.facilities?json.content.facilities:null;
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    @import url('../commonLess/border');

    .hotel-detail-section{
        font-family: PingFangSC-Regular;
        font-size: 1.2rem;
        .detail-module-div{
            background: #fff;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
            .detail-module-title-div{
                padding: 0rem 0 0rem 0;
                position: relative;
            }
            .title-text{
                font-family: PingFangSC-Medium;
                font-size: 1.5rem;
                color: #111111;
                line-height: 4.5rem;
            }
            .right-arrow{
                position: absolute;
                top: 0rem;
                right: 1rem;
                line-height: 4.5rem;
                img{
                    width: 1.4rem;
                    position: relative;
                    top: .3rem;
                }
            }
            .left-label{
                font-size: 1.5rem;
                color: #999999;
                display: inline-block;
            }
            .left-value{
                font-size: 1.5rem;
                color: #333333;
                display: inline-block;
            }
        }
        .pic-div{
            width: 100%;
            padding-bottom: 56%;
            position: relative;
            img{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                object-fit:cover;
            }
            .mask-index-div{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 10rem;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 97%);
                z-index: 10;
                text-align: center;
            }
            .pic-number-div{
                position: absolute;
                right: 1.5rem;
                bottom: 1.2rem;
                min-width: 5rem;
                line-height: 1.8rem;
                font-size: 1.2rem;
                background-color: rgba(0,0,0,0.6);
                color: #fff;
                text-align: center;
                border-radius: 1rem;
                -webkit-border-radius: 1rem;
                z-index: 10;
            }
        }
        .hotel-info-div{
            background: #fff;
            padding: 1.5rem 0 1.5rem 1.5rem;
            position: relative;
            margin-bottom: 1.5rem;
            .right-arrow{
                position: absolute;
                top: 20%;
                right: 1rem;
            }
            .hotel-name-div{
                font-family: PingFangSC-Medium;
                font-size: 1.8rem;
                color: #333333;
                margin-bottom: .9rem;
            }
            .hotel-desc-div{
                padding-bottom: 1rem;
                .borderline(#e1e1e1,bottom);
                div{
                    font-size: 0;
                    display: inline-block;
                    &.level-span{
                        color: #fff;
                        text-align: center;
                        font-size: 1.4rem;
                        margin-right: .5rem;
                    }
                    &.price-div{
                        font-family: HelveticaNeue;
                        font-size: 1.4rem;
                        color: #777777;
                        letter-spacing: 0;
                    }
                }
                img{
                    width: 3.4rem;
                    height: 1.8rem;
                    position: relative;
                    top: .2rem;
                }
            }
            .region-div{
                padding: 1.4rem 0 0rem 0;
                position: relative;
                min-height: 2rem;
                .position-img{
                    position: relative;
                    top: 0rem;
                    width: 1rem;
                    height: 1.4rem;
                }
                .region-text{
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    padding-left: 2rem;
                    color: #777;
                    font-size: 1.5rem;
                    margin-left: .5rem;
                    max-width: 75%;
                    vertical-align: bottom;
                    background-image: url('./img/location-icon.png');
                    background-repeat: no-repeat;
                    background-position: left center;
                    background-size: 1rem 1.4rem;
                }
                .call-div{
                    position: absolute;
                    right: 0;
                    border-left: solid 1px #e1e1e1;
                    padding-left: 1.8rem;
                    padding-right: 1.8rem;
                    top: 1rem;
                    bottom: -.5rem;
                    img{
                        position: absolute;
                        width: 1.2rem;
                        height: 1.3rem;
                        right: 50%;
                        top: 50%;
                        margin-top: -.65rem;
                        margin-right: -.6rem;
                    }
                }
            }
        }
        .recommand-div{
            background: #fff;
            padding-bottom: 1.1rem;
            .recommand-title{
                div{
                    display: inline-block;
                }
            }
            .recommand-content{
                font-size: 1.5rem;
                color: #777777;
                line-height: 2.3rem;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding-bottom: 0;
                padding-right: 1rem;
                word-break: break-all;
            }
        }
        .banquet-div{
            .check-schedule-btn{
                text-align: center;
                line-height: 5rem;
                height: 5rem;
                border:solid 1px #e4e4e4;
                border-radius: .2rem;
                margin: 1.5rem 1.5rem 1rem 0rem;
                font-size: 1.5rem;
                color: #111111;
                position: relative;
                div{
                    display: inline-block;
                }
                .schedule-from-to-div{
                    display: inline-block;
                    text-align: center;
                    .schedule-text{
                        font-size: 1.5rem;
                        color: #111;
                        line-height: 2.5rem;
                        padding-top: .3rem;
                    }
                    .schedule-desc{
                        font-size: 1.2rem;
                        color: #777;
                        line-height: 2rem;
                    }
                }
                img{
                    position: absolute;
                    right: 1.5rem;
                    top: 1.8rem;
                    width: 1.4rem;
                }
            }
        }
        .more-div{
            text-align: center;
            line-height: 4.5rem;
            color: #111;
            font-size: 1.5rem;
            .borderline(#e1e1e1,top);
            img{
                width: 1.2rem;
                height: .7rem;
                margin-left: 1rem;
                top: -.2rem;
                position: relative;
            }
        }
        .banquet-menu-div{
            .banquet-menu-title{
                line-height: 4.5rem;
                .borderline(#e1e1e1,bottom);
            }
            .more-div{
                border-top: none;
            }
        }
        .three-fee-div{
            padding-bottom: 1rem;
            .fee-table-line{
                text-align: center;
                &.title{
                    background: #f2f2f2;
                    line-height: 3.5rem;
                }
                &.content{
                    line-height: 4rem;
                    background: #fff;
                    border-bottom: solid 1px #e4e4e4;
                    &:last-child{
                        border-bottom: none;
                    }
                }
                .fee-table-item{
                    width: 20%;
                }
            }
        }
        .discount-div{
            line-height: 4.4rem;
            font-size: 1.5rem;
            color: #111111;
            position: relative;
            .discount-tag-div{
                display: inline-block;
                width: 5.8rem;
                line-height: 1.8rem;
                color:#f63;
                border: 1px solid rgba(255,102,51,0.80);
                border-radius: .2rem;
                text-align: center;
                font-size: 1.1rem;
                vertical-align: middle;
            }
            .right-arrow{
                font-size: 1.2rem;
                color: #999999;
                top: 0;
            }
        }
        .setting-div{
            .setting-title{
                .borderline(#e1e1e1,bottom);
            }
            .setting-info{
                padding: 1.5rem 0 1.5rem 0rem;
                .setting-item{
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                    line-height: 2rem;
                    div{
                        display: inline-block;
                        vertical-align: top;
                    }
                    .left-label{
                        width: 11rem;
                    }
                }
            }
        }
        .area-set-div{
            .area-set-title{
                border-bottom: solid 1px #e4e4e4;
            }
            .area-pic-list-div{
                padding: 1rem;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
            }
            .area-pic-item{
                display: table-cell;
                padding-right: 1rem;
                text-align: center;
                color: #666;
                &.last-pic-item{
                    padding-right: 2rem;
                    position: relative;
                    .show-more{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 1.5rem;
                    }
                }
                img{
                    width: 13rem;
                    height: 7rem;
                }
            }
        }
        .cooperate-rule-div{
            .cooperate-rule-title{
                .borderline(#e1e1e1,bottom);
            }
            .cooperate-rule-content{
                padding: 1.5rem 0 1.5rem 0rem;
                color: #666;
                .cooperate-rule-item{
                    margin-bottom: 1.5rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .left-label{
                        min-width: 8rem;
                    }
                }
            }
        }
        .operate-status-div{
            .operate-status-content{
                padding: 1rem 0 1rem 1rem;
                color: #666;
                .operate-status-item{
                    line-height: 2.5rem;
                }
            }
        }
        .bottom-line{
            line-height: 4rem;
            text-align: center;
        }
    }
    .pic-div{
        .swiper-container{
            position: absolute !important;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
        .swiper-pagination-bullet{
            width: .7rem;
            height: .7rem;
            margin-right: .9rem;
            border-radius: 50%;
            opacity: .2;
            background: #fff;
        }
        .swiper-pagination-bullet-active{
            background: #B3B3B3 !important;
            opacity: 1;
            width: .7rem;
            height: .7rem;
            margin-right: .9rem;
            border-radius: 50%;
        }
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: 0;
        }
    }
    
</style>
