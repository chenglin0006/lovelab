<template>
    <section>
        <div class="v-calendar" :class="type" transition="v-calendar"
             @touchmove="touchMoveFun($event)">
            <div class="v-calendar--title" v-if="title">
                <div class="v-calendar--title-cancel" @click="hideCalendar">取消</div>
                <div class="v-calendar--title-content">{{title.text}}</div>
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
            <div class="v-calendar--date" v-if="cal && cal.length">
                <div class="v-calendar--date-wrapper" v-for="c in cal">
                    <div class="v-calendar--date-month">{{ c.month }}</div>
                    <ul class="v-calendar--date-day-group">
                        <li class="v-calendar--date-day-wrapper"
                            :class="{
                        'is-active': (checkInDate && (d.date.getTime() === checkInDate.getTime()) || (checkOutDate && d.date.getTime() === checkOutDate.getTime())),
                        'is-select': (checkInDate && checkOutDate && (d.date.getTime() > checkInDate.getTime()) && (d.date.getTime() < checkOutDate.getTime())),
                        'today':(d.date.getDate()==new Date().getDate() && d.date.getMonth()==new Date().getMonth()&&d.date.getYear()== new Date().getYear()),
                        'start':checkInDate && activeChooseDateWay=='many' && checkOutDate && (d.date.getTime() === checkInDate.getTime()),
                        'end':checkInDate&&activeChooseDateWay=='many' && checkOutDate && d.date.getTime() === checkOutDate.getTime()
                        }"
                            v-for="d in c.date"
                            @click="clickDate(d)">
                            <div class="v-calendar--date-item">
                                <div>{{ d.date.getDate() }}</div>
                                <div v-if="checkInDate && checkOutDate && (d.date.getTime() === checkInDate.getTime())"
                                     class="start-end-tag">开始
                                </div>
                                <div v-if="checkInDate && checkOutDate && (d.date.getTime() === checkOutDate.getTime())"
                                     class="start-end-tag">结束
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="v-calendar-btn" v-show="checkInDate">
                <button @click="chooseDateOk">完成</button>
            </div>
        </div>
    </section>
</template>

