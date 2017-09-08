<template>
    <section class="hotel-detail-cooperate-section">
        <div class="cooperate-item">
            <div class="left-label-div">合作时间</div>
            <div class="right-value-div">
                {{cooperateData.startTimeShow}}
                <span v-show="cooperateData.startTimeShow!=cooperateData.endTimeShow">～{{cooperateData.endTimeShow}}</span>
            </div>
        </div>
        <!-- <div class="cooperate-item">
            <div class="left-label-div">商户BD</div>
            <div class="right-value-div">{{cooperateData.bdName}} {{cooperateData.bdPhone}}</div>
        </div> -->
        <div class="cooperate-item">
            <div class="left-label-div">合作模式</div>
            <div class="right-value-div">{{cooperateData.coType}}</div>
        </div>
        <div class="cooperate-item">
            <div class="left-label-div">销售策略</div>
            <div class="right-value-div">
                <span v-if="cooperateData.strategy">{{strategyMap[cooperateData.strategy]}}</span>
                <span v-else>未设定</span>
            </div>
        </div>
        <div class="cooperate-item" v-for="(item,index) in cooperateData.ruleList">
            <div class="left-label-div">收款规则</div>
            <div class="right-value-div pay-rule-div inline-div">
                    <p>首款{{item.firstNumber}} 签约后{{item.firstDay}}天</p>
                    <p>中款{{item.middleNumber}} 婚期前{{item.middleDay}}天</p>
                    <p>尾款{{item.lastNumber}} 婚期前{{item.lastDay}}天</p>
            </div>
        </div>
        <div class="cooperate-item">
            <div class="left-label-div">发票规则</div>
            <div class="right-value-div">
                <span>商户向消费者开具发票</span>
            </div>
        </div>
        <div class="cooperate-item">
            <div class="left-label-div">发票备注</div>
            <div class="right-value-div inline-div" v-if="cooperateData.invoiceNote">{{cooperateData.invoiceNote}}</div>
            <div class="right-value-div inline-div" v-else>未设定</div>
        </div>
        <div class="cooperate-item">
            <div class="left-label-div" style="line-height: 2rem">销售联系人</div>
            <div class="right-value-div inline-div" v-if="cooperateData.sales&&cooperateData.sales.length">
                <div class="sale-detail-div" v-for="(ele,index) in  cooperateData.sales">
                    <div class="text-ellipse"><span>{{ele.salesName}}</span><span>{{ele.email}}</span></div>
                    <div class="text-ellipse"><span>{{levelMap[ele.level]}}</span></div>
                </div>
            </div>
            <div class="right-value-div inline-div" style="line-height: 2rem" v-else>
                未设定
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
            cooperateData:{},
            levelMap:{1:'宴会销售',2:'ADOC',3:'DOC',4:'DOSM'},
            strategyMap:{1:'一战',2:'二战',3:'散户'},
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
                    this.getCooperateData();
                },
                fail: (err)=>{
                    this.getCooperateData();
                }
            });
        });
        
    },
    methods:{
        getCooperateData:function(){
            let params = {
                shopId:this.shopId
            }
            let ajaxUrl = mDomain+'/lovelab/hotelInfo/contract?'+qs.stringify(params);
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
                    } else{
                        Toast(json.msg);
                        console.log('查询合作信息失败')
                        return;
                    }
                }
                json.content.startTimeShow = json.content.startTime?formatter(new Date(json.content.startTime),'YYYY-MM-DD'):'';
                json.content.endTimeShow = json.content.endTime?formatter(new Date(json.content.endTime),'YYYY-MM-DD'):'';
                let ruleArry = []
                json.content.configs.forEach((ele,index)=>{
                    let ratioArry= ele.ratio?ele.ratio.split(','):[];
                    let ratioDayArry = ele.ratioDay?ele.ratioDay.split(','):[];
                    let obj = {
                        firstNumber:ratioArry[0],
                        firstDay:ratioDayArry[0],
                        middleNumber:ratioArry[1],
                        middleDay:ratioDayArry[1],
                        lastNumber:ratioArry[2],
                        lastDay:ratioDayArry[2]
                    }
                    ruleArry.push(obj);
                });
                json.content.ruleList = ruleArry;
                this.cooperateData = json.content;
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
    .hotel-detail-cooperate-section{
        font-size: 1.5rem;
        color: #999;
        background: #fff;
        padding:0 1rem;
        .cooperate-item{
            padding: 1.5rem 0;
            line-height: 1.5rem;
            .borderline(#e1e1e1,bottom);
            &:last-child{
                &:after{
                    border-bottom: none;
                }
            }
            .inline-div{
                display: inline-block;
                vertical-align: text-top;
                max-width: 75%;
                color: #333;
                line-height: normal;
            }
            .left-label-div,.right-value-div{
                display: inline-block;
                vertical-align: top;
                line-height: 1.5rem;
            }
            .left-label-div{
                width: 6.5rem;
                margin-right: 1.5rem;
            }
            .right-value-div{
                color: #333;
                min-width: 70%;
                span{
                    margin-right: 1rem;
                }
            }
        }
    }
    .pay-rule-div p{
        line-height: 1.5rem;
        margin-bottom: .8rem;
    }
    .sale-detail-div{
        margin-bottom: .7rem;
        div{
            margin-bottom: .7rem;
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
</style>
