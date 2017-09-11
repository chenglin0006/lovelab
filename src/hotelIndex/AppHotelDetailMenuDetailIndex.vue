<template>
    <section class="hotel-detail-menu-detail-section">
        <div class="menu-title-div">
            <div class="menu-name text-ellipse">{{menuDetailData.menuName}}</div>
            <div class="menu-num" v-if="menuDetailData.dishesArray">含{{menuDetailData.dishesArrayShow.length}}个菜单可选</div>
        </div>
        <div class="menu-content-div" v-if="menuDetailData.dishesArrayShow" :class="{'only-one':menuDetailData.dishesArrayShow.length==1}">
            <div class="menu-item-div" v-if="menuDetailData.dishesArrayShow" :key="index" v-for="(item,index) in menuDetailData.dishesArrayShow">
                <div class="menu-item-title" :class="{'special-flag':menuDetailData.dishesArrayShow.length>1&&item.contentList.length==0}">
                    <div class="pic-div">
                        <img class="img-div" :src="item.menuPic"></img>
                    </div>
                    <div class="menu-title-outer-div">
                        <div class="menu-title-inner-div">
                            <img class="little-img" src="./img/menu-left-icon.png">
                            <span v-if="menuDetailData.dishesArray&&menuDetailData.dishesArray.length>1">{{item.menuName}}</span>
                            <span v-else>菜单</span>
                            <img class="little-img" src="./img/menu-right-icon.png">
                        </div>
                    </div>
                </div>
                <div class="menu-item-desc" :key="index" v-for="(ele,index) in item.contentList">{{ele}}</div>
            </div>
        </div>
        <div class="menu-fee-div" v-if="menuDetailData.config">
            <div class="menu-fee-title">其他费用</div>
            <div class="menu-fee-item">
                <span>服务费</span>
                <span class="value" v-if="menuDetailData.config.serviceChargeType==1">免费</span>
                <span class="value" v-else-if="menuDetailData.config.serviceChargeType==3">面议</span>
                <span class="value" v-else-if="menuDetailData.config.serviceChargeType==2&&menuDetailData.config.serviceChargePrice">{{menuDetailData.config.serviceChargePrice}}{{unitMap[menuDetailData.config.serviceChargeUnit]}}</span>
                <span class="value" v-else>未设定</span>
            </div>
            <div class="menu-fee-item">
                <span>进场费</span>
                <span class="value" v-if="menuDetailData.config.admissionType==1">免费</span>
                <span class="value" v-else-if="menuDetailData.config.admissionType==3">面议</span>
                <span class="value" v-else-if="menuDetailData.config.admissionType==2&&menuDetailData.config.admission">{{menuDetailData.config.admission}}{{unitMap[menuDetailData.config.admissionUnit]}}</span>
                <span class="value" v-else>未设定</span>
            </div>
            <div class="menu-fee-item">
                <span>进场押金</span>
                <span class="value" v-if="menuDetailData.config.foregiftType==1">免费</span>
                <span class="value" v-else-if="menuDetailData.config.foregiftType==3">面议</span>
                <span class="value" v-else-if="menuDetailData.config.foregiftType==2&&menuDetailData.config.foregift">{{menuDetailData.config.foregift}}{{unitMap[menuDetailData.config.foregiftUnit]}}</span>
                <span class="value" v-else>未设定</span>
            </div>
            <div class="menu-fee-item" v-show="menuDetailData.config.serviceChargeType==3||menuDetailData.config.admissionType==3||menuDetailData.config.foregiftType==3">
                <span>收费标准,</span>
                <span>请参考<span class="fee-rule-span" @click="showFeeRulePopFun">收费细则</span></span>
            </div>
        </div>
        <div class="menu-other-div" v-show="menuDetailData.annexation">
            <div class="menu-other-title">附加信息</div>
            <div class="flex-parent">
                <div class="menu-other-content flex-child">{{menuDetailData.annexation}}</div>
            </div>
        </div>
        <section class="pop-section menu-pop" v-if="showFeeRulePopStatus&&menuDetailData.config.descArry">
            <div class="mask-div" @touchstart="touchMoveFun($event)" @click="hideFeeRulePopFun"></div>
            <div class="pop-content">
                <img class="close-btn" @click="hideFeeRulePopFun" src="../commonImg/close-btn-3.png">
                <div class="pop-title">收费细则</div>
                <div class="rule-div">
                    <div v-for="(item,index) in menuDetailData.config.descArry">{{index+1}}、{{item}}</div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import mockData from './js/mock.js';
