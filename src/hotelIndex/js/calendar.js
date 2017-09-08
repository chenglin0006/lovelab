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
var current = new Date();
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
    generateCalendarData : function(maxScheduleDateNumber,startDate,hotDaysList) {
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
        // var leftPadding = [6, 0, 1, 2, 3, 4, 5];    //一，二，三，四，五，六，日
        // var rightPadding = [0, 6, 5, 4, 3, 2, 1];
        var leftPadding = [0, 1, 2, 3, 4, 5,6];        //日，一，二，三，四，五，六
        var rightPadding = [6, 5, 4, 3, 2, 1,0];
        var getCalendarMap = function() {
            var calendar = [];
            if(startDate){
                current = new Date(startDate);
                TODAY = new Date(current.format('yyyy-MM-dd'));
            }
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
                    date: item,
                    isWeekend:item.getDay()==6||item.getDay()==0
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
        calendarObj = self.getDateDayClass(calendarObj,hotDaysList);
        return calendarObj;
    },
    //根据起始日期以及热门日期获得class
    getDateDayClass: function(calendarData,hotDaysList){
        calendarData.forEach(function(item,index){
            var monthGroup = item.date;
            monthGroup.forEach(function(ele,index){
                var className = "";
                if(hotDaysList&&hotDaysList.length){
                    hotDaysList.forEach(function(item,index){
                        var hotDate = new Date(item);
                        if(ele.date.getTime() == hotDate.getTime()){
                            className = 'hot';
                            return;
                        }
                    });
                }
                ele.className = className;
            });
        });
        return calendarData;
    },
    //页面滚动至选中日期
    toActiveDayIndex: function(num){
        var classStrActive = ".v-calendar--date-day-wrapper.is-active";
        var classStrToday = ".v-calendar--date-day-wrapper.today";
        var classStrTo = ".v-calendar--date";
        var activeDateOffset;
        if($(classStrActive)[0]){
            activeDateOffset = $(classStrActive)[0].offsetTop-num;
        } else {
            activeDateOffset = $(classStrToday)[0].offsetTop-num;
        }
        $(classStrTo).scrollTop(activeDateOffset);
    }
};