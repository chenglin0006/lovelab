
<template>
    <section>
        <section class="calendar-section">
            <div class="v-calendar" transition="v-calendar">
                <header class="normal m-header">
                    <a href="javascript:void(0);" class="btn-back js_back" @click="hideCalendar">取消</a>
                    <h1>选择日期／时间</h1>
                    <a href="javascript:void(0);" class="btn-save js_save" @click="chooseDateOk">确定</a>
                </header>
                <div class="v-calendar--header">
                    <ul class="v-calendar--header-wrapper">
                        <li class="v-calendar--header-item">日</li>
                        <li class="v-calendar--header-item">一</li>
                        <li class="v-calendar--header-item">二</li>
                        <li class="v-calendar--header-item">三</li>
                        <li class="v-calendar--header-item">四</li>
                        <li class="v-calendar--header-item">五</li>
                        <li class="v-calendar--header-item">六</li>
                    </ul>
                </div>
                <div class="v-calendar--date" v-if="cal&&cal.length">
                    <div class="v-calendar--date-wrapper">
                        <div class="v-calendar--date-month">
                            <img class="pre-month-span" v-show="activeMonthIndex>0" @click="preMonthFun" src="../img/right-arrow-line.png">
                            {{ cal[activeMonthIndex].month }}
                            <img class="next-month-span" v-show="activeMonthIndex<cal.length-1" @click="nextMonthFun" src="../img/right-arrow-line.png">
                        </div>
                        <ul class="v-calendar--date-day-group">
                            <li class="v-calendar--date-day-wrapper"
                                :class="{
                                'is-active': (checkInDate&&(d.date.getTime() === checkInDate.getTime())),
                                'today':(d.date.getDate()==new Date().getDate() && d.date.getMonth()==new Date().getMonth()&&d.date.getYear()== new Date().getYear())
                                }"
                                v-for="d in cal[activeMonthIndex].date"
                                @click="clickDate(d)">
                                <div class="back-color"></div>
                                <div class="v-calendar--date-item" :style="{'lineHeight':dayItemWidth+'px','height':dayItemWidth+'px'}">{{ d.date.getDate() }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="choose-time">
                    <div class="time-title">选择时间</div>
                    <div class="time-span-div">
                        <div class="time-span" @click="chooseTimeFun(item)" :class="{'active':item.active}" :key="index" v-for="(item,index) in timeList">{{item.value}}</div>
                    </div>
                </div>
            </div>
            <div class="over-lay" @click="hideCalendar" @touchmove="touchMoveFun($event)"></div>
        </section>
        <app-sure-pop v-show="showRepeatPopStatus" :text="'该时间段已有邀约<br>是否继续保存？'" @hidepop="hideRepeatPopFun"></app-sure-pop>
        <!-- <section class="repeat-alert-div" v-show="showRepeatPopStatus">
            <div class="mask-div"></div>
            <div class="content-div">
                <div class="close-btn" @click="hideRepeatPopFun"></div>
                <div class="title">重要提示</div>
                <div class="text-div">
                    <p class="repeat-text">{{repeatText}}</p>
                    <p>是否继续保存该时间？</p>
                </div>
                <div class="action-div">
                    <div class="action-btn" @click="hideRepeatPopFun">暂不添加</div>
                    <div class="action-btn add" @click="sureChooseDateFun">添加</div>
                </div>
            </div>
        </section> -->
    </section>
</template>

<script>
    import formatter from 'date-formatter';
    import calendarObj from '../js/inviteCalendar.js';
    import $ from '@dp/zepto';
    import KNB from '@dp/knb';
    import Request from 'superagent';
    import Jsonp from 'superagent-jsonp';
    import Util from '@dp/vc-util';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import qs from 'qs';
    import { mapGetters } from 'vuex';
    import CommonFun from '../../commonJs/CommonFun.js';
    import AppSurePop from './AppSurePop.vue';
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();
    // mDomain = document.domain.indexOf("51ping.com")==-1? '//m.dianping.com':'//m.51ping.com';

    export default {

        data: function() {
            return {
                cal: null,  //渲染整个日历的数据
                checkInDate:null,   //当前checkInDate
                calendarShow:true,
                showCalendarHeader:false,
                dayItemWidth:'',
                activeMonthIndex:0,
                showRepeatPopStatus:false,
                repeatText:'',
                isAndroid:false,
                isLLApp:false,
                isIOS:false,
                timeList:[{value:'08:00',active:false},
                {value:'08:30',active:false},
                {value:'09:00',active:false},
                {value:'09:30',active:false},
                {value:'10:00',active:false},
                {value:'10:30',active:false},
                {value:'11:00',active:false},
                {value:'11:30',active:false},
                {value:'12:00',active:false},
                {value:'12:30',active:false},
                {value:'13:00',active:false},
                {value:'13:30',active:false},
                {value:'14:00',active:false},
                {value:'14:30',active:false},
                {value:'15:00',active:false},
                {value:'15:30',active:false},
                {value:'16:00',active:false},
                {value:'16:30',active:false},
                {value:'17:00',active:false},
                {value:'17:30',active:false},
                {value:'18:00',active:false},
                {value:'18:30',active:false},
                {value:'19:00',active:false},
                {value:'19:30',active:false},
                {value:'20:00',active:false},
                {value:'20:30',active:false},
                {value:'21:00',active:false},
                {value:'21:30',active:false},
                {value:'22:00',active:false}
               ],
                activeTime:'8:00'
            };
        },

        props:['initcheckintext',
                'maxscheduledatenumber',
                'maxdays',
                'type', //type:pay or invite;invite:改变邀约时间,pay:改变收款时间
                'title',
                'invitetime',
                'startdate',
                'yzsuserid'
        ],
        components:{
            AppSurePop
        },
        computed:{
            maxDays: function(){
                return this.maxdays?this.maxdays:30;
            }
        },

        watch:{
            invitetime:function(val){
                if(val){
                    this.activeTime = val;
                }
            }
        },

        mounted:function(){
            this.isLLApp = CommonFun.getUaIsApp();
            KNB.ready(()=>{
                KNB.getUA({
                    success: (info)=>{
                        this.isIOS = info&&info.osName=='ios'?true:false;
                        this.isAndroid = info&&info.osName=='android'?true:false;

                    },
                    fail: function(err){}
                });
            });
            this.checkInDate = this.initcheckintext?new Date(this.initcheckintext):new Date(formatter(new Date(),'YYYY-MM-DD'));
            this.dayItemWidth = $('body').width()*0.14285;
            if(this.invitetime){
                this.activeTime = this.invitetime;
            } else {
                this.activeTime = '08:00';
            }
            this.timeList.forEach((ele,index)=>{
                if(ele.value == this.activeTime){
                    ele.active = true;
                } else {
                    ele.active = false;
                }
            })
            this.initCalendarIndex();
            this.$nextTick(()=>{
                if($('.time-span.active').offset()){
                    let leftValue = $('.time-span.active').offset().left-10;
                    $('.time-span-div').scrollLeft(leftValue);
                }
            })
            this.$watch('maxscheduledatenumber',()=>{
                this.initCalendarIndex();
            });
            this.$watch('initcheckintext',()=>{
                this.checkInDate = this.initcheckintext?new Date(self.initcheckintext):new Date(formatter(new Date(),'YYYY-MM-DD'));;
            });
            this.$watch('invitetime',()=>{
                if(this.invitetime){
                    this.activeTime = this.invitetime;
                } else {
                    this.activeTime = '8:00';
                }
                this.timeList.forEach((ele,index)=>{
                    if(ele.value == this.activeTime){
                        ele.active = true;
                    } else {
                        ele.active = false;
                    }
                })
            });
        },

        methods: {
            //初始化日历
            initCalendarIndex: function(){
                //渲染日历
                this.cal = calendarObj.generateCalendarData(this.maxscheduledatenumber,this.startdate);
                this.cal.forEach((ele,index)=>{
                    ele.date.forEach((date,dateindex)=>{
                        if(date.type&&date.date.getMonth()==this.checkInDate.getMonth()){
                            this.activeMonthIndex = index;
                        }
                    });
                });
            },
            //日历点击事件
            clickDate: function(item) {
                if (item.type === 0) return;
                var date = item.date;
                if(this.checkInDate&&date.getTime() == this.checkInDate.getTime()){
                    this.checkInDate = null;
                } else {
                    this.checkInDate = date;
                }
            },
            //点击日期头部的返回事件
            hideCalendar: function() {
                //点击返回时将当前起始日期置为上次点击完成时的起始日期
                this.$emit('hidechoosepop');
            },
            //点击完成
            chooseDateOk:function(){
                //点击完成时为最终的起始日期赋值
                if(!this.checkInDate){
                    Toast('请选择邀约日期');
                    return
                }
                if(!this.activeTime){
                    Toast('请选择邀约时间');
                    return
                }
                //如果是修改付款时间，则不需要校验时间是否重复
                if(this.type=='pay'){
                    this.$emit('hidechoosepop',this.checkInDate,this.activeTime);
                    return
                }
                // return
                //判断时间是否重复
                let params = {
                    yzsUserId:this.yzsuserid,
                    appointmentDates:''
                }
                let currentTime = formatter(this.checkInDate,'YYYY-MM-DD')+' '+this.activeTime;
                params.appointmentDates = currentTime;
                let ajaxUrl = mDomain+'/lovelab/order/checkAppointment?'+qs.stringify(params);
                fetchJsonp(ajaxUrl, {
                    jsonpCallback: 'jsonp'
                })
                .then(function(response) {
                    return response.json();
                }).then((json) =>{
                    if(json.code!=200){
                        if(json.code==600){
                            if(this.isLLApp&&this.isAndroid){
                                CommonFun.androidLogin();
                            } else {
                                location.href= eDomain;
                            }
                        } else {
                            this.repeatText = json.string;
                            this.showRepeatPopFun();
                            return
                        }
                    }
                    this.$emit('hidechoosepop',this.checkInDate,this.activeTime);
                }).catch(function(ex) {
                    Toast('校验邀约时间是否重复失败');
                    console.log('parse failed', ex);
                });
            },
            preMonthFun:function(){
                if(this.activeMonthIndex>0){
                    this.activeMonthIndex = this.activeMonthIndex-1;
                }
            },
            nextMonthFun:function(){
                if(this.activeMonthIndex<this.cal.length-1){
                    this.activeMonthIndex = this.activeMonthIndex+1;
                }
            },
            chooseTimeFun:function(item){
                this.timeList.forEach((ele,index)=>{
                    if(ele.value == item.value){
                        ele.active = true;
                        this.activeTime = ele.value;
                    } else {
                        ele.active = false;
                    }
                });
            },
            showRepeatPopFun:function(){
                this.showRepeatPopStatus = true;
            },
            touchMoveFun:function(event){
                event.preventDefault();
                event.stopPropagation();
            },
            hideRepeatPopFun:function(bool){
                if(bool){
                    this.showRepeatPopStatus = false;
                    this.$emit('hidechoosepop',this.checkInDate,this.activeTime);
                } else {
                    this.showRepeatPopStatus = false;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
  @import url("../../commonLess/border.less");
  @import url("../../commonLess/util.less");
  @bordercolor:#ebebeb;
   .v-calendar{
        z-index: 1000;
        padding-bottom: 1rem;
        header h1{
            font-family: PingFangSC-Regular;
            font-size: 1.5rem;
            color: #333333;
        }
        .btn-save,.btn-back{
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #111111;
        }
    }
    .time-title{
        padding-top:1.5rem;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        padding-left: 1.3rem;
        color:#777;
    }
    .time-span-div{
        padding-left: .5rem;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        border-spacing: 1rem;
    }
    .time-span{
        border:solid .1rem #bcbcbc;
        border-radius: .5rem;
        padding: .8rem 3.2rem;
        text-align: center;
        color: #666;
        margin-right: 1rem;
        font-size: 1.3rem;
        display: table-cell;
        &.active{
            border:solid .1rem @mainColor;
            color: @mainColor;
            background: #FFEFF5;
            border: 1px solid #FF66A1;
        }
    }
    .v-calendar .v-calendar--date{
        height: auto !important;
    }

    .repeat-alert-div{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1000;
        font-size: 1.5rem;
        color:#333;
        .content-div{
            position: fixed;
            top: 15rem;
            right: 3rem;
            left: 3rem;
            z-index: 1001;
            background-color: #fff;
            text-align: center;
            .close-btn{
                position: absolute;
                right: 1rem;
                top: 1rem;
                width: 2rem;
                height: 2rem;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: url('../../commonImg/close-btn-3.png');
            }
            .title{
                line-height: 4rem;
                margin-bottom: 2rem;
            }
            .action-div{
                padding-bottom:1rem;
                padding-top: 3rem;
                div{
                    display: inline-block;
                    width:13rem;
                    height: 4rem;
                    line-height: 4rem;
                    border:solid .1rem @mainColor;
                    border-radius: .5rem;
                    color: @mainColor;
                    margin-right: 1rem;
                    &.add{
                        background-color: @mainColor;
                        color: #fff;
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .text-div{
        padding: 0 1rem;
        .repeat-text{
            max-height: 10rem;
            overflow: auto;
        }
    }
    .over-lay{
        z-index: 14;
    }
</style>
