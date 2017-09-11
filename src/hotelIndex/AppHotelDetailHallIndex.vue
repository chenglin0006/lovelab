<template>
    <section class="hall-detail-section">
        <div class="pic-div">
        <!-- 
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide :key="index" v-for="(item,index) in imgList">
                    <img :src="item" @click="showImgPreivewFun(index)">
                </swiper-slide>
                <div v-show="imgList.length>0" class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="mask-index-div"></div> -->
        </div>
        <div class="hall-info-div" v-if="hallDetailData&&hallDetailData.briefInfo">
            <div class="hall-name-div">
                <div class="hall-name text-ellipse">{{hallDetailData.briefInfo.hallName}}</div>
                <span v-if="hallDetailData.briefInfo.tableRange">可容纳{{hallDetailData.briefInfo.tableRange}}</span>
            </div>
            <div class="hall-desc-div">
                <span class="price-span" v-if="hallDetailData.briefInfo.minPrice!=-1"><span class="price-start"><span class="price-unit">¥</span>{{hallDetailData.briefInfo.minPrice}}起订</span></span>
                <span class="right-line" v-if="hallDetailData.briefInfo.minTables!=-1">{{hallDetailData.briefInfo.minTables}}桌起订</span>
                <span class="right-line" v-if="hallDetailData.briefInfo.pillarNum!=-1">{{hallDetailData.briefInfo.pillarNum}}根柱</span>
                <span class="right-line" v-else-if="hallDetailData.briefInfo.pillarNum==0">无柱</span>
                <span v-if="hallDetailData.briefInfo.height!=-1">层高{{hallDetailData.briefInfo.height}}米</span>
            </div>
            <div class="hall-special-div" v-if="hallDetailData.briefInfo&&hallDetailData.briefInfo.hallCharacteristicsArry&&hallDetailData.briefInfo.hallCharacteristicsArry.length">
                <div class="hall-special-title">宴会厅特色</div>
                <div class="hall-special-content">
                    <span style="margin-right: 10px;" :key="index" v-for="(item,index) in hallDetailData.briefInfo.hallCharacteristicsArry">{{item}}</span>
                </div>
            </div>
        </div>
        <div class="hall-detail-div" v-if="hallDetailData&&hallDetailData.detailInfo">
            <div class="hall-detail-title">宴会厅详情</div>
            <div class="hall-detail-line-div">
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.interspace">
                    <div class="left-label">迎宾区</div>
                    <div class="right-value">{{hallDetailData.detailInfo.interspace}}</div>
                </div>
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.champagneFlag!=-1">
                    <div class="left-label">香槟塔</div>
                    <div class="right-value" v-if="hallDetailData.detailInfo.champagneFlag">有</div>
                    <div class="right-value" v-else>无</div>
                </div>
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.stage!=-1">
                    <div class="left-label">舞台</div>
                    <div class="right-value" v-if="hallDetailData.detailInfo.stage">有</div>
                    <div class="right-value" v-else>无</div>
                </div>
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.peoplesPerTable!=-1">
                    <div class="left-label">桌规格</div>
                    <div class="right-value">{{hallDetailData.detailInfo.peoplesPerTable}}人／桌</div>
                </div>
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.shape">
                    <div class="left-label">厅形状</div>
                    <div class="right-value text-ellipse" style="max-width:80px">{{hallDetailData.detailInfo.shape}}</div>
                </div>
                <div class="hall-detail-item" v-if="hallDetailData.detailInfo.heightUnderLight!=-1">
                    <div class="left-label">灯下高度</div>
                    <div class="right-value">{{hallDetailData.detailInfo.heightUnderLight}}米</div>
                </div>
            </div>
            <div class="hall-detail-line-div one" v-if="hallDetailData.detailInfo.stageLength!=-1&&hallDetailData.detailInfo.stageWidth!=-1&&hallDetailData.detailInfo.stageHeight!=-1">
                <div class="left-label">舞台尺寸</div>
                <div class="right-value">{{hallDetailData.detailInfo.stageLength}}*{{hallDetailData.detailInfo.stageWidth}}*{{hallDetailData.detailInfo.stageHeight}}米</div>
            </div>
            <div class="hall-detail-line-div one" v-if="hallDetailData.detailInfo.maxTablesWithNoStage!=-1 || hallDetailData.detailInfo.maxTablesWithStage!=-1">
                <div class="left-label">桌数备注</div>
                <div class="right-value">
                    <span v-if="hallDetailData.detailInfo.maxTablesWithStage!=-1">有舞台时最多容纳{{hallDetailData.detailInfo.maxTablesWithStage}}桌，</span>
                    <span v-if="hallDetailData.detailInfo.maxTablesWithNoStage!=-1">无舞台时最多容纳{{hallDetailData.detailInfo.maxTablesWithNoStage}}桌</span>
                </div>
            </div>
        </div>
        <div class="adjust-menu-div" v-if="hallDetailData&&hallDetailData.hallMenu&&hallDetailData.hallMenu.menuList.length">
            <div class="adjust-menu-title">适配菜单</div>
            <div class="adjust-menu-list-div">
                <div class="adjust-menu-item" @click="toMenuDetail(item)" :key="index" v-for="(item,index) in hallDetailData.hallMenu.menuList">
                    <span>{{item.menuName}}</span><span class="price-span">¥{{item.menuPrice}}</span>
                    <img src="./img/right_arrow.png">
                </div>
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
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js';
import KNB from '@dp/knb';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            hallId:'',
            hallDetailData:{

            },
            swiperOption: {
                notNextTick: false,
                setWrapperSize :true,
                autoHeight: false,
                pagination: '.swiper-pagination'
            },
            swiperOptionPreview: {
                notNextTick: false,
                setWrapperSize :true,
                autoHeight: false
            },
            showImgPreivewStatus:false,
            imgList:[],
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
        this.hallId = this.$route.query.hallId;
        this.shopId = this.$route.query.shopId;
        this.isLLApp = CommonFun.getUaIsApp();
        KNB.ready(()=>{
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info&&info.osName=='ios'?true:false;
                    this.isAndroid = info&&info.osName=='android'?true:false;
                    this.getHallDetailData();

                },
                fail: (err)=>{
                    this.getHallDetailData();
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
                  fail: ()=>{}
                });
            } else {
                this.showImgPreivewStatus = false;
            }
        },
        toMenuDetail:function(item){
            location.href = './hotel-detail-menu-detail.html?menuId='+item.menuId;
        },
        getHallDetailData:function(){
            let params = {
                shopId:this.shopId,
                hallId:this.hallId
            }
            let ajaxUrl = mDomain+'/lovelab/hall/detail?'+qs.stringify(params);
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
                        console.log('查询宴会厅详情失败')
                        return;
                    }
                }
                if(json.content&&json.content.briefInfo&&json.content.briefInfo.hallCharacteristics){
                    json.content.briefInfo.hallCharacteristicsArry = json.content.briefInfo.hallCharacteristics;
                }
                this.hallDetailData = json.content;
                if(this.hallDetailData&&this.hallDetailData.picUrls){
                    this.imgList = this.hallDetailData.picUrls;
                }
            }).catch(function(ex) {
                Toast('网络错误，请重试');
                console.log('ajax failed', ex);
            });
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    @import url('../commonLess/border');

    .hall-detail-section{
        font-size: 1.2rem;
        color: #666;
        .pic-div{
            width: 100%;
            padding-bottom: 56%;
            position: relative;
            img{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                object-fit:cover;
            }
            .mask-index-div{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 10rem;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 97%);
                z-index: 10;
                text-align: center;
            }
        }
        .hall-info-div{
            background: #fff;
            padding: 1.5rem 0 0 1.5rem;
            position: relative;
            margin-bottom: 1rem;
            padding-bottom: 2rem;
            .hall-name-div{
                font-size: 1.4rem;
                color: #999999;
                font-family: PingFangSC-Regular;
                margin-bottom: 1.5rem;
                .hall-name{
                    display: inline-block;
                    font-size: 1.8rem;
                    color: #333333;
                    margin-right:1rem;
                    vertical-align: bottom;
                    max-width: 50%;
                }
            }
            .hall-desc-div{
                font-size: 1.3rem;
                color: #777;
                padding-bottom: 1.5rem;
                .borderline(#e1e1e1,bottom);
                .price-start{
                    font-size: 1.6rem;
                    color: #FF6680;
                }
                .price-unit{
                    font-size: 1.5rem;
                    color: #FF6680;
                }
                .price-span{
                    margin-right: 1.5rem;
                }
                .right-line{
                    .borderline(#e1e1e1,right);
                    padding-right: .5rem;
                    padding-left: .5rem;
                    &:last-child:after{
                        border:none;
                    }
                }
            }
            .hall-special-div{
                padding: 1.5rem 1.5rem 0 0;
                .hall-special-title{
                    font-family: PingFangSC-Medium;
                    font-size: 1.4rem;
                    color: #E0C18B;
                    margin-bottom: 1rem;
                }
                .hall-special-content{
                    font-size: 1.4rem;
                    color: #999999;
                    line-height: 1.8rem;
                }
            }
        }
    }
    .hall-detail-div{
        background: #fff;
        margin-bottom: 1rem;
        padding:0 0 1.2rem 1.5rem;
        .hall-detail-line-div{
            padding: 1rem 1rem 0 0rem;
            font-size: 1.4rem;
            color: #444;
            &.one{
                padding: 0rem 1rem 0rem 0rem;
                margin-bottom: 1.5rem;
            }
            .left-label,.right-value{
                display: inline-block;
                vertical-align: top;
            }
            .left-label{
                color: #999;
                width: 5.6rem;
                margin-right: 1.5rem;
            }
            .right-value{
                max-width: 77%;
            }
            .hall-detail-item{
                display: inline-block;
                width: 49%;
                margin-bottom: 1.5rem;
            }
            .note-div{
                display: inline-block;
                width: 70%;
                vertical-align: text-top;
            }
        }
        .hall-detail-line{
            .left-label,.right-value{
                display: inline-block;
                vertical-align: top;
            }
            .left-label{
                color: #999;
                width: 5.6rem;
                margin-right: 1.5rem;
            }
        }
    }
    .adjust-menu-div{
        background: #fff;
        padding:0 0 0 1.5rem;
        .adjust-menu-list-div{
            font-size: 1.5rem;
            color: #333333;
            .adjust-menu-item{
                position: relative;
                line-height: 4.5rem;
                .borderline(#e1e1e1,bottom);
                .price-span{
                    position: absolute;
                    right:4rem;
                    color: @mainColor;
                    margin-left: 1rem;
                    font-size: 1.5rem;
                }
                &:last-child{
                    border-bottom: none;
                }
                img{
                    position: absolute;
                    right: 1rem;
                    width: 1.4rem;
                    height: 1.4rem;
                    top: 1.5rem;
                }
            }
        }
    }
    .adjust-menu-title,.hall-detail-title{
        line-height: 4.5rem;
        font-family: PingFangSC-Medium;
        font-size: 1.5rem;
        color: #111111;
        .borderline(#e1e1e1,bottom);
    }
    .pic-div{
        .swiper-container{
            position: absolute !important;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
        .swiper-pagination-bullet{
            width: .7rem;
            height: .7rem;
            margin-right: .9rem;
            border-radius: 50%;
            opacity: .2;
            background: #fff;
        }
        .swiper-pagination-bullet-active{
            background: #B3B3B3 !important;
            opacity: 1;
            width: .7rem;
            height: .7rem;
            margin-right: .9rem;
            border-radius: 50%;
        }
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: 0;
        }
    }
</style>
