<template>
    <section class="hotel-detail-operate-section">
        <div class="operate-item-content-div">
            <div class="operate-item-title">
                <div class="title-border"></div>
                <div class="title-text">运营概况</div>
            </div>
            <div class="operate-item-content">
                <div class="operate-item-div">
                    <div class="operate-item-label">销售人数</div>
                    <div class="operate-item-value" v-if="operateData.operation.salesNum!=-1">{{operateData.operation.salesNum}}人</div>
                    <div class="operate-item-value" v-else>未设定</div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">值班安排</div>
                    <div class="operate-item-value">{{dutyTypeMap[operateData.operation.dutyType]}}</div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">业绩考核标准</div>
                    <div class="operate-item-value">{{performanceMap[operateData.operation.performance]}}</div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">周末是否有人接待</div>
                    <div class="operate-item-value">{{weekendAvailable[operateData.operation.weekendAvailable]}}</div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">酒店产品售卖方式</div>
                    <div class="operate-item-value">{{saleTypeMap[operateData.operation.saleType]}}</div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">酒店产品售卖价格</div>
                    <div class="operate-item-value">
                        <span v-if="operateData.operation.priceDesc">{{operateData.operation.priceDesc}}</span>
                        <span v-else>未设定</span>
                    </div>
                </div>
                <div class="operate-item-div">
                    <div class="operate-item-label">酒店产品售卖明细</div>
                    <div class="operate-item-value inline-value">
                        <span v-if="operateData.operation.detailInfo">{{operateData.operation.detailInfo}}</span>
                        <span v-else>未设定</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="operate-item-content-div" :key="index" v-for="(item,index) in  operateData.coHQ">
            <div class="operate-item-title">
                <div class="title-border"></div>
                <div class="title-text">合作婚庆</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">婚庆名称</div>
                <div class="operate-item-value" v-if="item.name">{{item.name}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">合作方式</div>
                <div class="operate-item-value" v-if="coTypeMap[item.coType]">{{coTypeMap[item.coType]}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">婚庆价格</div>
                <div class="operate-item-value" v-if="item.price!=-1">{{item.price}}元</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">进场费用</div>
                <div class="operate-item-value" v-if="item.specialPrice!=-1">{{item.specialPrice}}元</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">套餐内容</div>
                <div class="operate-item-value inline-value" v-if="item.packageContent">{{item.packageContent}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">独家优惠</div>
                <div class="operate-item-value inline-value" v-if="item.specialInfo">{{item.specialInfo}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">独家售卖</div>
                <div class="operate-item-value inline-value" v-if="item.specialProduct">{{item.specialProduct}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
        </div>
        <div class="operate-item-content-div" :key="index" v-for="(item,index) in  operateData.others">
            <div class="operate-item-title">
                <div class="title-border"></div>
                <div class="title-text">合作第三方</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">婚庆名称</div>
                <div class="operate-item-value" v-if="item.name">{{item.name}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">合作方式</div>
                <div class="operate-item-value" v-if="coTypeMap[item.coType]">{{coTypeMap[item.coType]}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">售卖模式</div>
                <div class="operate-item-value" v-if="saleTypeMap[item.saleType]">{{saleTypeMap[item.saleType]}}</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">婚庆价格</div>
                <div class="operate-item-value" v-if="item.price!=-1">{{item.price}}元</div>
                <div class="operate-item-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">套餐内容</div>
                <div class="operate-item-value inline-value" v-if="item.packageContent">{{item.packageContent}}</div>
                <div class="operate-item-value inline-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">独家优惠</div>
                <div class="operate-item-value inline-value" v-if="item.specialInfo">{{item.specialInfo}}</div>
                <div class="operate-item-value inline-value" v-else>未设定</div>
            </div>
            <div class="operate-item-div">
                <div class="operate-item-label">独家售卖</div>
                <div class="operate-item-value  " v-if="item.specialProduct">{{item.specialProduct}}</div>
                <div class="operate-item-value inline-value" v-else>未设定</div>
            </div>
        </div>
    </section>
</template>

<script>
import Toast from '@dp/wepp-module-toast';
import Util from '@dp/vc-util';
import $ from '@dp/zepto';
import qs from 'qs';
import fetchJsonp from 'fetch-jsonp';
import mockData from './js/mock.js';
import CommonFun from '../commonJs/CommonFun.js';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            operateData:{
                operation:{},
                coHQ:[],
                others:[]
            },
            dutyTypeMap:{0:'未设定',1:'双休日轮休',2:'双休日全休'},
            performanceMap:{0:'未设定',1:'整体婚宴考核',2:'个人销售提点'},
            weekendAvailable:{0:'未设定',1:'是',2:'否'},
            saleTypeMap:{0:'未设定',1:'婚宴婚庆打包',2:'婚宴婚庆拆分'},
            coTypeMap:{1:'发单',2:'代理售卖',3:'驻店售卖'},
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
        this.shopId = Util.getUrlParam('shopId')?Util.getUrlParam('shopId'):0;
        this.isLLApp = CommonFun.getUaIsApp();
        this.getOperateData();
    },
    methods:{
        getOperateData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/shopoperation?'+qs.stringify(params);
            fetchJsonp(ajaxUrl, {
                jsonpCallback: 'jsonp'
            })
            .then(function(response) {
                return response.json();
            }).then((json)=>{
                if(json.code != 200){
                    if(json.code == 600){
                        if(this.isLLApp&&this.isAndroid){
                            CommonFun.androidLogin();
                        } else {
                            location.href= eDomain;
                        }
                    } else {
                        Toast(json.msg);
                        console.log('查询运营概况信息失败')
                        return;
                    }
                }
                this.operateData = json.content;
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
    .hotel-detail-operate-section{
        font-size: 1.5rem;
        color: #333;
        background: #f0f0f0;
        .operate-item-div{
            padding: 1.5rem 0;
            .borderline(#e1e1e1,bottom);
            .operate-item-label,.operate-item-value{
                display: inline-block;
                vertical-align: top;
                &.inline-value{
                    max-width: 65%;
                    vertical-align: text-top;
                }
            }
            .operate-item-label{
                width: 6.5rem;
                color: #999;
                margin-right: 3.5rem;
            }
        }
        .cooperate-shop-div{
            background: #fff;
            padding:1rem;
            margin: 1rem;
            padding-top: 0;
            .cooperate-shop-tag,.cooperate-other-tag{
                display: inline-block;
                margin-left: -1rem;
                background: @mainColor;
                color: #fff;
                margin-bottom: .3rem;
                width: 7rem;
                font-size: 1.2rem;
                text-align: center;
            }
            .cooperate-other-tag{
                background: #fff;
                border:solid 1px @mainColor;
                color: @mainColor;
            }
        }
        .cooperate-shop{
            line-height: 4rem;
            background: #fff;
            margin-bottom: 1rem;
            padding-left: 1rem;
        }
        .operate-item-content-div{
            margin-bottom: 1rem;
            background: #fff;
            padding: 0 0 0 1.5rem;
        }
        .operate-item-title{
            font-size: 1.3rem;
            line-height: 4.5rem;
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #111111;
            div{
                display: inline-block;
                vertical-align: top;
            }
            .title-border{
                width: .5rem;
                height: 1.5rem;
                background: @mainColor;
                position: relative;
                top: 1.5rem;
            }
        }
        .operate-item-content{
            border-top: solid 1px #e4e4e4;
            padding-top: 1rem;
            padding-right: 1.5rem;
        }
    }
</style>
