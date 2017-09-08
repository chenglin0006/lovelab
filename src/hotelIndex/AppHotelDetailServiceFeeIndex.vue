<template>
    <section class="hotel-detail-fee-section">
        <div class="fee-div">
            <div class="fee-item">牡丹厅：</div>
            <div class="fee-item">商家价4800</div>
            <div class="fee-item">点评价<span class="price-dp">3888</span></div>
        </div>
        <div class="fee-div">
            <div class="fee-item">牡丹厅：</div>
            <div class="fee-item">商家价4800</div>
            <div class="fee-item">点评价<span class="price-dp">3888</span></div>
        </div>
        <div class="fee-div">
            <div class="fee-item">牡丹厅：</div>
            <div class="fee-item">商家价4800</div>
            <div class="fee-item">点评价<span class="price-dp">3888</span></div>
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
import CommonFun from '../commonJs/CommonFun.js'
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:''
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
    },
    methods:{
    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import url('../commonLess/util');
    @import url('../commonLess/star');
    .hotel-detail-fee-section{
        font-size: 1.2rem;
        color: #666;
        background: #f2f2f2;
        .fee-div{
            background: #fff;
            margin-bottom: 1rem;
            .fee-item{
                display: inline-block;
                width: 32%;
                line-height: 5.5rem;
                text-align: center;
                .price-dp{
                    color: @mainColor;
                    font-size: 1.7rem;
                }
            }
        }
    }
</style>
