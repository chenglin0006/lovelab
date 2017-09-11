<template>
    <section class="hotel-detail-pic-section">
        <div class="tab-div" v-if="dataList.length>3">
            <div class="tab-item" @click="chooseTabFun(item)" :class="{'active':item.active}" v-for="(item,index) in dataList">
                <div class="tab-text-div text-ellipse">{{item.tabText}}</div>
                <div class="border-bottom-div"></div>
            </div>
        </div>
        <div class="tab-div flex-parent" v-else>
            <div class="tab-item-flex flex-child" @click="chooseTabFun(item)" :class="{'active':item.active}" v-for="(item,index) in dataList">
                <div class="tab-text-div text-ellipse">{{item.tabText}}</div>
                <div class="border-bottom-div"></div>
            </div>
        </div>
        <div class="pic-list-div clearfix">
            <div class="pic-div" :class="{'left-pic':index%2==0}" v-for="(item,index) in imgList">
                <img class="img-item" :src="item" @click="showImgPreivewFun(index)">
            </div>
        </div>
        <div class="preview-img-div" v-show="showImgPreivewStatus" @click="hideImgPreivewFun">
            <swiper :options="swiperOptionPreview" ref="mySwiper">
                <swiper-slide :key="index" v-for="(item,index) in imgList">
                    <img :src="item">
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script>
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js';
import formatter from 'date-formatter';
import KNB from '@dp/knb';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            showImgPreivewStatus:false,
            swiperOptionPreview: {
                notNextTick: false,
                setWrapperSize :true,
                autoHeight: false
            },
            tabList:[{text:'酒店1',value:'1'},{text:'酒店2',value:'2'},{text:'酒店3',value:'3'},{text:'酒店4酒店4',value:'4'},{text:'酒店5',value:'5'},{text:'酒店6',value:'6'},{text:'酒店7',value:'7'},{text:'酒店8',value:'8'}],
            imgList:[],
            dataList:[],
            isAndroid:false,
            isLLApp:false,
            isIOS:false
        }
    },
    props:[],
    components: {
        // swiper,
        // swiperSlide
    },
    watch:{
    },
    computed:{
    },
    mounted(){
        this.shopId = Util.getUrlParam('shopId')?Util.getUrlParam('shopId'):0;
        this.isLLApp = CommonFun.getUaIsApp();
        KNB.ready(()=>{
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info&&info.osName=='ios'?true:false;
                    this.isAndroid = info&&info.osName=='android'?true:false;
                    this.getPicData();
                },
                fail: (err)=>{
                    this.getPicData();
                }
            });
        });
    },
    methods:{
        showImgPreivewFun:function(index){
            if(this.imgList.length){
                if(this.isLLApp){
                    KNB.setNavigationBarHidden({
                      flag: 1, //0表示显示，1表示隐藏
                      success: ()=>{
                        this.showImgPreivewStatus = true;
                        this.$refs.mySwiper.swiper.slideTo(index);
                      },
                      fail: ()=>{}
                    });
                } else {
                    this.showImgPreivewStatus = true;
                    this.$refs.mySwiper.swiper.slideTo(index);
                }
            }
        },
        hideImgPreivewFun:function(){
            if(this.isLLApp){
                KNB.setNavigationBarHidden({
                  flag: 0, //0表示显示，1表示隐藏
                  success: ()=>{
                    this.showImgPreivewStatus = false;
                  },
                  fail: ()=>{
                  }
                });
            } else {
                this.showImgPreivewStatus = false;
            }
        },
        chooseTabFun:function(item){
            this.dataList.forEach((ele,index)=>{
                ele.active = false;
                if(ele.value == item.value){
                    ele.active = true;
                }
            });
            this.imgList = item.picList;
        },
        getPicData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/pic/list?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code==600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast(json.msg);
                        console.log('查询图片信息失败')
                        return;
                    }
                }
                let dataArry = [];
                json.content.forEach((ele,index)=>{
                    let obj = {
                        tabText:ele.firstTypeDesc,
                        value:ele.firstType,
                        active:index==0?true:false,
                        picList:[]
                    }
                    let picArry = []
                    ele.pictureList.forEach((pic,picIndex)=>{
                        picArry.push(pic.picPath);
                    })
                    obj.picList = picArry;
                    dataArry.push(obj);
                });
                this.dataList = dataArry;
                this.imgList = this.dataList[0].picList;
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        }
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    @import url('../commonLess/border');
    .hotel-detail-pic-section{
        background:#fff;
        font-size: 1.4rem;
        font-family: PingFangSC-Regular;
        text-align: center;
        .tab-div{
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #fff;
            z-index: 10;
        }
        .tab-item,.tab-item-flex{
            line-height: 4.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            position: relative;
            .borderline(#e1e1e1,bottom);
            .tab-text-div{
                min-width: 8.3rem;
                white-space: nowrap;
                max-width: 13rem;
            }
            .border-bottom-div{
                display: none;
                height: .3rem;
                position: absolute;
                left: 1.3rem;
                right: 1.3rem;
                bottom: 0;
                background:@mainColor;
            }
            &.active{
                font-size: 1.4rem;
                color: #FF66A1;
                letter-spacing: 0;
                .border-bottom-div{
                    display: inline;
                }
            }
        }
        .tab-item{
            display: table-cell;
            overflow: hidden;
        }
    }
    .pic-list-div{
        padding: 1rem;
        padding-bottom: 0;
        padding-top: 5rem;
        .pic-div{
            float: left;
            width: 49%;
            padding-bottom: 49%;
            position: relative;
            margin-bottom: 2%;
            &.left-pic{
                margin-right: 2%;
            }
            .img-item{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom:0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .clearfix:before {
        content: '';
        display: block;
    }
    .clearfix:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
    }
    .tab-div::-webkit-scrollbar {
        display: none;
    }
</style>
