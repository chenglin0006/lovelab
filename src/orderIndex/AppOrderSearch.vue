<template>
    <div class="order-search-section">
        <div class="order-search-head" :class="{'ios-order-head-area':isIOS}">
            <form action="" @submit.prevent="searchFun">
                <input type="search" class="order-search-input" v-model="inputValue" ref="search" placeholder="请输入客户名 / 手机号">
                <span class="cancel-btn" :class="{'ios-cancel-btn':isIOS}" v-show="showCancelBtn" @click="clearSearch"></span>
            </form>
            <span @click="toBack">取消</span>
        </div>
        <div class="result-search-div" :class="{'ios-result-search-div':isIOS}">
            <div v-if="searchResultList.length>0" class="result-content">
                <app-order-deal-item v-for="(item, index) in searchResultList" :key="index" :item="item"></app-order-deal-item>
            </div>
            <div v-else class="no-result" v-show="showResultStatus">没有符合条件的查询结果</div>
            <div class="loading-status" v-if="showLoadingStatus && pageIndex==1">
                <img src="./img/loading.gif" alt="加载中...">
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    @import url('../commonLess/util.less');
    .order-search-section{
        .order-search-head{
            padding:.6rem 1.5rem;
            background: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
            line-height:3rem;
            overflow: hidden;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            right:0;
            z-index: 22;
            box-sizing: border-box;
            .cancel-btn{
                position:absolute;
                display: inline-block;
                right: 19%;
                top: .6rem;
                -webkit-appearance: none;
                height: 3rem;
                width: 3rem;
                background-size:1.1rem 1.1rem;
                background-repeat:no-repeat;
                background-image: url("./img/icon_close@3x.png");
                background-position: center;
                &.ios-cancel-btn{
                    top: 2.4rem;
                }
            }
            &.ios-order-head-area{
                padding:2.4rem 1.5rem .6rem 1.5rem
            }
            .order-search-input{
                height:3rem;
                width:84.35%;
                border-radius: 5rem;
                text-indent: 1.5rem;
                font-size:1.4rem;
                color:#333;
                border:none;
                &::-webkit-search-cancel-button{
                    display: none;
                }
            }
            span{
                color:#fff;
                font-size:1.5rem;
                font-weight:600;
                position: absolute;
                right:2rem;
                bottom:.5rem;
            }
        }
        .no-result{
            text-align: center;
            color:#666;
            font-size:1.3rem;
            margin-top:3rem;
        }
        .result-search-div{
            /*padding-top:4.2rem;*/  //todo
            position:absolute;
            right:0;
            left:0;
            bottom:0;
            top:4.2rem;//todo
            overflow-y:scroll;
            /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
            -webkit-overflow-scrolling: touch;
            &.ios-result-search-div{
                top:6rem;
            }
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

</style>
<script>
  import CONSTANT from './js/constant.js';
  import AppOrderDealItem from './components/AppOrderDealItem.vue';
  import fetchJsonp from 'fetch-jsonp';
  import qs from 'qs';
  import Toast from '@dp/wepp-module-toast';
  import $ from '@dp/zepto';
  import KNB from '@dp/knb';
  import CommonFun from '../commonJs/CommonFun.js';

  var $WIN = $(window);
  var $BODY = $('body');
  var UAStr = (navigator.userAgent).toLowerCase(),
    isIOS = /(iphone|ipad)/.test(UAStr),
    isAndroid = /android/.test(UAStr);
  var isAPP = CommonFun.getUaIsApp();
  export default{
    data(){
      return {
        inputValue: '',
        searchResultList:[],
        showResultStatus:false,
        scrollStatus:true,
        pageIndex:1,
        pageSize:25,
        dealMoreModule:false,
        isIOS:isIOS,
        showLoadingStatus:false, //loading状态
      }
    },
    components: {
      AppOrderDealItem
    },
    created(){
      //隐藏导航栏
      KNB.setNavigationBarHidden({
        flag: 1, //0表示显示，1表示隐藏
      });
    },
    mounted(){
//      let resultSearchDivDom = document.getElementsByClassName('result-search-div')[0];
//      resultSearchDivDom.addEventListener('scroll',this.scrollFun,false);
      this.searchFun();
    },
    computed:{
      showCancelBtn(){
        return this.inputValue ? true : false;
      },
    },
    methods: {
      //清楚输入框
      clearSearch: function () {
        this.inputValue = '';
        this.$refs.search.focus();
      },

      //点击回车时
      searchFun: function () {
        //重置
        this.pageIndex = 1;
        this.showResultStatus = false;
        this.showLoadingStatus = true;
        this.searchResultList = [];
        this.fetchSearchResult();
      },
      scrollFun:function () {
        let self = this;
        let resultSearchDivDom = document.getElementsByClassName('result-search-div')[0];
        let resultSearchContentDom = document.getElementsByClassName('result-content')[0];

        if(resultSearchDivDom && resultSearchContentDom && (resultSearchDivDom.scrollTop+screen.availHeight > resultSearchContentDom.offsetHeight) && this.scrollStatus && this.dealMoreModule){
//          alert('翻页了！');
//          alert(resultSearchDivDom.scrollTop+","+screen.availHeight+","+resultSearchContentDom.offsetHeight);
          self.scrollStatus = false;
          self.fetchSearchResult();
        }
      },
      fetchSearchResult: function(){
        let self = this;
        let params = {
          keyWord:this.inputValue,
          page: this.pageIndex,
          max: this.pageSize
        };
        let resultSearchDivDom = document.getElementsByClassName('result-search-div')[0];
        let eDomain = CONSTANT.ajaxAddress.eDomain;
        let ajaxGetSearchResult = eDomain + CONSTANT.ajaxAddress.queryYZSOrderByKeyWordsAjaxAction+'?'+qs.stringify(params);
        fetchJsonp(ajaxGetSearchResult,{
          jsonpCallback:'jsonp'
        }).then(function(response){
          return response.json();
        }).then(function(json){
          if(json.code == 600){
            if(isAndroid && isAPP){
              CommonFun.androidLogin();
            }else{
              location.href = CommonFun.getEDomain();
            }
          }else if(json.code!=200){
            self.showLoadingStatus = false;
            console.log(json.msg);
            Toast(json.msg);
            return;
          }
          self.showResultStatus = true;
          self.showLoadingStatus = false;
          let data = json.content;
          self.scrollStatus = true;
          self.searchResultList = self.searchResultList.concat(data.orderList);
          self.pageIndex++;

          if(data.orderList.length >= self.pageSize){
            self.dealMoreModule = true;
            resultSearchDivDom.addEventListener('scroll',self.scrollFun,false);
          }else{
            self.dealMoreModule = false;
            resultSearchDivDom.removeEventListener('scroll',self.scrollFun,false);
          }
        }).catch(function (ex) {
          Toast('网络错误，请重试');
          console.log('ajaxGetSearchResult failed', ex);
        })
      },
      toBack:function () {
        if(isAPP){
          KNB.closeWebview({});
        }else{
          location.href = './order-list.html';
        }
      }
    }
  }
</script>
