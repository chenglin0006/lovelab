var basicInfo = {
    yzsUserId:'',
    salesFUStatusDesc:'短期',
    userPhone:'13344442222',
    userName:'唐',
    sex:0,
    scheduleFrom:'2017-10-09',
    scheduleTo:'2017-10-21',
    shopName:'光大国际大酒店·婚宴',
    secondShopNameList:['浦江饭店·婚宴','海鸥饭店·婚宴'],
    customerServiceName:'huhui.lai',
    assignSalesTime:'2017-02-09 02:12',
    region:'静安区',
    reqTypeDesc:'婚宴',
    tableInfo:'10-14桌',
    mealStandard:'¥3000-4000/桌',
    note:'要有清真食品',
    mainShop:{shopName:'上海金茂君悦大酒店·婚宴(长宁店)',signType:'直付'},
    secondShopList:[
        {shopName:'上海金茂君悦大酒店·婚宴(长宁店)',signType:'直／代'},
        {shopName:'上海金茂君悦大酒店·婚宴(中山店)',signType:'直／代'},
        {shopName:'上海金茂君悦大酒店·婚宴(啦啦店)',signType:'直／代'}
    ],
    reportShopList:[{shopName:'1上海金茂君悦大酒店·婚宴(长宁店)',shopId:'5029611',signType:'直／代',commission:'10%',ratio:'3/5/2'},
    {shopName:'2上海金茂君悦大酒店·婚宴(长宁店)',shopId:'5029612',signType:'直／代',commission:'10%',ratio:'3/5/2'},
    {shopName:'3上海金茂君悦大酒店·婚宴(长宁店)',shopId:'5029613',signType:'直／代',commission:'10%',ratio:'3/5/2'},
    {shopName:'4上海金茂君悦大酒店·婚宴(长宁店)',shopId:'5029614',signType:'直／代',commission:'10%',ratio:'3/5/2'}]
}

var signInfo = {
    signCount:3,
    signOrder:{
        orderId:1234,
        signTime:'2017-09-09 12:20',
        shopName:'爱丽舍宫－小树林厅',
        scheduleFrom:'2017-09-09',
        scheduleTo:'2017-09-20',
        orderType:'婚宴',
        transAmount:'¥20000',
        signType:'直签',
        commission:'10%',
        ratio:'3/5/2'
    },
    signList:[{
        orderId:1234,
        signTime:'2017-09-09 12:20',
        shopName:'爱丽舍宫－小树林厅',
        scheduleFrom:'2017-09-09',
        scheduleTo:'2017-09-20',
        orderType:'婚宴',
        transAmount:'¥20000',
        signType:'直签',
        commission:'10%',
        ratio:'3/5/2'
    },
    {
        orderId:1234,
        signTime:'2017-09-09 12:20',
        shopName:'爱丽舍宫－小树林厅',
        scheduleFrom:'2017-09-09',
        scheduleTo:'2017-09-20',
        orderType:'婚宴',
        transAmount:'¥20000',
        signType:'直签',
        commission:'10%',
        ratio:'3/5/2'
    }],
    hallList:[{hallId:2001,hallName:'hall爱丽舍宫1',label:'hall爱丽舍宫1'},{hallId:2002,hallName:'hall爱丽舍宫2',label:'hall爱丽舍宫2'},{hallId:2003,hallName:'hall爱丽舍宫3',label:'hall爱丽舍宫3'},{hallId:2004,value:2004,hallName:'hall爱丽舍宫4',label:'hall爱丽舍宫4'},{hallId:2005,hallName:'hall爱丽舍宫5',label:'hall爱丽舍宫5'},{hallId:2006,hallName:'hall爱丽舍宫6',label:'hall爱丽舍宫6'},{hallId:2007,hallName:'hall爱丽舍宫7',label:'hall爱丽舍宫7'},{hallId:2008,hallName:'hall爱丽舍宫4',label:'hall爱丽舍宫4'}],
    wedList:[{wedId:2001,wedName:'wed爱丽舍宫1',label:'wed爱丽舍宫1'},{wedId:2002,wedName:'wed爱丽舍宫2',label:'wed爱丽舍宫2'},{wedId:2003,wedName:'wed爱丽舍宫3',label:'wed爱丽舍宫3'},{wedId:2004,value:2004,wedName:'wed爱丽舍宫4',label:'wed爱丽舍宫4'}]
}

