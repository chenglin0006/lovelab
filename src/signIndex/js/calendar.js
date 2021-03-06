var $ = require('@dp/zepto');
Date.prototype.format = function(format) //author: meizz 
{
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(),    //day 
    "h+" : this.getHours(),   //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1, 
    (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o)if(new RegExp("("+ k +")").test(format)) 
    format = format.replace(RegExp.$1, 
      RegExp.$1.length==1 ? o[k] : 
        ("00"+ o[k]).substr((""+ o[k]).length)); 
  return format; 
} 
var ONE_DAY_TS = 86400000;
var deltaDay = function(to, from) {
    return (to.getTime() - from.getTime()) / ONE_DAY_TS;
};
var addDay = function(date, day) {
    return new Date(date.getTime() + day * ONE_DAY_TS);
};
var current = new Date();//以2016-12-01为日历的开始时间
var TODAY = new Date(current.format('yyyy-MM-dd'));



module.exports = {
    TODAY:TODAY,
    current:current,
    ONE_DAY_TS:ONE_DAY_TS,
    deltaDay:deltaDay,
    addDay:addDay,
    format:Date.prototype.format,
    CHOOSEMANYDAY:'many',   //常量：标识查多日
    CHOOSEONEDAY:'one',     //常量：标识查单日
    generateCalendarData : function(maxScheduleDateNumber) {
        var self = this;
        if(!maxScheduleDateNumber){
            maxScheduleDateNumber = 365*2;
        } else {
            maxScheduleDateNumber = maxScheduleDateNumber+1;
        }
        var emptyDate = {
            getDate: function() {},
            getTime: function() {}
        };
        var leftPadding = [6, 0, 1, 2, 3, 4, 5];
        var rightPadding = [0, 6, 5, 4, 3, 2, 1];
        var getCalendarMap = function() {
            var calendar = [];
            var curr = TODAY;
            for (var i = 0, len = maxScheduleDateNumber; i < len; i++) {
                calendar.push(addDay(curr, i));
            }
            var calendarMap = calendar.reduce(function(coll, item) {
                var m = item.format('yyyy年MM月');
                coll[m] = coll[m] || [];
                coll[m].push(item);
                return coll;
            }, {});
            return calendarMap;
        };

        var convertMonth = function(month) {
            var date = month.map(function(item) {
                return {
                    type: 1,
                    date: item
                };
            });
            var firstDate = month[0];
            for (var i = 0, ii = leftPadding[firstDate.getDay()]; i < ii; i++) {
                date.unshift({
                    type: 0,
                    date: emptyDate
                });
            }
            var lastDate = month[month.length - 1];
            for (var j = 0, jj = rightPadding[lastDate.getDay()]; j < jj; j++) {
                date.push({
                    type: 0,
                    date: emptyDate
                });
            }
            return date;
        };

        var convertCalendarMap = function(calendarMap) {
            var calendarObj = [];
            Object.keys(calendarMap).forEach(function(month,index){
                var date = convertMonth(calendarMap[month]);
                calendarObj.push({
                    month: month,
                    date: date
                });
            });
            return calendarObj;
        };

        var calendarMap = getCalendarMap();
        var calendarObj = convertCalendarMap(calendarMap);
        return calendarObj;
    },
    //页面滚动至选中日期
    toActiveDayIndex: function(num){
        var classStrActive = " .v-calendar--date-day-wrapper.is-active";
        var classStrToday = " .v-calendar--date-day-wrapper.today";
        var classStrTo = " .v-calendar--date";
        var activeDateOffset;
        if($(classStrActive)[0]){
            activeDateOffset = $(classStrActive)[0].offsetTop-num;
        } else {
            activeDateOffset = $(classStrToday)[0].offsetTop-num;
        }
        $(classStrTo).scrollTop(activeDateOffset);
    }
};