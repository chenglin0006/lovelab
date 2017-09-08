<template>
<section>
    <div class="hotel-list-index-section">
        <div class="filter-div" :class="{'is-ios':isIOS}">
            <div class="hotel-search-input">
                <form action="" @submit.prevent="inputSearchFun">
                    <input id="keyInputId" ref="searchKeyWord" class="search-input" v-model="keyword" />
                    <!-- <img class="clear-all-input" @click="clearAllInputFun" src="./img/clear_input.png" v-show="this.keyword"> -->
                </form>
            </div>
            <div class="hotel-list-filter-section">
                <div class="filter-item-div">
                    <div class="filter-item-tag" @click="chooseFilterTag(item)" :class="{'active':item.active}" :key="index" v-for="(item,index) in filterTagList">
                        <div class="item-text text-ellipse">{{item.text}}</div>
                        <img v-if="item.active" src="./img/filter-arrow.png">
                        <img v-else src="../commonImg/fold.png" >
                    </div>
                </div>
                <div class="filter-item-content" v-if="showFilterContentStatus">
                    <div class="mask-div" @touchmove="touchMoveFun($event)" @click="hideFilterContent"></div>
                    <div class="filter-select-div">
                        <div class="filter-select-item" :class="{'active':item.active,'right-item':(index+1)%3==0}" :key="index" @click="selectFilterItem(item)" v-for="(item,index) in filterSelectList">{{item.text}}</div>
                    </div>
                    <div class="filter-select-action-div">
                        <div class="filter-action cancel" @click="resetFilterSearch">重置</div>
                        <div class="filter-action ok" @click="hideFilterContent('ok')">确定</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hotel-list-div" :class="{'is-ios':isIOS}" v-if="shopList.length">
            <app-hotel-item :is-app="isLLApp" :key="index" :item="item" v-for="(item,index) in shopList"></app-hotel-item>
        </div>
        <div class="hotel-list-div null-status" v-else>
            <span v-if="!showLoadingStatus">没有符合条件的酒店</span>
        </div>
        <div class="loading-status" v-if="showLoadingStatus&&pageIndex==1">
            <img src="./img/loading.gif">
        </div>
    </div>
</section>
</template>

<script>
import AppHotelItem from './components/AppHotelItem.vue';
import _ from 'lodash';
import mockData from './js/mock.js';
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js';
import KNB from '@dp/knb';
import UA from '@dp/util-m-ua';
import AppBottomTab from '../commonApp/AppBottomTab.vue';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();