var logInfo = {
    visitShopCount:3,
    logList:[
    {
        logType:'USER_REPORT',
        logTitleDesc:'酒店报备',
        logContent:'上海和平大饭店 ,上海和平大饭店 ,上海和平大饭店',
        visitShopName:'',
        logTime:'2017-01-09 11:11:11'
    },
    {
        logType:'VISIT_SHOP',
        logTitleDesc:'用户看店',
        logContent:'婚礼现场布置需要更多花的元素',
        visitShopName:'上海和平大饭店',
        logTime:'2017-01-09 11:11:11'
    },
    {
        logType:'SALES_RECORD',
        logTitleDesc:'沟通用户',
        logContent:'婚礼现场布置需要更多花的元素',
        visitShopName:'上海和平大饭店 ,上海和平大饭店 ,上海和平大饭店',
        logTime:'2017-01-09 11:11:11'
    },
    {
        logType:'STOP_SALES',
        logTitleDesc:'终止销售',
        logContent:'婚礼现场布置需要更多花的元素',
        visitShopName:'',
        logTime:'2017-01-09 11:11:11'
    }]
}

var unreportedShopList = [{shopName:'all上海金茂君悦大酒店·婚宴',shopId:'502961'},
            {shopName:'all浦江饭店·婚宴',shopId:'505697'},
            {shopName:'all广场长城假日酒店·婚宴',shopId:'568439'},
            {shopName:'all古井假日酒店·婚宴',shopId:'1906432'},
            {shopName:'all得丘园·婚宴',shopId:'1955119'}];

var orderDetailData = {
    "userName": "唐小姐",
    "userPhone": "13812341234",
    "salesId": "yuanzhen.xiao",
    "signTime": "2017-05-25 17:50:50",
    "signTypeTitle": "酒店直签",
    "signType": 1,// 0：代收代付 ，1：直签
    "shopName": "花嫁丽舍",
    "transAmount": "50000.00元",
    "schedule": "2017-10-01~2017-10-03",
    "hallName": "上海厅",
    "subOrderNum": 'YZS-WR8VXH-NT56KO-3-HY',

    "signConfirm" : {//可选，根据signType判断，signType=1
        "signConfirmType": 2,//0=待审核 1=审核通过 2＝驳回
        "confirmPics": [{
            "picId": 1,
            "picUrl": "http://p0.meituan.net/wedding/7d1dba6b4beda840b7a800e66694a356118153.jpg%40960w_300h_0e_1l%7Cwatermark%3D0",
        },{
            "picId": 2,
            "picUrl": "https://p0.meituan.net/merchantpic/c5f956e9ebf6b51471b3d9437f087e08190907.jpg%40690w_388h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20"
        }],
    },
    subOrders: [{//可选，根据signType判断，signType=0
        "subOrderName": "定金",
        "subOrderAmount": "￥1000",
        "subOrderNum": 'YZS-WR8VXH-NT56KO-3-HY_1',
        "payType": 1,
        "payTitle": "已支付",
        "subOrderId": 1,
    },{//可选，根据signType判断，signType=0
        "subOrderName": "中款",
        "subOrderAmount": "￥2000",
        "subOrderNum": 'YZS-WR8VXH-NT56KO-3-HY_2',
        "payType": 1,
        "payTitle": "已支付",
        "subOrderId": 2,
    },{//可选，根据signType判断，signType=0
        "subOrderName": "尾款",
        "subOrderAmount": "￥5201314",
        "subOrderNum": 'YZS-WR8VXH-NT56KO-3-HY_3',
        "payType": 0,
        "payTitle": "未支付",
        "subOrderId": 3,
    }]
}

