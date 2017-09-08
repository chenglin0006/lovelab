
<template>
    <section>
        <section class="calendar-section">
            <div class="v-calendar" transition="v-calendar" :class="{'is-ios':isIos}">
                <header class="normal m-header">
                    <img class="btn-back js_back" @click="hideCalendar" src="../../commonImg/back-head.png" >
                    <h1>查询档期</h1>
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
                <div class="v-calendar--date">
                    <div class="v-calendar--date-wrapper" v-for="c in cal">
                        <div class="v-calendar--date-month">
                            {{ c.month }}
                        </div>
                        <ul class="v-calendar--date-day-group">
                            <li class="v-calendar--date-day-wrapper"
                                :class="{
                                'is-active': (checkInDate&&(d.date.getTime() === checkInDate.getTime()) || (checkOutDate && d.date.getTime() === checkOutDate.getTime())),
                                'is-select': (checkInDate&&checkOutDate && (d.date.getTime() > checkInDate.getTime()) && (d.date.getTime() < checkOutDate.getTime())),
                                'today':(d.date.getDate()==new Date().getDate() && d.date.getMonth()==new Date().getMonth()&&d.date.getYear()== new Date().getYear()),
                                'start':checkInDate&&checkOutDate&&(d.date.getTime() === checkInDate.getTime()),
                                'end':checkInDate&&checkOutDate && d.date.getTime() === checkOutDate.getTime(),
                                'hot': (d.className == 'hot')
                                }"
                                v-for="d in c.date"
                                @click="clickDate(d)">
                                <i></i>
                                <div class="v-calendar--date-item" :style="{'lineHeight':dayItemWidth+'px'}">
                                    <div class="date-show">{{ d.date.getDate() }}</div>
                                    <div class="v-calendar--date-item tag" v-if="checkInDate&&(d.date.getTime() === checkInDate.getTime())"><span v-if="checkInDate&&checkOutDate&&checkInDate.getTime()!=checkOutDate.getTime() || checkInDate&&!checkOutDate">开始</span></div>
                                    <div class="v-calendar--date-item tag" v-if="checkOutDate&&d.date.getTime() === checkOutDate.getTime()"><span v-if="checkInDate&&checkOutDate&&checkInDate.getTime()!=checkOutDate.getTime()">结束</span></div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="over-lay" @click="hideCalendar"></div>
        </section>
    </section>
</template>

<script>
    import formatter from 'date-formatter';
    import calendarObj from '../js/calendar.js';
    import $ from '@dp/zepto';
    import Util from '@dp/vc-util';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';

    export default {

        data: function() {
            return {
                cal: null,  //渲染整个日历的数据
                checkInDate:null,   //当前checkInDate
                checkOutDate:null,
                calendarShow:true,
                showCalendarHeader:false,
                dayItemWidth:'',
                showRepeatPopStatus:false,
                repeatText:'',
                activeTime:'8:00'
            };
        },

        props:['initcheckintext',
                'initcheckouttext',
                'maxscheduledatenumber',
                'maxdays',
                'type', 
                'title',
                'startdate',
                'yzsuserid',
                'hotDaysList',
                'isIos'
        ],
        computed:{
            maxDays: function(){
                return this.maxdays?this.maxdays:30;
            }
        },

        watch:{
            initcheckintext:function(){
                this.checkInDate = this.initcheckintext?new Date(this.initcheckintext):'';
            },
            initcheckouttext:function(){
                this.checkOutDate = this.initcheckouttext?new Date(this.initcheckouttext):'';
            },
            maxscheduledatenumber:function(){
                this.initCalendarIndex();
            },
            hotDaysList:function(){
                this.initCalendarIndex();
            }
        },

        mounted:function(){
            this.checkInDate = this.initcheckintext?new Date(this.initcheckintext):'';
            this.checkOutDate = this.initcheckouttext?new Date(this.initcheckouttext):'';
            this.dayItemWidth = $('body').width()*0.14285;
            this.initCalendarIndex();
            this.$nextTick(()=>{
                if($('.time-span.active').offset()){
                    let leftValue = $('.time-span.active').offset().left-10;
                    $('.time-span-div').scrollLeft(leftValue);
                }
                calendarObj.toActiveDayIndex(140);
            });
        },

        methods: {
            //初始化日历
            initCalendarIndex: function(){
                // 渲染日历
                this.cal = calendarObj.generateCalendarData(this.maxscheduledatenumber,this.startdate,this.hotDaysList);
            },
            //日历点击事件
            clickDate: function(item) {
                if (item.type === 0) return;
                var date = item.date;
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
            },
            //点击日期头部的返回事件
            hideCalendar: function() {
                // 点击返回时将当前起始日期置为上次点击完成时的起始日期
                this.$emit('hidechoosepop');
            },
            //点击完成
            chooseDateOk:function(){
                //点击完成时为最终的起始日期赋值
                if(!this.checkInDate){
                    Toast('请选择查询日期');
                    return
                }
                if(this.checkInDate&&!this.checkOutDate){
                    this.checkOutDate = this.checkInDate;
                }
                this.$emit('hidechoosepop',formatter(this.checkInDate,'YYYY-MM-DD'),formatter(this.checkOutDate,'YYYY-MM-DD'));
            }
        }
    }
</script>

