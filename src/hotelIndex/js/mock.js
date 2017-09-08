var operateData = {
    salesNum:1,
    dutyType:"值班安排",
    performance:"整体婚宴考核",
    weekendAvailable:"有人接待",
    saleType:"婚宴婚庆打包",
    priceDesc:"酒店售卖产品价格",
    detailInfo:"售卖明细",

    coHQ: [{
      name:"名称",
      coType:"合作方式",
      price:10000,
      specialPrice:882,
      packageContent:"套餐内容",
      specialInfo:"独家优惠",
      specialProduct:"独家售卖",
    }],
    coOthers: [{
      name:"名称",
      coType:"合作方式",
      price:10000,
      specialPrice:882,
      packageContent:"套餐内容",
      specialInfo:"独家优惠",
      specialProduct:"独家售卖",
    }]
}

var discountData={
    visible:[{
      startTime:"2017-08-03",
      endTime:"2018-08-03",
      specialInfo:"优惠内容",
    }],
    invisible:[{
      startTime:"2017-08-03",
      endTime:"2018-08-03",
      specialInfo:"优惠内容",
    },{
      startTime:"2017-08-03",
      endTime:"2018-08-03",
      specialInfo:"优惠内容",
    }]
}

var cooperateData={
    startTime: "2017-08-03",
    endTime: "2018-08-03",
    bdName: "王大牛",
    bdPhone: "13312344321",
    coType: "代收代付",
    strategy: "二战",
    ratio:"0.2,0.3,0.5",//拆分比例
    ratioDay:"1,2,3",//拆分比例后对应的天数
    invoice:"公对公",
    invoiceType:1,//需要发票，具体值待定
    invoiceRemark:"发票备注",
    sales:[{
      name:"大牛",
      email:"xxxx@dianping.com",
    }]
}

var hallDetailData = {
    "hallMenu": {
        "menuCount": 0,
        "menuList": [
            {
                "menuPrice": 4990,
                "menuName": "lalala"
            }
        ]
    },
    "briefInfo": {
        "hallCharacteristics": "8100,8101",
        "minTablesOfNormal": 15,
        "maxTablesWithNoStage": 25,
        "pillarNum": 4,
        "minPriceOfNormal": 15000,
        "maxTablesWithStage": 20,
        "tableRange": "10~25桌",
        "hallName": "大宴会厅",
        "height": 5
    },
    "detailInfo": {
        "stageWidth": 4.5,
        "stage": 1,
        "shape": "U形",
        "champagneFlag": 1,
        "peoplesPerTable": 10,
        "stageLength": -1.3,
        "stageHeight": 3.5,
        "maxTablesWithNoStage": 25,
        "heightUnderLight": 0,
        "maxTablesWithStage": 20,
        "interspace": 3
    },
    "picUrls": [
        "http://p1.meituan.net/wedding/593b6bfc0304265b3f1ae19cf36d49be83441.jpg",
        "http://p1.meituan.net/wedding/e16cbfdc96dfb0a6c863eee7eed89b2f211546.jpg"
    ]
}

var menuDetailData = {
    "level": 1,
    "price": 2,
    "dishesArray": [
        {
            "dishesName": "菜式A",
            "dishesContent": "江南八大菜"
        },
        {
            "dishesName": "菜式A",
            "dishesContent": "江南八大菜,江南八大菜"
        }
    ],
    "menuId": 54,
    "menuName": "assdas",
    "menuType": "1,2,4,3"
}

var hotelBasicBriefInfoData = {
    "tables": "0-60桌",
    "address": "地址",
    "phoneNumber": "4000308620-9120",
    "price": "￥3888-8188/桌",
    "briefInfo": "客户详情页客服录音展示\n客户详情页客服录音展示\n客户详情页客服录音展示\n\n客户详情页客服录音展示\n客户详情页客服录音展示\n客户详情页客服录音展示\n\n客户详情页客服录音展示\n客户详情页客服录音展示\n客户详情页客服录音展示\n\n客户详情页客服录音展示\n客户详情页客服录音展示\n客户详情页客服录音展示",
    "shopName": "海龙海鲜舫·婚宴",
    "comment": "基础信息",
    "shopId": 17179426
}

var hallListData =[
    {
        "stockTitle": "",
        "hallId": 20640,
        "stockList": [{date:'2010-10-10',week:'星期一',hot:true},{date:'2010-10-11',week:'星期二',hot:true},{date:'2010-10-12',week:'星期三',hot:true},{date:'2010-10-12',week:'星期三',hot:true},{date:'2010-10-12',week:'星期三',hot:true},{date:'2010-10-12',week:'星期三',hot:true},{date:'2010-10-12',week:'星期三',hot:true},{date:'2010-10-12',week:'星期三',hot:true}],
        "hallExtra": "19~30桌,无柱,5m",
        "hallImg": "//p0.meituan.net/wedding/9b8734c82e8ec4db89e3bb80f3a21c8910865.png%40120w_90h_1e_1c_1l%7Cwatermark%3D0",
        "tables": '10-20桌',
        "hallName": "戛纳厅"
    },
    {
        "stockTitle": "",
        "hallId": 20641,
        "stockList": [],
        "hallExtra": "10~18桌,无柱,5m",
        "hallImg": "//p0.meituan.net/wedding/9b8734c82e8ec4db89e3bb80f3a21c8910865.png%40120w_90h_1e_1c_1l%7Cwatermark%3D0",
        "tables": '10-20桌',
        "hallName": "巴塞厅"
    },
    {
        "stockTitle": "",
        "hallId": 32741,
        "stockList": [],
        "tables": '10-20桌',
        "hallExtra": "10~20桌,2柱,5m",
        "hallImg": "//p0.meituan.net/wedding/9b8734c82e8ec4db89e3bb80f3a21c8910865.png%40120w_90h_1e_1c_1l%7Cwatermark%3D0",
        "hallName": "紫竹院"
    },
    {
        "stockTitle": "",
        "hallId": 32742,
        "stockList": [],
        "tables": '10-20桌',
        "hallExtra": "10~20桌,4柱,5m",
        "hallImg": "//p0.meituan.net/wedding/9b8734c82e8ec4db89e3bb80f3a21c8910865.png%40120w_90h_1e_1c_1l%7Cwatermark%3D0",
        "hallName": "宴会厅1"
    },
    {
        "stockTitle": "",
        "hallId": 32744,
        "tables": '10-20桌',
        "stockList": [],
        "hallExtra": "无柱,0m",
        "hallImg": "//p0.meituan.net/wedding/9b8734c82e8ec4db89e3bb80f3a21c8910865.png%40120w_90h_1e_1c_1l%7Cwatermark%3D0",
        "hallName": "测试宴会厅"
    }
];