var subOrderDetailData = {
    "userName": "唐小姐",
    "userPhone": "13812341234",
    "salesId": "yuanzhen.xiao",
    "signTime": "2017-05-25 17:50:50",
    "signTypeTitle": "酒店直签",
    "signType": 1,// 0：代收代付 ，1：直签
    "shopName": "花嫁丽舍",
    "transAmount": "50000.00元",
    "schedule": "2017-10-01~2017-10-03",
    "hallName": "上海厅",

    "subOrderName": "定金",
    "subOrderNum": 'YZS-WR8VXH-NT56KO-3-HY_1',
    "subOrderAmount": "￥5201314",
    "alreadyPayAmount": "￥1998",
    "needToPayAmount": "￥99881",
    "payType": 0,
    "payTitle": "未支付",
    "subOrderId": 1,
}
var inviteDataBoss = [
                        {
                            sale:'因小然',
                            list:[{id:11,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:12,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:13,date:'2017-01-09',inviteNum:0,payNum:1},
                                {id:14,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:15,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:16,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:17,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:18,date:'2017-01-09',inviteNum:1,payNum:1},
                            ]
                        },
                        {
                            sale:'Jolin2',
                            list:[{id:21,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:22,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:23,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:24,date:'2017-01-09',inviteNum:1,payNum:0},
                                {id:25,date:'2017-01-09',inviteNum:0,payNum:1},
                                {id:26,date:'2017-01-09',inviteNum:0,payNum:0},
                                {id:27,date:'2017-01-09',inviteNum:1,payNum:1},
                                {id:28,date:'2017-01-09',inviteNum:1,payNum:1},
                            ]
                        }
]


var inviteDataMock = [
        {eventId:11,eventType:1,eventStatus:101,eventStatusTitle:"邀约",eventTime:'2017-06-26 08:00:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:12,eventType:2,eventStatus:201,eventStatusTitle:"已收款",eventTime:'2017-06-26 19:30:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:13,eventType:1,eventStatus:102,eventStatusTitle:"邀约",eventTime:'2017-06-27 13:00:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:14,eventType:1,eventStatus:0,eventStatusTitle:"邀约",eventTime:'2017-06-27 13:30:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:15,eventType:1,eventStatus:0,eventStatusTitle:"邀约",eventTime:'2017-06-28 09:30:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:16,eventType:2,eventStatus:201,eventStatusTitle:"已收款",eventTime:'2017-06-29 11:00:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:17,eventType:1,eventStatus:101,eventStatusTitle:"邀约",eventTime:'2017-06-30 20:00:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:18,eventType:2,eventStatus:0,eventStatusTitle:"待收款",eventTime:'2017-07-01 22:00:00',salesId:"yuanzhen.xiao",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"王大锤",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
        {eventId:19,eventType:1,eventStatus:101,eventStatusTitle:"邀约",eventTime:'2017-07-02 08:00:00',salesId:"xiaoran.yin",yzsUserId:203,shopId:1798321,orderId:373,shopName:"威尔士酒店",salesName:"尹小然",remark:"我是备注",eventInfo: {yzsUser:"张先生 18512344321",amount:"尾款 ￥18888.00"}},
]

var inviteSummaryData = [{
                        appointment:1,
                        appointmentDone:5,
                        appointmentCancel:5,
                        checkout:5,
                        checkoutDone:5,
                        salesId:"yuanzhen.xiao",
                        salesName:"元缜"

                },{
                        appointment:5,
                        appointmentDone:2,
                        appointmentCancel:5,
                        checkout:5,
                        checkoutDone:5,
                        salesId:"yuanzhen.xiao",
                        salesName:"元缜"

                },{
                        appointment:5,
                        appointmentDone:5,
                        appointmentCancel:5,
                        checkout:3,
                        checkoutDone:5,
                        salesId:"xiaoyan.yin",
                        salesName:"小然"

                },{
                        appointment:5,
                        appointmentDone:5,
                        appointmentCancel:5,
                        checkout:5,
                        checkoutDone:5,
                        salesId:"yuanzhen.xiao",
                        salesName:"元缜"

                }]

var inviteStatusMap={1:'已到店',0:'已取消'}
var payStatusMap={1:'已收款',0:''}
var invitePayStatusMap = {0:'无状态',101:'已到店',102:'已取消',301:'已到店',302:'已取消',201:'已收款'}
var inviteItemTypeMap={1:'邀约',2:'待收款'}
module.exports = {
    basicInfo:basicInfo,
    logInfo :logInfo,
    signInfo : signInfo,
    unreportedShopList:unreportedShopList,
    orderDetailData:orderDetailData,
    subOrderDetailData:subOrderDetailData,
    inviteDataBoss:inviteDataBoss,
    payStatusMap:payStatusMap,
    inviteStatusMap:inviteStatusMap,
    itemTypeMap:inviteItemTypeMap,
    invitePayStatusMap:invitePayStatusMap,
    inviteDataMock:inviteDataMock,
    inviteSummaryData:inviteSummaryData
}