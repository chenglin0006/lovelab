<template>
    <div class="order-list-index-section">
        <div class="fixed">
            <div class="order-head-area" :class="{'ios-order-head-area':isIOS}">
                <span class="head-icon back-icon" @click="toBack"></span>
                <h3 class="title">签约订单</h3>
                <span class="head-icon search-icon" @click="toSearch"></span>
            </div>
            <div class="order-list-filter-section">
                <div class="filter-item-div">
                    <div class="filter-item-tag" :class="{'active':item.active}" @click="chooseFilterTag(item)" :key="index"
                         v-for="(item,index) in filterTagList">
                        <div class="item-text text-ellipse">{{item.text}}</div>
                        <span :class="[item.active ? 'unfold-icon' : 'fold-icon', 'arrow-icon']"></span>
                    </div>
                </div>
                <div class="filter-item-content" v-show="showFilterContentStatus">
                    <div class="mask-div" @touchmove="preventScrollFun($event)" @click="hideFilterContent"></div>
                    <app-select-search v-show="filterTagList[0].active" :option-list="adviserList" :select-model="adviser" :placeholder-obj="{'text':'请输入顾问姓名'}" :null-text="nullText" @setselectdata="setAdviser"></app-select-search>
                    <app-select-search v-show="filterTagList[1].active" :option-list="hotelList" :select-model="hotel" :placeholder-obj="{'text':'请输入酒店名称'}" :null-text="nullText" @setselectdata="setHotel"></app-select-search>

                    <app-calendar v-show="filterTagList[2].active"
                                  @selectDate="selectSignDateFun"
                                  @doneSelect="doneSignDateFun"
                                  :showcalendar="filterTagList[2].active"
                                  :type="signCalendarType"
                                  :maxscheduledatenumber="maxScheduleDateNumber"
                                  :initcheckintext="signCheckInText"
                                  :initcheckouttext="signCheckOutText"
                                  :maxdays="maxDays">
                    </app-calendar>

                    <app-calendar v-show="filterTagList[3].active"
                                  @selectDate="selectBanquetDateFun"
                                  @doneSelect="doneBanquetDateFun"
                                  :showcalendar="filterTagList[3].active"
                                  :type="banquetCalendarType"
                                  :maxscheduledatenumber="maxScheduleDateNumber"
                                  :initcheckintext="banquetCheckInText"
                                  :initcheckouttext="banquetCheckOutText"
                                  :maxdays="maxDays">
                    </app-calendar>

                </div>

            </div>
        </div>
        <div class="result-index-div" :class="{'ios-result-index-div':isIOS,'fix-result-div':showFilterContentStatus}">
            <div v-if="resultDeal.length > 0" class="result-content">
                <app-order-deal-item v-for="(item, index) in resultDeal" :key="index" :item="item"></app-order-deal-item>
            </div>
            <div v-else v-show="showResultStatus" class="no-result">没有符合条件的查询结果</div>
            <div class="loading-status" v-if="showLoadingStatus && pageIndex==1">
                <img src="./img/loading.gif" alt="加载中...">
            </div>

        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util.less');
    @import url('../commonLess/border.less');
    @import './orderCommonLess.less';
    .order-list-index-section{
        .fixed{
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 22;
        }
        .order-list-filter-section{
            .filter-item-div{
                background:#fff;
                position:relative;
                border-bottom:solid 1px #f2f2f2;
                //.borderline(#e1e1e1,bottom);
                z-index:21;
            }
            .filter-item-tag{
                display: inline-block;
                line-height:1.7rem;
                margin:1rem 0;
                width:25%;
                text-align: center;
                color:#333;
                font-size:1.4rem;
                .borderline(#e1e1e1,right);
                .item-text{
                    display: inline-block;
                    max-width:64%;
                    position: relative;
                    vertical-align: bottom;
                }
                .arrow-icon{
                    width: 1rem;
                    height: .6rem;
                    display: inline-block;
                    background-size:1rem .6rem;
                    background-repeat: no-repeat;
                    &.unfold-icon{
                        background-image: url('./img/icon_unfold@2x.png');
                    }
                    &.fold-icon{
                        background-image: url('./img/icon_fold@2x.png');
                    }
                }
                &.active{
                    color: @mainColor;
                }
                &:last-child{
                    &:after{
                        border:none;
                    }
                }
            }
            .filter-item-content{
                position:relative;
            }
        }

        .result-index-div{
            position: absolute;
            top: 8rem;
            right: 0;
            left: 0;
            bottom: 0;
            overflow-y: scroll;
            /* 增加该属性，可以增加弹性 */
            -webkit-overflow-scrolling: touch;
            &.ios-result-index-div{
                top:10rem;
            }
            &.fix-result-div{
                overflow: hidden;
            }
        }
        .no-result{
            text-align: center;
            color:#666;
            font-size:1.3rem;
            margin-top:3rem;
        }
        .loading-status{
            position: relative;
            img{
                position: relative;
                width:1.5rem;
                margin:0 auto;
                margin-top:12rem;
                left:50%;
                -webkit-transform: translateY(-50%);
                -moz-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                -o-transform: translateY(-50%);
                transform: translateY(-50%);

            }
        }
    }
    @media
    only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (   min--moz-device-pixel-ratio: 2),
    only screen and (     -o-min-device-pixel-ratio: 2/1),
    only screen and (        min-device-pixel-ratio: 2){
        .order-list-index-section{
            .order-list-filter-section{
                .filter-item-tag{
                    .arrow-icon{
                        &.unfold-icon{
                            background-image: url('./img/icon_unfold@3x.png');
                        }
                        &.fold-icon{
                            background-image: url('./img/icon_fold@3x.png');
                        }
                    }
                }
            }
        }
    }

</style>
<script>
    import AppSelectSearch from './components/AppSelectSearch.vue';
//    import mockData from './js/mock.js';
    import AppOrderDealItem from './components/AppOrderDealItem.vue';
    import AppCalendar from './components/AppCalendar.vue';
    import fetchJsonp from 'fetch-jsonp';
    import $ from '@dp/zepto';
    import CONSTANT from './js/constant.js';
    import qs from 'qs';
    import Toast from '@dp/wepp-module-toast';
    import formatter from 'date-formatter';
    import KNB from '@dp/knb';
    import CommonFun from '../commonJs/CommonFun.js';

    var $WIN = $(window);
    var $BODY = $('body');
    var eDomain = CONSTANT.ajaxAddress.eDomain;
    var UAStr = (navigator.userAgent).toLowerCase(),
        isIOS = /(iphone|ipad)/.test(UAStr),
        isAndroid = /android/.test(UAStr);
    var isAPP = CommonFun.getUaIsApp();


    export default{
      data(){
        return {
          filterTagList: [{
            text: '顾问', active: false
          }, {
            text: '酒店名称', active: false
          }, {
            text: '签约时间', active: false
          }, {
            text: '档期时间', active: false
          }],
          adviserList: [],
          hotelList: [],
          adviser:{}, //被选中的顾问
          hotel: {}, //被选中的酒店
          nullText: '没有找到匹配项',
          queryParams:{
            salesId:'',
            shopId:'',
            scheduleFrom:'',
            scheduleTo:'',
            signStartDate:'',
            signEndDate:''
          },
          resultDeal:[], //订单列表搜索结果
          showResultStatus:false, //搜索结果
          pageIndex:1, //订单列表页pageIndex
          pageSize:25, //分页size
          scrollStatus:true, //初始能滚动
          dealMoreModule:true, //订单列表页是否加载更多数据flag
          isQuerying:false, //默认状态下，不是在查询；当为true时表示在查询

          //与日历有关
          banquetCalendarType:"banquet",          //档期时间日历选择flag
          signCalendarType:"sign",        //签约时间日历选择flag
          banquetCheckInText:'',      //订单搜索档期开始时间
          banquetCheckOutText:'',     //订单搜索档期结束时间
          signCheckInText:'',         //订单搜索签约开始时间
          signCheckOutText:'',        //订单搜索签约结束时间
          maxScheduleDateNumber:365*2,    //日历显示最多天数
          maxDays:100,                    //选择时间段的最大跨度
          isIOS:isIOS,
          showLoadingStatus:false, //loading状态
        }
      },
      watch:{
        queryParams:{
          handler(val){
              if(val){
                this.searchAction();
              }
          },
          deep:true
        },
        adviserList:function (val) {
          if(val){
            this.fetchIndexResultData();
          }
        },

      },
      created(){
        //隐藏导航栏
        KNB.setNavigationBarHidden({
          flag: 1, //0表示显示，1表示隐藏
        });
      },
      mounted(){
        this.fetchStatus();
//        let resultDivDom = document.getElementsByClassName('result-index-div')[0];
//        resultDivDom.addEventListener('scroll',this.scrollFun,false);
      },
      computed:{
        showFilterContentStatus: function () {
          let flag = false;
          this.filterTagList.forEach((ele, index)=>{
            if(ele.active){
              flag = true;
            }
          });
          return flag;
        },
      },
      methods:{
        fetchStatus:function(){
          let self = this;
          let ajaxGetStatus = eDomain + CONSTANT.ajaxAddress.queryYZSInfoAjaxAction;
          fetchJsonp(ajaxGetStatus,{
            jsonpCallback:'jsonp'
          }).then(function(response){
            return response.json()
          }).then(function(json){
            if(json.code == 600){
              if(isAndroid && isAPP){
                CommonFun.androidLogin();
              }else{
                location.href = CommonFun.getEDomain();
              }
            }else if(json.code!=200){
              console.log(json.msg);
              Toast(json.msg);
              return;
            }
            let data = json.content;
            data.salesList.forEach((ele, index)=>{
              ele.label  = ele.salesName;
              ele.value = ele.salesId;
              if(!ele.label && ele.value){
                ele.label = ele.value;
              }
              if(ele.label && !ele.value){
                ele.value = ele.label;
              }
              if(!ele.label && !ele.value){
                data.salesList.splice(index,1);
              }
            });
            data.shopList.forEach((ele, index)=>{
              ele.label = ele.shopName;
              ele.value = ele.shopId;
            })
            self.adviserList = data.salesList;
            self.hotelList = data.shopList;
          }).catch(function(ex){
            Toast('网络异常，请重试');
            console.log('ajaxGetStatus failed', ex);
          })
        },
        fetchIndexResultData: function () {
          this.showResultStatus = false;
          this.showLoadingStatus = true;
          let self = this;
          let params = {
            page: this.pageIndex,
            max: this.pageSize
          };
          let ajaxGetIndexResultData = eDomain + CONSTANT.ajaxAddress.pageYZSOrderAjaxAction +'?' + qs.stringify(params);
          fetchJsonp(ajaxGetIndexResultData, {
            jsonpCallback: 'jsonp'
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            if(json.code == 600){
              if(isAndroid && isAPP){
                CommonFun.androidLogin();
              }else{
                location.href = CommonFun.getEDomain();
              }
            }else if(json.code!=200){
              Toast(json.msg);
              self.showLoadingStatus = false;
              return;
            }
            self.scrollStatus = true;
            self.showResultStatus = true;
            self.showLoadingStatus = false;
            let resultDivDom = document.getElementsByClassName('result-index-div')[0];
            let data = json.content;
            self.resultDeal = self.resultDeal.concat(data.orderList);
            self.pageIndex++;
            if(data.orderList.length >= self.pageSize){
              self.dealMoreModule = true;
              resultDivDom.addEventListener('scroll',self.scrollFun,false);

            }else{
              self.dealMoreModule = false;
              resultDivDom.removeEventListener('scroll',self.scrollFun,false);
            }
          }).catch(function(ex){
            Toast('网络错误，请重试')
            console.log('ajaxGetIndexResultData failed', ex);
          })
        },
        //scroll时获取下一页数据
        scrollFun:function () {
          let resultDivDom = document.getElementsByClassName('result-index-div')[0];
          let resultContentDom = document.getElementsByClassName('result-content')[0];
          if(resultDivDom.scrollTop + screen.availHeight > resultContentDom.offsetHeight){
            if(this.isQuerying && this.scrollStatus && this.dealMoreModule){
              this.scrollStatus = false;
              this.fetchQueryResultList();
            }else if(!this.isQuerying && this.scrollStatus && this.dealMoreModule){
              this.scrollStatus = false;
              this.fetchIndexResultData();
            }
          }
        },
        hideFilterContent: function () {
          this.filterTagList.forEach((ele,index)=>{
            ele.active = false;
          })
        },
        chooseFilterTag:function (item) {
          let activeStatus = item.active;
          this.filterTagList.forEach((ele,index)=>{
            ele.active = false;
          });
          if(!activeStatus){
            item.active = true;
          }
        },

        //设置选中酒店名称
        setHotel:function(val){
          this.hotel = val;
          this.filterTagList[1].active = false;
          if(val && val.label){
            this.filterTagList[1].text = val.shopName;
            this.queryParams.shopId = val.shopId;
          }else if(!val){
            //为空
            this.filterTagList[1].text = '酒店名称';
            this.queryParams.shopId='';
          }
        },
        //设置选中顾问名称
        setAdviser:function(val){
          this.adviser = val;
          this.filterTagList[0].active = false;
          if(val && val.label){
            //说明已选择顾问
            this.filterTagList[0].text = val.salesName;
            this.queryParams.salesId = val.salesId;
          }else if(!val){
            //为空
            this.filterTagList[0].text = '顾问';
            this.queryParams.salesId='';
          }
        },

        //选择签约时间
        selectSignDateFun:function (date) {
          if(date){
            this.filterTagList[2].text = date;
          }else{
            //被date置空
            this.filterTagList[2].text = '签约时间';
          }
        },
        //选择档期时间
        selectBanquetDateFun:function (date) {
            if(date){
                this.filterTagList[3].text = date;
            }else{
              //被date置空
              this.filterTagList[3].text = '档期时间';
            }
        },
        doneSignDateFun:function (checkInDate,checkOutDate) {
          if(checkInDate){
            this.signCheckInText = formatter(checkInDate,'YYYY-MM-DD');
          }else{
            this.signCheckInText ='';
          }
          if(checkOutDate){
            this.signCheckOutText = formatter(checkOutDate,'YYYY-MM-DD');
          }else{
            this.signCheckOutText = '';
          }
          this.filterTagList[2].active=false;
          let signCheckOutText = this.signCheckOutText ? this.signCheckOutText : this.signCheckInText;
          Object.assign(this.queryParams,{signStartDate:this.signCheckInText,signEndDate:signCheckOutText});
        },
        doneBanquetDateFun:function (checkInDate, checkOutDate) {
          if(checkInDate){
            this.banquetCheckInText = formatter(checkInDate,'YYYY-MM-DD');
          }else{
            this.banquetCheckInText = '';
          }
          if(checkOutDate){
            this.banquetCheckOutText = formatter(checkOutDate,'YYYY-MM-DD');
          }else{
            this.banquetCheckOutText = '';
          }
          this.filterTagList[3].active=false;
          let banquetCheckOutText = this.banquetCheckOutText ? this.banquetCheckOutText : this.banquetCheckInText;
          Object.assign(this.queryParams,{scheduleFrom:this.banquetCheckInText,scheduleTo:banquetCheckOutText});
        },

        //显示的日期
        dateTextShow: function (checkInDate,checkOutDate) {
          var text = ""
          if (checkInDate && checkOutDate && checkInDate != checkOutDate) {
            text = checkInDate + ' 至 ' + checkOutDate;
          } else if (checkInDate && !checkOutDate) {
            text = checkInDate;
          }
          return text;
        },

        //当查询条件改变时，就调用这个方法
        searchAction:function () {
//          this.setLocalStorage();
          this.resultDeal = [];
          this.pageIndex = 1;
          this.showLoadingStatus = true;
          this.isQuerying = true;
          this.showResultStatus = false;
          this.fetchQueryResultList();
        },

        //根据条件查询
        fetchQueryResultList: function () {
          let params = Object.assign({}, this.queryParams, {page: this.pageIndex, max: this.pageSize});
          let ajaxGetDealResultData = eDomain + CONSTANT.ajaxAddress.queryYZSOrderByKeyWordsAjaxAction + '?' + qs.stringify(params);
          let self = this;
          fetchJsonp(ajaxGetDealResultData, {
            jsonpCallback: 'jsonp'
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            if (json.code != 200) {
              self.showLoadingStatus = false;
              console.log(json.msg);
              Toast(json.msg);
              return;
            }
            self.showResultStatus = true;
            self.showLoadingStatus = false;
            let data = json.content;
            let resultDivDom = document.getElementsByClassName('result-index-div')[0];
            self.scrollStatus = true;
            self.resultDeal = self.resultDeal.concat(data.orderList);
            self.pageIndex++;
            if (data.orderList.length >= self.pageSize) {
              self.dealMoreModule = true;
              resultDivDom.addEventListener('scroll',self.scrollFun,false);

            } else {
              self.dealMoreModule = false;
              resultDivDom.removeEventListener('scroll',self.scrollFun,false);
            }
          }).catch(function (ex) {
            Toast('网络错误，请重试');
            console.log('ajaxGetDealResultData failed', ex);
          })
        },
        preventScrollFun: function (e) {
          e.stopPropagation();
          e.preventDefault(); //防止穿透滑动
        },
        //跳转到search页面
        toSearch:function () {
          if(isAPP){
            KNB.openWebview({
              url: CONSTANT.gAddress+'/app/gfe-app-page-yzs-love-lab/order-search.html', //需要打开的完整http链接,
              //隐藏webview的导航栏功能
            });
          }else{
            location.href = './order-search.html';
          }

        },
        toBack:function () {
          if(isAPP){
            KNB.closeWebview({});
          }else{
            location.href = './my-index.html';
          }
        }

      },
      components: {
        AppSelectSearch, //搜索选择组件
        AppOrderDealItem,
        AppCalendar,
      }
    }
</script>