var menuListData = [
    {
        "dishesCount": 2,
        "level": 2,
        "price": 8,
        "menuId": 66,
        "menuName": "测试2",
        "menuType": "1"
    },
    {
        "dishesCount": 1,
        "level": 1,
        "price": 66,
        "menuId": 67,
        "menuName": "测试2",
        "menuType": "2"
    },
    {
        "dishesCount": 1,
        "level": 0,
        "price": 0,
        "menuId": 69,
        "menuName": "测3",
        "menuType": ""
    },
    {
        "dishesCount": 1,
        "level": 0,
        "price": 0,
        "menuId": 78,
        "menuName": "请问",
        "menuType": ""
    }
]

var shopList = [
    {
        "picPath": "//p0.meituan.net/ugcpic/d1b47be8d4ef5170b85c3b5be91d44e9%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "沪青平公路1209号",
        "cityName": "上海",
        "regionName": "闵行区",
        "businessName": "虹桥镇",
        "shopName": "维多利亚婚礼会所(闵行店)",
        "shopId": 5859478,
        "href": "/hotelInfo/editPage?shopId=5859478",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//p0.meituan.net/ugcpic/fd41cf7569e2c2eb7a67059fa41a3442%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "大连路1546号",
        "cityName": "上海",
        "regionName": "杨浦区",
        "businessName": "控江地区",
        "shopName": "维多利亚婚礼会所(虹口店)",
        "shopId": 10337348,
        "href": "/hotelInfo/editPage?shopId=10337348",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//p0.meituan.net/ugcpic/fd41cf7569e2c2eb7a67059fa41a3442%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "大连路1546号",
        "cityName": "上海",
        "regionName": "杨浦区",
        "businessName": "控江地区",
        "shopName": "维多利亚婚礼会所(虹口店)",
        "shopId": 10337348,
        "href": "/hotelInfo/editPage?shopId=10337348",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//p0.meituan.net/ugcpic/fd41cf7569e2c2eb7a67059fa41a3442%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "大连路1546号",
        "cityName": "上海",
        "regionName": "杨浦区",
        "businessName": "控江地区",
        "shopName": "维多利亚婚礼会所(虹口店)",
        "shopId": 10337348,
        "href": "/hotelInfo/editPage?shopId=10337348",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//p0.meituan.net/ugcpic/fd41cf7569e2c2eb7a67059fa41a3442%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "大连路1546号",
        "cityName": "上海",
        "regionName": "杨浦区",
        "businessName": "控江地区",
        "shopName": "维多利亚婚礼会所(虹口店)",
        "shopId": 10337348,
        "href": "/hotelInfo/editPage?shopId=10337348",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//p0.meituan.net/ugcpic/fd41cf7569e2c2eb7a67059fa41a3442%40280w_210h_1e_1c_1l%7Cwatermark%3D0",
        "address": "大连路1546号",
        "cityName": "上海",
        "regionName": "杨浦区",
        "businessName": "控江地区",
        "shopName": "维多利亚婚礼会所(虹口店)",
        "shopId": 10337348,
        "href": "/hotelInfo/editPage?shopId=10337348",
        "categoryName": "婚礼会所"
    },
    {
        "picPath": "//qcloud.dpfile.com/pc/bQRNJzgIThpEFSScVQQilhXmuiCduXsXWoaxOUM1zybgL7NUY7I2ClhoEPjpC3qNe2c3xba3DKstPnO343LmAg.jpg",
        "address": "天山路318号",
        "cityName": "上海",
        "regionName": "长宁区",
        "businessName": "天山",
        "shopName": "维多利亚婚礼会所(长宁店)",
        "shopId": 16977747,
        "href": "/hotelInfo/editPage?shopId=16977747",
        "categoryName": "婚礼会所"
    }
]

var regionData = {
    "2": "徐汇区",
    "3": "静安区",
    "4": "长宁区",
    "5": "浦东新区",
    "6": "黄浦区",
    "7": "普陀区",
    "8": "闸北区",
    "9": "虹口区",
    "10": "杨浦区",
    "12": "闵行区",
    "13": "宝山区",
    "5937": "松江区",
    "5938": "嘉定区",
    "5939": "青浦区",
    "8846": "奉贤区",
    "8847": "金山区"
}
module.exports = {
  operateData:operateData,
  discountData:discountData,
  cooperateData:cooperateData,
  hallDetailData:hallDetailData,
  menuDetailData:menuDetailData,
  hotelBasicBriefInfoData:hotelBasicBriefInfoData,
  hallListData:hallListData,
  menuListData:menuListData,
  shopList:shopList,
  regionData:regionData
};