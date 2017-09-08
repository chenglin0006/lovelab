
<template>
    <section>
    <div class="v-calendar" :class="type" transition="v-calendar" @touchmove="touchMoveFun($event,'scroll')">
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
                        'end':checkInDate&&checkOutDate && d.date.getTime() === checkOutDate.getTime()
                        }"
                        v-for="d in c.date"
                        @click="clickDate(d)">
                        <div class="v-calendar--date-item" :style="{'height':dayItemWidth+'px'}"><div>{{ d.date.getDate() }}</div></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="over-lay" @click="hideCalendar" @touchmove="touchMoveFun($event,null)"></div>
    </section>
</template>

<script>
    import formatter from 'date-formatter';
    import calendarObj from '../js/inviteCalendar.js';
    import $ from '@dp/zepto';
    import Util from '@dp/vc-util';
    import Toast from '@dp/wepp-module-toast';
    import fetchJsonp from 'fetch-jsonp';
    import CommonFun from '../../commonJs/CommonFun.js'
    var mDomain = CommonFun.getDomain();
    var eDomain = CommonFun.getEDomain();

    export default {

        data: function() {
            return {
                cal: null,  //渲染整个日历的数据
                checkInDate:null,   //当前checkInDate
                calendarShow:true,
                showCalendarHeader:false,
                dayItemWidth:'',
            };
        },

        props:['initcheckintext',
                'maxscheduledatenumber',
                'maxdays',
                'type',
                'title',
                'startdate'
        ],
        computed: {
            maxDays: function(){
                return this.maxdays?this.maxdays:30;
            },
            checkOutDate:function(){
                return this.checkInDate?calendarObj.addDay(this.checkInDate,6):null;
            }
        },

        mounted:function(){
            this.checkInDate = this.initcheckintext?new Date(this.initcheckintext):new Date(formatter(new Date(),'YYYY-MM-DD'));
            this.dayItemWidth = $('body').width()*0.14285;
            this.initCalendarIndex();
            var self = this;
            self.$watch('maxscheduledatenumber',function(){
                self.initCalendarIndex();
            });
            self.$watch('startdate',function(){
                self.initCalendarIndex();
            });
            self.$watch('initcheckintext',function(){
                self.checkInDate = this.initcheckintext?new Date(self.initcheckintext):new Date(formatter(new Date(),'YYYY-MM-DD'));;
            });
        },

        methods: {
            //初始化日历
            initCalendarIndex: function(){
                //渲染日历
                this.cal = calendarObj.generateCalendarData(this.maxscheduledatenumber,this.startdate);
            },
            //日历点击事件
            clickDate: function(item) {
                if (item.type === 0) return;
                var date = item.date;
                let dateWeek = date.getDay()==0?7:date.getDay();
                let weekFirstDay = calendarObj.addDay(date,-dateWeek+1);
                this.checkInDate = weekFirstDay;
                this.$emit('changetime',this.checkInDate?formatter(this.checkInDate,'YYYY-MM-DD'):'');
            },
            hideCalendar: function() {
                this.$emit('hidechoosepop');
            },
            touchMoveFun:function(event,text){
                if (text=='scroll') {
                } else {
                    event.preventDefault();
                }
                event.stopPropagation();
            },
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
        z-index:10000;
        padding-bottom: 1rem;
        top: 4rem;
        height: 41.5rem;
    }
    .v-calendar--date-item{
        div{
            display: inline-block;
            line-height: 2.1rem;
            margin-top: .8rem;
        }
    }

</style>