export default {
    name: 'app',
    data(){
        return{
            keyword:'',
            filterTagList:[{text:'全部区域',value:'region',active:false,defaultText:'全部区域'},{text:'桌数',value:'table',active:false,defaultText:'桌数'},{text:'餐标',value:'meal',active:false,defaultText:'餐标'},{text:'筛选',value:'type',active:false,defaultText:'筛选'}],
            filterSelectList:[],
            activeFilterTag:'region',
            regionSelectList:[],
            tableSelectList:[{text:'10桌以下',value:{min:0,max:10},tag:'table',active:false},{text:'10~14桌',value:{min:10,max:14},tag:'table',active:false},{text:'15~19桌',value:{min:15,max:19},tag:'table',active:false},{text:'20~24桌',value:{min:20,max:24},tag:'table',active:false},{text:'25~29桌',value:{min:25,max:29},tag:'table',active:false},{text:'30桌以上',value:{min:30,max:1000},tag:'table',active:false}],
            mealSelectList:[{text:'¥3000以下',value:{min:0,max:3000},tag:'meal',active:false},{text:'¥3000~4000',value:{min:3000,max:4000},tag:'meal',active:false},{text:'¥4000~5000',value:{min:4000,max:5000},tag:'meal',active:false},{text:'¥5000~6000',value:{min:5000,max:6000},tag:'meal',active:false},{text:'¥6000~7000',value:{min:6000,max:7000},tag:'meal',active:false},{text:'¥7000以上',value:{min:7000,max:100000},tag:'meal',active:false}],
            typeSelectList:[{text:'星级酒店',value:1040,tag:'type',active:false},{text:'特色餐厅',value:1191,tag:'type',active:false},{text:'婚礼会所',value:2738,tag:'type',active:false},{text:'游轮婚礼',value:2740,tag:'type',active:false}],
            moreModule:true,
            shopList:[],
            pageIndex:1,
            pageSize:10,
            isIOS:false,
            isAndroid:false,
            isLLApp:false,
            showLoadingStatus:false,
        }
    },
    props:[],
    components: {
        AppHotelItem,
        AppBottomTab
    },
    watch:{
        activeFilterTag:function(val){
            if(val=='region'){
                this.filterSelectList = this.regionSelectList;
            } else if(val=='table'){
                this.filterSelectList = this.tableSelectList;
            } else if(val=='meal'){
                 this.filterSelectList = this.mealSelectList;
            } else if(val=='type'){
                 this.filterSelectList = this.typeSelectList;
            }
        }
    },
    computed:{
        showFilterContentStatus:function(){
            let flag = false;
            this.filterTagList.forEach((ele,index)=>{
                if(ele.active){
                    flag = true;
                }
            });
            return flag;
        },
        activeFilterSelect:function(){
            let obj = {};
            let textArry=[];
            let valueArry = [];
            let tag='';
            let min = 0;
            let max = 0;
            this.filterSelectList.forEach((ele,index)=>{
                if(ele.active){
                    textArry.push(ele.text);
                    valueArry.push(ele.value);
                    tag = ele.tag;
                    min = ele.value.min?ele.value.min:0;
                    max = ele.value.max?ele.value.max:0;
                }
            });
            obj.text=textArry.join(',');
            obj.value=valueArry.join(',');
            obj.tag=tag;
            obj.min = min;
            obj.max = max;
            return obj;
        }
    },
    mounted(){
        this.isLLApp = CommonFun.getUaIsApp();
        KNB.ready(()=>{
            KNB.setNavigationBarHidden({
              flag: 1, //0表示显示，1表示隐藏
              success: function(){},
              fail: function(){}
            });
            KNB.setLLButton({
              disable: 1,
              success: function(){
                 console.log('reset LLButon success');
              },
              fail: function(){
                 console.log('not supported yet!');
              }
            });
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info&&info.osName=='ios'?true:false;
                    this.isAndroid = info&&info.osName=='android'?true:false;
                    this.getRegionList();
                    this.filterSelectList = this.regionSelectList;
                    this.searchFun();
                    this.pageIndex++;
                    $('.hotel-list-div').on('scroll', this.scrollMore);
                },
                fail: (err)=>{
                    this.getRegionList();
                    this.filterSelectList = this.regionSelectList;
                    this.searchFun();
                    this.pageIndex++;
                    $('.hotel-list-div').on('scroll', this.scrollMore);
                }
            });
        });
    },
    methods:{
        inputSearchFun:function(){
            this.pageIndex = 1;
            this.shopList=[];
            this.searchFun();
            this.pageIndex++;
        },
        clearAllInputFun:function(){
            this.keyword = '';
            this.$refs.searchKeyWord.focus();
        },
        getRegionList:function(){
            let params = {
                cityId:1
            }
            let ajaxUrl = mDomain+'/lovelab/shop/regionInfoListQuery?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp',
                withCredentials: true
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code!=200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast('获取区域信息失败:'+json.msg);
                        console.log('获取区域信息失败', json.msg);
                        return
                    }
                }
                let regionKeysList = Object.keys(json.content);
                regionKeysList.forEach((ele,index)=>{
                    var obj = {text:json.content[ele],value:ele,active:false,tag:'region'};
                    this.regionSelectList.push(obj);
                });
            }).catch(function(ex) {
                Toast('网络异常，请重试');
                console.log('获取区域信息失败', ex);
            });
        },
        scrollMore:function(){
            let scrollTop = $('.hotel-list-div')[0].scrollTop; //滚动到的当前位置
            let scrollHeight = $('.hotel-list-div').height(); //容器高度
            let nHeight = $('.hotel-list-div')[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
            if (scrollTop + scrollHeight == nHeight) {
                if (this.moreModule) {
                    this.searchFun();
                    this.pageIndex++;
                } else {
                    $(window).off('scroll', this.scrollMore);
                }
            }
        },
        chooseFilterTag:function(item){
            let activeStatus = item.active;
            this.filterTagList.forEach((ele,index)=>{
                ele.active = false;
            });
            if(!activeStatus){
                item.active = true;
                this.activeFilterTag = item.value;
            }
        },
        resetFilterSearch:function(){
            this.filterTagList = [{text:'全部区域',value:'region',active:false},{text:'桌数',value:'table',active:false},{text:'餐标',value:'meal',active:false},{text:'筛选',value:'type',active:false}];
            this.regionSelectList.forEach((ele,index)=>{
                ele.active = false;
            });
            this.tableSelectList.forEach((ele,index)=>{
                ele.active = false;
            })
            this.mealSelectList.forEach((ele,index)=>{
                ele.active = false;
            })
            this.typeSelectList.forEach((ele,index)=>{
                ele.active = false;
            });
            this.pageIndex=1;
            this.keyword = '';
            this.searchFun();
        },
        hideFilterContent:function(text){
            if(text=='ok'){
                this.shopList=[];
                this.pageIndex = 1;
                let regionSelectStatus = false;
                this.regionSelectList.forEach((ele,index)=>{
                    regionSelectStatus = regionSelectStatus||ele.active
                });
                let tableSelectStatus = false;
                this.tableSelectList.forEach((ele,index)=>{
                    tableSelectStatus = tableSelectStatus||ele.active
                });
                let mealSelectStatus = false;
                this.mealSelectList.forEach((ele,index)=>{
                    mealSelectStatus = mealSelectStatus||ele.active
                });
                let typeSelectStatus = false;
                this.typeSelectList.forEach((ele,index)=>{
                    typeSelectStatus = typeSelectStatus||ele.active
                });
                this.filterTagList.forEach((ele,index)=>{
                    ele.active = false;
                    if(ele.value=='region'&&!regionSelectStatus){
                        ele.text='全部区域';
                    } else if(ele.value=='table'&&!tableSelectStatus){
                        ele.text='桌数';
                    } else if(ele.value=='meal'&&!mealSelectStatus){
                        ele.text='餐标';
                    } else if(ele.value=='type'&&!typeSelectStatus){
                        ele.text='筛选';
                    }
                });
                this.filterTagList.forEach((ele,index)=>{
                    if(ele.value == this.activeFilterSelect.tag){
                        ele.text = this.activeFilterSelect.text;
                    }
                });
                this.searchFun();
                this.pageIndex++;
            } else {
                this.filterTagList.forEach((ele,index)=>{
                    ele.active = false;
                });
            }
        },
        selectFilterItem:function(item){
            if(item.tag=='region' || item.tag=='type'){
                item.active = !item.active;
            } else {
                let activeStatus = item.active;
                this.filterSelectList.forEach((ele,index)=>{
                    ele.active = false;
                });
                if(!activeStatus){
                    item.active = true;
                }
            }
            // this.filterTagList.forEach((ele,index)=>{
            //     if(ele.value == this.activeFilterSelect.tag&&this.activeFilterSelect.text){
            //         ele.text = this.activeFilterSelect.text;
            //     } else {
            //         ele.text = ele.defaultText;
            //     }
            // });
        },
        searchFun:function(){
            this.showLoadingStatus = true;
            let params ={
                keyword:this.keyword,
                cityId:1,
                regionIds:'',
                categoryIds:'',
                minTable:0,
                maxTable:0,
                minPrice:0,
                maxPrice:0,
                reqTypes:'',
                scheduleFrom:'',
                scheduleTo:'',
                yzsShop:'',
                page:this.pageIndex,
                pageSize:this.pageSize
            }
            let regionArry = [];
            this.regionSelectList.forEach((ele,index)=>{
                if(ele.active){
                    regionArry.push(ele.value);
                }
            });
            params.regionIds = regionArry.join(',');
            this.tableSelectList.forEach((ele,index)=>{
                if(ele.active){
                    params.minTable = ele.value.min;
                    params.maxTable = ele.value.max;
                }
            });
            this.mealSelectList.forEach((ele,index)=>{
                if(ele.active){
                    params.minPrice = ele.value.min;
                    params.maxPrice = ele.value.max;
                }
            });
            let categoryArry = [];
            this.typeSelectList.forEach((ele,index)=>{
                if(ele.active){
                    categoryArry.push(ele.value);
                }
            });
            params.categoryIds = categoryArry.join(',');
            console.log(params.page);
            let ajaxUrl = mDomain+'/lovelab/shop/yzsShopListQuery?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp',
                withCredentials: true
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code!=200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast('获取酒店列表失败:'+json.msg);
                        console.log('获取酒店列表失败', json.msg);
                        return
                    }
                }
                if(json.content.shopList){
                    if(json.content.shopList<this.pageSize){
                        this.moreModule = false;
                    } else {
                        this.moreModule = true;
                    }
                } else {
                    this.moreModule = false;
                }
                this.showLoadingStatus = false;
                if(json.content.shopList&&json.content.shopList.length){
                    this.shopList  = this.shopList.concat(json.content.shopList);
                }
            }).catch(function(ex) {
                Toast('网络异常，请重试');
                console.log('查询酒店列表失败', ex);
            });
        },
        touchMoveFun:function(event){
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/border');
    .hotel-list-index-section{
        .filter-div{
            position: relative;
            z-index: 22;
            &.is-ios{
                .hotel-search-input{
                    padding-top: 2rem;
                }
                background-image: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
            }
        }
        .hotel-search-input{
            position: relative;
            z-index: 23;
            text-align: center;
            padding-left: 1.3rem;
            padding-right: 1.3rem;
            background-image: linear-gradient(71deg, #FF7088 0%, #F759A8 100%);
            input{
                border:none;
                height: 3rem;
                width: 95%;
                position: relative;
                margin: 1.5rem auto;
                border-radius: 5rem;
                margin-bottom: .6rem;
                padding: 0 1rem;
            }
            // img{
            //     width: 2rem;
            //     position: absolute;
            //     left: 1.3rem;
            //     bottom: 1.2rem;
            // }
        }
        .hotel-list-filter-section{
            .filter-item-div{
                background: #fff;
                position: relative;
                z-index: 21;
                border-top: solid 1px #f2f2f2;
                border-bottom: solid 1px #f2f2f2;
                .filter-item-tag{
                    display: inline-block;
                    line-height: 1.7rem;
                    margin: 1rem 0;
                    width: 25%;
                    text-align: center;
                    color: #333;
                    font-size: 1.4rem;
                    .borderline(#E1E1E1,right);
                    .item-text{
                        display:inline-block;
                        max-width: 80%;
                        position:relative;
                        vertical-align: bottom;
                    }
                    img{
                        width: 1rem;
                        height: .6rem;
                    }
                    &.active{
                        color:@mainColor;
                    }
                    &:last-child{
                        &:after{
                            border: none;
                        }
                    }
                }
            }
            .filter-item-content{
                .filter-select-div{
                    min-height: 12rem;
                    padding: 1.5rem 1rem;
                    font-size: 0;
                    background: #fff;
                    position: relative;
                    z-index: 21;
                }
                .filter-select-item{
                    display: inline-block;
                    font-size: 1.3rem;
                    width: 30%;
                    background: #fff;
                    text-align: center;
                    line-height: 4rem;
                    margin-bottom: 1.5rem;
                    margin-right: 1.5rem;
                    .borderline(#bcbcbc,5px);
                    color: #333;
                    &.right-item{
                        margin-right: 0;
                    }
                    &.active{
                        background: #FFEFF5;
                        color: @mainColor;
                        .borderline(@mainColor,5px);
                    }
                }
            }
            .filter-select-action-div{
                font-size: 0;
                position: relative;
                z-index: 21;
                padding: 1.5rem;
                background: #fff;
                font-size: 0rem;
                .filter-action{
                    display: inline-block;
                    width: 48%;
                    border-radius: .2rem;
                    line-height: 4rem;
                    height: 4rem;
                    text-align: center;
                    &.cancel{
                        font-size: 1.6rem;
                        background: #fff;
                        color: #666;
                        margin-right: 2%;
                        border:solid 1px #bbb;
                    }
                    &.ok{
                        font-size: 1.6rem;
                        background: @mainColor;
                        color: #fff;
                        border:solid 1px @mainColor;
                    }
                }
            }
        }
    }
    .hotel-list-div{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5rem;
        padding-bottom: .4rem;
        top: 10rem;
        &.is-ios{
            top: 11rem;
        }
        &.null-status{
            text-align: center;
            color: #333;
            font-size: 1.4rem;
            position: relative;
            top: 15rem;
        }
    }
    .mask-div{
        opacity: .5;
        &.search{
            position: absolute;
            z-index: 22;
        }
    }
    .loading-status{
        position: relative;
        img{
            position: relative;
            width: 1.5rem;
            margin:0 auto;
            left: 50%;
            margin-left: -.75rem;
            margin-top: 10rem;
        }
    }
    .hotel-search-input{
        form{
            position: relative;
        }
        img.clear-all-input{
            position: absolute;
            right: 1rem;
            width: 1rem;
            height: 1rem;
            top: 2.5rem;
        }
    }
</style>
