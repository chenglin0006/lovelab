
<template>
    <section>
    <div v-show="showCalendar" class="v-calendar" transition="v-calendar">
        <header class="normal m-header">
            <a href="javascript:void(0);" class="btn-back js_back" @click="hideCalendar">取消</a>
            <h1>{{title.text}}</h1>
            <a href="javascript:void(0);" class="btn-save js_save" @click="chooseDateOk">确定</a>
        </header>
        <div class="choos-date-way">
            <div class="many-way choose-way" :class="{
                'active':(activeChooseDateWay=='many'),
                'active-text':showManyActiveText
                }" @click="changeChooseWay">
                <i></i>
                <div class="way-title">时间段</div>
                <div class="way-date" v-if="activeChooseDateWay=='many'">{{dateTextShow}}</div>
            </div>
            <div class="one-way choose-way" :class="{
                'active':(activeChooseDateWay=='one'),
                'active-text':showOneActiveText
                }" @click="changeChooseWay">
                <i></i>
                <div class="way-title">具体日期</div>
                <div class="way-date" v-if="activeChooseDateWay=='one'">{{dateTextShow}}</div>
            </div>
        </div>

        <div class="v-calendar--header">
            <ul class="v-calendar--header-wrapper">
                <li class="v-calendar--header-item">一</li>
                <li class="v-calendar--header-item">二</li>
                <li class="v-calendar--header-item">三</li>
                <li class="v-calendar--header-item">四</li>
                <li class="v-calendar--header-item">五</li>
                <li class="v-calendar--header-item">六</li>
                <li class="v-calendar--header-item">日</li>
            </ul>
        </div>
        <div class="v-calendar--date">
            <div class="v-calendar--date-wrapper" v-for="c in cal">
                <div class="v-calendar--date-month">{{ c.month }}</div>
                <ul class="v-calendar--date-day-group">
                    <li class="v-calendar--date-day-wrapper"
                        :class="{
                        'is-active': (checkInDate&&(d.date.getTime() === checkInDate.getTime()) || (checkOutDate && d.date.getTime() === checkOutDate.getTime())),
                        'is-select': (checkInDate&&checkOutDate && (d.date.getTime() > checkInDate.getTime()) && (d.date.getTime() < checkOutDate.getTime())),
                        'today':(d.date.getDate()==new Date().getDate() && d.date.getMonth()==new Date().getMonth()&&d.date.getYear()== new Date().getYear()),
                        'start':checkInDate&&activeChooseDateWay=='many'&&checkOutDate&&(d.date.getTime() === checkInDate.getTime()),
                        'end':checkInDate&&activeChooseDateWay=='many'&&checkOutDate && d.date.getTime() === checkOutDate.getTime()
                        }"
                        v-for="d in c.date"
                        @click="clickDate(d)">
                        <div class="v-calendar--date-item" :style="{'height':dayItemWidth+'px'}">
                            <div>{{ d.date.getDate() }}</div>
                        </div>
                        <div class="v-calendar--date-item tag" v-if="activeChooseDateWay=='many'&&checkInDate&&(d.date.getTime() === checkInDate.getTime())"><span v-if="checkInDate&&checkOutDate&&checkInDate.getTime()!=checkOutDate.getTime() || checkInDate&&!checkOutDate">开始</span></div>
                        <div class="v-calendar--date-item tag" v-if="activeChooseDateWay=='many'&&checkOutDate&&d.date.getTime() === checkOutDate.getTime()"><span v-if="checkInDate&&checkOutDate&&checkInDate.getTime()!=checkOutDate.getTime()">结束</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="over-lay" @click="hideCalendar" v-show="showCalendar"></div>
    </section>
</template>