<style lang="less" scoped>
 @import url("../../commonLess/border.less");
 @import url('../../commonLess/util.less');
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
        top: 0;
        left:0;
        bottom: 0;
        width:100%;
        background:#fff;
        z-index:1000;
        padding-bottom: 1rem;
        &.is-ios{
            .m-header{
                padding-top: 2rem;
            }
            .btn-save{
                top: 2rem;
            }
        }
    }
    .v-calendar--title{
        height:3.2rem;
        padding-top: .7rem;
        padding-bottom: .6rem;
        border-bottom:.1rem solid #d7d7d7;
        font-size:1.6rem;
        box-shadow: 0 .2rem .1rem rgba(204, 202, 200, 0.2);
        position:relative;
        background:#fff;
        z-index:1;
    }
    .v-calendar--title-back{
        display:block;
        width:3.5rem;
        position:relative;
        position:absolute;
        left:1.5rem;
        height:100%;
        top:0;
        z-index:10;
        &:after{
            content:"";
            display:block;
            position:absolute;
            left:0;
            top:50%;
            background-size:.8rem 1.4rem;
            -webkit-transform:translateY(-50%) rotate(135deg);
            transform:translateY(-50%) rotate(135deg);
            width:.8rem;
            height:.8rem;
            border:none;
            border-bottom:.2rem solid #f63;
            border-right:.2rem solid #f63;
        }
    }
    .v-calendar--title-btn{
        position:absolute;
        right:1.5rem;
        color:#f63;
        display:block;
        text-align:right;
        height:100%;
        top:0;
    }
    .v-calendar--header{
        height:2.5rem;
        line-height:2.5rem;
        background:#ffffff;
        color:#333;position:
        relative;
        z-index:10003;
        .borderline(#e1e1e1,bottom);
        margin-top: -.1rem;
    }
    .v-calendar--header-wrapper{
        display:-webkit-box;
        display:flex;
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
        position:relative;
        width:100%;
        left:0;
        top:0;
        height: 100%;
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
        height:4.4rem;
        line-height:4.4rem;
        text-align:center;
        font-size: 1.5rem;
        color: #333;
        position: relative;
        .pre-month-span{
            position: absolute;
            left: 1rem;
            top: 1rem;
            -webkit-transform: rotate(180deg);
            width: 2rem;
        }
        .next-month-span{
            position: absolute;
            right: 1rem;
            top: 1rem;
            width: 2rem;
        }
    }
    .v-calendar--date-day-group{
        overflow:hidden;
        padding-left: 0;
        border-bottom: solid 0.1rem #ebebeb;
        &:last-child{
            padding-bottom: 0;
        }
    }
    .v-calendar--date-day-wrapper{
        width:14.285%;
        height: 5.3rem;
        float:left;
        text-align:center;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        border-top: 0.1rem solid #ebebeb;
        border-right: 0.1rem solid #ebebeb;
        &.is-active{
            background:@mainColor;
            color:#fff;
            &.hot{
                i{
                    width: .9.5rem;
                    height: .7.5rem;
                    position: absolute;
                    top: .4rem;
                    left: .4rem;
                    background: url('../img/icon_hot_white.png') no-repeat top left;
                    background-size: contain;
                    z-index: 100001;
                }
            }
            &.start .back-color{
                position: absolute;
                left: 50%;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: @mainColor;
                z-index: 10000;
            }
            &.start{
                &:nth-child(7n) .back-color{
                    display: none;
                }
            }
            &.start&.end{
                .back-color{
                    display: none;
                }
            }
            .v-calendar--date-item{
                z-index: 10001;
            }
            &.end .back-color{
                position: absolute;
                left: 0%;
                right: 50%;
                top: 0;
                bottom: 0;
                background-color: @mainColor;
                z-index: 10000;
            }
            &.end{
                &:nth-child(7n+1) .back-color{
                    display: none;
                }
            }
        }
        &.is-select{
            background: #FFEFF5;
            color:@mainColor;
        }
        &.hot{
            i{
                width: .7rem;
                height: .9rem;
                position: absolute;
                top: .4rem;
                left: .4rem;
                background: url('../img/icon_hot.png') no-repeat top left;
                background-size: contain;
            }
        }
    }
    .date-show{
        display: initial;
        position: relative;
        top: -.7rem;
    }
    .v-calendar--date-item{
        position: relative;
        font-size: 1.5rem;
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

    .over-lay{
        position: fixed;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0.6;
        z-index: 14;
    }

    header{
        position: relative;
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        background-color: #FCFCFC;
        z-index: 100;
        color: #686868;
        font-size: 1.5rem;
        border-bottom: solid .1rem #f2f2f2;
        &.normal{
            background-image: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
            z-index: 100002;
            font-family: PingFangSC-Regular;
            font-size: 1.8rem;
            color: #FFFFFF;
        }
        .btn-save{
            position: absolute;
            right: 0;
            top: 0;
            font-family: PingFangSC-Regular;
            font-size: 1.5rem;
            color: #FFFFFF !important;
            width: 4.4rem;
            height: 4.4rem;
            color: @mainColor;
        }
        .btn-back {
            position: absolute;
            left: 1.3rem;
            bottom: 1.2rem;
            color: @mainColor;
            width: 2rem;
            height: 2rem;
          }
          h1{
            padding: 0 8.8rem;
            font-size: 1.8rem;
            font-weight: normal;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
    }
    .time-title{
        padding-top:.5rem;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        border-top: solid .1rem @borderColor;
        padding-left: 1rem;
        color:#676767;
    }
    .time-span-div{
        padding-left: .5rem;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        border-spacing: .5rem;
    }
    .time-span{
        border:solid .1rem @borderColor;
        border-radius: .5rem;
        padding: 1.2rem 3.5rem;
        text-align: center;
        color: #666;
        margin-right: 1rem;
        display: table-cell;
        &.active{
            border:solid .1rem @mainColor;
            color: @mainColor;
        }
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
</style>