import fetchJsonp from 'fetch-jsonp';
import CommonFun from '../commonJs/CommonFun.js';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            menuId:'',
            showFeeRulePopStatus:false,
            menuDetailData:{},
            unitMap:{0:'元',1:'%'},
            isAndroid:false,
            isLLApp:false,
            isIOS:false
        }
    },
    props:[],
    components: {
    },
    watch:{
    },
    computed:{
    },
    mounted(){
        this.menuId = this.$route.query.menuId;
        this.isLLApp = CommonFun.getUaIsApp();
        this.getMenuDetailData();
    },
    methods:{
        showFeeRulePopFun:function(){
            this.showFeeRulePopStatus = true;
        },
        hideFeeRulePopFun:function(){
            this.showFeeRulePopStatus = false;
        },
        touchMoveFun:function(event){
            event.preventDefault();
            event.stopPropagation();
        },
        getMenuDetailData:function(){
            let params = {
                menuId:this.menuId
            }
            let ajaxUrl = mDomain+'/lovelab/menu/details?'+qs.stringify(params);
            let nameMap = {0:'A',1:'B',2:'C'};
            let picMap={0:'https://p0.meituan.net/dpnewvc/6bdf2ad52558b28461fdc9198004d12b516651.png',1:'https://p1.meituan.net/dpnewvc/a48c8f0098c980235e470b057cd56b59697024.png',2:'https://p1.meituan.net/dpnewvc/475420b288fb6a8d29acb785c6781e55565285.png'};
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
                        console.log('查询菜单详情失败')
                        return;
                    }
                }
                json.content.dishesArrayShow = [];
                if(json.content.config){
                    json.content.config.descArry = [];
                    if(json.content.config.serviceChargePrice==0){
                        json.content.config.serviceChargeType=1;
                    } else if(json.content.config.serviceChargePrice==-1){
                        json.content.config.serviceChargeType=3;
                        if(json.content.config.serviceChargeDesc){
                            json.content.config.descArry.push(json.content.config.serviceChargeDesc);
                        }
                    } else {
                        json.content.config.serviceChargeType=2;
                    }
                    if(json.content.config.admission==0){
                        json.content.config.admissionType=1;
                    } else if(json.content.config.admission==-1){
                        json.content.config.admissionType=3;
                        if(json.content.config.admissionDesc){
                            json.content.config.descArry.push(json.content.config.admissionDesc);
                        }
                    } else {
                        json.content.config.admissionType=2;
                    }
                    if(json.content.config.foregift==0){
                        json.content.config.foregiftType=1;
                    } else if(json.content.config.foregift==-1){
                        json.content.config.foregiftType=3;
                        if(json.content.config.foregiftDesc){
                            json.content.config.descArry.push(json.content.config.foregiftDesc);
                        }
                    } else {
                        json.content.config.foregiftType=2;
                    }
                }

                this.menuDetailData = json.content;
                this.menuDetailData.dishesArray.forEach((ele,index)=>{
                    let obj = {
                        menuName:'菜单'+nameMap[index],
                        menuPic: picMap[index],
                        contentList:ele.dishesContent?ele.dishesContent.split(','):[]
                    }
                    this.menuDetailData.dishesArrayShow.push(obj);
                });
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
    .hotel-detail-menu-detail-section{
        font-size: 1.3rem;
        color: #666;
        background: #f2f2f2;
        padding-bottom: 2rem;
        .menu-title-div{
            background: #fff;
            padding: 2rem 1.5rem 2.1rem 1.5rem;
            .menu-name{
                margin-bottom: 1rem;
                font-family: PingFangSC-Regular;
                font-size: 2.2rem;
                color: #111111;
            }
            .menu-num{
                font-size: 1.4rem;
                color: #777;
            }
        }
        .menu-content-div{
            padding: 0;
            background: #fff;
            text-align: center;
            margin-bottom: 1rem;
            border-spacing: 1rem;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            .menu-item-div{
                border:solid 1px #e4e4e4;
                display: table-cell;
                padding-bottom: 2.1rem;
            }
            .menu-item-title{
                margin-bottom: 1.3rem;
                font-size: 1.5rem;
                width: 30rem;
                text-align: center;
                position: relative;
                &.special-flag{
                    position: relative;
                    top: -1.6rem;
                }
                .menu-title-outer-div{
                    width: 12rem;
                    height: 5rem;
                    background:#fff;
                    padding: .5rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    .menu-title-inner-div{
                        opacity: 0.8;
                        border: 1px solid #CCBFA3;
                        line-height: 4.8rem;
                        font-size: 1.8rem;
                        color: #B39652;
                        img{
                            width: 1.5rem;
                            height: .6rem;
                            position: relative;
                            top: -.4rem;
                        }
                    }
                }
                .pic-div{
                    position: relative;
                    width: 100%;
                    padding-bottom: 36%;
                    .img-div{
                        position: absolute;
                        left: 0;
                        top:0;
                        right:0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .menu-item-desc{
                color: #333;
                font-size: 1.4rem;
                color: #111111;
                letter-spacing: 0;
                line-height: 2.4rem;
            }
            &.only-one{
                padding: 2rem;
                .menu-item-div{
                    display: block;
                }
                .menu-item-title{
                    width: 100%;
                }
            }
        }
        .menu-fee-title,.menu-other-title{
            color: #333;
            line-height: 4.5rem;
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #111111;
            .borderline(#e1e1e1,bottom);
            margin-bottom: 1.5rem;
        }
        .menu-fee-div{
            background: #fff;
            padding: 0 0 1.5rem 1.5rem;
            margin-bottom: .5rem;
            .menu-fee-item{
                margin-bottom: 1.5rem;
                color: #999;
                font-size: 1.5rem;
                .fee-rule-span{
                    color: @mainColor;
                    padding: 0 1rem;
                }
                .value{
                    color: #333;
                    margin-left: 2rem;
                }
            }
        }
        .menu-other-div{
            background: #fff;
            padding: 0 0 1.5rem 1.5rem;
            padding-bottom: 1.1rem;
            .menu-other-tag{
                vertical-align: top;
                width: 40%;
            }
            .menu-other-content{
                vertical-align: top;
                font-size: 1.5rem;
                color: #777777;
                line-height: 2.3rem;
                padding-right: 1.5rem;
            }
        }
    }
    .pop-content{
        padding:2.6rem 2.5rem 5.5rem 2.5rem;
        min-height: 30rem !important;
        .pop-title{
            font-family: PingFangSC-Medium;
            font-size: 1.8rem;
            color: #333333;
            margin-bottom: 1.3rem;
        }
        .rule-div{
            max-height:25rem;
            overflow: scroll;
            font-family: PingFangSC-Regular;
            font-size: 1.5rem;
            color: #666666;
            line-height: 2.3rem;
            div{
                word-break: break-all;
            }
        }
    }
</style>