<script>
  import formatter from 'date-formatter';
  import calendarObj from '../js/calendar.js';
  import $ from '@dp/zepto';
  import Util from '@dp/vc-util';
  import Toast from '@dp/wepp-module-toast';
  import fetchJsonp from 'fetch-jsonp';
  import UA from '@dp/util-m-ua';

  var UAStr = (navigator.userAgent).toLowerCase(),
    isIOS = /(iphone|ipad)/.test(UAStr),
    isAndroid = /android/.test(UAStr);

  export default {

    data: function () {
      return {
        cal: null,  //渲染整个日历的数据
        checkInDate: null,   //当前checkInDate
        checkOutDate: null,  //当前checkOutDate
        finalCheckInDate: null,      //最终checkInDate
        finalCheckOutDate: null,     //最终checkOutDate
        showCalendarHeader: false,
        activeChooseDateWay: calendarObj.CHOOSEMANYDAY,
        finalChooseDateWay: calendarObj.CHOOSEMANYDAY,
        maxScheduleDateNumber: this.maxscheduledatenumber,
        dayItemWidth: ''
      };
    },

    props: ['initcheckintext',
      'initcheckouttext',
      'maxscheduledatenumber',
      'maxdays',
      'type',
      'title',
      'showcalendar',
    ],

    mounted: function () {
      this.checkInDate = this.initcheckintext ? new Date(this.initcheckintext) : null;
      this.checkOutDate = this.initcheckouttext ? new Date(this.initcheckouttext) : null;
      this.finalCheckInDate = this.checkInDate;
      this.finalCheckOutDate = this.checkOutDate;
      this.dayItemWidth = $('body').width() * 0.14285;
      this.initCalendarIndex();
      var self = this;
      self.$watch('maxScheduleDateNumber', function () {
        self.maxScheduleDateNumber = self.maxScheduleDateNumber;
        self.initCalendarIndex();
      });
      self.$watch('initcheckintext', function () {
        self.checkInDate = this.initcheckintext ? new Date(self.initcheckintext) : null;
        self.finalCheckInDate = self.checkInDate;
      });
      self.$watch('initcheckouttext', function () {
        self.checkOutDate = self.initcheckouttext ? new Date(self.initcheckouttext) : null;
        self.finalCheckOutDate = self.checkOutDate;
      });
      self.$watch('showcalendar', function () {
        //点击返回时将当前起始日期置为上次点击完成时的起始日期
        if (!self.showcalendar) {
          if(!self.checkInDate){
            //若此时用户把日期置空，则把日期设为null
            self.checkInDate = null;
            self.checkOutDate = null;
            this.chooseDateOk();
          }else{
            self.checkInDate = self.finalCheckInDate;
            self.checkOutDate = self.finalCheckOutDate;
          }
          self.$emit('selectDate', self.dateTextShow);

        } else {
          self.$nextTick(function () {
            calendarObj.toActiveDayIndex(140, self.type);
          });
        }
      });
    },

    methods: {
      //初始化日历
      initCalendarIndex: function () {
        //渲染日历
        this.cal = calendarObj.generateCalendarData(this.maxScheduleDateNumber);
      },
      //日历点击事件
      clickDate: function (item) {
        if (item.type === 0) return;
        var date = item.date;

        //查多日
        if (this.checkInDate && !this.checkOutDate && date.getTime() == this.checkInDate.getTime()) {
          //重复点击则置空
          this.checkInDate = null;
          //表示置空未选
        } else {
          if (this.checkOutDate) {
            this.checkInDate = date;
            this.checkOutDate = null;
          } else {
            if (this.checkInDate && date.getTime() > this.checkInDate.getTime()) {
              this.checkOutDate = date;
            } else {
              this.checkInDate = date;
            }
          }
        }
        this.$emit('selectDate', this.dateTextShow);

        if (this.checkInDate && this.checkOutDate) {
          if ((this.checkOutDate.getTime() - this.checkInDate.getTime()) / calendarObj.ONE_DAY_TS >= this.maxDays) {
            Toast('一次最多可查' + this.maxDays + '天');
            this.checkOutDate = null;
          }
        }
      },
      //点击完成
      chooseDateOk: function () {
        //点击完成时为最终的起始日期赋值
        this.finalCheckInDate = this.checkInDate;
        this.finalCheckOutDate = this.checkOutDate;
        this.$emit('doneSelect', this.finalCheckInDate, this.finalCheckOutDate);
      },
      touchMoveFun: function (event) {
        event.stopPropagation();
      },
      hideCalendar() {
        this.$emit('hideCalendar')
      }
    },

    computed: {
      //显示的日期
      dateTextShow: function () {
        var text = ""
        if (this.checkInDate && this.checkOutDate && this.checkInDate.getTime() != this.checkOutDate.getTime()) {
          text = formatter(this.checkInDate, 'YYYY-MM-DD') + ' 至 ' + formatter(this.checkOutDate, 'YYYY-MM-DD');
        } else if (this.checkInDate && this.checkOutDate && this.checkInDate.getTime() == this.checkOutDate.getTime()) {
          text = formatter(this.checkInDate, 'YYYY-MM-DD');
        } else if (this.checkInDate && !this.checkOutDate) {
          text = formatter(this.checkInDate, 'YYYY-MM-DD');
        }
        return text;
      },
      maxDays: function () {
        return this.maxdays ? this.maxdays : 30;
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
    @import url("../../commonLess/border.less");
    @import url("../../commonLess/util.less");

    @bordercolor: #ebebeb;
    body {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        background: transparent;
        box-sizing: border-box;
        line-height: inherit;
        font-size: inherit;
        color: inherit;
        font-family: PingFangSC-Regular, -apple-system, Roboto, Helvetica Neue, PingFang SC, Noto Sans CJK SC, sans-serif;
        li {
            list-style: none;
        }
    }

    .v-calendar {
        position: fixed;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 10000;
        overflow: hidden;
        &.intention {
            bottom: 0;
        }
        &.banquet,&.sign{
            .v-calendar--date{
                height:35rem;
            }
        }
    }

    .v-calendar--title {
        height: 32px;
        padding-top: 7px;
        padding-bottom: 6px;
        border-bottom: 1px solid #d7d7d7;
        font-size: 16px;
        box-shadow: 0px 2px 1px rgba(204, 202, 200, 0.2);
        position: relative;
        background: #fff;
        z-index: 1;
    }
    .v-calendar--title-cancel {
        display: block;
        line-height: 20px;
        position: absolute;
        top: 15px;
        font-size: 14px;
        left: 15px;
        z-index: 10;
    }
    .v-calendar--title-back {
        display: block;
        width: 35px;
        position: absolute;
        left: 15px;
        height: 100%;
        top: 0;
        z-index: 10;
        &:after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            background-size: 8px 14px;
            -webkit-transform: translateY(-50%) rotate(135deg);
            transform: translateY(-50%) rotate(135deg);
            width: 8px;
            height: 8px;
            border: none;
            border-bottom: 2px solid #f63;
            border-right: 2px solid #f63;
        }
    }

    .v-calendar--title-btn {
        position: absolute;
        right: 15px;
        color: #f63;
        display: block;
        text-align: right;
        height: 100%;
        top: 0;
    }

    .v-calendar--title-content {
        display: block;
        text-align: center;
        font-weight: 400;
        line-height: 20px;
        width: 100%;
        position: absolute;
        left: 0;
        top: 15px;
        font-size: 14px;
    }

    .v-calendar--header {
        height: 2.5rem;
        line-height: 2.5rem;
        background: #ffffff;
        color: #333;
        position: relative;
        z-index: 10003;
        border-bottom:1px solid #ebebeb;
    }

    .v-calendar--header-wrapper {
        display: -webkit-box;
        display: flex;
    }

    .v-calendar--header-item {
        display: block;
        -webkit-box-flex: 1;
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #777777;
    }

    .v-calendar--date {
        position: relative;
        width: 100%;
        left: 0;
        top: 0;
        height: 25rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &.no-scroll {
            overflow: hidden;
            position: fixed;
            height: 100%;
            width: 100%;
        }
        .v-calendar--date-wrapper:first-child .v-calendar--date-month:after {
            border-top: none;
        }
    }

    .v-calendar--date-month {
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        font-size: 1.5rem;
        color: #333;
    }

    .v-calendar--date-day-group {
        overflow: hidden;
        padding-left: 0;
        border-bottom:1px solid #ebebeb;
        &:last-child {
            padding-bottom: 0;
        }
    }

    .v-calendar--date-day-wrapper {
        width: 14.285%;
        float: left;
        text-align: center;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        border-top:1px solid #ebebeb;
        border-right:1px solid #ebebeb;
        margin-top: 1px;
        &.is-active {
            background: @mainColor;
            color: #fff;
            &.start .back-color {
                position: absolute;
                left: 50%;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: @mainColor;
            }
            &.start {
                &:nth-child(7n) .back-color {
                    display: none;
                }
            }
            .v-calendar--date-item {
                background-color: @mainColor;
            }
            &.end .back-color {
                position: absolute;
                left: 0%;
                right: 50%;
                top: 0;
                bottom: 0;
                background-color: @mainColor;
            }
            &.end {
                &:nth-child(7n+1) .back-color {
                    display: none;
                }
            }
        }
        &.is-select {
            background: #FFEFF5;
            color: @mainColor;
        }
    }

    .v-calendar--date-item {
        position: relative;
        font-size: 1.5rem;
        height: 5rem;
        &.tag {
            line-height: 25px;
            font-size: 10px;
        }
        div {
            display: inline-block;
            margin-top: .8rem;
            width: 100%;
            font-size: 1.5rem;
        }
        .start-end-tag {
            font-size: 1rem;
            margin-top: 0;
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

    .v-calendar-btn {
        text-align: center;
        padding: .5rem 0;
        border-top:1px solid #ebebeb;
        button {
            display: inline-block;
            width: 92%;
            background: #FF66A1;
            color: #fff;
            height: 4rem;
            line-height: 4rem;
            border: none;
            font-size: 1.6rem;
            border-radius: 0.2rem;
        }
    }


</style>