<script>
    import formatter from 'date-formatter';
    import calendarObj from '../js/calendar.js';
    import $ from '@dp/zepto';
    import Request from 'superagent';
    import Jsonp from 'superagent-jsonp';
    import Util from '@dp/vc-util';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import DPApp from '@dp/dpapp';
    import KNB from '@dp/knb';
    import UA from '@dp/util-m-ua';

    var UAStr = (navigator.userAgent).toLowerCase(),
    isIOS = /(iphone|ipad)/.test(UAStr),
    isAndroid = /android/.test(UAStr);
    var mDomain = document.domain.indexOf("dianping")==-1? '//m.51ping.com':'//m.dianping.com';

    export default {

        data: function() {
            return {
                cal: null,  //渲染整个日历的数据
                checkInDate:null,   //当前checkInDate
                checkOutDate:null,  //当前checkOutDate
                finalCheckInDate:null,      //最终checkInDate
                finalCheckOutDate:null,     //最终checkOutDate
                calendarShow:true,
                showCalendarHeader:false,
                activeChooseDateWay:calendarObj.CHOOSEMANYDAY,
                finalChooseDateWay:calendarObj.CHOOSEMANYDAY,
                showManyActiveText:false,
                showOneActiveText:false,
                maxScheduleDateNumber:this.maxscheduledatenumber,
                dayItemWidth:''
            };
        },

        props:['initcheckintext',
                'initcheckouttext',
                'showcalendar',
                'maxscheduledatenumber',
                'maxdays',
                'title'
        ],

        mounted:function(){
            this.checkInDate = this.initcheckintext?new Date(this.initcheckintext):null;
            this.checkOutDate = this.initcheckouttext?new Date(this.initcheckouttext):null;
            this.finalCheckInDate = this.checkInDate;
            this.finalCheckOutDate = this.checkOutDate;
            this.dayItemWidth = $('body').width()*0.14285;
            this.initCalendarIndex();
            var self = this;
            self.$watch('showcalendar',function(){
                self.showCalendar = self.showcalendar?self.showcalendar:false;
            });
            self.$watch('maxScheduleDateNumber',function(){
                self.maxScheduleDateNumber = self.maxScheduleDateNumber;
                self.initCalendarIndex();
            });
            self.$watch('initcheckintext',function(){
                self.checkInDate = this.initcheckintext?new Date(self.initcheckintext):null;
                self.finalCheckInDate = self.checkInDate;
                self.resetCalendarIndex();
            });
            self.$watch('initcheckouttext',function(){
                self.checkOutDate = self.initcheckouttext?new Date(self.initcheckouttext):null;
                self.finalCheckOutDate = self.checkOutDate;
                self.resetCalendarIndex();
            });
            self.$watch('showCalendar',function(){
                //点击返回时将当前起始日期置为上次点击完成时的起始日期
                if(!self.showCalendar){
                    self.checkInDate = self.finalCheckInDate;
                    self.checkOutDate = self.finalCheckOutDate;
                    if(self.checkInDate){
                        if(self.checkInDate.getTime()!=self.checkOutDate.getTime()){
                            self.activeChooseDateWay = calendarObj.CHOOSEMANYDAY;
                        } else {
                            self.activeChooseDateWay = calendarObj.CHOOSEONEDAY;
                        }
                    }
                    if(self.activeChooseDateWay==calendarObj.CHOOSEMANYDAY){
                        if(self.checkInDate){
                            self.showManyActiveText = true;
                        }
                        self.showOneActiveText = false;
                    } else {
                        self.showManyActiveText = false;
                        if(self.checkInDate){
                            self.showOneActiveText = true;
                        }
                    }
                } else {
                    self.$nextTick(function(){
                        calendarObj.toActiveDayIndex(140);
                    });
                }
            });
        },

        methods: {
            //初始化日历
            initCalendarIndex: function(){
                //渲染日历
                this.cal = calendarObj.generateCalendarData(this.maxScheduleDateNumber);
                //初始化页面
                this.resetCalendarIndex();
            },
            //重置相关日历数据
            resetCalendarIndex: function(){
                if(this.checkInDate&&this.checkOutDate&&this.checkInDate.getTime() == this.checkOutDate.getTime()){
                    this.activeChooseDateWay = calendarObj.CHOOSEONEDAY;
                    this.showOneActiveText = true;
                    this.showManyActiveText = false;
                } else if(this.checkInDate&&this.checkOutDate&&this.checkInDate.getTime() != this.checkOutDate.getTime()){
                    this.activeChooseDateWay = calendarObj.CHOOSEMANYDAY;
                    this.showOneActiveText = false;
                    this.showManyActiveText = true;
                } else {
                    this.showOneActiveText = false;
                    this.showManyActiveText = false;
                }
            },
            //日历点击事件
            clickDate: function(item) {
                if (item.type === 0) return;
                var date = item.date;
                if(this.activeChooseDateWay == calendarObj.CHOOSEMANYDAY){
                    //查多日
                    if(this.checkInDate&& !this.checkOutDate && date.getTime() == this.checkInDate.getTime()){
                        //重复点击则置空
                        this.checkInDate = null;
                    } else {
                        if (this.checkOutDate) {
                            this.checkInDate = date;
                            this.checkOutDate = null;
                        } else {
                            if (this.checkInDate&&date.getTime() > this.checkInDate.getTime()) {
                                this.checkOutDate = date;
                            } else {
                                this.checkInDate = date;
                            }
                        }
                    }
                    this.showOneActiveText = false;//移除查单日的显示日期样式
                    if(this.checkInDate&&this.checkOutDate){
                        if((this.checkOutDate.getTime()-this.checkInDate.getTime())/calendarObj.ONE_DAY_TS>=this.maxDays){
                            Toast('一次最多可查'+this.maxDays+'天');
                            this.checkOutDate = null;
                            return ;
                        }
                        this.showManyActiveText = true;
                    } else if (!this.checkInDate&&!this.checkOutDate){
                        this.showManyActiveText = false;
                    } else {
                        this.showManyActiveText = true;
                    }
                } else {
                    //查单日
                    if(this.checkInDate&&date.getTime() == this.checkInDate.getTime()){
                        this.checkInDate = null;
                    } else {
                        this.checkInDate = date;
                    }
                    this.showManyActiveText = false;
                    if(this.checkInDate){
                        this.showOneActiveText = true;
                    } else {
                        this.showOneActiveText = false;
                    }
                    this.checkOutDate = null;
                }
            },
            //点击日期头部的返回事件
            hideCalendar: function() {
                //点击返回时将当前起始日期置为上次点击完成时的起始日期
                this.showCalendar =false;
                this.$emit('hidecalendar',null,null);
            },
            //点击完成
            chooseDateOk:function(){
                if(!this.checkInDate){
                    if(this.activeChooseDateWay == calendarObj.CHOOSEMANYDAY){
                        Toast('请选择您想查询的时段');
                    } else {
                        Toast('请选择日期');
                    }
                    return;
                }
                if(this.activeChooseDateWay==calendarObj.CHOOSEMANYDAY && this.checkInDate && !this.checkOutDate){
                    Toast('请选择结束日期');
                    return;
                }
                //点击完成时如果是查单日则将checkoutdate置为null
                if(this.activeChooseDateWay == calendarObj.CHOOSEONEDAY){
                    this.checkOutDate = null;
                }
                //点击完成时为最终的起始日期赋值
                this.finalCheckInDate = this.checkInDate;
                this.finalCheckOutDate = this.checkOutDate?this.checkOutDate:this.checkInDate;
                this.finalChooseDateWay = this.activeChooseDateWay;
                this.$emit('hidecalendar',this.finalCheckInDate,this.finalCheckOutDate);
            },
            //切换查询日期方式（多日或者单日）
            changeChooseWay: function(e){
                var self = this;
                var jItem = $(e.currentTarget);
                if(jItem.hasClass('many-way')){
                    if(self.activeChooseDateWay == calendarObj.CHOOSEMANYDAY){
                        return;
                    } else {
                        self.activeChooseDateWay = calendarObj.CHOOSEMANYDAY;
                    }
                } else {
                    if(self.activeChooseDateWay == calendarObj.CHOOSEONEDAY){
                        return;
                    } else {
                        self.activeChooseDateWay = calendarObj.CHOOSEONEDAY;
                    }
                }
                //每次切换tab都将起始日期置空并隐藏各显示日期的样式
                self.checkInDate = null;
                self.checkOutDate = null;
                this.showManyActiveText = false;
                this.showOneActiveText = false;
            }
        },

        computed: {
            //显示的日期
            dateTextShow: function(){
                var text = ""
                if(this.checkInDate&&this.checkOutDate&&this.checkInDate.getTime()!=this.checkOutDate.getTime()){
                    text = formatter(this.checkInDate, 'YYYY-MM-DD')+' 至 '+formatter(this.checkOutDate, 'YYYY-MM-DD');
                } else if(this.checkInDate&&this.checkOutDate&&this.checkInDate.getTime()==this.checkOutDate.getTime()){
                    text = formatter(this.checkInDate, 'YYYY-MM-DD');
                } else if(this.checkInDate&&!this.checkOutDate){
                    text = formatter(this.checkInDate, 'YYYY-MM-DD');
                }
                return text;
            },
            showCalendar: function(){
                return this.showcalendar?this.showcalendar:false;
            },
            maxDays: function(){
                return this.maxdays?this.maxdays:30;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");


  @bordercolor:#ebebeb;
body{
        margin:0;
        padding:0;
        border:0;
        outline:0;
        background:transparent;
        box-sizing:border-box;
        line-height:inherit;
        font-size:inherit;
        color:inherit;
        font-family:PingFangSC-Regular,-apple-system,Roboto,Helvetica Neue,PingFang SC,Noto Sans CJK SC,sans-serif;
        li{
            list-style: none;
        }
    }
    .v-calendar{
        position:fixed;
        top:100px;
        left:0;
        width:100%;
        height:100%;
        background:#fff;
        z-index:10000;
    }
    .v-calendar--title{
        height:32px;
        padding-top: 7px;
        padding-bottom: 6px;
        border-bottom:1px solid #d7d7d7;
        font-size:16px;
        box-shadow: 0px 2px 1px rgba(204, 202, 200, 0.2);
        position:relative;
        background:#fff;
        z-index:1;
    }
    .v-calendar--title-back{
        display:block;
        width:35px;
        position:relative;
        position:absolute;
        left:15px;
        height:100%;
        top:0;
        z-index:10;
        &:after{
            content:"";
            display:block;
            position:absolute;
            left:0;
            top:50%;
            background-size:8px 14px;
            -webkit-transform:translateY(-50%) rotate(135deg);
            transform:translateY(-50%) rotate(135deg);
            width:8px;
            height:8px;
            border:none;
            border-bottom:2px solid #f63;
            border-right:2px solid #f63;
        }
    }
    .v-calendar--title-btn{
        position:absolute;
        right:15px;
        color:#f63;
        display:block;
        text-align:right;
        height:100%;
        top:0;
    }
    .v-calendar--title-content{
        display:block;
        text-align:center;
        font-weight:400;
        line-height:20px;
        width:100%;
        position:absolute;
        left:0;
        top:15px;
        font-size: 14px;
    }
    .v-calendar--header{
        height:25px;
        line-height:25px;
        background:#ffffff;
        color:#333;position:
        relative;
        z-index:10003;
        .borderline(#e1e1e1,bottom);
        margin-top: -1px;
    }
    .v-calendar--header-wrapper{
        display:-webkit-box;
        display:flex;
        .borderline(#e1e1e1,top);
    }
    .v-calendar--header-item{
        display:block;
        -webkit-box-flex:1;
        flex:1;
        text-align:center;
        font-size: 1.2rem;
        color: #777777;
    }
    .v-calendar--date{
        position:absolute;
        height:100%;
        width:100%;
        left:0;
        top:0;
        padding-top:140px;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        &.no-scroll{
            overflow: hidden;
            position: fixed;
            height: 100%;
            width: 100%;
        }
    }
    .v-calendar--date-month{
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        font-size: 1.5rem;
        color: #333;
        position: relative;
    }
    .v-calendar--date-day-group{
        overflow:hidden;
        padding-left: 0;
        border-bottom: solid 1px #ebebeb;
        &:last-child{
            padding-bottom: 0;
        }
    }
    .v-calendar--date-day-wrapper{
        width:14.285%;
        float:left;
        text-align:center;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        border-top: 0.1rem solid #ebebeb;
        border-right: 0.1rem solid #ebebeb;
        .v-calendar--date-item{
            z-index: 10001;
            div{
                display: inline-block;
                line-height: 2.1rem;
                margin-top: .8rem;
            }
        }
        &.is-active{
            background:@mainColor;
            color:#fff;
            .v-calendar--date-item{
                background-color: @mainColor;
                color: #fff;
            }
            &.start .back-color{
                position: absolute;
                left: 50%;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: #a3569e;
                z-index: 10000;
            }
            &.start{
                &:nth-child(7n) .back-color{
                    display: none;
                }
            }
            &.end .back-color{
                position: absolute;
                left: 0%;
                right: 50%;
                top: 0;
                bottom: 0;
                background-color: #a3569e;
                z-index: 10000;
            }
            &.end{
                &:nth-child(7n+1) .back-color{
                    display: none;
                }
            }
        }
        &.is-select{
            font-size: 1.5rem;
            .v-calendar--date-item{
                background: #FFEFF5;
                color: #FF66A1;
            }
        }
    }
    .v-calendar--date-item{
        position: relative;
        font-size: 1.5rem;
        color: #111;
        &.tag{
            line-height: 2.7rem;
            font-size: 1rem;
            position: absolute !important;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }

    .v-calendar {
        &.transition {
            transition: all .2s ease-in-out;
            transform: translate3d(0, 0, 0);
        }

        &.enter, &.leave {
            transform: translate3d(100%, 0, 0);
        }
        
    }
    .choos-date-way{
        display: box;
        display: -webkit-box;
        display: -ms-flexbox;
        text-align: center;
        background: white;
        z-index: 10;
        position: relative;
        padding: 1.2rem 1.5rem;
        background-color: white;
        z-index: 10003;
        font-size: 1.5rem;
        .choose-way{
            display: block;
            -webkit-box-flex: 1;
            box-flex: 1;
            -ms-box-flex: 1;
            -ms-flex: 1;
            width: 50%;
            height: 5rem;
            border:solid 1px #e1e1e1;
            border-radius: .2rem;
            color:#777;
            position: relative;
            &:last-child{
                margin-left: 10px;
            }
            &.active{
                border:none;
                background-color: @mainColor;
                border:solid 1px @mainColor;
                color:#fff;
                height: 5rem;
                .way-title{
                    color: #fff;
                }
                .way-date{
                    display: none;
                }
                &.active-text{
                    .way-title{
                        margin-top: .9rem;
                        color:#fff;
                        margin-bottom: .6rem;
                    }
                    .way-date{
                        display: inherit;
                        font-size: 1.1rem;
                    }
                }
            }
            .way-title{
                margin-top: 1.7rem;
                line-height: 1.5rem;
            }
        }
    }

    .v-calendar--title-content{
        display:inline-block;
        text-align:center;
        font-weight:400;
        line-height:20px;
        position:relative;
        top:-7px;
        font-size: 16px;
        width: inherit;
        background-color: #f0f0f0;
        padding-left: 11px;
        padding-right: 8px;
        border-radius: 4px;
        padding-bottom: 5px;
        padding-top: 5px;
        color: #777;
        i{
            width: 20px;
            height: 21px;
            // background: url('./img/calendar-title-icon.png') no-repeat top left;
            background-size: contain;
            display: inline-block;
            vertical-align: bottom;
        }
        span{
            padding-left: 6px;
            margin-left: 8px;
            .borderline(#d7d7d7,left);
        }
    }

    .v-calendar--date-wrapper{

    }

    .v-calendar--date-wrapper:last-child{
        padding-bottom: 180px;
    }

    .over-lay{
        position: fixed;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.6;
        z-index: 10;
    }

    header{
        position: relative;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background-color: #fff;
        z-index: 100;
        color: #686868;
        font-size: 15px;
        .borderline(#e1e1e1,bottom);
        &.normal{
            background-color: #fcfcfc;
            z-index: 100002;
        }
        .btn-save{
            position: absolute;
            right: 0;
            top: 0;
            .size(44px; 44px);
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #111111;
        }
        .btn-back {
            position: absolute;
            left: 0;
            top: 0;
            color: @mainColor;
            .size(44px; 44px);
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #111111;
            &:after {
              content: '';
              position: absolute;
              left: 16px;
              top: 12px;
              .size(11px; 20px);
              // background: url(./img/un_icon.png) -10px 0 no-repeat;
              background-size: 41px auto;
            }
          }
          h1{
            padding: 0 88px;
            font-size: 18px;
            font-weight: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
    }

</style>
