<template>
    <section class="hotel-detail-info-section">
        <div class="hotel-info-line">
            <div class="hotel-info-item">
                <span>酒店类型:</span>
                <span>星级酒店</span>
            </div>
            <div class="hotel-info-item">
                <span>酒店格局:</span>
                <span>独栋</span>
            </div>
        </div>
        <div class="hotel-info-line">
            <div class="hotel-info-item">
                <span>装修风格:</span>
                <span>中式</span>
            </div>
            <div class="hotel-info-item">
                <span>周边景观:</span>
                <span>商圈周边</span>
            </div>
        </div>
        <div class="hotel-info-line">
            <div class="hotel-info-item">
                <span>场地特色:</span>
                <span>礼堂</span>
            </div>
            <div class="hotel-info-item">
                <span>品牌等级:</span>
                <span>五星级</span>
            </div>
        </div>
        <div class="hotel-info-line">
            <div class="hotel-info-item">
                <span>开业时间:</span>
                <span>1998年5月</span>
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
import CommonFun from '../commonJs/CommonFun.js'
var mDomain = CommonFun.getDomain();
var eDomain = CommonFun.getEDomain();
export default {
    data(){
        return{
            shopId:'',
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
    .hotel-detail-info-section{
        padding: 3rem;
        font-size: 1.2rem;
        color: #666;
        background: #fff;
        min-height: 91vh;
        .hotel-info-line{
            font-size: 0;
            .hotel-info-item{
                display: inline-block;
                font-size: 1.2rem;
                width: 50%;
                margin-bottom: 2rem;
            }
        }
    }
</style>
