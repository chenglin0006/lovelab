<template>
    <section class="hotel-detail-discount-section">
        <div class="discount-content" v-if="discountData.visible&&discountData.visible.length">
            <div class="discount-title">用户可见优惠</div>
            <div class="discount-info" :key="index" v-for="(item,index) in discountData.visible">
                <div class="discount-date">
                    <span class="color-tag">{{item.startTime}}</span>
                    <span style="margin-left: .5rem;margin-right: .5rem;" v-show="item.startTime!=item.endTime">至 </span>
                    <span v-show="item.startTime!=item.endTime" class="color-tag">{{item.endTime}}</span>
                </div>
                <div class="discount-item">
                    <div class="discount-type-content">{{item.specialInfo}}</div>
                </div>
            </div>
        </div>
        <div class="discount-content" v-if="discountData.invisible&&discountData.invisible.length">
            <div class="discount-title">顾问可见优惠</div>
            <div class="discount-info" :key="index" v-for="(item,index) in discountData.invisible">
                <div class="discount-date">
                    <span class="color-tag">{{item.startTime}}</span><span style="margin-left: .5rem;margin-right: .5rem;" v-show="item.startTime!=item.endTime">至 </span><span class="color-tag" v-show="item.startTime!=item.endTime">{{item.endTime}}</span>
                </div>
                <div class="discount-item">
                    <div class="discount-type-content">{{item.specialInfo}}</div>
                </div>
            </div>
        </div>
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
import formatter from 'date-formatter';
import KNB from '@dp/knb';
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
            discountData:{},
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
        this.shopId = this.$route.query.shopId;
        this.isLLApp = CommonFun.getUaIsApp();
        KNB.ready(()=>{
            KNB.getUA({
                success: (info)=>{
                    this.isIOS = info&&info.osName=='ios'?true:false;
                    this.isAndroid = info&&info.osName=='android'?true:false;
                    this.getDiscountData();
                },
                fail: (err)=>{
                    this.getDiscountData();
                }
            });
        });
    },
    methods:{
        getDiscountData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/specialinfo?'+qs.stringify(params);
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
                        console.log('查询折扣信息失败')
                        return;
                    }
                }
                json.content.visible.forEach((ele,index)=>{
                    ele.startTime = formatter(new Date(ele.scheduleFrom),'YYYY-MM-DD');
                    ele.endTime = formatter(new Date(ele.scheduleTo),'YYYY-MM-DD');
                });
                json.content.invisible.forEach((ele,index)=>{
                    ele.startTime = formatter(new Date(ele.scheduleFrom),'YYYY-MM-DD');
                    ele.endTime = formatter(new Date(ele.scheduleTo),'YYYY-MM-DD');
                });
                this.discountData = json.content;
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
    .hotel-detail-discount-section{
        font-size: 1.5rem;
        color: #777;
        font-family: PingFangSC-Regular;
        background: #f0f0f0;
        .discount-content{
            padding: 0rem 0 0rem 1.5rem;
            background: #fff;
            margin-bottom: 1rem;
            .discount-info{
                border-bottom: solid 1px #e4e4e4;
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;
                padding-right: 1.5rem;
                &:last-child{
                    border-bottom: none;
                }
            }
            .discount-date{
                margin-bottom: 1.5rem;
                .color-tag{
                    color: #333;
                }
            }
            .discount-title{
                .borderline(#e1e1e1,bottom);
                line-height: 4.5rem;
                font-family: PingFangSC-Medium;
                font-size: 1.5rem;
                color: #111111;
            }
            .discount-item{
                margin-bottom: 1.5rem;
                &:last-child{
                    margin-bottom: 0;
                }
                div{
                    display: inline-block;
                    vertical-align: top;
                }
                .discount-type-content{
                    
                }
                .discount-type-tag{
                    height: 1.5rem;
                    img{
                        width: 1.5rem;
                        height: 1.5rem;
                        margin-right: 1rem;
                    }
                }
            }
        }
    }
</style>
